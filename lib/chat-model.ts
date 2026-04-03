import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";

type SupportedProvider = "anthropic" | "google" | "openai";

function resolveProvider(): SupportedProvider {
  const configured = process.env.AI_CHAT_PROVIDER?.toLowerCase();

  if (configured === "anthropic") {
    return "anthropic";
  }

  if (configured === "openai") {
    return "openai";
  }

  if (configured === "google" || configured === "gemini") {
    return "google";
  }

  if (process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY) {
    return "anthropic";
  }

  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY && !process.env.OPENAI_API_KEY) {
    return "google";
  }

  return "openai";
}

export function getChatModel() {
  const provider = resolveProvider();

  if (provider === "anthropic") {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error(
        "ANTHROPIC_API_KEY belum diatur. Tambahkan env tersebut atau ganti AI_CHAT_PROVIDER ke openai.",
      );
    }

    return anthropic(process.env.AI_CHAT_MODEL ?? "claude-sonnet-4-5");
  }

  if (provider === "google") {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      throw new Error(
        "GOOGLE_GENERATIVE_AI_API_KEY belum diatur. Tambahkan env tersebut atau ganti AI_CHAT_PROVIDER ke openai/anthropic.",
      );
    }

    return google(process.env.AI_CHAT_MODEL ?? "gemini-2.5-flash");
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY belum diatur. Tambahkan env tersebut atau ganti AI_CHAT_PROVIDER ke anthropic/google.",
    );
  }

  return openai(process.env.AI_CHAT_MODEL ?? "gpt-5");
}
