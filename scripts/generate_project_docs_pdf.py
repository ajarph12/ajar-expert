"""
Generate project documentation PDF for ajar-expert (ReportLab).
Output: output/pdf/Dokumentasi-Ajar-Expert.pdf
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.platypus import (
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "Dokumentasi-Ajar-Expert.pdf"


def build_flowables():
    styles = getSampleStyleSheet()
    title = ParagraphStyle(
        name="DocTitle",
        parent=styles["Heading1"],
        fontSize=22,
        spaceAfter=18,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#0f172a"),
    )
    subtitle = ParagraphStyle(
        name="DocSubtitle",
        parent=styles["Normal"],
        fontSize=11,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#475569"),
        spaceAfter=28,
    )
    h1 = ParagraphStyle(
        name="H1",
        parent=styles["Heading1"],
        fontSize=16,
        spaceBefore=16,
        spaceAfter=10,
        textColor=colors.HexColor("#0f172a"),
    )
    h2 = ParagraphStyle(
        name="H2",
        parent=styles["Heading2"],
        fontSize=12,
        spaceBefore=12,
        spaceAfter=6,
        textColor=colors.HexColor("#1e293b"),
    )
    body = ParagraphStyle(
        name="BodyJustify",
        parent=styles["Normal"],
        fontSize=10,
        leading=14,
        alignment=TA_JUSTIFY,
        spaceAfter=8,
    )
    bullet = ParagraphStyle(
        name="Bullet",
        parent=body,
        leftIndent=18,
        bulletIndent=8,
    )
    mono = ParagraphStyle(
        name="MonoSmall",
        parent=styles["Code"],
        fontSize=8,
        leading=10,
        fontName="Courier",
    )

    story = []

    story.append(Paragraph("Dokumentasi Teknis Proyek", title))
    story.append(
        Paragraph(
            "<b>ajar-expert</b> - Landing page Next.js dan sistem balasan otomatis WhatsApp berbasis AI",
            subtitle,
        )
    )
    story.append(
        Paragraph(
            "Versi dokumen: 1.0 &nbsp;|&nbsp; Stack: Next.js 15, React 19, TypeScript, "
            "OpenAI, Meta WhatsApp Cloud API, Supabase",
            subtitle,
        )
    )
    story.append(Spacer(1, 0.3 * cm))

    story.append(Paragraph("1. Ringkasan", h1))
    story.append(
        Paragraph(
            "Proyek ini menyediakan situs pemasaran untuk Ajar Expert (konsultan teknologi "
            "berpengalaman di industri penerbangan) sekaligus saluran WhatsApp dengan balasan "
            "otomatis menggunakan model bahasa OpenAI. Hanya kontak yang berasal dari website "
            "(terdeteksi melalui penanda khusus pada pesan awal) yang menerima balasan otomatis; "
            "percakapan lain diabaikan untuk mengurangi noise dan biaya API.",
            body,
        )
    )

    story.append(Paragraph("2. Cara kerja end-to-end", h1))
    for item in [
        "Pengunjung membuka halaman utama; konten landing diambil dari berkas HTML asli yang disisipkan di server.",
        "Tombol mengambang membuka tautan wa.me dengan teks awal yang memuat penanda [SRC:AJAREXPERT].",
        "Meta mengirim webhook POST ke /api/whatsapp/webhook saat pesan masuk.",
        "Backend mencatat kontak, memeriksa penanda atau status lead website di Supabase, membatasi frekuensi balasan, lalu memanggil OpenAI.",
        "Balasan teks dikirim melalui WhatsApp Cloud API (Graph API v21.0).",
    ]:
        story.append(Paragraph(item, bullet, bulletText="-"))

    story.append(Paragraph("3. Struktur direktori utama", h1))
    tree = """app/
  layout.tsx              Metadata, font, globals.css
  page.tsx                Landing (parse landing-page-original.html)
  api/whatsapp/webhook/   GET verifikasi Meta, POST pesan masuk
components/
  WhatsAppButton.tsx      Tombol mengambang + NEXT_PUBLIC_WA_LINK
lib/
  helpers.ts              Penanda, rate limit memori
  supabase.ts             Admin client, kontak, log pesan
  whatsapp.ts             Pengiriman teks ke Graph API
  ai.ts                   OpenAI chat completions
