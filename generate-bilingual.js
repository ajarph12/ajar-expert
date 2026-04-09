const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'landing-page-original.html');
const idPath = path.join(__dirname, 'landing-page-id.html');
const enPath = path.join(__dirname, 'landing-page-en.html');

let html = fs.readFileSync(srcPath, 'utf-8');

// 1. Gen ID HTML: Add the EN switch
const navIdFind = `<li><a href="#layanan">Layanan</a></li>`;
const navIdReplace = `<li><a href="#layanan">Layanan</a></li>\n      <li><a href="/?lang=en" style="font-weight: 700; color: var(--accent); padding: 4px 8px; border: 1px solid var(--accent); border-radius: 4px; margin-left: 12px;">EN</a></li>`;
let idHtml = html.replace(navIdFind, navIdReplace);

// Indonesian-specific translations (fix English text that was already in the source)
const idTranslations = [
    // About section title (was written in English in original)
    [/TURNING BUSINESS PROCESS<br>EXPERIENCE INTO<br>AI-POWERED SOLUTIONS\./g,
     'MENGUBAH PENGALAMAN<br>PROSES BISNIS MENJADI<br>SOLUSI BERBASIS AI.'],

    // Service tier labels
    [/<div class="service-tier">Core Expertise<\/div>/g,
     '<div class="service-tier">Keahlian Utama</div>'],
    [/<div class="service-tier">Most Requested<\/div>/g,
     '<div class="service-tier">Paling Diminati</div>'],
    [/<div class="service-tier">Digital Delivery<\/div>/g,
     '<div class="service-tier">Pengiriman Digital</div>'],

    // Service card headings
    [/AIRLINE BUSINESS &amp; COMMERCIAL SYSTEMS/g, 'BISNIS &amp; SISTEM KOMERSIAL AIRLINE'],
    [/AIRLINE BUSINESS & COMMERCIAL SYSTEMS/g, 'BISNIS & SISTEM KOMERSIAL AIRLINE'],
    [/AI WORKFLOW &amp; AUTOMATION/g, 'AI WORKFLOW &amp; OTOMASI'],
    [/AI WORKFLOW & AUTOMATION/g, 'AI WORKFLOW & OTOMASI'],
    [/WEBSITE &amp; MVP DEVELOPMENT/g, 'PENGEMBANGAN WEBSITE &amp; MVP'],
    [/WEBSITE & MVP DEVELOPMENT/g, 'PENGEMBANGAN WEBSITE & MVP'],

    // Process steps
    [/<h3>PROPOSAL<\/h3>/g, '<h3>PENAWARAN</h3>'],
    [/<h3>DELIVERY<\/h3>/g, '<h3>PENYERAHAN</h3>'],

    // Service list items that may be in English
    [/Process Automation/g, 'Otomasi Proses'],
    [/AI Assistant/g, 'Asisten AI'],
    [/Document AI/g, 'Dokumen AI'],
    [/Workflow Optimization/g, 'Optimasi Alur Kerja'],
    [/System Integration/g, 'Integrasi Sistem'],
    [/Landing Page/g, 'Landing Page'],
    [/Company Profile/g, 'Profil Perusahaan'],
    [/MVP \/ Prototype/g, 'MVP / Prototipe'],
    [/Web Application/g, 'Aplikasi Web'],
    [/E-commerce/g, 'E-commerce'],
];

for (const [pattern, replacement] of idTranslations) {
    idHtml = idHtml.replace(pattern, replacement);
}

fs.writeFileSync(idPath, idHtml);

// 2. Gen EN HTML: Translate & Add ID switch
const navEnFind = navIdFind;
const navEnReplace = `<li><a href="#layanan">Services</a></li>\n      <li><a href="/" style="font-weight: 700; color: var(--accent); padding: 4px 8px; border: 1px solid var(--accent); border-radius: 4px; margin-left: 12px;">ID</a></li>`;

let enHtml = html.replace(navEnFind, navEnReplace);

