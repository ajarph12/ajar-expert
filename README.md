# Ajar Expert — WhatsApp AI Auto-Reply System

Website landing page + WhatsApp AI auto-reply untuk leads yang berasal dari website.

## Cara Kerja

1. Visitor klik tombol WhatsApp di website
2. WhatsApp terbuka dengan pesan prefilled berisi marker `[SRC:AJAREXPERT]`
3. User kirim pesan → Meta kirim webhook ke `/api/whatsapp/webhook`
4. Backend deteksi marker → tandai sebagai website lead di Supabase
5. AI (OpenAI) generate balasan otomatis dalam Bahasa Indonesia
6. Balasan dikirim via WhatsApp Cloud API
7. Pesan non-website diabaikan

## Setup Lokal

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` ke `.env.local` dan isi semua value:

```bash
cp .env.example .env.local
```

| Variable | Keterangan |
|----------|------------|
| `OPENAI_API_KEY` | API key dari OpenAI |
| `OPENAI_MODEL` | Model yang digunakan (default: `gpt-4o-mini`) |
| `WHATSAPP_TOKEN` | Access token dari Meta WhatsApp Cloud API |
| `WHATSAPP_PHONE_NUMBER_ID` | Phone Number ID (BUKAN nomor telepon biasa) |
| `WHATSAPP_VERIFY_TOKEN` | Token verifikasi webhook (buat sendiri) |
| `SUPABASE_URL` | URL project Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key Supabase |
| `NEXT_PUBLIC_WA_LINK` | wa.me link untuk tombol di website |

### 3. Setup Supabase

1. Buat project di [supabase.com](https://supabase.com)
2. Buka SQL Editor
3. Jalankan isi file `supabase/schema.sql`
4. Copy URL dan Service Role Key ke `.env.local`

### 4. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Setup Meta WhatsApp Cloud API

1. Buka [Meta for Developers](https://developers.facebook.com)
2. Buat atau pilih Business App
3. Tambahkan product **WhatsApp**
4. Di WhatsApp > API Setup:
   - Copy **Temporary Access Token** → `WHATSAPP_TOKEN`
   - Copy **Phone Number ID** → `WHATSAPP_PHONE_NUMBER_ID`
5. Di WhatsApp > Configuration:
   - **Callback URL**: `https://ajar-expert.vercel.app/api/whatsapp/webhook`
   - **Verify Token**: isi sama dengan `WHATSAPP_VERIFY_TOKEN` di env
   - **Subscribe to**: centang `messages`

> **PENTING**: `WHATSAPP_PHONE_NUMBER_ID` adalah ID internal Meta, BUKAN nomor telepon biasa. Nomor 6281380332374 hanya untuk wa.me link dan display.

## Deploy ke Vercel

1. Push ke GitHub
2. Import project di [vercel.com](https://vercel.com)
3. Set semua environment variables di Vercel Dashboard > Settings > Environment Variables
4. Deploy
5. Setelah deploy, konfigurasi webhook URL di Meta: `https://ajar-expert.vercel.app/api/whatsapp/webhook`

## Testing Checklist

- [ ] Landing page tampil normal di `localhost:3000`
- [ ] Tombol WhatsApp muncul di pojok kanan bawah
- [ ] Klik tombol → buka WhatsApp dengan pesan prefilled
- [ ] GET `/api/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=YOUR_TOKEN&hub.challenge=test123` → response `test123`
- [ ] POST `/api/whatsapp/webhook` dengan payload sample → return 200
- [ ] Pesan dengan marker `[SRC:AJAREXPERT]` → dapat balasan AI
- [ ] Pesan follow-up dari lead yang sama → dapat balasan AI
- [ ] Pesan dari nomor non-website → diabaikan
- [ ] Rate limit: pesan beruntun < 10 detik → hanya 1 balasan

## Struktur Project

```
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page + WhatsApp button
│   └── api/whatsapp/webhook/
│       └── route.ts            # Webhook handler (GET verify + POST messages)
├── components/
│   └── WhatsAppButton.tsx      # Floating WhatsApp button
├── lib/
│   ├── helpers.ts              # Marker detection, rate limiting
│   ├── supabase.ts             # Database operations
│   ├── whatsapp.ts             # WhatsApp Cloud API sender
│   └── ai.ts                   # OpenAI integration
├── supabase/
│   └── schema.sql              # Database schema
├── public/                     # Static assets (logo, favicons)
└── landing-page-original.html  # Original HTML backup
```
