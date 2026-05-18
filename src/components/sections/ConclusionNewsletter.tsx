"use client";

import { motion } from "framer-motion";

const conclusions = [
  {
    num: "01",
    title: "El consumo sostiene la base",
    text: "Durante 2004-2023, el consumo privado conserva su peso dominante. Sus caídas en 2009 y 2020 revelan con nitidez los momentos de choque.",
    color: "#2563EB",
  },
  {
    num: "02",
    title: "La inversión marca la volatilidad",
    text: "La formación de capital responde con fuerza a expectativas, crédito y tasa de interés. Por eso el quiebre inmobiliario se nota tanto en la serie.",
    color: "#D97706",
  },
  {
    num: "03",
    title: "El Estado amortigua el ciclo",
    text: "El gasto público opera como estabilizador cuando la demanda privada pierde fuerza, especialmente en las crisis de 2009 y 2020.",
    color: "#0F9F88",
  },
  {
    num: "04",
    title: "La apertura limita el multiplicador",
    text: "El multiplicador no crece sin límite: impuestos e importaciones filtran parte del impulso, por lo que la política fiscal debe estar bien dirigida.",
    color: "#E24A3B",
  },
];

const sources = [
  "Eurostat - National Accounts, Quarterly",
  "Eurostat - Government Finance Statistics",
  "Banco de España - Cuentas Financieras",
  "FMI - World Economic Outlook Database",
  "OCDE - Revenue Statistics & Fiscal Multipliers",
  "Keynes, J.M. (1936). The General Theory of Employment, Interest and Money.",
];

export default function ConclusionNewsletter() {
  return (
    <section id="conclusion" className="bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] py-28">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 grid gap-8 md:grid-cols-[1fr_0.72fr] md:items-end"
        >
          <div>
            <span className="inline-flex rounded-full bg-red-50 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-brand-accent">
              Síntesis final
            </span>
            <h2 className="mt-6 font-playfair text-5xl font-bold leading-[1.02] text-brand-dark md:text-7xl">
              Qué nos deja la demanda agregada.
            </h2>
          </div>
          <p className="text-base leading-7 text-slate-600">
            La economía española muestra resiliencia, pero también límites: consumo fuerte,
            inversión volátil, gasto público estabilizador y apertura externa como filtro del
            multiplicador.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {conclusions.map((item, index) => (
            <motion.article
              key={item.num}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="light-panel rounded-[8px] p-7 soft-transition hover:-translate-y-1"
            >
              <div className="mb-8 flex items-start justify-between gap-6">
                <span className="font-playfair text-6xl font-bold leading-none" style={{ color: item.color }}>
                  {item.num}
                </span>
                <span className="mt-3 h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-brand-dark">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 rounded-[8px] border border-brand-border bg-white p-8 shadow-[0_24px_70px_rgba(23,32,51,0.08)] md:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
              Fuentes y referencias
            </span>
            <h3 className="mt-4 font-playfair text-3xl font-bold text-brand-dark">
              Base documental del análisis
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Las fuentes se muestran de forma visible para que la exposición mantenga trazabilidad
              académica sin romper el ritmo visual.
            </p>
          </div>
          <ul className="grid gap-2">
            {sources.map((source) => (
              <li
                key={source}
                className="rounded-[8px] border border-brand-border bg-slate-50 px-4 py-3 text-sm text-slate-600"
              >
                {source}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
