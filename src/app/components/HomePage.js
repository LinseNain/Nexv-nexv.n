'use client';

import React, { useState, useEffect } from "react";
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

  // 🎨 Animación de partículas SOLO en el hero
// 🌀 Animación de fondo con protección visual en zona de contenido
useEffect(() => {
  const canvas = document.getElementById("hero-particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let animationFrameId;

  const resizeCanvas = () => {
    const section = document.getElementById("inicio");
    if (!section) return;
    canvas.width = section.clientWidth;
    canvas.height = section.clientHeight;
  };

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const particleCount = 40;
  const colors = ["#1d4ed8", "#0ea5e9", "#0f172a"];
  const particles = [];

  // 🌫️ Función para atenuar cerca del centro (zona de texto)
  const getContentMaskOpacity = (x, y, width, height) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const safeRadius = Math.min(width, height) * 0.4;
    if (distance < safeRadius) {
      return 1 - (1 - distance / safeRadius) * 0.7;
    }
    return 1;
  };

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 1.6 + 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = Math.random() * 0.6 + 0.35;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -20) this.x = canvas.width + 20;
      if (this.x > canvas.width + 20) this.x = -20;
      if (this.y < -20) this.y = canvas.height + 20;
      if (this.y > canvas.height + 20) this.y = -20;
    }
    draw() {
      const maskFactor = getContentMaskOpacity(this.x, this.y, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity * maskFactor;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  const connectAll = () => {
    const sorted = [...particles].sort((a, b) => a.x - b.x);
    for (let i = 0; i < sorted.length; i++) {
      const p1 = sorted[i];
      const distances = [];
      for (let j = 0; j < sorted.length; j++) {
        if (i === j) continue;
        const p2 = sorted[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        distances.push({ particle: p2, dist });
      }
      distances.sort((a, b) => a.dist - b.dist);
      const closest = distances.slice(0, 3);
      closest.forEach(({ particle: p2, dist }) => {
        if (dist < 220) {
          ctx.beginPath();
          const baseOpacity = 0.07 + (0.1 * (1 - dist / 220));
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          const maskFactor = getContentMaskOpacity(midX, midY, canvas.width, canvas.height);
          ctx.strokeStyle = `rgba(59, 130, 246, ${baseOpacity * maskFactor})`;
          ctx.lineWidth = 1.1;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    connectAll();
    animationFrameId = requestAnimationFrame(animate);
  };

  animate();

  return () => {
    window.removeEventListener("resize", resizeCanvas);
    cancelAnimationFrame(animationFrameId);
  };
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

      {/* ====================== HERO SECTION ====================== */}
  
{/* ====================== HERO SECTION ====================== */}
<section
  id="inicio"
  className="relative pt-16 md:pt-24 min-h-screen flex items-center overflow-hidden"
>
  <canvas
    id="hero-particles"
    className="absolute inset-0 w-full h-full z-0"
  ></canvas>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
    <div className="max-w-4xl">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
        Impulsa tu negocio con
        <span className="text-blue-600 block sm:inline"> presencia digital</span>
      </h1>
      <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-6 max-w-3xl leading-relaxed">
        Ayudamos a pequeñas y medianas empresas a crecer online con páginas web profesionales, gestión de redes sociales y estrategias digitales efectivas.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={() => scrollToSection("contacto")}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all w-full sm:w-auto"
        >
          Pide tu asesoría gratuita
        </button>
        <button
          onClick={() => scrollToSection("servicios")}
          className="border-2 border-blue-600 text-blue-600 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-lg font-semibold hover:bg-blue-600 hover:text-white hover:shadow-xl hover:scale-105 transition-all w-full sm:w-auto"
        >
          Ver nuestros servicios
        </button>
      </div>
    </div>
  </div>
</section>
      {/* ====================== QUIÉNES SOMOS ====================== */}
      <section
        id="quienes-somos"
        className="py-12 md:py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <span className="inline-block px-4 py-1 sm:px-6 sm:py-2 bg-blue-100 text-blue-600 text-xs sm:text-sm font-semibold rounded-full mb-3">
              Nuestra Historia
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Quiénes <span className="text-blue-600">Somos</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Transformamos ideas en presencia digital real. No somos solo otra agencia, somos tu socio estratégico.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="glass-card bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2">Nuestra Misión</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                      Democratizar el acceso al marketing digital, proporcionando herramientas y estrategias que permitan a cualquier empresa competir en el mundo digital.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 glass-card bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mr-2" />
                  Nuestros Valores
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    "Resultados medibles y reales",
                    "Trato cercano y personalizado",
                    "Precios transparentes, sin sorpresas",
                    "Innovación constante",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 sm:space-x-3">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-xl p-4 sm:p-6 md:p-8 text-white text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Transformaciones Digitales</div>
                </div>
                <div className="mt-4 bg-gradient-to-r from-blue-50 to-green-50 p-4 sm:p-6 rounded-xl border border-blue-200">
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3">
                    ¿Quieres saber cómo podemos ayudarte a alcanzar tus objetivos?
                  </p>
                  <button
                    onClick={() => scrollToSection("contacto")}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all w-full sm:w-auto text-xs sm:text-sm"
                  >
                    Habla con nuestro equipo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== SERVICIOS Y PACKS ====================== */}
      <section id="servicios" className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Nuestros Servicios y Packs
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Ofrecemos soluciones digitales completas adaptadas a las necesidades de tu negocio
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-12 md:mb-20">
            {/* Pack Básico */}
            <div className="glass-card flex-1 bg-white border-2 border-gray-200 rounded-lg p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl hover:border-gray-300 transition-all duration-300 flex flex-col min-h-full">
              <div className="text-center mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Pack Básico</h3>
                <div className="flex items-baseline justify-center mb-3">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">150€</span>
                  <span className="text-gray-600 ml-1 text-xs sm:text-sm">/mes</span>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">Perfecto para empezar tu presencia digital</p>
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-4 flex-grow">
                {[
                  "Página web responsive",
                  "Gestión básica de redes",
                  "2 publicaciones semanales",
                  "Google My Business",
                  "Soporte por email",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-xs sm:text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollToSection("contacto")}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 sm:py-3 rounded-full font-semibold transition-colors mt-auto text-xs sm:text-sm"
              >
                Solicitar Información
              </button>
            </div>

            {/* Pack Medio */}
            <div className="glass-card flex-1 relative bg-white border-2 border-blue-600 rounded-lg p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col min-h-full">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1 sm:px-6 sm:py-2 rounded-full text-white text-xs sm:text-sm font-semibold">
                Más Popular
              </div>
              <div className="text-center mb-4 mt-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Pack Medio</h3>
                <div className="flex items-baseline justify-center mb-3">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">200€</span>
                  <span className="text-gray-600 ml-1 text-xs sm:text-sm">/mes</span>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">La opción más popular para hacer crecer tu negocio</p>
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-4 flex-grow">
                {[
                  "Página web avanzada",
                  "Gestión completa de redes",
                  "5 publicaciones semanales",
                  "Blog mensual",
                  "SEO básico",
                  "Analíticas",
                  "Soporte prioritario",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-xs sm:text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollToSection("contacto")}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 sm:py-3 rounded-full font-semibold hover:shadow-lg transition-all mt-auto text-xs sm:text-sm"
              >
                Solicitar Información
              </button>
            </div>

            {/* Pack Premium */}
            <div className="glass-card flex-1 bg-white border-2 border-green-500 rounded-lg p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl hover:border-green-600 transition-all duration-300 flex flex-col min-h-full">
              <div className="text-center mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Pack Premium</h3>
                <div className="flex items-baseline justify-center mb-3">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">450€</span>
                  <span className="text-gray-600 ml-1 text-xs sm:text-sm">/mes</span>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">Solución completa para empresas ambiciosas</p>
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-4 flex-grow">
                {[
                  "Página web ilimitada",
                  "Gestión premium de redes",
                  "Publicaciones diarias",
                  "Blog con 4 artículos",
                  "SEO avanzado",
                  "Campañas de publicidad",
                  "Consultor dedicado",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-xs sm:text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollToSection("contacto")}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 sm:py-3 rounded-full font-semibold hover:shadow-lg transition-all mt-auto text-xs sm:text-sm"
              >
                Solicitar Información
              </button>
            </div>
          </div>

          <div className="text-center mb-6 md:mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              También Ofrecemos Servicios Individuales
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Globe, title: "Desarrollo Web", desc: "Páginas rápidas y optimizadas" },
              { icon: Smartphone, title: "Redes Sociales", desc: "Contenido de calidad profesional" },
              { icon: Search, title: "SEO & SEM", desc: "Posicionamiento en Google" },
              { icon: BarChart3, title: "Analíticas", desc: "Medimos cada acción" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="glass-card text-center p-4 sm:p-6 bg-gray-50 rounded-lg hover:shadow-xl hover:bg-white transition-all duration-300 cursor-pointer"
                >
                  <div className="text-blue-600 mb-3">
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 mx-auto" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================== ¿POR QUÉ ELEGIRNOS? ====================== */}
      <section className="py-12 md:py-24 bg-gradient-to-br from-blue-50 via-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              ¿Por Qué Elegir Nex-v?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Somos más que una agencia digital. Somos tu socio estratégico para el crecimiento online.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: Users, title: "Trato Personalizado", desc: "Cada cliente es único para nosotros." },
              { icon: TrendingUp, title: "Resultados Medibles", desc: "Te mostramos el impacto real de nuestro trabajo." },
              { icon: MapPin, title: "Conocimiento Local", desc: "Entendemos tu mercado y competencia." },
              { icon: Zap, title: "Precios Transparentes", desc: "Sin costes ocultos ni sorpresas." },
              { icon: Rocket, title: "Soporte Continuo", desc: "Estamos aquí cuando nos necesites." },
              { icon: Clock, title: "Implementación Rápida", desc: "Primeros resultados en 30 días." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="glass-card bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">{item.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================== SOLUCIONES IT ====================== */}
      <section id="soluciones" className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Soluciones IT Personalizadas
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              No vendemos paquetes cerrados. Analizamos tu situación específica y creamos soluciones a medida que realmente resuelven tus problemas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="glass-card bg-white rounded-xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
              >
                <div className="text-blue-600 mb-3 group-hover:text-blue-700 transition-colors">
                  {solution.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {solution.title}
                </h3>
                <p className="text-gray-600 mb-3 text-xs sm:text-sm">{solution.shortDesc}</p>

                <button
                  onClick={() =>
                    setExpandedSolution(expandedSolution === index ? null : index)
                  }
                  className="text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-sm flex items-center transition-colors"
                >
                  {expandedSolution === index ? "Ver menos" : "Ver detalles"}
                  <ChevronRight
                    className={`w-4 h-4 ml-1 transition-transform ${
                      expandedSolution === index ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {expandedSolution === index && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <ul className="space-y-1 sm:space-y-2">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-xs sm:text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              ¿Tienes un problema diferente?
            </h3>
            <p className="text-gray-600 mb-4 text-xs sm:text-sm max-w-2xl mx-auto">
              No te preocupes si no encuentras exactamente lo que necesitas. En Nex-V estamos preparados para abordar cualquier desafío tecnológico.
              Si podemos ayudarte, lo haremos. Si no, te lo diremos honestamente.
            </p>
            <button
              onClick={() => scrollToSection("contacto")}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold text-sm sm:text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Cuéntanos tu caso
              <ChevronRight className="ml-2 w-4 h-4 inline" />
            </button>
          </div>
        </div>
      </section>

      {/* ====================== CONTACTO ====================== */}
      <section id="contacto" className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              ¿Listo para Impulsar tu Negocio?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Solicita tu asesoría gratuita y descubre cómo podemos ayudarte a crecer digitalmente
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 lg:gap-12 max-w-6xl mx-auto">
            <div className="glass-card bg-gray-50 p-4 sm:p-6 md:p-8 rounded-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Solicita tu Asesoría Gratuita</h3>

              {submitStatus === "success" && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center text-xs sm:text-sm">
                  ¡Gracias! Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center text-xs sm:text-sm">
                  Hubo un error. Por favor, inténtalo de nuevo.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-700 font-semibold text-xs sm:text-sm mb-1">Nombre *</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-xs sm:text-sm"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold text-xs sm:text-sm mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-xs sm:text-sm"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-700 font-semibold text-xs sm:text-sm mb-1">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-xs sm:text-sm"
                      placeholder="Tu número de teléfono"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold text-xs sm:text-sm mb-1">Empresa</label>
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-xs sm:text-sm"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold text-xs sm:text-sm mb-1">Servicio de Interés</label>
                  <select
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors bg-white cursor-pointer text-xs sm:text-sm"
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="pack-basico">Pack Básico</option>
                    <option value="pack-medio">Pack Medio</option>
                    <option value="pack-premium">Pack Premium</option>
                    <option value="web">Desarrollo Web</option>
                    <option value="redes">Redes Sociales</option>
                    <option value="seo">SEO & SEM</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold text-xs sm:text-sm mb-1">Mensaje</label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    rows="3"
                    maxLength="500"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors resize-none text-xs sm:text-sm"
                    placeholder="Cuéntanos sobre tu proyecto..."
                  ></textarea>
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {formData.mensaje.length}/500 caracteres
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitStatus === "sending"}
                  className={`w-full py-2 sm:py-3 rounded-lg font-semibold text-white transition-all text-xs sm:text-sm ${
                    submitStatus === "sending"
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-xl hover:scale-105"
                  }`}
                >
                  {submitStatus === "sending" ? "Enviando..." : "Solicitar Asesoría Gratuita"}
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <div className="glass-card hover:shadow-lg p-4 sm:p-6 rounded-lg transition-shadow">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Información de Contacto</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-xs sm:text-sm mb-1">Dirección</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        Madrid, España
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-xs sm:text-sm mb-1">Teléfono</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        <a href="tel:+34692877125" className="hover:text-green-600 transition-colors">+34 692 87 71 25</a>
                        <br />
                        <a href="tel:+34692930604" className="hover:text-green-600 transition-colors">+34 692 93 06 04</a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-xs sm:text-sm mb-1">Email</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        <a
                          href="mailto:office.nexv@gmail.com"
                          className="hover:text-blue-600 transition-colors underline"
                        >
                          office.nexv@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-xs sm:text-sm mb-1">Horario</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">Lunes a Viernes: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 sm:p-6 rounded-lg text-white hover:shadow-xl transition-all duration-300">
                <h4 className="font-bold text-lg sm:text-xl mb-3">¿Prefieres llamarnos?</h4>
                <p className="mb-3 text-xs sm:text-sm">Estamos aquí para resolver tus dudas.</p>
                <a
                  href="tel:+34692877125"
                  className="inline-block bg-white text-green-600 px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors text-xs sm:text-sm text-center w-full sm:w-auto"
                >
                  Llamar Ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;