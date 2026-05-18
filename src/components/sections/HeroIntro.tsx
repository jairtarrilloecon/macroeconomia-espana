"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

function NavItem({ href, label, accent }: { href: string; label: string; accent: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-5 rounded-[8px] border border-brand-border bg-white/78 px-4 py-3 text-brand-dark shadow-[0_16px_44px_rgba(23,32,51,0.08)] backdrop-blur-md soft-transition hover:-translate-y-1 hover:border-transparent hover:bg-white md:px-5 md:py-4"
    >
      <span className="text-xs font-semibold uppercase tracking-widest md:text-sm">{label}</span>
      <span
        className="h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-[1.8]"
        style={{ backgroundColor: accent }}
      />
    </Link>
  );
}

function SpainClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("es-ES", {
        timeZone: "Europe/Madrid",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(formatted);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      suppressHydrationWarning
      className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-brand-border bg-white/70 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-brand-gray backdrop-blur"
    >
      España &nbsp;{time}
    </div>
  );
}

const navItems = [
  { href: "/contexto", label: "Contexto", accent: "#2563EB" },
  { href: "/demanda", label: "Demanda", accent: "#0F9F88" },
  { href: "/multiplicador", label: "Multiplicador", accent: "#D97706" },
  { href: "/conclusion", label: "Conclusión", accent: "#E24A3B" },
];

export default function HeroIntro() {
  return (
    <section className="relative flex h-screen w-full items-center overflow-hidden px-6 pb-20 pt-28">
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-45">
          <source src="/VIDEO.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(248,250,252,0.96)_0%,rgba(248,250,252,0.82)_48%,rgba(236,253,245,0.72)_100%)]" />
      </div>

      <div className="section-shell relative z-10 grid items-center gap-8 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-border bg-white/72 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-brand-gray backdrop-blur md:mb-6">
            <span className="h-2 w-2 rounded-full bg-brand-teal" />
            España 2004-2023
          </div>
          <h1 className="max-w-3xl font-playfair text-5xl font-bold leading-[0.98] text-brand-dark sm:text-6xl md:text-8xl">
            Macroeconomía clara, visual y bien conectada.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:mt-7 md:text-lg md:leading-8">
            Una lectura interactiva de la demanda agregada, el PBI y el multiplicador
            keynesiano con datos, gráficos y conclusiones listas para exponer.
          </p>
          <div className="mt-7 grid max-w-xl grid-cols-3 gap-3 md:mt-10">
            {[
              ["74", "trimestres"],
              ["20", "años"],
              ["4", "bloques"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-[8px] border border-brand-border bg-white/76 p-3 shadow-sm backdrop-blur md:p-4">
                <div className="font-playfair text-2xl font-bold text-brand-dark md:text-3xl">{value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-widest text-brand-gray">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-3"
          aria-label="Secciones principales"
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 + index * 0.08 }}
            >
              <NavItem {...item} />
            </motion.div>
          ))}
        </motion.nav>
      </div>

      <SpainClock />
    </section>
  );
}
