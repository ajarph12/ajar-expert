const GRAPH_VERSION = "v21.0";

/**
 * Send a plain text message via WhatsApp Cloud API.
 * Returns the provider message ID on success.
 */
export async function sendWhatsAppText(
  to: string,
  body: string
): Promise<string> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    throw new Error("Missing WHATSAPP_TOKEN or WHATSAPP_PHONE_NUMBER_ID");
  }

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "text",
      text: { body },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("WhatsApp API error:", response.status, errorBody);
    throw new Error(`WhatsApp API error: ${response.status}`);
  }

  const data = await response.json();
  const messageId = data?.messages?.[0]?.id ?? "unknown";
  return messageId;
}
