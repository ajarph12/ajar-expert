import { ChatWidget } from "@/components/chat-widget";
import {
  aboutTags,
  chatbotFeatures,
  navLinks,
  painPoints,
  portfolioItems,
  processSteps,
  sampleTranscript,
  serviceCards,
  stats,
} from "@/lib/site-data";

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand-mark" href="#hero">
            <span className="brand-dot" />
            ajar.expert
          </a>

          <nav className="top-nav" aria-label="Primary">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <a className="button button-primary button-compact" href="#kontak">
            Konsultasi
          </a>
        </div>
      </header>

      <main>
        <section className="hero-section" id="hero">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                Available for 2026 builds
              </div>

              <h1 className="hero-title">
                LEBIH DARI 25 TAHUN
                <br />
                MEMBANGUN SOLUSI
                <br />
                <span>CUSTOM AI CHATBOT</span>
                <br />
                YANG SEPENUHNYA
                <br />
                MILIK ANDA.
              </h1>

              <p className="hero-description">
                Saya menggabungkan pengalaman airline IT, pemahaman proses
                bisnis, dan delivery modern berbasis AI untuk membangun chatbot
                custom langsung di Next.js Anda. Hasilnya fleksibel, cepat
                dikembangkan, mampu menjawab pertanyaan CS, dan siap
                mengumpulkan lead tanpa biaya SaaS chatbot pihak ketiga.
              </p>

              <div className="button-row">
                <a className="button button-primary" href="#chatbot-playbook">
                  Lihat Playbook Chatbot
                </a>
                <a className="button button-secondary" href="#portfolio">
                  Lihat Portfolio
                </a>
              </div>

              <div className="hero-note">
                Tes widget live di kanan bawah. Pengetahuan produk, prompt, dan
                source code tetap ada di repo Anda.
              </div>

              <div className="stats-grid">
                {stats.map((stat) => (
                  <article key={stat.label} className="stat-card">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                    <p className="stat-detail">{stat.detail}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="hero-stack">
              <article className="glass-card spotlight-card">
                <div className="card-tag">Custom AI Chatbot</div>
                <h2>Widget chat, lead capture, dan jawaban CS dalam satu flow.</h2>
                <p>
                  Dibangun dengan Next.js + Vercel AI SDK, lalu bisa diarahkan
                  ke OpenAI atau Claude hanya dengan ganti environment
                  variable.
                </p>
                <ul className="check-list">
                  <li>Knowledge base produk dan layanan bisa Anda edit sendiri.</li>
                  <li>Lead dapat diteruskan ke webhook, CRM, atau workflow Anda.</li>
                  <li>UI, prompt, dan rules sepenuhnya bisa disesuaikan.</li>
                </ul>
              </article>

              <article className="glass-card transcript-card">
                <div className="card-tag muted-tag">Preview Percakapan</div>
                <div className="sample-thread">
                  {sampleTranscript.map((message) => (
                    <div
                      key={`${message.role}-${message.text}`}
                      className={`sample-bubble ${
                        message.role === "Assistant"
                          ? "sample-bubble-assistant"
                          : "sample-bubble-user"
                      }`}
                    >
                      <span>{message.role}</span>
                      <p>{message.text}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-muted" id="masalah">
          <div className="shell">
            <div className="section-eyebrow">Pain Points</div>
            <h2 className="section-title">
              MEMAHAMI MASALAH,
              <br />
              MERANCANG SOLUSI.
            </h2>
            <p className="section-intro">
              Berada di industri ini selama lebih dari dua dekade membuat saya
              terbiasa membaca akar masalah, bukan hanya gejalanya. Itu yang
              membuat solusi AI, web, dan integrasi sistem jadi lebih terarah.
            </p>

            <div className="card-grid three-up">
              {painPoints.map((item) => (
                <article key={item.title} className="feature-card">
                  <div className="feature-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="chatbot-playbook">
          <div className="shell">
            <div className="section-eyebrow">Playbook</div>
            <h2 className="section-title">
              CUSTOM AI CHATBOT
              <br />
              PALING FLEKSIBEL
            </h2>
            <p className="section-intro">
              Cocok untuk website company profile, landing page campaign, atau
              portal internal yang butuh jawaban cepat, alur lead capture, dan
              integrasi lanjutan.
            </p>

            <div className="card-grid four-up">
              {chatbotFeatures.map((feature) => (
                <article key={feature.title} className="feature-card">
                  <div className="feature-kicker">{feature.kicker}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>

            <div className="ownership-panel">
              <div>
                <div className="card-tag">Yang Anda Pegang</div>
                <h3>Tanpa vendor lock-in dan tanpa biaya tools chatbot pihak ketiga.</h3>
              </div>
              <ul className="check-list compact-list">
                <li>Source code Next.js dan komponen widget.</li>
                <li>Prompt sistem dan knowledge base lokal di repo.</li>
                <li>Pilihan provider OpenAI atau Anthropic lewat env.</li>
                <li>Webhook lead capture opsional untuk CRM atau WhatsApp flow.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section section-muted" id="layanan">
          <div className="shell">
            <div className="section-eyebrow">Layanan</div>
            <h2 className="section-title">
              KEAHLIAN YANG
              <br />
              MENGGERAKKAN TRANSFORMASI
            </h2>

            <div className="card-grid two-by-two">
              {serviceCards.map((service) => (
                <article
                  key={service.title}
                  className={`service-card ${service.emphasis ? "service-card-emphasis" : ""}`}
                >
                  <div className="service-tier">{service.tier}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="service-list">
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="portfolio">
          <div className="shell">
            <div className="section-eyebrow">Portfolio</div>
            <h2 className="section-title">
              MVP DAN SOLUSI
              <br />
              YANG SUDAH DIBANGUN
            </h2>

            <div className="card-grid three-up">
              {portfolioItems.map((item) => (
                <article key={item.title} className="portfolio-card">
                  <div className="portfolio-top">
                    <div className="portfolio-badges">
                      {item.badges.map((badge) => (
                        <span key={badge}>{badge}</span>
                      ))}
                    </div>
                    <div className="portfolio-mark">{item.mark}</div>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="tech-stack">{item.stack}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-muted" id="tentang">
          <div className="shell about-grid">
            <div className="about-panel">
              <div className="section-eyebrow">Tentang Saya</div>
              <h2 className="section-title">
                AIRLINE IT VETERAN,
                <br />
                AI-FIRST BUILDER.
              </h2>
              <p className="about-copy">
                Berbekal pengalaman lebih dari 25 tahun di industri airline,
                saya terbiasa menangani business process dan implementasi sistem
                strategis seperti cargo, pricing, revenue management, dan PSS.
                Pengalaman ini membentuk cara kerja yang selalu berangkat dari
                realitas operasional.
              </p>
              <p className="about-copy">
                Kini saya menggabungkan pengalaman tersebut dengan AI dan
                automation untuk membantu bisnis bekerja lebih cepat, lebih
                akurat, dan lebih efisien, tanpa kehilangan konteks bisnis yang
                sesungguhnya.
              </p>
            </div>

            <div className="about-panel about-panel-accent">
              <div className="quote-card">
                <div className="quote-mark">25+</div>
                <p>
                  Teknologi yang baik bukan cuma terlihat modern, tetapi juga
                  memang membantu operasional, efisiensi, dan pertumbuhan
                  bisnis.
                </p>
              </div>

              <div className="tag-cloud">
                {aboutTags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="proses">
          <div className="shell">
            <div className="section-eyebrow">Cara Kerja</div>
            <h2 className="section-title">
              EMPAT LANGKAH
              <br />
              MENUJU SOLUSI
            </h2>

            <div className="process-grid">
              {processSteps.map((step, index) => (
                <article key={step.title} className="process-card">
                  <div className="process-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-cta" id="kontak">
          <div className="shell">
            <div className="cta-card">
              <div>
                <div className="section-eyebrow">Mulai Dari Sini</div>
                <h2 className="section-title">
                  SIAP MEMPERCEPAT
                  <br />
                  TRANSFORMASI BISNIS ANDA?
                </h2>
                <p className="section-intro">
                  Kita bisa mulai dari audit singkat kebutuhan, lalu turunkan
                  menjadi scope implementasi: chatbot, workflow, website, atau
                  kombinasi yang paling relevan.
                </p>
              </div>
              <div className="button-row">
                <a className="button button-primary" href="#hero">
                  Kembali ke Atas
                </a>
                <a className="button button-secondary" href="#chatbot-playbook">
                  Lihat Detail Chatbot
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <div>
            <div className="brand-mark">
              <span className="brand-dot" />
              ajar.expert
            </div>
            <p className="footer-copy">
              Airline IT, workflow automation, dan custom AI chatbot untuk
              bisnis yang butuh presisi.
            </p>
          </div>

          <div className="footer-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="footer-copy">© {year} ajar.expert</div>
        </div>
      </footer>

      <ChatWidget />
    </>
  );
}
