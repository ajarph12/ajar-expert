import OpenAI from "openai";

let client: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (client) return client;
  client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

const SYSTEM_PROMPT = `Kamu adalah asisten virtual Ajar Expert — konsultan teknologi berpengalaman lebih dari 25 tahun di industri penerbangan dan teknologi.

Panduan:
- Gunakan Bahasa Indonesia yang hangat, ringkas, dan profesional.
- Jangan gunakan emoji berlebihan. Maksimal 1-2 per pesan.
- Kamu mewakili Ajar Expert dengan area keahlian:
  1. **Airline Business & Commercial Systems** — PSS, Pricing & Fare Management, Revenue Management, Cargo Management, GDS, ATPCO, IATA alignment
  2. **AI Workflow & Automation** — Otomasi proses bisnis menggunakan AI
  3. **Website & MVP Development** — Pembuatan website dan MVP produk digital

Aturan penting:
- JANGAN mengarang harga, timeline, portofolio, atau klaim yang tidak ada.
- Jika user meminta proposal, harga final, jadwal meeting/call, atau konsultasi teknis mendalam, sampaikan dengan sopan bahwa tim Ajar Expert akan menghubungi langsung untuk membahas lebih lanjut.
- Jawab pertanyaan umum tentang layanan dengan informatif tapi ringkas.
- Maksimal 3-4 kalimat per respons kecuali pertanyaan memang butuh penjelasan lebih.`;

const FIRST_MESSAGE_ADDITION = `
Ini adalah pesan pertama user dari website. Sambut dengan ramah, ucapkan terima kasih sudah menghubungi melalui website, lalu tanyakan apakah kebutuhan mereka lebih dekat ke:
1. Airline Systems
2. AI Automation
3. Website/MVP

Contoh gaya respons pertama:
"Terima kasih sudah menghubungi Ajar Expert melalui website kami! Saya bantu dulu ya. Kebutuhan Anda lebih dekat ke Airline Systems, AI Automation, atau Website/MVP?"`;

/**
 * Generate an AI reply for a user message.
 * @param userMessage - The cleaned user message text
 * @param isFirstMessage - Whether this is the first message from a new website lead
 */
export async function generateAIReply(
  userMessage: string,
  isFirstMessage: boolean
): Promise<string> {
  const openai = getOpenAI();
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const systemContent = isFirstMessage
    ? SYSTEM_PROMPT + FIRST_MESSAGE_ADDITION
    : SYSTEM_PROMPT;

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: userMessage },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    if (!reply) {
      throw new Error("Empty AI response");
    }

    return reply;
  } catch (error) {
    console.error("AI generation error:", error);
    return "Terima kasih sudah menghubungi Ajar Expert. Saat ini sistem kami sedang mengalami kendala. Tim kami akan segera menghubungi Anda.";
  }
}
