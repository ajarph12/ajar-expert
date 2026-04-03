import { NextRequest, NextResponse } from "next/server";
import {
  hasWebsiteMarker,
  cleanMarker,
  isRateLimited,
  recordReply,
} from "@/lib/helpers";
import {
  touchContact,
  upsertWebsiteLead,
  getContact,
  logMessage,
} from "@/lib/supabase";
import { sendWhatsAppText } from "@/lib/whatsapp";
import { generateAIReply } from "@/lib/ai";

// ─── GET: Meta Webhook Verification ───────────────────────────
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode === "subscribe" && token === verifyToken) {
    console.log("Webhook verified successfully");
    return new NextResponse(challenge, { status: 200 });
  }

  console.warn("Webhook verification failed");
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// ─── POST: Inbound WhatsApp Messages ─────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract messages from the webhook payload
    const entry = body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    // Ignore status updates
    if (value?.statuses) {
      return NextResponse.json({ status: "ok" });
    }

    const messages = value?.messages;
    if (!messages || messages.length === 0) {
      return NextResponse.json({ status: "ok" });
    }

    for (const message of messages) {
      // Only handle text messages
      if (message.type !== "text") {
        continue;
      }

      const phone: string = message.from;
      const text: string = message.text?.body ?? "";
      const providerMessageId: string = message.id ?? "";

      // Skip empty messages
      if (!text.trim()) continue;

      // Touch contact (upsert last_seen_at)
      await touchContact(phone);

      // Log inbound message
      await logMessage(phone, "in", text, providerMessageId);

      // Determine if we should reply
      let shouldReply = false;
      let isFirstMessage = false;
      let cleanedText = text;

      if (hasWebsiteMarker(text)) {
        // New website lead — mark and reply
        await upsertWebsiteLead(phone);
        cleanedText = cleanMarker(text);
        shouldReply = true;
        isFirstMessage = true;
      } else {
        // Check if existing website lead
        const contact = await getContact(phone);
        if (contact?.is_website_lead) {
          shouldReply = true;
        }
        // Non-website contact → ignore
      }

      if (!shouldReply) continue;

      // Rate limit check
      if (isRateLimited(phone)) {
        console.log(`Rate limited: ${phone}`);
        continue;
      }

      // Generate AI reply
      const aiReply = await generateAIReply(cleanedText, isFirstMessage);

      // Send reply via WhatsApp
      const outMessageId = await sendWhatsAppText(phone, aiReply);

      // Record reply for rate limiting
      recordReply(phone);

      // Log outbound message
      await logMessage(phone, "out", aiReply, outMessageId);

      console.log(`Replied to ${phone}: ${aiReply.substring(0, 80)}...`);
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    // Always return 200 to Meta to prevent retries
    console.error("Webhook processing error:", error);
    return NextResponse.json({ status: "error" }, { status: 200 });
  }
}
