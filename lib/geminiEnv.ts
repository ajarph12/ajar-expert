/**
 * Resolve Gemini credentials from env (Google AI Studio / Generative Language API).
 * Supports common variable names so keys from AI Studio "Get API key" work without rename.
 */
export function getGeminiApiKey(): string | undefined {
  const raw =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY;
  const key = raw?.trim();
  
  if (key) {
    console.log(`[DEBUG] Gemini API Key loaded (last 4 chars): ...${key.slice(-4)}`);
  } else {
    console.warn("[DEBUG] Gemini API Key NOT FOUND in process.env");
  }

  return key || undefined;
}

/** Default tuned for broad availability on AI Studio; override with GEMINI_MODEL. */
export function getGeminiModel(): string {
  return (
    process.env.GEMINI_MODEL?.trim() || "gemini-1.5-flash"
  );
}
