"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const PARAMS = {
  c: 0.915,
  t: 0.395,
  m: 0.32,
  k_formula: "1 / [1 - c(1-t) + m]",
};

const cAfterTaxes = PARAMS.c * (1 - PARAMS.t);
const denominator = 1 - cAfterTaxes + PARAMS.m;
const multiplier = Number((1 / denominator).toFixed(3));

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.14, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  }),
};

function ParamCard({ label, value, desc, color }: { label: string; value: string; desc: string; color: string }) {
  return (
    <div className="light-panel rounded-[8px] p-6">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-brand-gray">{label}</div>
      <div className="font-playfair text-5xl font-bold" style={{ color }}>
        {value}
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
    </div>
  );
}

export default function MultiplicadorKeynesiano() {
  const steps = [
    {
      step: "1",
      label: "Ingreso que vuelve al consumo",
      formula: `${PARAMS.c} x (1 - ${PARAMS.t}) = ${cAfterTaxes.toFixed(4)}`,
    },
    {
      step: "2",
      label: "Denominador del modelo",
      formula: `1 - ${cAfterTaxes.toFixed(4)} + ${PARAMS.m} = ${denominator.toFixed(4)}`,
    },
    {
      step: "3",
      label: "Multiplicador",
      formula: `1 / ${denominator.toFixed(4)} = ${multiplier}`,
    },
  ];

  return (
    <section id="multiplicador" className="bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] py-28">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end"
        >
          <div>
            <span className="inline-flex rounded-full bg-amber-50 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-brand-amber">
              Modelo clave
            </span>
            <h2 className="mt-6 font-playfair text-5xl font-bold leading-[1.02] text-brand-dark md:text-7xl">
              Multiplicador keynesiano.
            </h2>
          </div>
          <p className="text-base leading-7 text-slate-600">
            La idea central es simple: un cambio autónomo en el gasto genera rondas sucesivas de
            ingreso, consumo e importaciones. En una economía abierta, las filtraciones moderan el
            resultado final.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.78fr]">
          <div className="rounded-[8px] border border-brand-border bg-white p-8 shadow-[0_24px_70px_rgba(23,32,51,0.08)]">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-brand-border pb-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
                  Fórmula general
                </span>
                <div className="mt-3 font-playfair text-3xl font-bold text-brand-dark md:text-4xl">
                  k = {PARAMS.k_formula}
                </div>
              </div>
              <div className="rounded-[8px] bg-amber-50 px-5 py-4 text-brand-amber">
                <div className="font-mono text-[10px] uppercase tracking-widest">Resultado</div>
                <div className="font-playfair text-5xl font-bold">{multiplier}</div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <ParamCard
                label="c - propensión a consumir"
                value={PARAMS.c.toFixed(3)}
                color="#2563EB"
                desc={`Por cada euro adicional de ingreso disponible, los hogares consumen ${(PARAMS.c * 100).toFixed(1)} céntimos.`}
              />
              <ParamCard
                label="t - presión tributaria"
                value={`${(PARAMS.t * 100).toFixed(1)}%`}
                color="#0F9F88"
                desc="Resume la proporción del ingreso que se retira del circuito privado mediante impuestos."
              />
              <ParamCard
                label="m - propensión a importar"
                value={PARAMS.m.toFixed(3)}
                color="#E24A3B"
                desc={`De cada euro adicional, cerca de ${(PARAMS.m * 100).toFixed(0)} céntimos se orientan a importaciones.`}
              />
            </div>

            <div className="mt-10 grid gap-5">
              {steps.map((item, index) => (
                <motion.div
                  key={item.step}
                  custom={index}
                  variants={stepVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex gap-5 rounded-[8px] border border-brand-border bg-slate-50 p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-playfair text-xl font-bold text-brand-amber shadow-sm">
                    {item.step}
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
                      {item.label}
                    </div>
                    <div className="mt-1 font-playfair text-2xl font-bold text-brand-dark">
                      {item.formula}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[8px] bg-[linear-gradient(145deg,#FFF7ED_0%,#EFF6FF_100%)] p-8 shadow-[0_24px_70px_rgba(23,32,51,0.08)]"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
              Interpretación
            </div>
            <div className="mt-5 font-playfair text-[88px] font-bold leading-none text-brand-amber">
              {multiplier}
            </div>
            <p className="mt-6 text-base leading-8 text-slate-700">
              Un aumento autónomo de 1 euro en el gasto genera aproximadamente {multiplier} euros
              de PBI. El efecto es moderado porque impuestos e importaciones reducen las rondas
              internas de consumo.
            </p>
            <div className="mt-8 border-l-4 border-brand-blue bg-white/72 p-5 text-sm leading-7 text-slate-600">
              Si la propensión a importar fuese cercana a cero, el multiplicador subiría a{" "}
              <strong>{(1 / (1 - cAfterTaxes)).toFixed(2)}</strong>. La apertura comercial explica
              una parte importante de la diferencia.
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
