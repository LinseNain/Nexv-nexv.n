'use client';

import React, { useState, useEffect, useRef } from "react";

/* ─── Three.js helpers ───────────────────────────────────────────────────── */
function sampleTextPoints(text, count) {
  if (typeof document === "undefined") return new Float32Array(count * 3);
  const W = 1600, H = 500;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.font = "900 320px Arial, Helvetica, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, W / 2, H / 2);
  const data = ctx.getImageData(0, 0, W, H).data;
  const pts = [];
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++)
      if (data[(y * W + x) * 4 + 3] > 128) pts.push([x, y]);
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const p = pts[Math.floor(Math.random() * pts.length)];
    out[i * 3]     = (p[0] / W - 0.5) * 5.2;
    out[i * 3 + 1] = -(p[1] / H - 0.5) * 1.6;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
  }
  return out;
}

function Hero3D() {
  const canvasRef = useRef();
  const stateRef  = useRef({ tx: 0, ty: 0, mx: 0, my: 0, target: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cleanupFn = null;

    import('three').then((THREE) => {
      const rect = canvas.getBoundingClientRect();
      let W = rect.width || canvas.offsetWidth;
      let H = rect.height || canvas.offsetHeight;

      const scene    = new THREE.Scene();
      const camera   = new THREE.PerspectiveCamera(50, W / H, 0.1, 1000);
      camera.position.z = 7;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(W, H, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const N = 4000;
      const geo      = new THREE.BufferGeometry();
      const positions = new Float32Array(N * 3);
      const shapes   = [new Float32Array(N * 3), new Float32Array(N * 3), new Float32Array(N * 3)];
      const randoms  = new Float32Array(N);

      for (let i = 0; i < N; i++) {
        const t = (i / N) * Math.PI * 2 * 3;
        const r = 0.8 + 0.3 * Math.cos(3 * t);
        shapes[0][i*3]   = r * Math.cos(2*t) * 2 + (Math.random()-0.5)*0.15;
        shapes[0][i*3+1] = r * Math.sin(2*t) * 2 + (Math.random()-0.5)*0.15;
        shapes[0][i*3+2] = 0.6 * Math.sin(3*t) * 2 + (Math.random()-0.5)*0.15;
        randoms[i] = Math.random();
      }
      for (let i = 0; i < N; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.acos(2 * Math.random() - 1);
        const R = 2.4;
        shapes[1][i*3]   = R * Math.sin(v) * Math.cos(u);
        shapes[1][i*3+1] = R * Math.sin(v) * Math.sin(u);
        shapes[1][i*3+2] = R * Math.cos(v);
      }
      const fillText = () => {
        const t = sampleTextPoints("NEX·V", N);
        for (let i = 0; i < N*3; i++) shapes[2][i] = t[i];
      };
      fillText();
      if (document.fonts?.ready) document.fonts.ready.then(fillText);

      for (let i = 0; i < N*3; i++) positions[i] = shapes[0][i];
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("random",   new THREE.BufferAttribute(randoms,   1));

      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uColorA: { value: new THREE.Color(0x3b82f6) },
          uColorB: { value: new THREE.Color(0x93c5fd) },
          uColorC: { value: new THREE.Color(0xffffff) },
          uSize:   { value: 13 * renderer.getPixelRatio() },
        },
        vertexShader: `
          attribute float random;
          varying float vRandom;
          uniform float uSize;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = uSize * (1.0 / -mv.z) * (0.6 + random * 0.8);
            gl_Position = projectionMatrix * mv;
            vRandom = random;
          }
        `,
        fragmentShader: `
          varying float vRandom;
          uniform vec3 uColorA, uColorB, uColorC;
          void main() {
            vec2 c = gl_PointCoord - 0.5;
            if (length(c) > 0.5) discard;
            float alpha = smoothstep(0.5, 0.08, length(c));
            vec3 color = mix(uColorA, uColorB, smoothstep(0.3, 0.7, vRandom));
            color = mix(color, uColorC, step(0.92, vRandom));
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
      });

      const pts = new THREE.Points(geo, mat);
      scene.add(pts);

      let current = 0, frame = 0, rafId;

      const onMove   = e => {
        const r = canvas.getBoundingClientRect();
        stateRef.current.tx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
        stateRef.current.ty = ((e.clientY - r.top)  / r.height - 0.5) * 2;
      };
      const onEnter  = () => { stateRef.current.target = 1; };
      const onLeave  = () => { stateRef.current.target = 0; };
      const onClick  = () => { stateRef.current.target = stateRef.current.target === 2 ? 1 : 2; };

      canvas.addEventListener("mousemove",  onMove);
      canvas.addEventListener("mouseenter", onEnter);
      canvas.addEventListener("mouseleave", onLeave);
      canvas.addEventListener("click",      onClick);

      const animate = () => {
        frame++;
        const s = stateRef.current;
        s.mx += (s.tx - s.mx) * 0.05;
        s.my += (s.ty - s.my) * 0.05;
        current += (s.target - current) * 0.05;

        const lo = Math.floor(current);
        const hi = Math.min(2, lo + 1);
        const k  = current - lo;
        const pos = pts.geometry.attributes.position.array;
        const A = shapes[lo], B = shapes[hi];
        for (let i = 0; i < N; i++) {
          const i3 = i * 3;
          const w  = Math.sin(frame * 0.02 + i * 0.1) * 0.04;
          pos[i3]   = A[i3]   * (1-k) + B[i3]   * k + w;
          pos[i3+1] = A[i3+1] * (1-k) + B[i3+1] * k + Math.cos(frame * 0.02 + i * 0.1) * 0.04;
          pos[i3+2] = A[i3+2] * (1-k) + B[i3+2] * k;
        }
        pts.geometry.attributes.position.needsUpdate = true;

        const isText = current > 1.5;
        pts.rotation.y = (isText ? 0 : frame * 0.002) + s.mx * (isText ? 0.08 : 0.3);
        pts.rotation.x = s.my * (isText ? 0.05 : 0.3);
        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      };
      animate();

      const onResize = () => {
        const r = canvas.getBoundingClientRect();
        W = r.width; H = r.height;
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
        renderer.setSize(W, H, false);
      };
      window.addEventListener("resize", onResize);

      cleanupFn = () => {
        cancelAnimationFrame(rafId);
        canvas.removeEventListener("mousemove",  onMove);
        canvas.removeEventListener("mouseenter", onEnter);
        canvas.removeEventListener("mouseleave", onLeave);
        canvas.removeEventListener("click",      onClick);
        window.removeEventListener("resize",     onResize);
        renderer.dispose(); geo.dispose(); mat.dispose();
      };
    });

    return () => { if (cleanupFn) cleanupFn(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "pointer", display: "block" }}
    />
  );
}
// Import condicional de supabase para evitar errores en server
let supabase;
if (typeof window !== 'undefined') {
  const supabaseModule = require("@/lib/supabase");
  supabase = supabaseModule.supabase;
}

// 🔹 Iconos profesionales
import {
  Globe,
  Smartphone,
  Search,
  BarChart3,
  Users,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Zap,
  Star,
  Rocket,
  Monitor,
  Cpu,
  Cloud,
  Lock,
  Wifi,
  ChevronRight,
} from "lucide-react";

import Navbar from "./Navbar";

// 👁️ Huella digital visible en código fuente
// <!-- LINSEPGSTR -->

// 🕵️‍♂️ Easter egg en consola (F12)
if (typeof window !== "undefined") {
  console.log(
    "%cLINSEPGSTR — Nex-v Digital Agency",
    "color: #2563eb; font-weight: bold; font-size: 14px;"
  );
  console.log("🚀 ¿Te gustó lo que ves? ¡Hablemos! office.nexv@gmail.com");
}

const HomePage = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    servicio: "",
    mensaje: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [expandedSolution, setExpandedSolution] = useState(null);

  // Scroll reveal
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-fade]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('fade-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);

  // 📌 Scroll suave
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const y = element.offsetTop - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // 📌 Formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("sending");

    try {
      const { error } = await supabase.from("leads").insert([
        {
          nombre: formData.nombre.trim(),
          email: formData.email.trim(),
          telefono: formData.telefono.trim() || null,
          empresa: formData.empresa.trim() || null,
          servicio: formData.servicio || null,
          mensaje: formData.mensaje.trim() || null,
        },
      ]);

      if (error) throw error;

      setSubmitStatus("success");
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        empresa: "",
        servicio: "",
        mensaje: "",
      });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (err) {
      console.error("Error:", err);
      setSubmitStatus("error");
    }
  };

  // 📌 Datos de soluciones IT
  const solutions = [
    {
      icon: <Monitor className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Soporte Remoto",
      shortDesc: "Asistencia técnica remota para resolver cualquier problema tecnológico de forma inmediata.",
      features: [
        "Resolución de problemas de lentitud y rendimiento",
        "Instalación y configuración de programas",
        "Eliminación de virus, malware y errores del sistema",
        "Configuración de correo electrónico y cuentas",
        "Solución de problemas con impresoras y periféricos",
      ],
    },
    {
      icon: <Cpu className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Mantenimiento Automatizado",
      shortDesc: "Sistema inteligente que mantiene tus equipos siempre optimizados sin intervención manual.",
      features: [
        "Limpieza automática de archivos temporales y basura",
        "Actualizaciones automáticas de sistema y controladores",
        "Escaneo antivirus programado diario",
        "Optimización del registro de Windows",
        "Monitoreo de temperatura y rendimiento del hardware",
      ],
    },
    {
      icon: <Cloud className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Backup en la Nube",
      shortDesc: "Protección total de tus datos con copias de seguridad automáticas y monitoreo continuo.",
      features: [
        "Configuración de backup automático en Google Drive, OneDrive o Dropbox",
        "Sincronización en tiempo real de archivos importantes",
        "El cliente no necesita hacer nada: todo se guarda automáticamente",
        "Monitorización 24/7 del estado de las copias de seguridad",
        "Restauración rápida de archivos en caso de pérdida",
      ],
    },
    {
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Optimización Digital Total",
      shortDesc: "Transformamos tu flujo de trabajo digital para máxima productividad y eficiencia.",
      features: [
        "Limpieza profunda del sistema operativo",
        "Desinstalación de software innecesario y bloatware",
        "Optimización del tiempo de arranque (hasta 70% más rápido)",
        "Configuración profesional de herramientas esenciales",
        "Personalización del entorno de trabajo según tus necesidades",
      ],
    },
    {
      icon: <Lock className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Plan de Seguridad Digital",
      shortDesc: "Protección integral para pequeños negocios y usuarios frecuentes con soporte incluido.",
      features: [
        "Antivirus premium + firewall avanzado + backup en la nube",
        "Actualizaciones automáticas de seguridad",
        "Auditoría de seguridad trimestral",
        "Gestión de contraseñas seguras y autenticación 2FA",
        "Formación en buenas prácticas de seguridad digital",
      ],
    },
    {
      icon: <Wifi className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Servicios Adicionales",
      shortDesc: "Soluciones complementarias para cubrir todas tus necesidades tecnológicas.",
      features: [
        "Instalación y configuración de redes WiFi profesionales",
        "Configuración de repetidores y puntos de acceso",
        "Asesoría tecnológica personalizada para tu negocio",
        "Migración completa de datos entre equipos",
        "Diagnóstico tecnológico para empresas y autónomos",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ── Estilos responsive globales del componente ── */}
      <style>{`
        @keyframes nexv-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* Contenedor principal — ancho completo con padding fluido */
        .nx-wrap { width:100%; padding:0 clamp(24px, 6vw, 96px); box-sizing:border-box; }

        /* Hero */
        .nx-hero-grid { flex:1; display:grid; grid-template-columns:1fr 1fr; }
        .nx-hero-canvas { position:relative; }
        .nx-hero-txt { display:flex; align-items:center; padding:110px clamp(24px,4vw,64px) 52px clamp(24px,6vw,96px); }

        /* Servicios */
        .nx-srv-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:1px; background:#e2e8f0; border-radius:16px; overflow:hidden; }
        .nx-c2 { grid-column:span 2; }
        .nx-c3 { grid-column:span 3; }

        /* Trabajos */
        .nx-case-grid { display:grid; grid-template-columns:1.1fr 1fr; border-radius:16px; overflow:hidden; border:1px solid #e2e8f0; }

        /* Proceso */
        .nx-proc-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:#e2e8f0; border-radius:16px; overflow:hidden; }

        /* Garantías */
        .nx-guar-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1px; background:#1e293b; border-radius:16px; overflow:hidden; }

        /* Contacto */
        .nx-cta-header { display:grid; grid-template-columns:1fr 1fr; gap:0 80px; align-items:end; margin-bottom:56px; }
        .nx-cta-grid   { display:grid; grid-template-columns:1.2fr 1fr; gap:0 64px; align-items:start; }
        .nx-form-row   { display:grid; grid-template-columns:1fr 1fr; gap:16px; }

        /* ── TABLET (≤1024px) ── */
        @media(max-width:1024px){
          .nx-proc-grid { grid-template-columns:repeat(2,1fr); }
          .nx-cta-header { grid-template-columns:1fr; gap:16px; }
          .nx-cta-grid   { grid-template-columns:1fr; gap:40px; }
        }

        /* ── MÓVIL (≤768px) ── */
        @media(max-width:768px){
          .nx-hero-grid  { grid-template-columns:1fr; }
          .nx-hero-canvas{ min-height:320px; }
          .nx-hero-txt   { padding:80px 20px 36px; }

          .nx-srv-grid { grid-template-columns:1fr; }
          .nx-c2,.nx-c3 { grid-column:span 1; }

          .nx-case-grid { grid-template-columns:1fr; }

          .nx-proc-grid { grid-template-columns:1fr; }

          .nx-guar-grid { grid-template-columns:1fr; }

          .nx-cta-header { grid-template-columns:1fr; }
          .nx-cta-grid   { grid-template-columns:1fr; gap:40px; }
          .nx-form-row   { grid-template-columns:1fr; }
        }

        /* ── Secciones: padding vertical en móvil ── */
        @media(max-width:768px){
          .nx-section { padding:56px 0 48px !important; }
          .nx-proc-header { grid-template-columns:1fr !important; }
          .nx-garantias-header { grid-template-columns:1fr !important; }
        }
      `}</style>
<section
  id="inicio"
  style={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflow: "hidden", background: "#f8f9ff" }}
>
  {/* Grid: TEXTO izquierda / CANVAS derecha */}
  <div className="nx-hero-grid">

    {/* ── IZQUIERDA: texto editorial ── */}
    <div className="nx-hero-txt">
      <div style={{ width: "100%" }}>

        {/* Label monospace */}
        <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10.5, letterSpacing: "0.18em", color: "#94a3b8", textTransform: "uppercase", marginBottom: 32 }}>
          [ Estudio digital · est. 2024 ]
        </div>

        {/* Headline escalonado */}
        <h1 style={{ margin: "0 0 28px", padding: 0, lineHeight: 0.95 }}>
          <span style={{ display: "block", fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(52px,5.8vw,84px)", fontStyle: "normal", color: "#0f172a", letterSpacing: "-0.01em" }}>
            Webs.
          </span>
          <span style={{ display: "block", fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(52px,5.8vw,84px)", fontStyle: "italic", color: "#2563eb", letterSpacing: "-0.01em", marginLeft: "clamp(24px,4vw,60px)" }}>
            Ads.
          </span>
          <span style={{ display: "block", fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif", fontSize: "clamp(46px,5.2vw,76px)", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.04em", marginLeft: "clamp(10px,2vw,28px)" }}>
            Agentes.
          </span>
        </h1>

        {/* Descripción */}
        <p style={{ fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif", fontSize: 15.5, color: "#111111", fontWeight: 600, lineHeight: 1.75, margin: "0 0 32px", maxWidth: 380, paddingLeft: "clamp(10px,2vw,24px)" }}>
          Somos un estudio pequeño que construye piezas digitales serias para negocios reales. Webs rápidas, campañas que venden, agentes de IA que atienden mientras duermes.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
          <button
            onClick={() => scrollToSection("contacto")}
            style={{ fontFamily: "'Space Grotesk', sans-serif", background: "#0f172a", color: "#fff", padding: "13px 26px", borderRadius: 7, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer", letterSpacing: "-0.01em", transition: "opacity .2s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Agendar llamada · 20 min
          </button>
          <button
            onClick={() => scrollToSection("servicios")}
            style={{ fontFamily: "'Space Grotesk', sans-serif", background: "transparent", color: "#64748b", padding: "13px 22px", borderRadius: 7, fontSize: 14, fontWeight: 600, border: "1.5px solid #e2e8f0", cursor: "pointer", letterSpacing: "-0.01em", transition: "border-color .2s, color .2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#0f172a"; e.currentTarget.style.color = "#0f172a"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#64748b"; }}
          >
            Ver precios ↓
          </button>
        </div>

        {/* Stats en fila horizontal con divisores */}
        <div style={{ display: "flex", borderTop: "1px solid #f1f5f9", paddingTop: 24 }}>
          {[
            { num: "5",    label: "servicios" },
            { num: "2-3",  label: "sem. entrega" },
            { num: "0",    label: "permanencia" },
            { num: "100%", label: "hecho a mano" },
          ].map(({ num, label }, i) => (
            <div key={label} style={{ flex: 1, paddingLeft: i > 0 ? 16 : 0, paddingRight: 16, borderLeft: i > 0 ? "1px solid #f1f5f9" : "none" }}>
              <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 26, color: "#0f172a", lineHeight: 1, letterSpacing: "-0.01em" }}>{num}</div>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9.5, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 5 }}>{label}</div>
            </div>
          ))}
        </div>

      </div>
    </div>

    {/* ── DERECHA: canvas WebGL a todo lo alto ── */}
    <div className="nx-hero-canvas" style={{ background: "#080c1e", overflow: "hidden" }}>
      <Hero3D />
      <div style={{ position: "absolute", bottom: 20, right: 20, fontSize: 11, fontFamily: "monospace", color: "rgba(147,197,253,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", pointerEvents: "none", textAlign: "right" }}>
        hover → esfera · click → NEX·V
      </div>
    </div>

  </div>

  {/* ── Marquee fondo del hero ── */}
  <div style={{ overflow: "hidden", background: "#1e3a8a", padding: "18px 0", borderTop: "1px solid rgba(255,255,255,0.1)", width: "100%" }}>
    <div style={{ display: "flex", width: "max-content", animation: "nexv-marquee 40s linear infinite", alignItems: "center" }}>
      {[0, 1].map(copy => (
        <div key={copy} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          {["Webs con CMS", "Meta Ads", "Agentes de IA 24/7", "Automatizaciones", "Mantenimiento", "WhatsApp Bots", "Google Calendar", "Diseño a medida"].map((item, k) => (
            <React.Fragment key={k}>
              <span style={{ fontSize: 18, fontWeight: 500, color: "#fff", letterSpacing: "-0.01em", whiteSpace: "nowrap", padding: "0 28px" }}>{item}</span>
              <span style={{ color: "#93c5fd", fontSize: 12, flexShrink: 0 }}>✦</span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ====================== SERVICIOS ====================== */}
      <section id="quienes-somos" className="nx-section" style={{ padding: "80px 0 72px", background: "#fff", position: "relative" }} data-fade>
        <div className="nx-wrap">

          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: "0.15em", color: "#94a3b8", textTransform: "uppercase", marginBottom: 24 }}>
            [ 01 ] Servicios — 5 piezas. Combinables.
          </div>

          {/* Título con decoración en la segunda línea */}
          <div style={{ marginBottom: 36 }}>
            <span style={{ display: "block", fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(32px,3.6vw,54px)", color: "#0f172a", lineHeight: 1.05, letterSpacing: "-0.02em" }}>Ni un SaaS,</span>
            <span style={{ display: "block", fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(32px,3.6vw,54px)", fontStyle: "italic", color: "#2563eb", lineHeight: 1.05, letterSpacing: "-0.02em", textDecoration: "underline", textDecorationColor: "#bfdbfe", textUnderlineOffset: "8px" }}>ni una agencia.</span>
            <span style={{ display: "block", fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif", fontSize: "clamp(26px,3vw,44px)", fontWeight: 700, color: "#0f172a", lineHeight: 1.05, letterSpacing: "-0.03em", marginTop: 4 }}>Un estudio.</span>
          </div>

          {/* Disclaimer */}
          <div style={{ maxWidth: 540, marginBottom: 48, borderLeft: "2px solid #2563eb", paddingLeft: 20 }}>
            <p style={{ fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif", fontSize: 15, color: "#111111", fontWeight: 600, lineHeight: 1.75, margin: 0 }}>
              Una web no trae clientes sola. El marketing no regala resultados. Hablas con quien hace el trabajo —{" "}
              <strong style={{ color: "#0f172a", fontWeight: 700 }}>sin comerciales, sin letra pequeña, sin permanencia</strong>.
              Lo que construimos es la infraestructura que hace que tu esfuerzo funcione online.
            </p>
          </div>

          <span id="servicios" style={{ position: "absolute", top: -80 }} />

          {/* Imagen editorial */}
          <div style={{ margin: "0 0 40px", borderRadius: 12, overflow: "hidden", height: 200, position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80"
              alt="Nex-V — estudio digital"
              loading="lazy"
              decoding="async"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(15,23,42,0.72) 0%, rgba(15,23,42,0.18) 55%)" }} />
            <div style={{ position: "absolute", bottom: 22, left: 26, color: "#fff" }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>[ Trabajamos contigo · no para ti ]</div>
              <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 26, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Tu negocio crece{" "}
                <em style={{ color: "#93c5fd" }}>cuando lo trabajamos juntos.</em>
              </div>
            </div>
          </div>

          {/* Grid de servicios */}
          {(() => {
            const srvs = [
              { num: "/01", name: "Web con CMS",     tag: "Core",          tagBg: "#dbeafe", tagTx: "#1d4ed8", accent: "#2563eb", desc: "Rápida, a tu imagen, y que puedes editar tú mismo sin llamar a nadie. Diseño a medida + CMS sencillo.", price: "399€", sub: "+ mantenimiento opcional 39€/mes", dark: false },
              { num: "/02", name: "Meta Ads",         tag: "Core",          tagBg: "#ffe4e6", tagTx: "#be123c", accent: "#f43f5e", desc: "Anuncios en Instagram y Facebook. Sabes exactamente qué va a Meta y qué es nuestro trabajo.", price: "99€ setup · 199€/mes", sub: "presupuesto ads aparte desde 150€", dark: false },
              { num: "/03", name: "Agente IA 24/7",   tag: "Diferenciador", tagBg: "#ede9fe", tagTx: "#7c3aed", accent: "#8b5cf6", desc: "Atiende mensajes, agenda citas y recoge leads mientras duermes. En WhatsApp o en tu web.", price: "349€ setup · 59€/mes", sub: "API + hosting incluido", dark: true },
              { num: "/04", name: "Automatizaciones", tag: "Proyecto",      tagBg: "#ffedd5", tagTx: "#c2410c", accent: "#f97316", desc: "Lo que repites cada semana se puede automatizar. Formularios, recordatorios, notificaciones.", price: "desde 149€", sub: "por flujo · proyecto único", dark: false },
              { num: "/05", name: "Diseño y contenido", tag: "Proyecto",    tagBg: "#d1fae5", tagTx: "#065f46", accent: "#10b981", desc: "Tarjetas, flyers, posts, ropa corporativa. Todo con la misma imagen para que parezca una marca, no un collage.", price: "Precio según proyecto", sub: "presupuesto sin compromiso", dark: false },
            ];
            return (
              <div className="nx-srv-grid">
                {srvs.map((s, i) => (
                  <div key={i} className={i < 3 ? "nx-c2" : "nx-c3"} style={{ background: s.dark ? "linear-gradient(160deg, #1a0533 0%, #0f172a 100%)" : "#fff", padding: "28px 26px", display: "flex", flexDirection: "column", borderTop: `3px solid ${s.accent}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <span style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: s.dark ? "#334155" : "#94a3b8", letterSpacing: "0.08em" }}>{s.num}</span>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 100, background: s.dark ? "rgba(255,255,255,0.07)" : s.tagBg, color: s.dark ? "#a5b4fc" : s.tagTx }}>{s.tag}</span>
                    </div>
                    <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 24, color: s.dark ? "#f1f5f9" : "#0f172a", letterSpacing: "-0.01em", lineHeight: 1.2, margin: "0 0 10px" }}>{s.name}</h3>
                    <p style={{ fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif", fontSize: 14, color: s.dark ? "#94a3b8" : "#111111", fontWeight: 600, lineHeight: 1.7, margin: 0, flexGrow: 1, paddingBottom: 20 }}>{s.desc}</p>
                    <div style={{ borderTop: `1px solid ${s.dark ? "rgba(255,255,255,0.07)" : "#f1f5f9"}`, paddingTop: 14 }}>
                      <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 20, fontWeight: 400, color: s.dark ? "#f1f5f9" : "#0f172a", letterSpacing: "-0.01em" }}>{s.price}</div>
                      <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: s.dark ? "#334155" : "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 3 }}>{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 20 }}>
            <button onClick={() => scrollToSection("contacto")} style={{ fontFamily: "'Space Grotesk', sans-serif", background: "#0f172a", color: "#fff", padding: "12px 24px", borderRadius: 7, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer", letterSpacing: "-0.01em" }}>
              Agendar llamada · 20 min
            </button>
            <span style={{ fontFamily: "'Courier New', monospace", fontSize: 10.5, color: "#94a3b8", letterSpacing: "0.08em" }}>Sin presiones. Te decimos si encajamos.</span>
          </div>

        </div>
      </section>

      {/* ====================== TRABAJOS ====================== */}
      <section id="trabajos" className="nx-section" style={{ padding: "80px 0 72px", background: "#f8fafc" }} data-fade>
        <div className="nx-wrap">

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: "0.15em", color: "#94a3b8", textTransform: "uppercase" }}>
              [ 02 ] Trabajos
            </div>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10.5, color: "#cbd5e1", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Más próximamente — ahora mismo estamos en ello
            </div>
          </div>

          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(32px,3.6vw,54px)", color: "#0f172a", lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 36px" }}>
            Lo que hemos hecho.
          </h2>

          {/* Caso Flor del Valle */}
          <div className="nx-case-grid" style={{ background: "#fff" }}>
            {/* Imagen real Unsplash */}
            <div style={{ position: "relative", minHeight: 380 }}>
              <img
                src="https://images.unsplash.com/photo-1490750967868-88df5691cc31?w=900&auto=format&fit=crop&q=80"
                alt="Flor del Valle — floristería Madrid"
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {/* Badge métrica sobre la imagen */}
              <div style={{ position: "absolute", top: 20, left: 20, background: "rgba(15,23,42,0.85)", backdropFilter: "blur(8px)", borderRadius: 10, padding: "10px 16px" }}>
                <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 22, color: "#fff", letterSpacing: "-0.01em" }}>+40%</div>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9.5, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>reservas online</div>
              </div>
            </div>

            {/* Info del caso */}
            <div style={{ padding: "44px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10.5, color: "#94a3b8", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 14 }}>Caso 01</div>
              <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 36, color: "#0f172a", letterSpacing: "-0.02em", lineHeight: 1.05, margin: "0 0 4px" }}>Flor del Valle</h3>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11.5, color: "#94a3b8", margin: "0 0 22px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>Floristería · Madrid</p>
              <p style={{ fontFamily: "'Space Grotesk', ui-sans-serif, sans-serif", fontSize: 15, color: "#111111", fontWeight: 600, lineHeight: 1.8, margin: "0 0 28px" }}>
                Llegaron queriendo <strong style={{ color: "#0f172a" }}>una web</strong>. Terminamos haciéndoles la web, las redes, las tarjetas de visita y la ropa corporativa. Porque cuando algo encaja, <em>se nota en todo</em>.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Web + CMS", "Instagram", "Tarjetas", "Corporativo"].map((t, i) => (
                  <span key={i} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: "#475569", background: "#f8fafc", padding: "5px 14px", borderRadius: 100, border: "1px solid #e2e8f0" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ====================== PROCESO ====================== */}
      <section className="nx-section" style={{ padding: "80px 0 72px", background: "#fff" }} data-fade>
        <div className="nx-wrap">

          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: "0.15em", color: "#94a3b8", textTransform: "uppercase", marginBottom: 24 }}>
            [ 03 ] Proceso
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 48, alignItems: "center" }} className="nx-proc-header">
            <div>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(32px,3.6vw,52px)", color: "#0f172a", lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 6px" }}>
                Nunca has pedido esto antes.
              </h2>
              <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(26px,3vw,44px)", fontStyle: "italic", color: "#2563eb", letterSpacing: "-0.02em", margin: 0, textDecoration: "underline", textDecorationColor: "#bfdbfe", textUnderlineOffset: "6px" }}>
                Normal. Así funciona.
              </p>
            </div>
            <div style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "16/9" }}>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80"
                alt="Equipo Nex-V trabajando"
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="nx-proc-grid">
            {[
              { n: "01", title: "Llamada de 20 min", body: "Nos cuentas qué tienes y qué quieres. Te decimos si podemos ayudarte y qué tiene sentido hacer primero.", when: "Lunes", accent: "#6366f1" },
              { n: "02", title: "Propuesta cerrada", body: "Precio fijo por escrito. Lo firmas, pagas el setup, arrancamos. Sin sorpresas cuando llegue la factura.", when: "48h después", accent: "#f59e0b" },
              { n: "03", title: "Ejecutamos", body: "Diseñamos, montamos, configuramos, probamos. Tú revisas, pedimos feedback, ajustamos 1–2 veces.", when: "2–3 semanas", accent: "#10b981" },
              { n: "04", title: "Lo lanzamos", body: "Vive la web. Corren los ads. Responde el agente. Todo lo que creamos es tuyo desde el día 1.", when: "Día 1 en prod", accent: "#f43f5e" },
            ].map((step, i) => (
              <div key={i} style={{ background: i === 0 ? "linear-gradient(160deg, #1e1b4b 0%, #0f172a 100%)" : "#fff", padding: "32px 26px", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", borderTop: `3px solid ${step.accent}` }}>
                {/* Número grande de fondo */}
                <div style={{ position: "absolute", top: -10, right: 12, fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 100, color: i === 0 ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>{step.n}</div>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 8, background: step.accent + "22", border: `1.5px solid ${step.accent}44`, marginBottom: 18 }}>
                  <span style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: step.accent, letterSpacing: "0.08em", fontWeight: 700 }}>{step.n}</span>
                </div>
                <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 21, color: i === 0 ? "#f1f5f9" : "#0f172a", lineHeight: 1.2, margin: "0 0 14px", letterSpacing: "-0.01em" }}>{step.title}</h3>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: i === 0 ? "#94a3b8" : "#111111", fontWeight: 600, lineHeight: 1.7, margin: 0, flexGrow: 1 }}>{step.body}</p>
                <div style={{ marginTop: 20, paddingTop: 14, borderTop: `1px solid ${i === 0 ? "rgba(255,255,255,0.06)" : "#f1f5f9"}` }}>
                  <span style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: i === 0 ? "#334155" : "#cbd5e1", letterSpacing: "0.1em", textTransform: "uppercase" }}>{step.when}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ====================== GARANTÍAS ====================== */}
      <section className="nx-section" style={{ padding: "80px 0 72px", background: "#0f172a" }} data-fade>
        <div className="nx-wrap">

          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: "0.15em", color: "#334155", textTransform: "uppercase", marginBottom: 24 }}>
            [ 04 ] La promesa
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, marginBottom: 48, alignItems: "center" }} className="nx-garantias-header">
            <div>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(30px,3.4vw,50px)", color: "#f1f5f9", lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 6px" }}>
                Sin letra pequeña.
              </h2>
              <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(18px,2vw,26px)", fontStyle: "italic", color: "#4b6cb7", margin: 0, letterSpacing: "-0.01em", textDecoration: "underline", textDecorationColor: "#1e3a8a", textUnderlineOffset: "6px" }}>
                Si en 30 días no ves avance, repetimos el trabajo desde cero — sin coste extra, no es reembolso.
              </p>
            </div>
            <div style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "4/3", position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80"
                alt="Compromiso y confianza"
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%)" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.35)" }} />
            </div>
          </div>

          <div className="nx-guar-grid">
            {[
              { num: "01", symbol: "∅", title: "Sin permanencia", body: "Pagas mes a mes. Te marchas cuando quieras, sin penalización ni dramas. Nos lo ganamos mes a mes." },
              { num: "02", symbol: "⌨", title: "Todo es tuyo", body: "Web, cuentas, accesos, código. Todo creado a tu nombre. Si te vas, te lo llevas todo. Sin chantajes técnicos." },
              { num: "03", symbol: "↗", title: "Reporte cada lunes", body: "Qué hicimos, qué gastamos, qué funcionó y qué no. Una página. Sin gráficos inflados ni datos de relleno." },
              { num: "04", symbol: "€", title: "Transparencia total", body: "Cada euro separado. Sabes qué va a Meta, qué es nuestro trabajo y qué no gastaremos sin avisarte antes." },
            ].map((g, i) => (
              <div key={i} style={{ background: "#0f172a", padding: "36px 32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 22, color: "#2563eb", lineHeight: 1 }}>{g.symbol}</span>
                  <span style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#334155", letterSpacing: "0.15em" }}>Garantía {g.num}</span>
                </div>
                <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 26, color: "#f1f5f9", letterSpacing: "-0.01em", lineHeight: 1.15, margin: "0 0 12px", textDecoration: "underline", textDecorationColor: "#1e3a8a", textUnderlineOffset: "5px" }}>{g.title}</h3>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "#94a3b8", fontWeight: 600, lineHeight: 1.75, margin: 0 }}>{g.body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 20 }}>
            <button onClick={() => scrollToSection("contacto")} style={{ fontFamily: "'Space Grotesk', sans-serif", background: "#fff", color: "#0f172a", padding: "12px 26px", borderRadius: 7, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer", letterSpacing: "-0.01em" }}>
              Quiero la llamada →
            </button>
            <span style={{ fontFamily: "'Courier New', monospace", fontSize: 10.5, color: "#334155", letterSpacing: "0.08em" }}>
              Firmamos un compromiso por email. Los dos.
            </span>
          </div>
        </div>
      </section>

      {/* ====================== CONTACTO ====================== */}
      <section id="contacto" style={{ padding: "80px 0 72px", background: "#f8fafc" }} data-fade>
        <div className="nx-wrap">

          {/* Cabecera */}
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, letterSpacing: "0.15em", color: "#94a3b8", textTransform: "uppercase", marginBottom: 24 }}>
            [ 05 ] Contacto
          </div>
          <div className="nx-cta-header">
            <div>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(32px,3.6vw,54px)", color: "#0f172a", lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 6px" }}>
                Si tienes dudas, mejor
              </h2>
              <p style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(32px,3.6vw,54px)", fontStyle: "italic", color: "#2563eb", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0, textDecoration: "underline", textDecorationColor: "#bfdbfe", textUnderlineOffset: "8px" }}>
                resolvemos eso primero.
              </p>
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: "#111111", fontWeight: 600, lineHeight: 1.75, margin: 0 }}>
              No hace falta tenerlo todo claro. Con que nos cuentes dónde estás y qué te gustaría mejorar,{" "}
              <strong style={{ color: "#0f172a" }}>te decimos lo que haríamos nosotros</strong>. Sin compromiso.
            </p>
          </div>

          {/* Grid: form izquierda / info derecha */}
          <div className="nx-cta-grid">

            {/* ── FORMULARIO ── */}
            <div style={{ background: "#fff", borderRadius: 16, padding: "40px 36px", border: "1px solid #e2e8f0" }}>

              {submitStatus === "success" && (
                <div style={{ marginBottom: 24, padding: "14px 18px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "#15803d" }}>
                  Recibido. Te escribimos antes de 24h — sin presiones.
                </div>
              )}
              {submitStatus === "error" && (
                <div style={{ marginBottom: 24, padding: "14px 18px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "#dc2626" }}>
                  Algo ha fallado. Escríbenos directamente a office.nexv@gmail.com
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Nombre + Email */}
                <div className="nx-form-row">
                  <div>
                    <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, color: "#0f172a", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Nombre *</label>
                    <input
                      type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required
                      placeholder="Tu nombre"
                      style={{ width: "100%", fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: "#0f172a", background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "12px 14px", outline: "none", boxSizing: "border-box", transition: "border-color .2s" }}
                      onFocus={e => e.target.style.borderColor = "#2563eb"}
                      onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, color: "#0f172a", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Email *</label>
                    <input
                      type="email" name="email" value={formData.email} onChange={handleInputChange} required
                      placeholder="tu@email.com"
                      style={{ width: "100%", fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: "#0f172a", background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "12px 14px", outline: "none", boxSizing: "border-box", transition: "border-color .2s" }}
                      onFocus={e => e.target.style.borderColor = "#2563eb"}
                      onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                    />
                  </div>
                </div>

                {/* Teléfono + ¿Qué necesitas? */}
                <div className="nx-form-row">
                  <div>
                    <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, color: "#0f172a", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Teléfono</label>
                    <input
                      type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange}
                      placeholder="+34 600 000 000"
                      style={{ width: "100%", fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: "#0f172a", background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "12px 14px", outline: "none", boxSizing: "border-box", transition: "border-color .2s" }}
                      onFocus={e => e.target.style.borderColor = "#2563eb"}
                      onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, color: "#0f172a", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>¿Qué te interesa?</label>
                    <select
                      name="servicio" value={formData.servicio} onChange={handleInputChange}
                      style={{ width: "100%", fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: formData.servicio ? "#0f172a" : "#94a3b8", background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "12px 14px", outline: "none", boxSizing: "border-box", cursor: "pointer", transition: "border-color .2s", appearance: "none" }}
                      onFocus={e => e.target.style.borderColor = "#2563eb"}
                      onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                    >
                      <option value="">Elige una opción</option>
                      <option value="web">Web con CMS</option>
                      <option value="ads">Meta Ads</option>
                      <option value="agente">Agente IA 24/7</option>
                      <option value="mantenimiento">Mantenimiento</option>
                      <option value="automatizaciones">Automatizaciones</option>
                      <option value="varios">Varias cosas</option>
                      <option value="otro">No lo tengo claro aún</option>
                    </select>
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, color: "#0f172a", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
                    Cuéntanos dónde estás
                  </label>
                  <textarea
                    name="mensaje" value={formData.mensaje} onChange={handleInputChange}
                    rows={4} maxLength={500}
                    placeholder="Qué tienes ahora, qué te gustaría mejorar, cualquier duda que tengas..."
                    style={{ width: "100%", fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: "#0f172a", background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "12px 14px", outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6, transition: "border-color .2s" }}
                    onFocus={e => e.target.style.borderColor = "#2563eb"}
                    onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                  />
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#cbd5e1", textAlign: "right", marginTop: 4, letterSpacing: "0.06em" }}>
                    {formData.mensaje.length}/500
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitStatus === "sending"}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 15, fontWeight: 700,
                    background: submitStatus === "sending" ? "#94a3b8" : "#0f172a",
                    color: "#fff",
                    border: "none", borderRadius: 8,
                    padding: "15px 24px",
                    cursor: submitStatus === "sending" ? "not-allowed" : "pointer",
                    letterSpacing: "-0.01em",
                    transition: "opacity .2s",
                    width: "100%",
                  }}
                  onMouseEnter={e => { if (submitStatus !== "sending") e.currentTarget.style.opacity = "0.85"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                >
                  {submitStatus === "sending" ? "Enviando..." : "Agendar llamada de 20 min →"}
                </button>

                <p style={{ fontFamily: "'Courier New', monospace", fontSize: 10.5, color: "#94a3b8", textAlign: "center", margin: 0, letterSpacing: "0.06em" }}>
                  Respondemos antes de 24h · Sin compromiso
                </p>
              </form>
            </div>

            {/* ── COLUMNA DERECHA: info + micro-trust ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

              {/* Contacto directo */}
              <div>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10.5, color: "#94a3b8", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>Contacto directo</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Email</div>
                    <a href="mailto:office.nexv@gmail.com" style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 22, color: "#0f172a", letterSpacing: "-0.01em", textDecoration: "none" }}>
                      office.nexv@gmail.com
                    </a>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Teléfono</div>
                    <a href="tel:+34692877125" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, color: "#0f172a", fontWeight: 600, textDecoration: "none", display: "block" }}>+34 692 87 71 25</a>
                    <a href="tel:+34692930604" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, color: "#0f172a", fontWeight: 600, textDecoration: "none", display: "block" }}>+34 692 93 06 04</a>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Horario</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, color: "#111111", fontWeight: 600 }}>Lun – Vie · 9:00 – 18:00</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "#94a3b8", marginTop: 2 }}>Madrid / Remoto</div>
                  </div>
                </div>
              </div>

              {/* Separador */}
              <div style={{ height: 1, background: "#f1f5f9" }} />

              {/* Mini garantías */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  ["∅", "Sin permanencia — pagas mes a mes"],
                  ["↗", "Respondemos en menos de 24h"],
                  ["€", "Precio cerrado antes de empezar"],
                ].map(([sym, txt], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 20, color: "#2563eb", flexShrink: 0, width: 24, textAlign: "center" }}>{sym}</span>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "#111111", fontWeight: 600, lineHeight: 1.4 }}>{txt}</span>
                  </div>
                ))}
              </div>

              {/* Separador */}
              <div style={{ height: 1, background: "#f1f5f9" }} />

              {/* Texto honesto */}
              <div style={{ borderLeft: "2px solid #e2e8f0", paddingLeft: 16 }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13.5, color: "#555555", fontWeight: 600, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
                  "Si creemos que no somos lo que necesitas, te lo decimos y si podemos te mandamos a alguien que sí lo sea."
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>


    </div>
  );
};

export default HomePage;