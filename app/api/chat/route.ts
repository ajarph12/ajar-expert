import { z } from "zod";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
  type UIMessage,
} from "ai";
import { getChatModel } from "@/lib/chat-model";
import { captureLead } from "@/lib/lead-capture";
import { chatbotKnowledgeBase } from "@/lib/site-data";

export const runtime = "nodejs";

const leadSchema = z
  .object({
    company: z.string().trim().min(2).optional(),
    email: z.email().optional(),
    interest: z.string().trim().min(2).optional(),
    name: z.string().trim().min(2),
    notes: z.string().trim().min(2).optional(),
    whatsapp: z.string().trim().min(6).optional(),
  })
  .refine((value) => Boolean(value.email || value.whatsapp), {
    error: "Sertakan minimal email atau WhatsApp.",
    path: ["email"],
  });

const systemPrompt = `
Anda adalah assistant untuk ajar.expert.

Tugas Anda:
- Menjawab pertanyaan tentang layanan, workflow AI, website, MVP, dan custom AI chatbot.
- Membantu pengunjung memilih solusi yang paling relevan.
- Menawarkan konsultasi, demo, atau proposal jika user menunjukkan minat serius.
- Mengumpulkan lead bila user sudah memberikan nama dan minimal satu kontak.

Aturan perilaku:
- Jawab selalu dalam Bahasa Indonesia.
- Gunakan gaya singkat, jelas, profesional, dan ramah.
- Gunakan paragraf pendek. Hindari tabel. Hindari markdown yang rumit.
- Jika informasi belum cukup, tanyakan maksimal dua pertanyaan lanjutan yang paling penting.
- Jangan mengarang harga, pengalaman, atau portfolio di luar knowledge base.
- Jika user minta follow-up, demo, atau proposal dan data sudah lengkap, panggil tool captureLead.

Knowledge base:
${chatbotKnowledgeBase}
`.trim();

export async function POST(request: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await request.json();
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: getChatModel(),
      system: systemPrompt,
      messages: modelMessages,
      stopWhen: stepCountIs(3),
      tools: {
        captureLead: tool({
          description:
            "Catat lead saat pengunjung meminta demo, proposal, atau follow-up dan sudah memberikan nama plus email atau WhatsApp.",
          inputSchema: leadSchema,
          execute: async (lead) => captureLead(lead),
        }),
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan saat memproses chat.";

    return new Response(message, { status: 500 });
  }
}
