# ajar.expert

Landing page + custom AI chatbot untuk `ajar.expert`, dibangun dengan Next.js App Router, Vercel AI SDK, dan provider model yang bisa diganti.

## Stack

- Next.js 16
- React 19
- Vercel AI SDK
- Google Gemini, OpenAI, atau Anthropic
- Custom lead capture webhook

## Fitur Utama

- Landing page promosi layanan custom AI chatbot
- Floating chat widget yang terhubung ke `/api/chat`
- Provider AI fleksibel lewat environment variables
- Knowledge base lokal untuk konteks layanan
- Lead capture tool untuk mengirim data ke CRM atau flow WhatsApp
- Siap deploy ke Vercel untuk production dan preview

## Struktur Penting

```text
app/
  api/chat/route.ts         API chat streaming
  globals.css               Styling landing page
  layout.tsx                Metadata dan shell app
  page.tsx                  Halaman utama
components/
  chat-widget.tsx           Widget chat di frontend
lib/
  chat-model.ts             Resolver provider model
  lead-capture.ts           Fan-out webhook CRM/WhatsApp
  site-data.ts              Knowledge base dan konten landing page
vercel.json                 Framework preset Vercel
```

## Environment Variables

### Gemini

```env
AI_CHAT_PROVIDER=google
AI_CHAT_MODEL=gemini-2.5-flash
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
```

### OpenAI

```env
AI_CHAT_PROVIDER=openai
AI_CHAT_MODEL=gpt-5
OPENAI_API_KEY=your_key_here
```

### Anthropic

```env
AI_CHAT_PROVIDER=anthropic
AI_CHAT_MODEL=claude-sonnet-4-5
ANTHROPIC_API_KEY=your_key_here
```

### Lead Webhook

```env
LEAD_WEBHOOK_URL=
LEAD_WEBHOOK_SECRET=

LEAD_CRM_WEBHOOK_URL=
LEAD_CRM_WEBHOOK_SECRET=
LEAD_WHATSAPP_WEBHOOK_URL=
LEAD_WHATSAPP_WEBHOOK_SECRET=
```

## Jalankan Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm run build
```

## Deploy ke Vercel

Project ini sudah dikonfigurasi untuk Vercel dan memakai:

- `Production`: Gemini aktif
- `Preview`: Gemini aktif
- `Development`: Gemini aktif

Pastikan env yang sesuai sudah tersedia di Vercel sebelum deploy.

## Catatan

- File `index.html` disimpan sebagai referensi legacy dari versi landing page sebelumnya.
- Jika API key dibagikan di chat atau log, lakukan rotate setelah setup selesai.
