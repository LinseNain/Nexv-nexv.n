'use client';

import React from 'react';

const SocialIcon = ({ name }) => {
  const icons = {
    Facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89.75 0 1.5.09 2.25.26v2.73h-1.5c-1.25 0-1.5.5-1.5 1.5V12h2.75l-.35 2.89h-2.4V22c4.781-.751 8.438-4.888 8.438-9.879z" />
      </svg>
    ),
    Instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    LinkedIn: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    Twitter: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  };
  return icons[name] || null;
};

const SocialBtn = ({ href, label, children }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: hov
          ? "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)"
          : "linear-gradient(135deg, #0c3ea8 0%, #1d4ed8 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textDecoration: "none",
        transition: "box-shadow 0.25s, transform 0.2s, background 0.25s",
        boxShadow: hov
          ? "0 0 18px rgba(59,130,246,0.7), 0 4px 12px rgba(37,99,235,0.4)"
          : "0 2px 8px rgba(37,99,235,0.3)",
        transform: hov ? "translateY(-2px) scale(1.08)" : "none",
        flexShrink: 0,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </a>
  );
};

const FLink = ({ href, children }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <a
      href={href}
      style={{
        color: hov ? "#60a5fa" : "#9ca3af",
        fontSize: 14,
        lineHeight: 1.6,
        textDecoration: "none",
        transition: "color 0.2s",
        display: "block",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </a>
  );
};

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook',  href: 'https://facebook.com/tu-perfil' },
    { name: 'Instagram', href: 'https://instagram.com/tu-perfil' },
    { name: 'LinkedIn',  href: 'https://linkedin.com/company/tu-empresa' },
    { name: 'Twitter',   href: 'https://x.com/tu-perfil' },
  ];

  const colTitle = {
    fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#ffffff",
    marginBottom: 20,
    display: "block",
  };

  return (
    <footer style={{
      background: "linear-gradient(180deg, #000000 0%, #060814 100%)",
      borderTop: "2px solid #1d4ed8",
      boxShadow: "0 -4px 40px rgba(37,99,235,0.15)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px clamp(20px,4vw,48px) 0" }}>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "40px 48px", marginBottom: 52 }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 30,
              color: "#3b82f6",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              marginBottom: 14,
              textShadow: "0 0 24px rgba(59,130,246,0.4)",
            }}>
              Nex-V
            </div>
            <p style={{ fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif", fontSize: 14, lineHeight: 1.7, color: "#6b7280", maxWidth: 240, margin: "0 0 24px" }}>
              Tu agencia digital de confianza para negocios locales.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {socialLinks.map((s) => (
                <SocialBtn key={s.name} href={s.href} label={`Visita nuestro perfil en ${s.name}`}>
                  <SocialIcon name={s.name} />
                </SocialBtn>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div>
            <span style={colTitle}>Servicios</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {['Desarrollo Web', 'Redes Sociales', 'SEO & SEM', 'Analíticas', 'Consultoría'].map((item) => (
                <FLink key={item} href="/#servicios">{item}</FLink>
              ))}
            </div>
          </div>

          {/* Empresa */}
          <div>
            <span style={colTitle}>Empresa</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: 'Quiénes Somos', href: '/#quienes-somos' },
                { label: 'Nuestro Equipo', href: '/equipo' },
                { label: 'Casos de Éxito', href: '/#trabajos' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contacto', href: '/#contacto' },
              ].map((item) => (
                <FLink key={item.label} href={item.href}>{item.label}</FLink>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <span style={colTitle}>Contacto</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif", fontSize: 14, color: "#6b7280" }}>Madrid, España</span>
              <FLink href="tel:+34692877125">+34 692 87 71 25</FLink>
              <FLink href="tel:+34692930604">+34 692 93 06 04</FLink>
              <FLink href="mailto:Office.nexv@gmail.com">Office.nexv@gmail.com</FLink>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #111827", padding: "20px 0 28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ margin: 0, fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif", fontSize: 13, color: "#374151" }}>
            © {new Date().getFullYear()} Nex-V. Todos los derechos reservados.
          </p>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              { label: "Inicio", href: "/" },
              { label: "Servicios", href: "/#servicios" },
              { label: "Equipo", href: "/equipo" },
              { label: "Contacto", href: "/#contacto" },
            ].map((item) => (
              <FLink key={item.label} href={item.href}>{item.label}</FLink>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
};

export default Footer;
