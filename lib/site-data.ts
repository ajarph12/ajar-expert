export const navLinks = [
  { href: "#masalah", label: "Masalah" },
  { href: "#chatbot-playbook", label: "Chatbot" },
  { href: "#layanan", label: "Layanan" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#tentang", label: "Tentang" },
] as const;

export const stats = [
  {
    value: "25+",
    label: "Tahun pengalaman",
    detail: "Airline IT, sistem commercial, dan delivery yang paham operasi.",
  },
  {
    value: "AI-First",
    label: "Delivery modern",
    detail: "Workflow, chatbot, dan automasi dibangun cepat tanpa kehilangan kontrol.",
  },
  {
    value: "Ownable",
    label: "Aset milik Anda",
    detail: "Codebase, prompt, dan knowledge base tetap tinggal di repo Anda.",
  },
] as const;

export const painPoints = [
  {
    icon: "01",
    title: "PROSES MANUAL & LEGACY SYSTEM",
    description:
      "Masih bergantung pada spreadsheet, chat manual, dan email bolak-balik? Saatnya ubah ke workflow AI yang lebih cepat dan terukur.",
  },
  {
    icon: "02",
    title: "CS YANG BERULANG-ULANG",
    description:
      "FAQ, pertanyaan layanan, dan permintaan demo datang terus-menerus. Chatbot custom bisa menyaring intent, menjawab cepat, lalu meneruskan lead yang benar-benar siap.",
  },
  {
    icon: "03",
    title: "KOMPLEKSITAS AIRLINE IT",
    description:
      "Integrasi PSS, GDS, ATPCO fare rules, dan IATA messaging butuh kombinasi skill teknologi dan konteks industri yang mendalam.",
  },
] as const;

export const chatbotFeatures = [
  {
    kicker: "Knowledge",
    title: "Dilatih dengan informasi bisnis Anda",
    description:
      "Konten produk, layanan, FAQ, dan positioning disimpan lokal di project sehingga mudah direvisi kapan saja.",
  },
  {
    kicker: "Lead",
    title: "Mengumpulkan lead yang siap follow-up",
    description:
      "Assistant bisa meminta nama dan kontak, lalu meneruskannya ke webhook atau workflow internal Anda.",
  },
  {
    kicker: "Provider",
    title: "OpenAI atau Claude, tinggal pilih",
    description:
      "Backend mendukung OpenAI maupun Anthropic melalui environment variable, tanpa mengubah UI widget.",
  },
  {
    kicker: "Ownership",
    title: "Tanpa biaya platform chatbot pihak ketiga",
    description:
      "Anda memiliki UI, prompt, integrasi, dan knowledge base. Tidak tergantung dashboard SaaS eksternal.",
  },
] as const;

export const serviceCards = [
  {
    tier: "Core Expertise",
    title: "AIRLINE BUSINESS & COMMERCIAL SYSTEMS",
    description:
      "Pengalaman praktis dalam business process airline dan implementasi sistem commercial yang kritikal.",
    items: [
      "Passenger Service Solution (PSS)",
      "Pricing dan fare management",
      "Revenue management",
      "Cargo management system",
      "GDS, ATPCO, dan IATA workflow",
    ],
    emphasis: false,
  },
  {
    tier: "Most Flexible",
    title: "CUSTOM AI CHATBOT",
    description:
      "Widget AI langsung di Next.js untuk menjawab FAQ, mengedukasi calon klien, dan mengumpulkan lead.",
    items: [
      "Chat widget di website",
      "Knowledge base editable",
      "Lead capture tool",
      "OpenAI atau Claude",
      "Webhook ke workflow Anda",
    ],
    emphasis: true,
  },
  {
    tier: "Most Requested",
    title: "AI WORKFLOW & AUTOMATION",
    description:
      "Mengubah proses manual menjadi alur kerja yang lebih cepat, efisien, dan siap berkembang.",
    items: [
      "Process automation",
      "Document AI",
      "AI assistant internal",
      "Workflow orchestration",
      "System integration",
    ],
    emphasis: false,
  },
  {
    tier: "Digital Delivery",
    title: "WEBSITE & MVP DEVELOPMENT",
    description:
      "Membangun landing page, website, dan MVP yang mendukung tujuan bisnis, bukan sekadar tampil rapi.",
    items: [
      "Landing page bisnis",
      "Company profile",
      "MVP dan prototype",
      "Web application",
      "Custom integration",
    ],
    emphasis: false,
  },
] as const;

export const portfolioItems = [
  {
    badges: ["AIRLINE", "MVP"],
    mark: "PSS",
    title: "MINI PSS",
    description:
      "Mini PSS dengan fare manager ATPCO, booking simulator, dan delivery AI-assisted yang fokus pada validasi konsep bisnis.",
    stack: "Next.js · TypeScript · Supabase · shadcn/ui",
  },
  {
    badges: ["IATA", "AUTOMATION"],
    mark: "SSIM",
    title: "SSIM / SSM / ASM CONVERTER",
    description:
      "Tools untuk konversi dan penanganan data schedule airline berdasarkan format IATA standard.",
    stack: "Web App · IATA Standards · Automation",
  },
  {
    badges: ["WEB", "AI"],
    mark: "WEB",
    title: "CUSTOM WEBSITES",
    description:
      "Website untuk klien, dari landing page bisnis sampai web application yang perlu integrasi dan automasi lanjutan.",
    stack: "Next.js · HTML/CSS · AI-assisted delivery",
  },
] as const;

export const processSteps = [
  {
    title: "KONSULTASI",
    description:
      "Mulai dari diagnosis kebutuhan, target pengguna, dan hambatan operasional yang ingin dipecahkan.",
  },
  {
    title: "SCOPE",
    description:
      "Turunkan menjadi alur kerja, prompt, knowledge base, dan integrasi yang benar-benar dibutuhkan.",
  },
  {
    title: "BUILD",
    description:
      "Implementasi cepat dengan Next.js, AI SDK, dan struktur kode yang tetap mudah dikembangkan.",
  },
  {
    title: "ITERATE",
    description:
      "Uji percakapan, pantau kualitas jawaban, lalu perbaiki konten dan alur lead capture secara berkala.",
  },
] as const;

export const aboutTags = [
  "PSS (Amadeus Altea)",
  "Cargo Management System",
  "ATPCO Fare Rules",
  "GDS Integration",
  "Revenue Management",
  "AI Workflow",
  "Custom AI Chatbot",
  "Business Automation",
] as const;

export const sampleTranscript = [
  {
    role: "Pengunjung",
    text: "Saya butuh chatbot untuk website Next.js yang bisa menjawab FAQ.",
  },
  {
    role: "Assistant",
    text:
      "Bisa. Chatbot-nya bisa ditanam langsung di site Anda, diberi knowledge base produk, lalu diarahkan ke OpenAI atau Claude sesuai kebutuhan.",
  },
  {
    role: "Pengunjung",
    text: "Kalau visitor tertarik demo, apa bisa sekalian ambil lead?",
  },
  {
    role: "Assistant",
    text:
      "Bisa. Assistant akan meminta nama dan kontak, lalu mengirimkannya ke workflow follow-up Anda.",
  },
] as const;

export const chatbotKnowledgeBase = `
Brand: ajar.expert
Positioning: Airline IT veteran dan custom AI builder.
Primary audience: bisnis yang butuh website, workflow automation, atau custom AI chatbot.

Core services:
- Airline business and commercial systems.
- Custom AI chatbot untuk website Next.js.
- AI workflow and automation.
- Website and MVP development.

Custom AI chatbot details:
- Dibangun langsung di Next.js menggunakan Vercel AI SDK.
- Provider dapat dipilih antara OpenAI atau Anthropic via environment variable.
- Widget bisa menjawab FAQ, menjelaskan layanan, mengumpulkan lead, dan mengarahkan ke follow-up.
- Prompt, UI, dan knowledge base sepenuhnya dapat disesuaikan.
- Tidak perlu berlangganan platform chatbot pihak ketiga.

Proof and context:
- Pengalaman lebih dari 25 tahun di airline IT.
- Pernah membangun Mini PSS, tools SSIM/SSM/ASM, serta custom websites dan MVP.
- Fokus pada solusi yang relevan secara bisnis dan operasional.

Lead handling rules:
- Tawarkan konsultasi, demo, atau proposal jika user menunjukkan intent serius.
- Minta nama dan minimal satu kanal kontak: email atau WhatsApp.
- Setelah data lengkap, catat lead menggunakan tool captureLead.

Style:
- Jawab dalam Bahasa Indonesia yang jelas, ramah, singkat, dan profesional.
- Hindari jargon berlebihan.
- Jangan mengarang portfolio atau harga yang tidak disebutkan di knowledge base.
`.trim();
