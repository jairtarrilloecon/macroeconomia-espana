"use client";

import { motion } from "framer-motion";
import { macroData, type QuarterData } from "@/lib/dataStore";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const components: {
  key: keyof QuarterData;
  xAxisKey: keyof QuarterData;
  title: string;
  formula: string;
  color: string;
  text: string;
  howToRead: string;
  events: string[];
}[] = [
  {
    key: "C",
    xAxisKey: "YD",
    title: "Consumo: C = f(YD)",
    formula: "C",
    color: "#2563EB",
    text: "Muestra la relación entre el Ingreso Disponible y el Consumo. Los puntos siguen una línea ascendente clara, indicando que a mayor ingreso, mayor consumo.",
    howToRead: "Eje X: Ingreso Disponible (YD). Eje Y: Consumo (C). La pendiente de los puntos representa la propensión marginal a consumir.",
    events: [
      "2004-2007: Crecimiento lineal y estable.",
      "2008-2009: Caída por la crisis financiera.",
      "2020: Caída vertical por el confinamiento.",
      "2021-2023: Recuperación rápida."
    ]
  },
  {
    key: "I",
    xAxisKey: "r",
    title: "Inversión: I = f(r)",
    formula: "I",
    color: "#D97706",
    text: "Muestra la relación entre la Tasa de Interés Real y la Inversión. Se espera una relación inversa: a mayor tasa de interés, menor inversión.",
    howToRead: "Eje X: Tasa de Interés Real (r). Eje Y: Inversión (I). Los puntos deberían mostrar una tendencia descendente.",
    events: [
      "2004-2007: Inversión alta con tasas moderadas (burbuja).",
      "2008-2013: Desplome de la inversión a pesar de la bajada de tasas.",
      "2020: Parón por incertidumbre."
    ]
  },
  {
    key: "M",
    xAxisKey: "Y",
    title: "Importaciones: M = f(Y)",
    formula: "M",
    color: "#0F9F88",
    text: "Muestra cómo aumentan las importaciones a medida que crece el PBI. Es una relación positiva muy marcada en la economía española.",
    howToRead: "Eje X: PBI (Y). Eje Y: Importaciones (M). Muestra la propensión marginal a importar.",
    events: [
      "2004-2007: Importaciones disparadas por el fuerte crecimiento interno.",
      "2008-2009: Desplome de las importaciones por el parón del consumo y la inversión.",
      "2020: Caída por la pandemia y posterior recuperación."
    ]
  },
  {
    key: "XN",
    xAxisKey: "Yext",
    title: "Sector Externo: XN = f(Yext)",
    formula: "XN",
    color: "#E24A3B",
    text: "Muestra la relación entre el Ingreso Externo y las Exportaciones Netas. Se espera que a mayor ingreso de nuestros socios comerciales, más exportemos.",
    howToRead: "Eje X: Ingreso Externo (Yext). Eje Y: Exportaciones Netas (XN).",
    events: [
      "2004-2007: Déficit profundo a pesar del crecimiento externo.",
      "2008-2013: Mejora del saldo exterior por caída de importaciones y empuje exportador."
    ]
  }
];

export default function ComponentesDemanda() {
  return (
    <section id="demanda" className="bg-white py-28">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-brand-teal">
              Demanda agregada
            </span>
            <h2 className="mt-6 font-playfair text-5xl font-bold leading-[1.04] text-brand-dark md:text-7xl">
              Gráficos de Dispersión
            </h2>
          </div>
          <div className="max-w-md text-base leading-7 text-slate-600">
            <p>
              Hemos ajustado las variables de los gráficos para que coincidan exactamente con tus gráficos de Excel.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {components.map((item, index) => (
            <motion.article
              key={item.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[8px] border border-brand-border bg-slate-50 p-4"
            >
              <div className="mb-4 rounded-[8px] bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="font-playfair text-2xl font-bold text-brand-dark">{item.title}</h3>
                  <span
                    className="rounded-full px-3 py-1 font-mono text-[11px] font-bold"
                    style={{ background: `${item.color}18`, color: item.color }}
                  >
                    {item.formula}
                  </span>
                </div>
                <p className="text-sm leading-6 text-slate-600">{item.text}</p>
              </div>

              <div className="h-64 w-full bg-white p-4 rounded-[8px] border border-brand-border mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" />
                    <XAxis 
                      type="number" 
                      dataKey={item.xAxisKey} 
                      name={String(item.xAxisKey)} 
                      domain={['auto', 'auto']}
                      tick={{ fontSize: 10, fill: "#98A2B3" }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => {
                        if (item.xAxisKey === "r") return `${Number(value).toFixed(1)}%`;
                        return `${(Number(value) / 1000).toFixed(0)}k`;
                      }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey={item.key} 
                      name={String(item.key)} 
                      domain={['auto', 'auto']}
                      tick={{ fontSize: 10, fill: "#98A2B3" }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${(Number(value) / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #DDE5F0",
                        borderRadius: "10px",
                        fontSize: "12px",
                      }}
                      formatter={(value, name) => [
                        item.xAxisKey === "r" && name === "r" ? `${Number(value).toFixed(2)}%` : `${Number(value).toLocaleString("es-ES")} M€`, 
                        name
                      ]}
                    />
                    <Scatter 
                      name={item.title} 
                      data={macroData} 
                      fill={item.color} 
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-4 rounded-[8px] border border-brand-border">
                <div className="mb-2 text-xs text-slate-700 bg-slate-50 p-3 rounded">
                  <span className="font-semibold text-brand-dark">Cómo leerlo:</span> {item.howToRead}
                </div>
                <div className="text-xs text-slate-600">
                  <span className="font-semibold text-brand-dark">Evolución por años:</span>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {item.events.map((event, i) => (
                      <li key={i}>{event}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
