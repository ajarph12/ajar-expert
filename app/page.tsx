import { readFileSync } from "fs";
import { join } from "path";
import Script from "next/script";
import ChatWidget from "@/components/ChatWidget";

function getLandingPageParts() {
  const filePath = join(process.cwd(), "landing-page-original.html");
  const html = readFileSync(filePath, "utf-8").replace(/\r\n/g, "\n");

  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
  const styleContent = styleMatch ? styleMatch[1] : "";

  const bodyMatch = html.match(/<body>([\s\S]*?)<script>/);
  const bodyContent = bodyMatch ? bodyMatch[1] : "";

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
      <ChatWidget />
      <Script id="landing-page-scripts" strategy="afterInteractive">
        {scriptContent}
      </Script>
    </>
  );
}
