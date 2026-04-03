export type LeadPayload = {
  company?: string;
  email?: string;
  interest?: string;
  name: string;
  notes?: string;
  whatsapp?: string;
};

type LeadDestination = {
  kind: "crm" | "whatsapp";
  secret?: string;
  url: string;
};

function buildWhatsappMessage(lead: LeadPayload & { capturedAt: string }) {
  const lines = [
    "Lead baru dari website chatbot ajar.expert",
    `Nama: ${lead.name}`,
    lead.company ? `Perusahaan: ${lead.company}` : undefined,
    lead.interest ? `Kebutuhan: ${lead.interest}` : undefined,
    lead.email ? `Email: ${lead.email}` : undefined,
    lead.whatsapp ? `WhatsApp: ${lead.whatsapp}` : undefined,
    lead.notes ? `Catatan: ${lead.notes}` : undefined,
    `Waktu: ${lead.capturedAt}`,
  ];

  return lines.filter(Boolean).join("\n");
}

function resolveDestinations(): LeadDestination[] {
  const crmUrl = process.env.LEAD_CRM_WEBHOOK_URL ?? process.env.LEAD_WEBHOOK_URL;
  const crmSecret =
    process.env.LEAD_CRM_WEBHOOK_SECRET ?? process.env.LEAD_WEBHOOK_SECRET;
  const whatsappUrl = process.env.LEAD_WHATSAPP_WEBHOOK_URL;
  const whatsappSecret = process.env.LEAD_WHATSAPP_WEBHOOK_SECRET;

  const destinations: LeadDestination[] = [];

  if (crmUrl) {
    destinations.push({ kind: "crm", secret: crmSecret, url: crmUrl });
  }

  if (whatsappUrl) {
    destinations.push({
      kind: "whatsapp",
      secret: whatsappSecret,
      url: whatsappUrl,
    });
  }

  return destinations;
}

async function sendLead(destination: LeadDestination, record: LeadPayload & { capturedAt: string; source: string }) {
  const payload =
    destination.kind === "whatsapp"
      ? {
          channel: "whatsapp",
          lead: record,
          message: buildWhatsappMessage(record),
        }
      : {
          channel: "crm",
          lead: record,
        };

  const response = await fetch(destination.url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(destination.secret
        ? { authorization: `Bearer ${destination.secret}` }
        : {}),
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Lead webhook ${destination.kind} gagal dengan status ${response.status}.`,
    );
  }
}

export async function captureLead(lead: LeadPayload) {
  const record = {
    ...lead,
    capturedAt: new Date().toISOString(),
    source: "website-chatbot",
  };

  const destinations = resolveDestinations();

  if (destinations.length > 0) {
    await Promise.all(destinations.map((destination) => sendLead(destination, record)));

    return {
      destination: destinations.map((destination) => destination.kind).join("+"),
      message:
        "Lead sudah diteruskan ke workflow follow-up Anda. CRM dan flow WhatsApp bisa langsung menindaklanjuti dari sana.",
      ok: true,
    };
  }

  console.info("[chatbot-lead]", JSON.stringify(record));

  return {
    destination: "server-log",
    message:
      "Lead sudah dicatat di server log. Tambahkan LEAD_CRM_WEBHOOK_URL atau LEAD_WHATSAPP_WEBHOOK_URL jika ingin otomatis diteruskan ke CRM dan flow WhatsApp.",
    ok: true,
  };
}