// Dictionary array for EN translations
const translations = [
    [/<html lang="id">/g, '<html lang="en">'],
    [/<li><a href="#masalah">Masalah<\/a><\/li>/g, '<li><a href="#masalah">Challenges</a></li>'],
    [/<li><a href="#tentang">Tentang<\/a><\/li>/g, '<li><a href="#tentang">About</a></li>'],
    [/<li><a href="#portfolio">Portfolio<\/a><\/li>/g, '<li><a href="#portfolio">Portfolio</a></li>'],
    [/<li><a href="#kontak" class="nav-cta">Hubungi Saya<\/a><\/li>/g, '<li><a href="#kontak" class="nav-cta">Contact Me</a></li>'],

    // Hero Hero
    [/Available for Projects 2026/g, 'Available for Projects 2026'],
    [/LEBIH DARI 25 TAHUN/g, 'OVER 25 YEARS'],
    [/>MEMBANGUN SOLUSI</g, '>BUILDING TECHNOLOGY<'],
    [/>TEKNOLOGI<\/span> UNTUK<br>/g, '>SOLUTIONS</span> FOR<br>'],
    [/INDUSTRI YANG<br>/g, 'INDUSTRIES DEMANDING<br>'],
    [/MENUNTUT PRESISI./g, 'HIGH PRECISION.'],

    // Hero Subtitle
    [/Berbekal pengalaman lebih dari 25 tahun di industri airline, dengan fokus pada berbagai implementasi IT Commercial, saya menggabungkan keahlian industri, pemahaman proses bisnis, dan teknologi AI untuk membantu organisasi bertransformasi dengan lebih cepat dan terukur. Saya percaya bahwa kombinasi pengalaman praktis dan inovasi digital dapat menghasilkan solusi yang tidak hanya relevan secara strategis, tetapi juga berdampak nyata terhadap efisiensi, produktivitas, dan pertumbuhan bisnis./g, 'With over 25 years of experience in the airline industry, focusing on various IT Commercial implementations, I combine industry expertise, business process understanding, and AI technology to help organizations transform faster and more measurably. I believe that integrating practical experience with digital innovation produces solutions that are not only strategically relevant but also deliver real impact on efficiency, productivity, and business growth.'],

    [/Konsultasi Gratis →/g, 'Free Consultation →'],
    [/Lihat Portfolio/g, 'View Portfolio'],
    [/Tahun di Airline IT/g, 'Years in Airline IT'],
    
    // Problems
    [/Pain Points/g, 'Pain Points'],
    [/MEMAHAMI MASALAH, MERANCANG SOLUSI/g, 'UNDERSTANDING PROBLEMS, DESIGNING SOLUTIONS'],
    [/Berada di dalam industri ini selama lebih dari 25 tahun memungkinkan saya memahami kompleksitas permasalahan dari akarnya, lalu menerjemahkannya menjadi solusi yang lebih terarah, efisien, dan berdampak./g, 'Working in this industry for over 25 years has empowered me to understand the root complexity of challenges and translate them into solutions that are more targeted, efficient, and impactful.'],

    [/PROSES MANUAL &amp; LEGACY SYSTEM/g, 'MANUAL PROCESSES &amp; LEGACY SYSTEMS'],
    [/PROSES MANUAL & LEGACY SYSTEM/g, 'MANUAL PROCESSES & LEGACY SYSTEMS'],
    [/Bisnis Anda masih bergantung pada spreadsheet, email bolak-balik, dan sistem lama yang lambat\? Saatnya otomasi dengan AI-powered workflow./g, 'Does your business still rely on spreadsheets, endless emails, and slow legacy systems? It\'s time to automate with an AI-powered workflow.'],

    [/KOMPLEKSITAS AIRLINE IT/g, 'AIRLINE IT COMPLEXITY'],
    [/Integrasi PSS, GDS, ATPCO fare rules, dan IATA messaging butuh expertise mendalam. Tidak cukup hanya "bisa coding" — butuh yang paham industrinya./g, 'Integrating PSS, GDS, ATPCO fare rules, and IATA messaging requires deep expertise. Just "knowing how to code" isn\'t enough — it requires an industry veteran.'],

    [/BIAYA KONSULTAN MAHAL/g, 'HIGH CONSULTING COSTS'],
    [/Konsultan besar charge ratusan juta tapi hasilnya generic. Saya bekerja langsung, lean, dan AI-assisted — hasilnya cepat, biaya efisien./g, 'Large consultancies charge exorbitant fees for generic results. I work directly, utilizing a lean and AI-assisted approach — delivering fast results with high cost-efficiency.'],

    // About
    [/Tentang Saya/g, 'About Me'],
    [/TURNING BUSINESS PROCESS<br>EXPERIENCE INTO<br>AI-POWERED SOLUTIONS./g, 'TURNING BUSINESS PROCESS<br>EXPERIENCE INTO<br>AI-POWERED SOLUTIONS.'], // Keep same
    [/25\+ TAHUN/g, '25+ YEARS'],
    [/Kini saya menggabungkan pengalaman industri yang mendalam dengan <strong>AI dan automation<\/strong> untuk membantu bisnis — baik maskapai penerbangan maupun usaha lain — bekerja lebih cepat, lebih akurat, dan lebih efisien./g, 'Today, I integrate profound industry experience with <strong>AI and automation</strong> to help businesses — airlines and other enterprises alike — operate faster, more accurately, and more efficiently.'],
    [/Berbekal pengalaman lebih dari 25 tahun di industri airline, saya memiliki keahlian mendalam dalam business process serta implementasi berbagai sistem IT strategis, mulai dari <strong>Cargo Management System<\/strong>, <strong>Pricing System<\/strong>, <strong>Revenue Management System<\/strong>, hingga <strong>Passenger Service Solution \(PSS\)<\/strong>. Pengalaman ini membentuk kemampuan saya untuk menjembatani kebutuhan bisnis dan teknologi menjadi solusi yang relevan, terukur, dan bernilai nyata./g, 'Drawing from over 25 years of aviation experience, I possess deep expertise in business processes and the implementation of various strategic IT systems, from <strong>Cargo Management Systems</strong>, <strong>Pricing Systems</strong>, <strong>Revenue Management Systems</strong>, down to <strong>Passenger Service Solutions (PSS)</strong>. This foundational experience shapes my ability to bridge business requirements and technology into solutions that are relevant, measurable, and highly valuable.'],
    [/Saya juga mengelola usaha peternakan, karena bagi saya <strong>teknologi yang baik adalah teknologi yang mampu mempermudah operasional, meningkatkan efisiensi, dan membawa manfaat nyata<\/strong> bagi berbagai jenis usaha./g, 'I also manage a livestock business, because to me, <strong>good technology is technology that simplifies operations, increases efficiency, and brings tangible benefits</strong> across various types of enterprises.'],

    // Portfolio
    [/DIBANGUN DENGAN AI-ASSISTED DEVELOPMENT/g, 'BUILT WITH AI-ASSISTED DEVELOPMENT'],
    [/Mini PSS dengan ATPCO Fare Manager \(CAT01–35\) dan Booking Simulator. MVP yang dibangun sepenuhnya dengan AI-assisted vibe coding./g, 'Mini PSS system featuring an ATPCO Fare Manager (CAT01-35) and a Booking Simulator. An MVP fully built through AI-assisted vibe coding.'],
    [/Mendukung Konversi IATA Standard Schedule System \(SSIM, SSM &amp; ASM\)/g, 'Supporting IATA Standard Schedule System Data Conversions (SSIM, SSM &amp; ASM)'],
    [/Mendukung Konversi IATA Standard Schedule System \(SSIM, SSM & ASM\)/g, 'Supporting IATA Standard Schedule System Data Conversions (SSIM, SSM & ASM)'],
    [/Berbagai website yang dirancang dan dibangun untuk klien — dari landing page bisnis hingga web application. WordPress &amp; custom code./g, 'Various websites designed and built for clients — ranging from business landing pages to web applications. Engineered using WordPress &amp; custom code.'],
    [/Berbagai website yang dirancang dan dibangun untuk klien — dari landing page bisnis hingga web application. WordPress & custom code./g, 'Various websites designed and built for clients — ranging from business landing pages to web applications. Engineered using WordPress & custom code.'],

    // Services
    [/Layanan Saya/g, 'My Services'],
    [/KEAHLIAN YANG MENGGERAKKAN TRANSFORMASI/g, 'EXPERTISE THAT DRIVES TRANSFORMATION'],
    [/Layanan/g, 'Services'],
    [/AREA KEAHLIAN &amp; EKSEKUSI/g, 'AREAS OF EXPERTISE &amp; EXECUTION'],
    [/AREA KEAHLIAN & EKSEKUSI/g, 'AREAS OF EXPERTISE & EXECUTION'],
    [/Pengalaman dalam business process airline dan implementasi sistem commercial yang krusial bagi operasional dan pertumbuhan bisnis./g, 'Aviation business processes expertise and the implementation of commercial systems critical to operational vitality and business growth.'],
    [/Mengubah proses manual menjadi alur kerja yang lebih cepat, efisien, dan siap berkembang dengan dukungan AI./g, 'Transforming manual processes into faster, more efficient, and scalable workflows utilizing advanced AI integration.'],
    [/Membangun website dan MVP yang tidak hanya tampil baik, tetapi juga mendukung tujuan bisnis secara nyata./g, 'Engineering websites and MVPs that not only look exceptional but tangibly support core business objectives.'],

    // Process section
    [/Cara Kerja/g, 'How It Works'],
    [/4 LANGKAH MENUJU SOLUSI/g, '4 STEPS TO YOUR SOLUTION'],
    [/Siap Berkolaborasi\?/g, 'Ready to Collaborate?'],
    [/MARI DISKUSIKAN IDE ANDA/g, 'LET\'S DISCUSS YOUR IDEAS'],
    [/KONSULTASI/g, 'CONSULTATION'],
    [/30 menit gratis. Ceritakan kebutuhan Anda, saya analisa solusi terbaik./g, '30-minute free session. Detail your requirements, and I will analyze the most optimal solution.'],
    [/PROPOSAL/g, 'PROPOSAL'],
    [/Scope, timeline, dan biaya yang transparan. Tanpa biaya tersembunyi./g, 'Transparent scope, timeline, and pricing. Absolutely no hidden fees.'],
    [/EKSEKUSI/g, 'EXECUTION'],
    [/Saya kerjakan dengan AI-powered workflow. Cepat, akurat, dan efisien./g, 'I construct everything using an AI-powered pipeline. Fast, accurate, and efficient.'],
    [/DELIVERY/g, 'DELIVERY'],
    [/Serah terima lengkap dengan dokumentasi dan support pasca-project./g, 'Complete handover including clear documentation and post-project support.'],

    // CTA
    [/SIAP MEMPERCEPAT<br>TRANSFORMASI<br>BISNIS ANDA\?/g, 'READY TO ACCELERATE<br>YOUR BUSINESS<br>TRANSFORMATION?'],
    [/Butuh solusi yang selaras dengan proses bisnis Anda\? Mari bangun sistem yang tepat, efisien, dan siap berkembang./g, 'Need a solution harmonized with your business workflows? Let\'s build the exact system you need; efficient and scalable.'],
    [/Mulai dengan sesi konsultasi awal untuk membahas kebutuhan, proses, dan solusi yang paling relevan bagi bisnis Anda./g, 'Begin with an initial consultation session to discuss your business needs, processes, and the most relevant solutions.'],
    [/Jadwalkan Konsultasi →/g, 'Schedule Consideration →'], // better translation -> Schedule Consultation
    [/Kirim Email/g, 'Send Email'],
    [/Schedule Consideration/g, 'Schedule Consultation'],
    
    [/Kontak/g, 'Contact']
];

for (const [pattern, replacement] of translations) {
    enHtml = enHtml.replace(pattern, replacement);
}

fs.writeFileSync(enPath, enHtml);
console.log('Successfully generated landing-page-id.html and landing-page-en.html');
