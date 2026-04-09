import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// Manual parsing of .env.local because dotenv is not installed
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, "utf-8");
  content.split("\n").forEach(line => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join("=").trim();
    }
  });
}

const SYSTEM_PROMPT = `Kamu adalah asisten virtual Ajar Expert — konsultan teknologi berpengalaman lebih dari 25 tahun di industri penerbangan dan teknologi.`;

async function test() {
  loadEnv();
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";

  console.log("Using API Key PROPERLY LOADED:", apiKey ? "EXISTS" : "MISSING");
  console.log("Using Model:", modelName);

  if (!apiKey) {
    console.error("No API Key found in .env.local");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: modelName,
    systemInstruction: SYSTEM_PROMPT 
  });

  try {
    const chat = model.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.7,
        },
    });

    console.log("Sending message 'halo'...");
    const result = await chat.sendMessage("halo");
    const response = await result.response;
    console.log("SUCCESS! Response:", response.text());
  } catch (err: any) {
    console.error("FAILED! Error status:", err.status);
    console.error("Error message:", err.message);
    if (err.response) {
      console.error("Error details:", JSON.stringify(err.response, null, 2));
    }
  }
}

test();
