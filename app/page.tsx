import { readFileSync } from "fs";
import { join } from "path";
import WhatsAppButton from "@/components/WhatsAppButton";

/**
 * Read the original landing page HTML once at build time.
 * Extract <style>, <body> content, and <script> separately.
 */
function getLandingPageParts() {
  const filePath = join(process.cwd(), "landing-page-original.html");
  const html = readFileSync(filePath, "utf-8");

  // Extract <style>...</style>
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
  const styleContent = styleMatch ? styleMatch[1] : "";

  // Extract content between <body> and </body>
  const bodyMatch = html.match(/<body>([\s\S]*?)<script>/);
  const bodyContent = bodyMatch ? bodyMatch[1] : "";

  // Extract <script>...</script>
  const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
  const scriptContent = scriptMatch ? scriptMatch[1] : "";

  return { styleContent, bodyContent, scriptContent };
}

export default function HomePage() {
  const { styleContent, bodyContent, scriptContent } = getLandingPageParts();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleContent }} />
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
      <WhatsAppButton />
      <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
    </>
  );
}