supabase/schema.sql       Skema Postgres (contacts, messages_log)
landing-page-original.html Sumber HTML/CSS/JS landing"""
    story.append(Paragraph(tree.replace("\n", "<br/>"), mono))

    story.append(Paragraph("4. Variabel lingkungan", h1))
    env_rows = [
        ["Variabel", "Keterangan"],
        ["OPENAI_API_KEY", "Kunci API OpenAI"],
        ["OPENAI_MODEL", "Model chat (default: gpt-4o-mini)"],
        ["WHATSAPP_TOKEN", "Token akses Meta WhatsApp Cloud API"],
        ["WHATSAPP_PHONE_NUMBER_ID", "ID nomor di Meta (bukan nomor telepon biasa)"],
        ["WHATSAPP_VERIFY_TOKEN", "Token verifikasi webhook (ditentukan sendiri)"],
        ["SUPABASE_URL", "URL proyek Supabase"],
        ["SUPABASE_SERVICE_ROLE_KEY", "Service role key (server only)"],
        ["NEXT_PUBLIC_WA_LINK", "Tautan wa.me untuk tombol di browser"],
    ]
    t = Table(env_rows, colWidths=[5.2 * cm, 11.3 * cm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1e293b")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 8),
                ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#cbd5e1")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f8fafc")]),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    story.append(t)
    story.append(Spacer(1, 0.4 * cm))

    story.append(Paragraph("5. Basis data Supabase", h1))
    story.append(
        Paragraph(
            "Tabel <b>contacts</b> menyimpan nomor telepon, sumber, flag is_website_lead, "
            "dan timestamp. Tabel <b>messages_log</b> menyimpan arah pesan (in/out), teks, "
            "dan provider_message_id. RLS diaktifkan; kebijakan mengizinkan akses penuh untuk "
            "service role yang dipakai di server.",
            body,
        )
    )

    story.append(Paragraph("6. Logika webhook dan kebijakan balasan", h1))
    story.append(Paragraph("GET: memverifikasi hub.mode, hub.verify_token, mengembalikan hub.challenge.", h2))
    story.append(
        Paragraph(
            "POST: mengabaikan update status; hanya pesan teks. Setiap pesan mencatat touchContact "
            "dan logMessage. Balasan jika: (a) teks mengandung penanda website, atau (b) kontak sudah "
            "is_website_lead. Rate limit: satu balasan per nomor dalam jendela 10 detik (penyimpanan memori). "
            "Pada error pemrosesan, respons HTTP 200 tetap dikembalikan agar Meta tidak melakukan retry berlebihan.",
            body,
        )
    )

    story.append(Paragraph("7. Integrasi AI (lib/ai.ts)", h1))
    story.append(
        Paragraph(
            "System prompt mendefinisikan persona Ajar Expert, area keahlian (Airline Systems, "
            "AI Automation, Website/MVP), bahasa Indonesia profesional, larangan mengarang harga "
            "atau janji spesifik, dan batas panjang respons. Pesan pertama dari lead website "
            "mendapat instruksi tambahan untuk menyambut dan mengklasifikasi kebutuhan.",
            body,
        )
    )

    story.append(Paragraph("8. Setup singkat", h1))
    story.append(Paragraph("Lokal: npm install, salin .env.example ke .env.local, jalankan skema SQL, npm run dev.", h2))
    story.append(
        Paragraph(
            "Meta: produk WhatsApp di aplikasi bisnis, token dan Phone Number ID, webhook HTTPS "
            "mengarah ke /api/whatsapp/webhook, subscribe messages, Verify Token sama dengan env.",
            body,
        )
    )
    story.append(
        Paragraph(
            "Vercel: impor repo, set semua variabel lingkungan, deploy, perbarui URL webhook di Meta.",
            body,
        )
    )

    story.append(PageBreak())
    story.append(Paragraph("9. Daftar verifikasi pengujian", h1))
    checks = [
        "Landing page tampil di localhost:3000",
        "Tombol WhatsApp terlihat dan membuka wa.me dengan teks prefilled",
        "GET webhook dengan parameter verifikasi Meta mengembalikan challenge",
        "POST webhook contoh mengembalikan 200",
        "Pesan dengan penanda memicu balasan AI dan pencatatan lead",
        "Pesan lanjutan dari lead yang sama tetap dibalas",
        "Pesan tanpa riwayat lead website diabaikan",
        "Pesan beruntun cepat hanya menghasilkan satu balasan per jendela rate limit",
    ]
    for c in checks:
        story.append(Paragraph(c, bullet, bulletText="\u2713"))

    story.append(Spacer(1, 0.6 * cm))
    story.append(
        Paragraph(
            "<i>Dokumen ini dihasilkan secara otomatis dari kode dan README repositori ajar-expert. "
            "Sesuaikan URL produksi dan kebijakan privasi sesuai deployment Anda.</i>",
            ParagraphStyle(
                name="Footnote",
                parent=styles["Normal"],
                fontSize=8,
                textColor=colors.HexColor("#64748b"),
                alignment=TA_CENTER,
            ),
        )
    )

    return story


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=2 * cm,
        rightMargin=2 * cm,
        topMargin=2 * cm,
        bottomMargin=2 * cm,
        title="Dokumentasi Ajar Expert",
        author="ajar-expert",
    )

    def on_page(canvas, doc_):
        canvas.saveState()
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(colors.HexColor("#94a3b8"))
        text = f"Halaman {doc_.page}"
        canvas.drawRightString(A4[0] - 2 * cm, 1.2 * cm, text)
        canvas.restoreState()

    doc.build(build_flowables(), onFirstPage=on_page, onLaterPages=on_page)
    print(f"Written: {OUT}")


if __name__ == "__main__":
    main()
