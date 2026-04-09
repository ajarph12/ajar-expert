import {
  GoogleGenerativeAI,
  type Content,
  type EnhancedGenerateContentResponse,
} from "@google/generative-ai";
import { SYSTEM_PROMPT } from "@/lib/ajarExpertPrompt";
import { getGeminiApiKey, getGeminiModel } from "@/lib/geminiEnv";

export type ChatTurn = { role: "user" | "assistant"; content: string };

function extractTextFromResponse(
  response: EnhancedGenerateContentResponse
): string {
  try {
    const direct = response.text();
    if (direct?.trim()) return direct.trim();
  } catch {
    // Blocked or no text aggregate — fall through to manual parts
  }

  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts?.length) {
    const reason = response.candidates?.[0]?.finishReason;
    throw new Error(
      reason === "SAFETY" || reason === "BLOCKLIST"
        ? "Response blocked by safety filters"
        : "Empty model response"
    );
  }

  const text = parts
    .filter(
      (p): p is { text: string } =>
        typeof (p as { text?: string }).text === "string"
    )
    .map((p) => p.text)
    .join("")
    .trim();

  if (!text) {
    throw new Error("Empty model response");
  }
  return text;
}

/**
 * Multi-turn chat using Gemini; last message in `messages` must be from the user.
 */
export async function generateGeminiReply(
  messages: ChatTurn[]
): Promise<string> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY missing");
  }

  const modelName = getGeminiModel();
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: SYSTEM_PROMPT,
  });

  if (messages.length === 0) {
    throw new Error("No messages");
  }

  const last = messages[messages.length - 1];
  if (last.role !== "user") {
    throw new Error("Last message must be user");
  }

  const history: Content[] = [];
  for (let i = 0; i < messages.length - 1; i++) {
    const m = messages[i];
    history.push({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    });
  }

  const chat = model.startChat({
    history,
    generationConfig: {
      maxOutputTokens: 1024,
      temperature: 0.7,
    },
  });

  const result = await chat.sendMessage(last.content);
  return extractTextFromResponse(result.response);
}
