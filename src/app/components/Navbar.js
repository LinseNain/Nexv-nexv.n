"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const y = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false);
    scrollToSection(sectionId);
  };

  const navLinks = [
    { id: "inicio",        label: "Inicio" },
    { id: "quienes-somos", label: "Nosotros" },
    { id: "servicios",     label: "Servicios" },
    { id: "trabajos",      label: "Trabajos" },
    { id: "contacto",      label: "Contacto" },
  ];

  const linkStyle = (isActive = false) => ({
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif",
    fontSize: 14.5,
    fontWeight: 500,
    color: isActive ? "#2563eb" : "#111827",
    letterSpacing: "-0.01em",
    padding: "4px 0",
    position: "relative",
    textDecoration: "none",
    display: "inline-block",
  });

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 50,
        transition: "padding 0.3s ease, box-shadow 0.3s ease",
        padding: isScrolled ? "10px 0" : "16px 0",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px) saturate(1.4)",
        WebkitBackdropFilter: "blur(12px) saturate(1.4)",
        borderBottom: "1px solid rgba(229,231,235,0.8)",
        boxShadow: isScrolled ? "0 2px 20px -4px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,4vw,40px)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <button
          onClick={() => handleNavClick("inicio")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}
          aria-label="Ir a inicio"
        >
          <img
            src="/slogan.svg"
            alt="Nex-v Logo"
            style={{ height: 50, width: "auto", transition: "transform 0.25s ease", transform: isScrolled ? "scale(0.93)" : "scale(1)", display: "block" }}
          />
        </button>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 28 }} className="nx-desktop-nav">
          {navLinks.map((item) => (
            <NavBtn key={item.id} onClick={() => handleNavClick(item.id)}>
              {item.label}
            </NavBtn>
          ))}

          <a
            href="/equipo"
            style={{
              ...linkStyle(pathname === "/equipo"),
              textDecoration: pathname === "/equipo" ? "underline" : "none",
              textUnderlineOffset: 4,
              textDecorationColor: "#2563eb",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#2563eb"}
            onMouseLeave={e => e.currentTarget.style.color = pathname === "/equipo" ? "#2563eb" : "#111827"}
          >
            Equipo
          </a>

          <button
            onClick={() => handleNavClick("contacto")}
            style={{
              fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif",
              fontSize: 14,
              fontWeight: 600,
              background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              padding: "10px 22px",
              cursor: "pointer",
              letterSpacing: "-0.01em",
              transition: "box-shadow 0.2s, transform 0.2s",
              whiteSpace: "nowrap",
              boxShadow: "0 2px 12px rgba(37,99,235,0.35)",
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,99,235,0.55)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(37,99,235,0.35)"; e.currentTarget.style.transform = "none"; }}
          >
            Asesoría Gratuita
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none", flexDirection: "column", gap: 5 }}
          className="nx-hamburger"
          aria-label="Toggle navigation menu"
        >
          <div style={{ width: 22, height: 1.5, background: "#111827", transition: "all 0.2s", transform: isMenuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
          <div style={{ width: 22, height: 1.5, background: "#111827", transition: "opacity 0.2s", opacity: isMenuOpen ? 0 : 1 }} />
          <div style={{ width: 22, height: 1.5, background: "#111827", transition: "all 0.2s", transform: isMenuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav style={{ background: "#fff", borderTop: "1px solid #f3f4f6", padding: "8px 16px 16px" }}>
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif", fontSize: 16, fontWeight: 500, color: "#111827", padding: "12px 8px", borderBottom: "1px solid #f3f4f6", letterSpacing: "-0.01em" }}
            >
              {item.label}
            </button>
          ))}
          <a
            href="/equipo"
            onClick={() => setIsMenuOpen(false)}
            style={{ display: "block", fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif", fontSize: 16, fontWeight: pathname === "/equipo" ? 600 : 500, color: pathname === "/equipo" ? "#2563eb" : "#111827", padding: "12px 8px", borderBottom: "1px solid #f3f4f6", textDecoration: "none", letterSpacing: "-0.01em" }}
          >
            Equipo
          </a>
          <button
            onClick={() => { setIsMenuOpen(false); scrollToSection("contacto"); }}
            style={{ display: "block", width: "100%", marginTop: 12, fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif", fontSize: 15, fontWeight: 600, background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)", color: "#fff", border: "none", borderRadius: 7, padding: "13px 20px", cursor: "pointer", letterSpacing: "-0.01em", boxShadow: "0 4px 14px rgba(37,99,235,0.4)" }}
          >
            Asesoría Gratuita
          </button>
        </nav>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nx-desktop-nav { display: none !important; }
          .nx-hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  );
};

function NavBtn({ children, onClick }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif",
        fontSize: 14.5,
        fontWeight: 500,
        color: hovered ? "#2563eb" : "#111827",
        WebkitTextFillColor: hovered ? "#2563eb" : "#111827",
        letterSpacing: "-0.01em",
        padding: "4px 0",
        position: "relative",
        transition: "color 0.18s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <span style={{
        position: "absolute",
        bottom: -2,
        left: 0,
        height: 2,
        width: hovered ? "100%" : "0%",
        background: "#2563eb",
        transition: "width 0.25s cubic-bezier(0.16,1,0.3,1)",
        borderRadius: 1,
      }} />
    </button>
  );
}

export default Navbar;
