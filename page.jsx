import React, { useState, useEffect } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=DM+Mono:wght@300;400;500&family=Figtree:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --orange: #FF6B00;
    --orange-light: #FF8C33;
    --orange-dim: rgba(255,107,0,0.08);
    --forest: #0f3d33;
    --forest-light: #1a5c47;
    --white: #FAFAF8;
    --off-white: #F4F3EF;
    --slate: #6B7280;
    --ink: #111110;
    --ink-soft: #2D2D2B;
    --border: #E5E4DF;
    --font-display: 'Cormorant Garamond', Georgia, serif;
    --font-mono: 'DM Mono', monospace;
    --font-body: 'Figtree', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--font-body);
    background: var(--white);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
  }

  .brochure { width: 100%; overflow-x: hidden; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; height: 64px;
    background: rgba(250,250,248,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: var(--font-mono);
    font-size: 13px; font-weight: 500;
    color: var(--ink); letter-spacing: 0.02em;
  }
  .nav-logo span { color: var(--orange); }
  .nav-links { display: flex; gap: 32px; }
  .nav-links a {
    font-size: 13px; font-weight: 500; color: var(--slate);
    text-decoration: none; letter-spacing: 0.02em;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--ink); }
  .nav-cta {
    background: var(--orange); color: #fff;
    border: none; padding: 10px 20px;
    font-family: var(--font-body); font-size: 13px; font-weight: 600;
    cursor: pointer; letter-spacing: 0.02em;
    transition: background 0.2s;
  }
  .nav-cta:hover { background: var(--orange-light); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: center;
    padding: 120px 48px 80px;
    position: relative; overflow: hidden;
    background: var(--white);
  }
  .hero-grid-bg {
    position: absolute; inset: 0; opacity: 0.035;
    background-image:
      linear-gradient(var(--ink) 1px, transparent 1px),
      linear-gradient(90deg, var(--ink) 1px, transparent 1px);
    background-size: 64px 64px;
    pointer-events: none;
  }
  .hero-accent-line {
    position: absolute; top: 0; left: 48px;
    width: 2px; height: 100%;
    background: linear-gradient(to bottom, transparent, var(--orange) 30%, var(--orange) 70%, transparent);
    opacity: 0.3;
  }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--font-mono); font-size: 11px; font-weight: 400;
    color: var(--orange); letter-spacing: 0.1em; text-transform: uppercase;
    margin-bottom: 32px;
  }
  .hero-tag-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--orange);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }
  .hero-headline {
    font-family: var(--font-display);
    font-size: clamp(52px, 7vw, 96px);
    font-weight: 300; line-height: 1.0;
    color: var(--ink); max-width: 820px;
    letter-spacing: -0.02em;
    margin-bottom: 12px;
  }
  .hero-headline em {
    font-style: italic; color: var(--orange);
  }
  .hero-headline .forest-word {
    color: var(--forest);
  }
  .hero-sub {
    font-size: 17px; font-weight: 300; color: var(--slate);
    max-width: 520px; line-height: 1.65;
    margin-bottom: 48px;
  }
  .hero-actions { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
  .btn-primary {
    background: var(--forest); color: #fff;
    border: none; padding: 16px 32px;
    font-family: var(--font-body); font-size: 14px; font-weight: 600;
    cursor: pointer; letter-spacing: 0.02em;
    transition: all 0.2s;
  }
  .btn-primary:hover { background: var(--forest-light); transform: translateY(-1px); }
  .btn-secondary {
    background: transparent; color: var(--ink);
    border: 1px solid var(--border); padding: 15px 32px;
    font-family: var(--font-body); font-size: 14px; font-weight: 500;
    cursor: pointer; letter-spacing: 0.02em;
    transition: all 0.2s;
  }
  .btn-secondary:hover { border-color: var(--ink); }
  .hero-stats {
    display: flex; gap: 48px; margin-top: 72px;
    padding-top: 40px; border-top: 1px solid var(--border);
  }
  .hero-stat-num {
    font-family: var(--font-display);
    font-size: 40px; font-weight: 600; color: var(--ink);
    line-height: 1;
  }
  .hero-stat-num span { color: var(--orange); }
  .hero-stat-label {
    font-size: 12px; font-weight: 400; color: var(--slate);
    margin-top: 6px; letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  /* SECTION BASE */
  .section {
    padding: 96px 48px;
    border-top: 1px solid var(--border);
  }
  .section-alt { background: var(--off-white); }
  .section-forest { background: var(--forest); }

  .section-label {
    font-family: var(--font-mono); font-size: 11px;
    color: var(--orange); letter-spacing: 0.12em;
    text-transform: uppercase; margin-bottom: 16px;
  }
  .section-label-light { color: rgba(255,107,0,0.8); }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 400; line-height: 1.1;
    color: var(--ink); letter-spacing: -0.01em;
    margin-bottom: 16px;
  }
  .section-title-light { color: var(--white); }
  .section-desc {
    font-size: 16px; color: var(--slate);
    line-height: 1.65; max-width: 560px;
    margin-bottom: 56px;
  }
  .section-desc-light { color: rgba(250,250,248,0.65); }

  /* SERVICES GRID */
  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }
  .service-card {
    background: var(--white);
    padding: 32px 28px;
    transition: background 0.2s;
    position: relative; overflow: hidden;
  }
  .service-card:hover { background: var(--orange-dim); }
  .service-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 2px; background: var(--orange);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s;
  }
  .service-card:hover::before { transform: scaleX(1); }
  .service-icon {
    font-size: 22px; margin-bottom: 14px;
    display: block;
  }
  .service-letter {
    font-family: var(--font-mono); font-size: 10px;
    color: var(--orange); letter-spacing: 0.08em;
    text-transform: uppercase; margin-bottom: 10px;
    display: block;
  }
  .service-name {
    font-size: 15px; font-weight: 600; color: var(--ink);
    margin-bottom: 8px; line-height: 1.3;
  }
  .service-desc {
    font-size: 13px; color: var(--slate);
    line-height: 1.6;
  }

  /* TIMELINE */
  .timeline { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; position: relative; }
  .timeline::before {
    content: '';
    position: absolute; top: 28px; left: calc(100%/6); right: calc(100%/6);
    height: 1px; background: var(--orange); opacity: 0.3; z-index: 0;
  }
  .timeline-step { padding: 0 32px; position: relative; z-index: 1; }
  .timeline-step:first-child { padding-left: 0; }
  .timeline-step:last-child { padding-right: 0; }
  .timeline-dot {
    width: 56px; height: 56px;
    background: var(--white); border: 2px solid var(--orange);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 24px;
    font-family: var(--font-mono); font-size: 11px;
    color: var(--orange); font-weight: 500;
    letter-spacing: 0.04em;
  }
  .timeline-days {
    font-family: var(--font-mono); font-size: 11px;
    color: var(--orange); letter-spacing: 0.08em;
    margin-bottom: 8px; text-transform: uppercase;
  }
  .timeline-phase {
    font-size: 18px; font-weight: 600; color: var(--ink);
    margin-bottom: 12px;
  }
  .timeline-items { list-style: none; }
  .timeline-items li {
    font-size: 13px; color: var(--slate);
    padding: 4px 0; display: flex; align-items: flex-start; gap: 8px;
    line-height: 1.5;
  }
  .timeline-items li::before {
    content: '—'; color: var(--orange);
    flex-shrink: 0; font-family: var(--font-mono);
    font-size: 11px; margin-top: 2px;
  }
  .timeline-deliverable {
    margin-top: 24px; padding: 16px;
    background: var(--orange-dim); border-left: 2px solid var(--orange);
  }
  .timeline-deliverable-title {
    font-size: 11px; font-weight: 600; color: var(--orange);
    text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;
    font-family: var(--font-mono);
  }
  .timeline-deliverable li {
    font-size: 12px; color: var(--ink-soft);
    padding: 2px 0; display: flex; gap: 8px;
  }
  .timeline-deliverable li::before { content: '✓'; color: var(--orange); flex-shrink: 0; }

  /* COMPARISON TABLE */
  .compare-table { width: 100%; border-collapse: collapse; }
  .compare-table th {
    padding: 16px 24px; text-align: left;
    font-size: 13px; font-weight: 600;
    letter-spacing: 0.04em; text-transform: uppercase;
    font-family: var(--font-mono);
  }
  .compare-table th:first-child { color: var(--slate); width: 30%; }
  .compare-table th:nth-child(2) {
    background: var(--forest); color: var(--white);
    text-align: center;
  }
  .compare-table th:nth-child(2) span { color: var(--orange-light); }
  .compare-table th:last-child {
    background: var(--off-white); color: var(--slate);
    text-align: center;
  }
  .compare-table td {
    padding: 18px 24px;
    border-bottom: 1px solid var(--border);
    font-size: 14px; vertical-align: middle;
  }
  .compare-table td:first-child { color: var(--slate); font-weight: 500; }
  .compare-table td:nth-child(2) {
    background: rgba(15,61,51,0.04);
    text-align: center; color: var(--forest);
    font-weight: 600;
  }
  .compare-table td:last-child { text-align: center; color: var(--slate); }
  .compare-table tr:hover td { background: var(--orange-dim); }
  .compare-table tr:hover td:nth-child(2) { background: rgba(15,61,51,0.08); }

  /* TECH STACK */
  .tech-categories { display: flex; flex-direction: column; gap: 32px; }
  .tech-category-label {
    font-family: var(--font-mono); font-size: 10px;
    color: rgba(250,250,248,0.4); letter-spacing: 0.12em;
    text-transform: uppercase; margin-bottom: 12px;
  }
  .tech-pills { display: flex; flex-wrap: wrap; gap: 8px; }
  .tech-pill {
    padding: 8px 16px;
    border: 1px solid rgba(250,250,248,0.12);
    font-size: 13px; font-weight: 400;
    color: rgba(250,250,248,0.8);
    letter-spacing: 0.02em;
    transition: all 0.2s;
    cursor: default;
  }
  .tech-pill:hover {
    border-color: var(--orange);
    color: var(--orange);
    background: rgba(255,107,0,0.06);
  }

  /* ENGAGEMENT MODELS */
  .engage-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .engage-card {
    padding: 36px 28px;
    border: 1px solid var(--border);
    background: var(--white);
    position: relative; transition: all 0.2s;
  }
  .engage-card:hover { border-color: var(--orange); transform: translateY(-2px); }
  .engage-card.featured {
    border-color: var(--forest);
    background: var(--forest);
  }
  .engage-card.featured:hover { border-color: var(--orange); }
  .engage-badge {
    position: absolute; top: -1px; right: 24px;
    background: var(--orange); color: #fff;
    font-family: var(--font-mono); font-size: 10px;
    font-weight: 500; letter-spacing: 0.08em;
    text-transform: uppercase; padding: 4px 12px;
  }
  .engage-tier {
    font-family: var(--font-mono); font-size: 10px;
    color: var(--orange); letter-spacing: 0.1em;
    text-transform: uppercase; margin-bottom: 12px;
  }
  .engage-name {
    font-family: var(--font-display);
    font-size: 26px; font-weight: 600;
    color: var(--ink); margin-bottom: 8px;
  }
  .engage-card.featured .engage-name { color: var(--white); }
  .engage-tagline {
    font-size: 13px; color: var(--slate);
    margin-bottom: 24px; line-height: 1.5;
  }
  .engage-card.featured .engage-tagline { color: rgba(250,250,248,0.6); }
  .engage-includes {
    list-style: none; display: flex; flex-direction: column; gap: 8px;
  }
  .engage-includes li {
    font-size: 13px; color: var(--ink-soft);
    display: flex; gap: 10px; align-items: flex-start;
  }
  .engage-card.featured .engage-includes li { color: rgba(250,250,248,0.75); }
  .engage-includes li::before {
    content: '→'; color: var(--orange);
    font-family: var(--font-mono); font-size: 12px;
    flex-shrink: 0; margin-top: 1px;
  }

  /* CTA */
  .cta-section {
    padding: 96px 48px; text-align: center;
    background: var(--white);
    border-top: 1px solid var(--border);
    position: relative; overflow: hidden;
  }
  .cta-section::before {
    content: '';
    position: absolute; top: -100px; left: 50%;
    transform: translateX(-50%);
    width: 600px; height: 300px;
    background: radial-gradient(ellipse, rgba(255,107,0,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-headline {
    font-family: var(--font-display);
    font-size: clamp(36px, 5vw, 64px);
    font-weight: 300; line-height: 1.1;
    color: var(--ink); margin-bottom: 20px;
    letter-spacing: -0.02em;
  }
  .cta-headline em { font-style: italic; color: var(--orange); }
  .cta-sub {
    font-size: 16px; color: var(--slate);
    margin-bottom: 40px; line-height: 1.6;
  }
  .cta-actions { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }
  .cta-url {
    font-family: var(--font-mono); font-size: 13px;
    color: var(--slate); margin-top: 32px;
    letter-spacing: 0.04em;
  }
  .cta-url span { color: var(--orange); }

  /* FOOTER */
  .footer {
    padding: 32px 48px;
    border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    background: var(--off-white);
  }
  .footer-logo {
    font-family: var(--font-mono); font-size: 12px;
    color: var(--slate); letter-spacing: 0.04em;
  }
  .footer-logo span { color: var(--orange); }
  .footer-tagline {
    font-size: 12px; color: var(--slate);
    font-style: italic;
  }

  /* ANIMATIONS */
  .fade-in {
    opacity: 0; transform: translateY(20px);
    animation: fadeUp 0.6s ease forwards;
  }
  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }
  .delay-3 { animation-delay: 0.3s; }
  .delay-4 { animation-delay: 0.4s; }
  .delay-5 { animation-delay: 0.5s; }

  @media (max-width: 768px) {
    .nav { padding: 0 24px; }
    .nav-links { display: none; }
    .hero { padding: 100px 24px 60px; }
    .hero-stats { gap: 32px; flex-wrap: wrap; }
    .section { padding: 64px 24px; }
    .services-grid { grid-template-columns: 1fr; }
    .timeline { grid-template-columns: 1fr; gap: 40px; }
    .timeline::before { display: none; }
    .engage-grid { grid-template-columns: 1fr; }
    .footer { flex-direction: column; gap: 12px; text-align: center; }
    .cta-section { padding: 64px 24px; }
  }
`;

const services = [
  { id: "A", icon: "⚙️", name: "Autonomous AI Agents", desc: "Multi-step business workflows handled by agents that plan, execute, and integrate with your APIs." },
  { id: "B", icon: "💬", name: "RAG Chatbots", desc: "Context-enriched knowledge bases delivering accurate, cited answers across documents and internal data." },
  { id: "C", icon: "🗄️", name: "Enterprise Text-to-SQL", desc: "Natural language interfaces for complex data warehouses with 1,000+ tables. Boardroom-ready answers instantly." },
  { id: "D", icon: "🎙️", name: "Voice Agents", desc: "Low-latency voice agents deployable across phone, web, and IoT. Complex tasks, safely executed." },
  { id: "E", icon: "📄", name: "Vision Document Extraction", desc: "Automated pipelines for invoices, forms, and certificates. 93%+ accuracy on legacy extraction pipelines." },
  { id: "F", icon: "🔬", name: "Deep Research Agent", desc: "Synthesise insights across documents, webpages, and internal data to accelerate R&D and competitive analysis." },
  { id: "G", icon: "🗂️", name: "Document Classification", desc: "High-accuracy classification at production scale — even across complex, high-label-count taxonomies." },
  { id: "H", icon: "🧠", name: "Persistent Memory Layer", desc: "Agents with long-term memory for truly personalised, context-aware interactions that improve over time." },
  { id: "I", icon: "🔗", name: "Multi-System Integration", desc: "Connect AI workflows with your existing CRM, ERP, and internal databases via custom APIs." },
];

const techStack = [
  { label: "AI Models", items: ["OpenAI", "Anthropic Claude", "Google Gemini", "Meta Llama"] },
  { label: "AI Infrastructure", items: ["LangChain", "LlamaIndex", "Pinecone", "Hugging Face"] },
  { label: "Speed & Inference", items: ["Groq", "Together AI", "Replicate"] },
  { label: "Enterprise Cloud", items: ["AWS", "Azure", "GCP", "Docker"] },
  { label: "Web & Engineering", items: ["Next.js", "TypeScript", "Python", "Supabase", "Tailwind"] },
];

const compareRows = [
  { metric: "Time to Start", p2p: "Immediate", hire: "2–4 Months" },
  { metric: "Initial Cost", p2p: "Fixed POC Fee", hire: "Salary + Recruitment" },
  { metric: "Risk Level", p2p: "Low (Outcome-based)", hire: "High (Commitment)" },
  { metric: "AI Expertise", p2p: "Senior AI Team", hire: "Variable" },
  { metric: "Speed to POC", p2p: "14 Days", hire: "Full ramp-up cycle" },
];

const engageModels = [
  {
    tier: "Entry",
    name: "14-Day POC",
    tagline: "Validate & Build",
    includes: ["Discovery & scoping", "Rapid development", "AI integration", "Full code handover"],
    featured: false,
  },
  {
    tier: "Most Popular",
    name: "Partner",
    tagline: "Scale & Grow",
    includes: ["Dedicated engineering team", "Weekly sprint cycles", "Priority support", "Public impact reporting"],
    featured: true,
  },
  {
    tier: "Enterprise",
    name: "Transform",
    tagline: "Bespoke Architecture",
    includes: ["Custom architecture design", "VPC deployments", "Compliance & security", "24/7 SLA-backed delivery"],
    featured: false,
  },
];

export default function P2PAIBrochure() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://fonts.googleapis.com";
    document.head.appendChild(link);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => {
      document.head.removeChild(style);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="brochure">
      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">prompt2prod<span>AI</span>.com</div>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#poc">14-Day POC</a>
          <a href="#why-us">Why Us</a>
          <a href="#stack">Stack</a>
          <a href="#engage">Engage</a>
        </div>
        <button className="nav-cta">Start your POC →</button>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-grid-bg" />
        <div className="hero-accent-line" />

        <div className="hero-tag fade-in">
          <div className="hero-tag-dot" />
          AI-First Product Studio · UAE
        </div>

        <h1 className="hero-headline fade-in delay-1">
          Stop Waiting.<br />
          Start <em>Shipping AI</em><br />
          in <span className="forest-word">14 Days.</span>
        </h1>

        <p className="hero-sub fade-in delay-2">
          We engineer production-ready AI systems tailored to your business — not generic packages. Fixed scope. Fixed cost. Code you own.
        </p>

        <div className="hero-actions fade-in delay-3">
          <button className="btn-primary">Start your 14-Day POC</button>
          <button className="btn-secondary">Book a Discovery Call</button>
        </div>

        <div className="hero-stats fade-in delay-4">
          <div>
            <div className="hero-stat-num">14<span>d</span></div>
            <div className="hero-stat-label">To Working POC</div>
          </div>
          <div>
            <div className="hero-stat-num">93<span>%+</span></div>
            <div className="hero-stat-label">Extraction Accuracy</div>
          </div>
          <div>
            <div className="hero-stat-num">0<span>d</span></div>
            <div className="hero-stat-label">Recruiting Lag</div>
          </div>
          <div>
            <div className="hero-stat-num">100<span>%</span></div>
            <div className="hero-stat-label">Code Ownership</div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" id="services">
        <div className="section-label">What We Build</div>
        <h2 className="section-title">9 Production-Ready<br />AI Systems</h2>
        <p className="section-desc">
          Every engagement is scoped, engineered, and delivered. Not templated — built for your stack, your data, your workflows.
        </p>
        <div className="services-grid">
          {services.map((s) => (
            <div className="service-card" key={s.id}>
              <span className="service-letter">{s.id}</span>
              <span className="service-icon">{s.icon}</span>
              <div className="service-name">{s.name}</div>
              <div className="service-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 14-DAY POC */}
      <section className="section section-alt" id="poc">
        <div className="section-label">The Process</div>
        <h2 className="section-title">The 14-Day POC Journey</h2>
        <p className="section-desc">
          Three focused phases. One working, integrated proof of concept — with full source code and a production roadmap at handover.
        </p>

        <div className="timeline">
          {[
            {
              dot: "01",
              days: "Days 1–3",
              phase: "Discovery",
              items: ["Define scope & success metrics", "Lock requirements", "Map your data & systems"],
            },
            {
              dot: "02",
              days: "Days 4–10",
              phase: "Build & Integrate",
              items: ["Rapid build cycles", "Integration with your data", "Daily progress syncs"],
            },
            {
              dot: "03",
              days: "Days 11–14",
              phase: "Ship & Scale Plan",
              items: ["Deliver tested POC", "Document outcomes", "Map path to production"],
            },
          ].map((step, i) => (
            <div className="timeline-step" key={i}>
              <div className="timeline-dot">{step.dot}</div>
              <div className="timeline-days">{step.days}</div>
              <div className="timeline-phase">{step.phase}</div>
              <ul className="timeline-items">
                {step.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, padding: "28px 32px", background: "#fff", border: "1px solid #E5E4DF", borderLeft: "3px solid #FF6B00" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#FF6B00", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
            What you receive at handover
          </div>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {["Working, tested proof of concept", "Full source code ownership", "Integration documentation", "Roadmap to production"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#2D2D2B", fontWeight: 500 }}>
                <span style={{ color: "#FF6B00", fontFamily: "var(--font-mono)" }}>✓</span> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section" id="why-us">
        <div className="section-label">Why P2P.AI</div>
        <h2 className="section-title">vs. Hiring In-House</h2>
        <p className="section-desc">
          Every month you wait to hire is a month your competitors are shipping. Here's what the comparison actually looks like.
        </p>
        <table className="compare-table">
          <thead>
            <tr>
              <th></th>
              <th><span>prompt2prodai</span>.com</th>
              <th>Hiring In-House</th>
            </tr>
          </thead>
          <tbody>
            {compareRows.map((row, i) => (
              <tr key={i}>
                <td>{row.metric}</td>
                <td>{row.p2p}</td>
                <td>{row.hire}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* TECH STACK */}
      <section className="section section-forest" id="stack">
        <div className="section-label section-label-light">Technical Foundation</div>
        <h2 className="section-title section-title-light">Our Stack</h2>
        <p className="section-desc section-desc-light">
          Senior-grade tooling across the full AI engineering surface. No black boxes, no vendor lock-in.
        </p>
        <div className="tech-categories">
          {techStack.map((cat, i) => (
            <div key={i}>
              <div className="tech-category-label">{cat.label}</div>
              <div className="tech-pills">
                {cat.items.map((item, j) => (
                  <div className="tech-pill" key={j}>{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section className="section section-alt" id="engage">
        <div className="section-label">How We Work Together</div>
        <h2 className="section-title">Engagement Models</h2>
        <p className="section-desc">
          Start with a POC. Scale with a Partner. Transform with Enterprise. Every model is outcome-first.
        </p>
        <div className="engage-grid">
          {engageModels.map((model, i) => (
            <div className={`engage-card${model.featured ? " featured" : ""}`} key={i}>
              {model.featured && <div className="engage-badge">Most Popular</div>}
              <div className="engage-tier">{model.tier}</div>
              <div className="engage-name">{model.name}</div>
              <div className="engage-tagline">{model.tagline}</div>
              <ul className="engage-includes">
                {model.includes.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2 className="cta-headline">
          Your AI POC.<br />
          <em>Built in 14 days.</em>
        </h2>
        <p className="cta-sub">
          No recruiting. No ramp-up. No slide decks.<br />
          A working, integrated system — with code you own.
        </p>
        <div className="cta-actions">
          <button className="btn-primary" style={{ padding: "18px 40px", fontSize: 15 }}>
            Start your 14-Day POC
          </button>
          <button className="btn-secondary" style={{ padding: "17px 40px", fontSize: 15 }}>
            Book a Discovery Call
          </button>
        </div>
        <div className="cta-url">
          <span>prompt2prodai.com</span> · hello@prompt2prodai.com
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">prompt2prod<span>AI</span>.com · P2P.AI</div>
        <div className="footer-tagline">Working AI in 14 Days. Not a Slide Deck.</div>
      </footer>
    </div>
  );
}
