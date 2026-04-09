import { readFileSync, existsSync } from "fs";
import { join } from "path";
import Script from "next/script";
import ChatWidget from "@/components/ChatWidget";

function getLandingPageParts(lang: string) {
  const fileName = lang === "en" ? "landing-page-en.html" : "landing-page-id.html";
  let filePath = join(process.cwd(), fileName);
  
  if (!existsSync(filePath)) {
    filePath = join(process.cwd(), "landing-page-original.html");
  }

  const html = readFileSync(filePath, "utf-8").replace(/\r\n/g, "\n");

  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
  const styleContent = styleMatch ? styleMatch[1] : "";

  const bodyMatch = html.match(/<body>([\s\S]*?)<script>/);
  const bodyContent = bodyMatch ? bodyMatch[1] : "";

  const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
  const scriptContent = scriptMatch ? scriptMatch[1] : "";

  return { styleContent, bodyContent, scriptContent };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const lang = typeof resolvedSearchParams.lang === "string" ? resolvedSearchParams.lang : "id";
  const { styleContent, bodyContent, scriptContent } = getLandingPageParts(lang);

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
