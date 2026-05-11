'use client';

import React, { useState, useEffect } from "react";

const TEAM = [
  {
    id: "linse",
    name: "Linse",
    role: "Fundadora · Desarrollo Full Stack · Sistemas · Diseño Web",
    bio: "Técnica en Sistemas Microinformáticos y Redes, con formación en desarrollo full stack y ciberseguridad. Construyo desde el servidor hasta la interfaz: infraestructura, backend, frontend, integración de APIs y automatizaciones. Trabajo con IA como herramienta real para ir más rápido y entregar mejor.",
    photo: "/Linse.png",
    skills: ["FreeBSD", "Apache", "PHP", "Python", "MariaDB", "React", "HTML/CSS", "APIs REST", "Figma", "Git", "Microsoft 365 API"],
    linkedin: "https://es.linkedin.com/in/linsenaine",
  },
  {
    id: "ezra",
    name: "Ezra",
    role: "Cofundador · Marketing Digital · Meta Ads · Diseño",
    bio: "Especialista en marketing digital y diseño orientado a resultados. Gestiono campañas de Meta Ads, creo identidades visuales y materiales que convierten. Me encargo de que cada proyecto tenga la imagen y la visibilidad que merece.",
    photo: "/Ezra.png",
    skills: ["Meta Ads", "Instagram Ads", "Canva", "Figma", "Branding", "Copywriting", "Google Analytics", "Email Marketing"],
    linkedin: "#",
  },
];

