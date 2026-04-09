import { getGeminiApiKey } from "../lib/geminiEnv";

console.log("Checking environment variables...");
console.log("GEMINI_API_KEY exists:", !!process.env.GEMINI_API_KEY);
console.log("GOOGLE_API_KEY exists:", !!process.env.GOOGLE_API_KEY);
console.log("Result from getGeminiApiKey():", !!getGeminiApiKey());
console.log("PWD:", process.cwd());
