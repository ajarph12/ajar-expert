import { NextRequest, NextResponse } from "next/server";
import {
  getClientIp,
  isIpRateLimited,
  recordIpReply,
} from "@/lib/helpers";
import { generateGeminiReply, type ChatTurn } from "@/lib/gemini";
import { getGeminiApiKey } from "@/lib/geminiEnv";

const MAX_MESSAGES = 24;
const MAX_CONTENT_LENGTH = 2000;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isIpRateLimited(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak permintaan. Mohon tunggu sebentar." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Permintaan tidak valid." }, { status: 400 });
  }

  const rawMessages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return NextResponse.json(
      { error: "Daftar pesan diperlukan." },
      { status: 400 }
    );
  }

  if (rawMessages.length > MAX_MESSAGES) {
    return NextResponse.json(
      { error: "Percakapan terlalu panjang." },
      { status: 400 }
    );
  }

  const normalized: ChatTurn[] = [];
  for (const item of rawMessages) {
    if (!item || typeof item !== "object") {
      return NextResponse.json(
        { error: "Format pesan tidak valid." },
        { status: 400 }
      );
    }
    const role = (item as { role?: string }).role;
    const content = (item as { content?: string }).content;
    if (role !== "user" && role !== "assistant") {
      return NextResponse.json(
        { error: "Peran pesan tidak valid." },
        { status: 400 }
      );
    }
    if (typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        { error: "Isi pesan tidak valid." },
        { status: 400 }
      );
    }
    if (content.length > MAX_CONTENT_LENGTH) {
      return NextResponse.json(
        { error: "Pesan terlalu panjang." },
        { status: 400 }
      );
    }
    normalized.push({ role, content: content.trim() });
  }

  if (normalized[normalized.length - 1].role !== "user") {
    return NextResponse.json(
      { error: "Pesan terakhir harus dari pengguna." },
      { status: 400 }
    );
  }

  if (!getGeminiApiKey()) {
    return NextResponse.json(
      {
        error:
          "Chat AI belum dikonfigurasi. Tambahkan GEMINI_API_KEY atau GOOGLE_API_KEY di file .env.local lalu restart server (npm run dev).",
      },
      { status: 503 }
    );
  }

  try {
    const reply = await generateGeminiReply(normalized);
    recordIpReply(ip);
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Gemini chat error:", error);
    const msg = error?.message || String(error);
    const isSafety =
      msg.includes("safety") || msg.includes("blocked") || msg.includes("SAFETY");
    
    if (isSafety) {
      return NextResponse.json(
        {
          error:
            "Balasan tidak dapat ditampilkan karena kebijakan keamanan. Silakan ubah pertanyaan Anda atau hubungi tim kami via WhatsApp.",
        },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        error: `Gagal menghubungi Gemini: ${msg}. Periksa API_KEY atau coba lagi nanti.`,
      },
      { status: 500 }
    );
  }
}