const PORTFOLIO = [
  { tag: "WEB", name: "Fisio Lomas", year: "2025", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80", role: "Diseño + desarrollo + agente IA", result: "+42 citas/mes" },
  { tag: "ADS", name: "Restaurante El Patio", year: "2025", img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&q=80", role: "Meta Ads + creatividades", result: "3.2× ROAS sostenido" },
  { tag: "WEB", name: "Academia Nova", year: "2024", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80", role: "Web + automatización matrículas", result: "−8h/sem en gestión" },
  { tag: "IA", name: "Clínica Dental Mar", year: "2024", img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=900&q=80", role: "Agente WhatsApp 24/7", result: "62% citas confirmadas auto" },
  { tag: "WEB", name: "Taller García", year: "2024", img: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&q=80", role: "Web + mantenimiento", result: "0 caídas en 12 meses" },
  { tag: "ADS", name: "Tienda Ámbar", year: "2024", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80", role: "Catálogo + ads dinámicos", result: "4.1× ROAS Q4" },
];

function HeroEquipo() {
  return (
    <section style={{ padding: "80px 0 100px", background: "var(--bg)" }}>
      <div className="eq-container">
        <div
          data-fade
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "var(--mono)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--ink-mute)",
            marginBottom: 60,
            paddingBottom: 20,
            borderBottom: "1px solid var(--line)",
          }}
        >
          <span>[ /equipo ]</span>
          <span>02 personas · 1 estudio · 0 intermediarios</span>
          <span>Madrid · Remoto</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "end" }}>
          <div data-fade data-delay="100">
            <div className="eq-label">[ Quiénes somos ]</div>
            <h1
              className="eq-display"
              style={{ fontSize: "clamp(64px, 10vw, 160px)", marginBottom: 30 }}
            >
              Dos<br />
              personas.<br />
              <span className="eq-italic" style={{ color: "var(--primary)" }}>Cero humo.</span>
            </h1>
          </div>
          <div
            data-fade
            data-delay="200"
            style={{
              maxWidth: 480,
              fontSize: 19,
              fontWeight: 600,
              lineHeight: 1.5,
              color: "#111111",
              paddingBottom: 40,
              alignSelf: "end",
            }}
          >
            Nex-V somos nosotros dos. Diseño y código por un lado, marketing y agentes de IA por otro.
            Cuando contratas a Nex-V, hablas con nosotros. No con account managers, no con junior
            ejecutándolo a escondidas.
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamCards() {
  return (
    <section className="eq-section" style={{ paddingTop: 0, borderTop: "none", background: "var(--bg)" }}>
      <div className="eq-container">
        <style>{`
          .team-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
          @media (max-width: 700px) { .team-grid { grid-template-columns: 1fr; } }
        `}</style>
        <div className="team-grid">
          {TEAM.map((m, i) => (
            <div
              key={m.id}
              data-fade
              data-delay={i === 0 ? undefined : "150"}
              className="eq-hoverable"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--line)",
                borderRadius: 20,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Foto */}
              <div style={{ aspectRatio: "4 / 3", position: "relative", overflow: "hidden" }}>
                <img
                  src={m.photo}
                  alt={`${m.name} — Nex-V`}
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                />
                <div style={{
                  position: "absolute", top: 16, left: 16,
                  padding: "6px 12px", background: "var(--bg)", borderRadius: 100,
                  fontFamily: "var(--mono)", fontSize: 10, textTransform: "uppercase",
                  letterSpacing: "0.1em", color: "var(--ink)",
                }}>
                  /0{i + 1}
                </div>
              </div>

              {/* Contenido */}
              <div style={{ padding: 36, display: "flex", flexDirection: "column", gap: 24, flex: 1 }}>

                <div>
                  <div className="eq-display" style={{ fontSize: 40, lineHeight: 1 }}>{m.name}</div>
                  <div className="eq-mono" style={{
                    fontSize: 11, color: "var(--primary)", marginTop: 8,
                    textTransform: "uppercase", letterSpacing: "0.1em", lineHeight: 1.6,
                  }}>
                    {m.role}
                  </div>
                </div>

                <p style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.65, color: "#111111", margin: 0 }}>
                  {m.bio}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div className="eq-mono eq-mute" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                    Stack
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {m.skills.map((s) => (
                      <span key={s} className="eq-mono" style={{
                        fontSize: 11, padding: "5px 12px",
                        border: "1px solid var(--line)", borderRadius: 100,
                        color: "var(--ink)", background: "var(--bg-2)",
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--line)" }}>
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="eq-btn eq-btn-dark" style={{ flex: 1, justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                    </svg>
                    LinkedIn
                  </a>
                  <a href="/#contacto" className="eq-btn eq-btn-ghost" style={{ flex: 1, justifyContent: "center" }}>
                    Contactar →
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ManifestoSec() {
  const items = [
    { n: "01", t: "Hablamos claro", d: "Sin jerga de marketing. Si no entiendes algo, lo explicamos otra vez." },
    { n: "02", t: "Pocos clientes", d: "No tomamos más trabajo del que podemos atender bien. Ahora mismo, 6 activos." },
    { n: "03", t: "Plazos cerrados", d: "Te decimos cuánto tarda y cuesta antes de empezar. Y se cumple." },
    { n: "04", t: "Sin permanencia", d: "Si no funciona, te vas. Nos lo ganamos cada mes." },
  ];
  const delays = [undefined, "150", "280", "360"];
  return (
    <section style={{ padding: "120px 0", background: "var(--blue-900)", color: "var(--bg)" }}>
      <div className="eq-container">
        <div data-fade className="eq-label" style={{ color: "var(--blue-300)" }}>
          <span
            style={{
              display: "inline-block",
              width: 28,
              height: 1,
              background: "var(--blue-300)",
            }}
          />
          <span style={{ color: "#fff" }}>Cómo trabajamos</span>
        </div>
        <h2
          data-fade
          data-delay="100"
          className="eq-display"
          style={{
            fontSize: "clamp(48px, 7vw, 120px)",
            color: "#fff",
            marginBottom: 80,
            maxWidth: "14ch",
          }}
        >
          Cuatro reglas.<br />
          <span className="eq-italic" style={{ color: "var(--blue-300)" }}>Las cumplimos.</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0 }}>
          {items.map((r, i) => (
            <div
              key={r.n}
              data-fade
              data-delay={delays[i]}
              style={{
                padding: "40px 0",
                borderTop: "1px solid rgba(255,255,255,0.15)",
                borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.15)" : "none",
                paddingRight: i % 2 === 0 ? 40 : 0,
                paddingLeft: i % 2 === 1 ? 40 : 0,
                display: "grid",
                gridTemplateColumns: "60px 1fr",
                gap: 24,
              }}
            >
              <div className="eq-mono" style={{ fontSize: 12, color: "var(--blue-300)" }}>
                /{r.n}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 30,
                    marginBottom: 10,
                    letterSpacing: "-0.02em",
                    color: "#fff",
                  }}
                >
                  {r.t}
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.55, color: "rgba(220,230,255,0.95)", maxWidth: 380, margin: 0 }}>
                  {r.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState("ALL");
  const filtered = filter === "ALL" ? PORTFOLIO : PORTFOLIO.filter((p) => p.tag === filter);

  return (
    <section className="eq-section" id="portfolio" style={{ background: "var(--bg)" }}>
      <div className="eq-container">
        <div
          data-fade
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            marginBottom: 50,
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <div className="eq-label">[ Portfolio ]</div>
            <h2 className="eq-display" style={{ fontSize: "clamp(48px, 7vw, 120px)" }}>
              Algunas<br />
              cosas que<br />
              <span className="eq-italic" style={{ color: "var(--primary)" }}>hemos hecho.</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {["ALL", "WEB", "ADS", "IA"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "10px 18px",
                  borderRadius: 100,
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  letterSpacing: "0.05em",
                  background: filter === f ? "var(--ink)" : "transparent",
                  color: filter === f ? "var(--bg)" : "var(--ink-dim)",
                  border: filter === f ? "1px solid var(--ink)" : "1px solid var(--line)",
                  transition: "all 0.2s",
                  cursor: "pointer",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div data-fade data-delay="150" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {filtered.map((p, i) => (
            <a
              key={p.name}
              href="#"
              className="eq-hoverable"
              style={{ display: "flex", flexDirection: "column", gap: 14, textDecoration: "none" }}
            >
              <div
                style={{
                  aspectRatio: i % 4 === 0 ? "1 / 1.2" : "1 / 1",
                  borderRadius: 14,
                  backgroundImage: `url(${p.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    padding: "5px 11px",
                    background: "var(--bg)",
                    color: "var(--ink)",
                    borderRadius: 100,
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                  }}
                >
                  {p.tag}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 14,
                    right: 14,
                    padding: "5px 11px",
                    background: "var(--ink)",
                    color: "var(--blue-300)",
                    borderRadius: 100,
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    fontWeight: 500,
                  }}
                >
                  {p.result}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 22,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      color: "var(--ink)",
                    }}
                  >
                    {p.name}
                  </div>
                  <div className="eq-mono eq-mute" style={{ fontSize: 11, marginTop: 4 }}>
                    {p.role}
                  </div>
                </div>
                <div className="eq-mono eq-mute" style={{ fontSize: 11 }}>
                  {p.year}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTAEquipo() {
  return (
    <section style={{ padding: "140px 0", textAlign: "center", background: "var(--bg)" }}>
      <div className="eq-container">
        <h2
          data-fade
          className="eq-display"
          style={{ fontSize: "clamp(48px, 8vw, 150px)", maxWidth: "16ch", margin: "0 auto" }}
        >
          ¿Buscas a alguien<br />
          para tu proyecto?
        </h2>
        <p
          data-fade
          data-delay="150"
          style={{
            maxWidth: 540,
            margin: "32px auto 0",
            fontSize: 18,
            fontWeight: 600,
            lineHeight: 1.5,
            color: "#111111",
          }}
        >
          Estamos abiertos a colaboraciones, proyectos a medida, o a charlar de café. Si nos has visto
          en LinkedIn, escríbenos directamente.
        </p>
        <div
          data-fade
          data-delay="280"
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginTop: 40,
            flexWrap: "wrap",
          }}
        >
          <a href="mailto:hola@nex-v.com" className="eq-btn eq-btn-primary eq-btn-lg">
            hola@nex-v.com
          </a>
          <a href="/#contacto" className="eq-btn eq-btn-ghost eq-btn-lg">
            Agendar llamada →
          </a>
        </div>
      </div>
    </section>
  );
}

export default function EquipoPage() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-fade]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('fade-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <div style={{ background: "var(--bg)" }}>
      <HeroEquipo />
      <TeamCards />
      <ManifestoSec />
      <Portfolio />
      <CTAEquipo />
    </div>
  );
}
