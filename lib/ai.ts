import OpenAI from "openai";
import { FIRST_MESSAGE_ADDITION, SYSTEM_PROMPT } from "@/lib/ajarExpertPrompt";

let client: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (client) return client;
  client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

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
