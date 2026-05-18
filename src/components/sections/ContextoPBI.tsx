"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { macroData, type QuarterData } from "@/lib/dataStore";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { BarChart2, ChevronDown, ExternalLink, Globe, TrendingDown, TrendingUp } from "lucide-react";

type VarKey = keyof Pick<QuarterData, "Y" | "C" | "I" | "G" | "XN" | "YD">;

const VARS: { key: VarKey; label: string; color: string; soft: string }[] = [
  { key: "Y", label: "PBI", color: "#2563EB", soft: "rgba(37,99,235,0.11)" },
  { key: "C", label: "Consumo", color: "#0F9F88", soft: "rgba(15,159,136,0.12)" },
  { key: "I", label: "Inversión", color: "#D97706", soft: "rgba(217,119,6,0.13)" },
  { key: "G", label: "Gasto Púb.", color: "#7C3AED", soft: "rgba(124,58,237,0.11)" },
  { key: "XN", label: "Export. Net.", color: "#E24A3B", soft: "rgba(226,74,59,0.11)" },
  { key: "YD", label: "Ing. Disp.", color: "#0891B2", soft: "rgba(8,145,178,0.12)" },
];

const YEARS = Array.from(new Set(macroData.map((d) => d.year))).sort();

type NewsItem = {
  tag: string;
  title: string;
  movement: string;
  body: string;
  src: string;
  url: string;
  related?: {
    label: string;
    url: string;
  }[];
};const NEWS: Record<number, NewsItem> = {
  2004: {
    tag: "Expansión inicial",
    title: "Fuerte tirón de la demanda interna",
    movement: "PBI +5,9%; C +5,5%; YD +5,2%; G +7,1%; X +6,0%; M +10,4%.",
    body: "Refleja el inicio expansivo del periodo: incremento en PBI, consumo e inversión, acompañado de mayores importaciones por tracción de la demanda interna.",
    src: "La Vanguardia",
    url: "https://www.lavanguardia.com/economia/20050223/51262805096/la-economia-espanola-crecio-un-2-7-en-2004-por-el-fuerte-tiron-de-la-demanda-interna.html",
  },
  2005: {
    tag: "Demanda interna",
    title: "Fortaleza del consumo doméstico",
    movement: "PBI +6,5%; C +6,3%; YD +5,2%; G +6,1%; X +7,0%; M +7,7%.",
    body: "Muestra la continuidad del crecimiento en 2005, impulsado por la fortaleza persistente del consumo y la inversión.",
    src: "Consumer / Eroski",
    url: "https://www.consumer.es/economia-domestica/la-economia-espanola-crecio-un-34-en-2005-gracias-a-la-fortaleza-del-consumo-domestico-y-al-auge-de-la-inversion-en-equipos.html",
  },
  2006: {
    tag: "Crecimiento alto",
    title: "La economía termina 2006 con crecimiento",
    movement: "PBI +5,8%; C +5,1%; YD +4,1%; G +6,8%; X +7,0%; M +6,4%.",
    body: "Caracteriza a 2006 como una etapa de alto crecimiento con avances en PBI, consumo, inversión y gasto, a pesar de la presión en el sector exterior.",
    src: "Consumer / Eroski",
    url: "https://www.consumer.es/economia-domestica/el-ano-2006-termino-para-la-economia-espanola-con-un-crecimiento-del-38-segun-el-banco-de-espana.html",
  },
  2007: {
    tag: "Cambio de ciclo",
    title: "Señales de riesgo en el mercado inmobiliario",
    movement: "PBI +4,4%; C +5,5%; YD +6,2%; G +7,6%; X +3,6%; M +6,8%.",
    body: "Señala el cambio de ciclo, donde el crecimiento del PBI convive con los primeros riesgos en la inversión inmobiliaria.",
    src: "The Guardian",
    url: "https://www.theguardian.com/money/2007/apr/29/expatfinance.property",
  },
  2008: {
    tag: "Giro de crisis",
    title: "Crisis en España desde 2008",
    movement: "PBI -0,7%; C -2,8%; YD +6,3%; G +5,6%; X -7,5%; M -14,9%.",
    body: "Evidencia el giro drástico de tendencia por el estallido de la crisis financiera e inmobiliaria, frenando la demanda.",
    src: "RTVE",
    url: "https://www.rtve.es/noticias/20120605/crisis-espana-cronologia-desde-2008/533400.shtml",
  },
  2009: {
    tag: "Recesión",
    title: "Caída del consumo y la inversión",
    movement: "PBI -0,9%; C -0,2%; YD -0,2%; G +3,0%; X +7,5%; M +10,0%.",
    body: "Registra la caída de consumo e inversión; la contracción de la demanda interna reduce las importaciones y altera el saldo exterior.",
    src: "RTVE",
    url: "https://www.rtve.es/noticias/20090520/la-caida-del-consumo-y-la-inversion-arrastran-al-pib-que-se-desploma-un-3-la-peor-cifra-de-la-historia/277171.shtml",
  },
  2010: {
    tag: "Rebote débil",
    title: "España sale apenas de la recesión",
    movement: "PBI +0,5%; C +1,8%; YD +1,0%; G -1,0%; X +14,0%; M +11,7%.",
    body: "Muestra un rebote débil donde el PBI estabiliza su caída, pero el consumo y la inversión no logran recuperar dinamismo.",
    src: "The Guardian",
    url: "https://www.theguardian.com/business/2010/may/07/spain-scrapes-out-of-recession",
  },
  2011: {
    tag: "Deuda y ajuste",
    title: "Presión por la crisis de deuda",
    movement: "PBI -2,0%; C -1,3%; YD -2,3%; G -1,8%; X +1,7%; M -1,8%.",
    body: "Describe el periodo de estancamiento donde la deuda, el desempleo y el ajuste fiscal limitan el consumo, ingreso y gasto.",
    src: "RTVE",
    url: "https://www.rtve.es/noticias/20120605/crisis-espana-cronologia-desde-2008/533400.shtml",
  },
  2012: {
    tag: "Rescate bancario",
    title: "España pide rescate bancario a la eurozona",
    movement: "PBI -3,2%; C -2,1%; YD -5,2%; G -10,4%; X +3,9%; M -2,6%.",
    body: "Asocia la debilidad del PBI y la inversión con la crisis bancaria, los ajustes y la restricción crediticia.",
    src: "The Guardian",
    url: "https://www.theguardian.com/business/2012/jun/09/spain-bailout-eurozone-banks",
  },
  2013: {
    tag: "Punto bajo",
    title: "España sale de la recesión",
    movement: "PBI -0,5%; C +0,7%; YD -1,3%; G -0,1%; X +0,6%; M +2,6%.",
    body: "Identifica el punto de inflexión y el inicio de la recuperación económica observable desde este año.",
    src: "The Guardian",
    url: "https://www.theguardian.com/business/2013/oct/30/spain-emerges-recession",
  },
  2014: {
    tag: "Recuperación",
    title: "La economía crece 1,4% en 2014",
    movement: "PBI +1,9%; C +1,9%; YD +2,9%; G +0,6%; X +4,5%; M +3,8%.",
    body: "Muestra la recuperación gradual del PBI y el consumo, mientras la inversión comienza a mejorar desde mínimos.",
    src: "RTVE",
    url: "https://www.rtve.es/noticias/20150130/economia-espanola-crecio-14-2014-segun-ine/1090040.shtml",
  },
  2015: {
    tag: "Recuperación fuerte",
    title: "Mayor ritmo de crecimiento desde la crisis",
    movement: "PBI +2,7%; C +2,2%; YD +3,4%; G +2,2%; X +3,2%; M +3,9%.",
    body: "Sustenta el tramo de fuerte recuperación con alzas en producción, consumo, inversión y exportación de servicios.",
    src: "The Guardian",
    url: "https://www.theguardian.com/business/2015/jul/30/spain-economy-growth-unemployment",
  },
  2016: {
    tag: "Continuidad",
    title: "La economía crece 3,2% en 2016",
    movement: "PBI +2,4%; C +3,1%; YD +1,9%; G +0,8%; X +6,3%; M +6,1%.",
    body: "Confirma la continuidad de la recuperación, apoyada en el consumo interno y la creación de empleo.",
    src: "RTVE",
    url: "https://www.rtve.es/n/1497242",
  },
  2017: {
    tag: "Consumo fuerte",
    title: "El consumo privado mantiene el crecimiento",
    movement: "PBI +3,4%; C +2,9%; YD +3,4%; G +1,6%; X +4,0%; M +4,3%.",
    body: "Vincula el consumo fuerte con el crecimiento del PBI, frente a una menor aportación del sector exterior.",
    src: "RTVE",
    url: "https://www.rtve.es/noticias/20180301/consumo-privado-mantuvo-crecimiento-del-31-2017-compenso-freno-del-sector-exterior-a-final-ano/1686648.shtml",
  },
  2018: {
    tag: "Moderación",
    title: "España crece 2,3% en 2018",
    movement: "PBI +3,2%; C +1,6%; YD +1,5%; G +3,9%; X +2,9%; M +3,4%.",
    body: "Indica un crecimiento aún positivo pero con menor dinamismo en comparación con la fase de recuperación inicial.",
    src: "RTVE",
    url: "https://www.rtve.es/noticias/20190329/economia-espanola-crecio-23-2018/1912580.shtml",
  },
  2019: {
    tag: "Desaceleración",
    title: "Menor alza en cinco años",
    movement: "PBI +2,1%; C +3,3%; YD +3,0%; G +3,0%; X -2,0%; M -2,0%.",
    body: "Documenta la desaceleración previa al impacto de la pandemia, manteniendo no obstante un nivel elevado de producción.",
    src: "RTVE",
    url: "https://www.rtve.es/noticias/20200131/espana-crecio-2-2019-su-menor-alza-cinco-anos/1997836.shtml",
  },
  2020: {
    tag: "Pandemia",
    title: "La economía se hunde en 2020",
    movement: "PBI -2,9%; C -4,9%; YD -4,7%; G +4,7%; X -8,4%; M -7,7%.",
    body: "Registra el impacto histórico de la pandemia con caídas severas en PBI, consumo, inversión y turismo.",
    src: "RTVE",
    url: "https://www.rtve.es/noticias/20210129/economia-se-hunde-2020/2070526.shtml",
    related: [
      {
        label: "Exportaciones en pandemia",
        url: "https://www.rtve.es/noticias/20210219/exportaciones-cierran-ano-pandemia-con-caida-del-10/2077340.shtml",
      },
      {
        label: "Déficit público 2020",
        url: "https://www.rtve.es/noticias/20210329/deficit-publico-2020/2084020.shtml",
      },
    ],
  },
  2021: {
    tag: "Reapertura",
    title: "El PIB crece con la recuperación",
    movement: "PBI +8,8%; C +9,5%; YD +6,5%; G +3,1%; X +24,4%; M +28,0%.",
    body: "Describe la intensa recuperación posterior al choque pandémico, aunque con un comportamiento dispar entre sectores.",
    src: "RTVE",
    url: "https://www.rtve.es/noticias/20220128/pib-2021/2273140.shtml",
    related: [
      {
        label: "Consumo de hogares",
        url: "https://www.rtve.es/noticias/20220915/ine-revisa-alza-pib-espana-consumo-hogares/2402252.shtml",
      },
      {
        label: "Plan de recuperación UE",
        url: "https://www.euronews.com/my-europe/2021/06/16/eu-approves-spain-s-recovery-plan-paving-way-for-69-5-billion-in-grants",
      },
    ],
  },
  2022: {
    tag: "Inflación y energía",
    title: "España crece pese a la inflación",
    movement: "PBI +7,9%; C +6,5%; YD +9,8%; G +5,9%; X +14,9%; M +8,3%.",
    body: "Muestra la continuidad de la recuperación del PBI en un contexto de fuerte presión inflacionaria sobre costes y consumo.",
    src: "RTVE",
    url: "https://www.rtve.es/noticias/20230127/pib-espana-2022/2418287.shtml",
    related: [
      {
        label: "Alza de energía",
        url: "https://www.rtve.es/noticias/20220616/alza-energia-quintuplica-deficit-comercial-con-21811-millones-hasta-abril/2384238.shtml",
      },
      {
        label: "Tasa de ahorro",
        url: "https://www.rtve.es/noticias/20230331/tasa-ahorro-hogares-espanoles-se-hundio-hasta-72/2434710.shtml",
      },
    ],
  },
  2023: {
    tag: "Resiliencia",
    title: "La economía española resiste en 2023",
    movement: "PBI +4,3%; C +5,5%; YD +2,7%; G +4,3%; X -2,0%; M -1,4%.",
    body: "Refleja la consecución de máximos en PBI y consumo, sustentada en el empleo y la plena normalización de la actividad.",
    src: "RTVE",
    url: "https://www.rtve.es/noticias/20240130/economia-espanola-resiste-pib-2023/15947389.shtml",
    related: [
      {
        label: "Récord de turismo",
        url: "https://www.rtve.es/noticias/20240202/ano-record-turismo-espana-85-millones-turistas-internacionales/15952911.shtml",
      },
      {
        label: "Déficit comercial",
        url: "https://www.rtve.es/noticias/20240219/deficit-comercial-espana-baja-mas-43-hasta-40560-millones-euros-2023/15976264.shtml",
      },
    ],
  },
};

function getNews(year: number) {
  const keys = Object.keys(NEWS)
    .map(Number)
    .sort((a, b) => b - a);
  return NEWS[keys.find((key) => key <= year) ?? keys[0]];
}

function formatMoney(value: number) {
  return value.toLocaleString("es-ES", { maximumFractionDigits: 0 });
}

function openNewsLink(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function NewsLinkSwitch({ news }: { news: NewsItem }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-24 w-12 shrink-0 rounded-full border border-brand-border bg-[linear-gradient(180deg,#FFFFFF_0%,#EFF6FF_100%)] shadow-[0_12px_32px_rgba(37,99,235,0.12)]">
        <motion.button
          type="button"
          drag="y"
          dragConstraints={{ top: 0, bottom: 48 }}
          dragElastic={0.06}
          whileTap={{ scale: 0.96 }}
          onClick={() => openNewsLink(news.url)}
          onDragEnd={(_, info) => {
            if (info.offset.y > 26 || info.velocity.y > 280) {
              openNewsLink(news.url);
            }
          }}
          className="absolute left-1/2 top-2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-blue-100 bg-white text-brand-blue shadow-sm soft-transition hover:border-brand-blue"
          aria-label={`Abrir fuente de ${news.title}`}
          title="Desliza hacia abajo para abrir la fuente"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.button>
        <span className="pointer-events-none absolute inset-x-0 bottom-3 text-center font-mono text-[8px] uppercase tracking-widest text-slate-400">
          link
        </span>
      </div>
      <div className="hidden text-[10px] uppercase tracking-widest text-slate-400 sm:block">
        Desliza para abrir
      </div>
    </div>
  );
}

export default function ContextoPBI() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selVar, setSelVar] = useState<VarKey>("Y");
  const [selYears, setSelYears] = useState<number[]>([]);
  const [newsYear, setNewsYear] = useState(2023);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const introOpacity = useTransform(scrollYProgress, [0, 0.24, 0.42], [1, 0.62, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.42], [0, -72]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleYear = (year: number) => {
    setSelYears((previous) =>
      previous.includes(year) ? previous.filter((item) => item !== year) : [...previous, year],
    );
    setNewsYear(year);
  };

  const filtered = useMemo(
    () => (selYears.length ? macroData.filter((item) => selYears.includes(item.year)) : macroData),
    [selYears],
  );
  const variable = VARS.find((item) => item.key === selVar) ?? VARS[0];
  const news = getNews(newsYear);

  const stats = [
    { icon: TrendingUp, label: "PBI máximo", val: "384.904 M€", sub: "2023-Q4", color: "#2563EB" },
    { icon: TrendingDown, label: "Caída COVID", val: "-9.9%", sub: "2020", color: "#E24A3B" },
    { icon: Globe, label: "Recuperación", val: "+9.4%", sub: "2021", color: "#0F9F88" },
    { icon: BarChart2, label: "Serie", val: "74 trim.", sub: "2004-2023", color: "#D97706" },
  ];

  return (
    <section ref={sectionRef} id="contexto" className="bg-brand-light py-28">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{ opacity: introOpacity, y: introY }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="grid items-end gap-10 md:grid-cols-[1fr_0.86fr]"
        >
          <div>
            <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-brand-blue">
              Contexto y PBI
            </span>
            <h2 className="mt-6 max-w-3xl font-playfair text-5xl font-bold leading-[1.02] text-brand-dark md:text-7xl">
              Una lectura clara del ciclo económico español.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              El panel cruza producción, consumo, inversión, gasto público y sector externo para
              conectar datos con los principales hitos económicos del periodo.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="light-panel rounded-[8px] p-5"
              >
                <item.icon className="mb-4 h-5 w-5" style={{ color: item.color }} />
                <div className="font-playfair text-3xl font-bold text-brand-dark">{item.val}</div>
                <div className="mt-1 text-[11px] uppercase tracking-widest text-brand-gray">
                  {item.label}
                </div>
                <div className="mt-1 font-mono text-[11px]" style={{ color: item.color }}>
                  {item.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-16 overflow-hidden rounded-[8px] border border-brand-border bg-white shadow-[0_24px_70px_rgba(23,32,51,0.09)]"
        >
          <div className="flex flex-wrap items-center gap-4 border-b border-brand-border bg-slate-50/80 px-5 py-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
              Variable
            </span>
            <div className="flex flex-wrap gap-2">
              {VARS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setSelVar(item.key)}
                  className="rounded-full border px-3 py-1.5 font-mono text-[10px] font-semibold soft-transition hover:-translate-y-0.5"
                  style={{
                    background: selVar === item.key ? item.soft : "#FFFFFF",
                    color: selVar === item.key ? item.color : "#667085",
                    borderColor: selVar === item.key ? `${item.color}55` : "#DDE5F0",
                  }}
                >
                  {item.key}
                </button>
              ))}
            </div>

            <div className="hidden h-6 w-px bg-brand-border md:block" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
              Año
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelYears([])}
                className={`rounded-full border px-3 py-1.5 font-mono text-[9px] soft-transition ${
                  !selYears.length
                    ? "border-brand-dark bg-brand-dark text-white"
                    : "border-brand-border bg-white text-brand-gray hover:text-brand-dark"
                }`}
              >
                Todo
              </button>
              {YEARS.map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => toggleYear(year)}
                  className={`rounded-full border px-2.5 py-1.5 font-mono text-[9px] soft-transition ${
                    selYears.includes(year)
                      ? "border-brand-blue bg-blue-50 text-brand-blue"
                      : "border-brand-border bg-white text-slate-500 hover:text-brand-blue"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
            <div className="ml-auto font-mono text-[10px] uppercase tracking-widest text-slate-400">
              {filtered.length} registros
            </div>
          </div>

          <div className="grid min-h-[680px] gap-0 lg:grid-cols-[480px_1fr]">
            <div className="border-b border-brand-border lg:border-b-0 lg:border-r">
              <div className="border-b border-brand-border px-5 py-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
                  Tabla de datos
                </span>
              </div>
              <div className="max-h-[626px] overflow-auto">
                <table className="w-full border-collapse text-[11px]">
                  <thead className="sticky top-0 z-10 bg-white">
                    <tr>
                      <th className="border-b border-brand-border px-4 py-3 text-left font-mono text-[9px] uppercase tracking-widest text-brand-gray">
                        Período
                      </th>
                      {VARS.map((item) => (
                        <th
                          key={item.key}
                          onClick={() => setSelVar(item.key)}
                          className="cursor-pointer border-b border-brand-border px-3 py-3 text-right font-mono text-[9px] uppercase tracking-widest soft-transition"
                          style={{ color: selVar === item.key ? item.color : "#98A2B3" }}
                        >
                          {item.key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((row, index) => (
                      <tr
                        key={row.quarter}
                        className="border-b border-slate-100 transition-colors hover:bg-slate-50"
                        style={{ background: index % 2 === 0 ? "#FFFFFF" : "#F8FAFC" }}
                      >
                        <td className="whitespace-nowrap px-4 py-2 font-mono font-semibold text-brand-dark">
                          {row.quarter}
                        </td>
                        {VARS.map((item) => (
                          <td
                            key={item.key}
                            className="whitespace-nowrap px-3 py-2 text-right font-mono"
                            style={{
                              color: selVar === item.key ? item.color : "#475467",
                              fontWeight: selVar === item.key ? 700 : 500,
                            }}
                          >
                            {formatMoney(Number(row[item.key]))}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid min-h-0 min-w-0 grid-rows-[1fr_auto]">
              <div className="p-5 min-w-0 w-full">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: variable.color }}
                  />
                  <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: variable.color }}>
                    {variable.label}
                  </span>
                  <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-slate-400">
                    {selYears.length ? selYears.join(", ") : "2004-2023"}
                  </span>
                </div>
                <div className="h-[380px] min-w-0 w-full">
                  {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={filtered} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 8" stroke="#E7EDF5" />
                        <XAxis
                          dataKey="quarter"
                          tick={{ fontSize: 10, fill: "#98A2B3" }}
                          tickLine={false}
                          axisLine={false}
                          minTickGap={58}
                        />
                        <YAxis
                          tick={{ fontSize: 10, fill: "#98A2B3" }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${(Number(value) / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                          contentStyle={{
                            background: "#FFFFFF",
                            border: "1px solid #DDE5F0",
                            borderRadius: 14,
                            boxShadow: "0 18px 42px rgba(23,32,51,0.14)",
                            fontSize: 12,
                          }}
                          labelStyle={{ color: "#667085", marginBottom: 4 }}
                          formatter={(value) => [
                            `${Number(value).toLocaleString("es-ES")} M€`,
                            variable.label,
                          ]}
                          itemStyle={{ color: variable.color }}
                        />
                        <Line
                          type="monotone"
                          dataKey={selVar}
                          stroke={variable.color}
                          strokeWidth={3}
                          dot={false}
                          activeDot={{ r: 6, fill: variable.color, stroke: "#FFFFFF", strokeWidth: 2 }}
                          animationDuration={650}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full rounded-[8px] bg-slate-50" />
                  )}
                </div>
              </div>

              <div className="border-t border-brand-border bg-slate-50/80 min-w-0">
                <div className="flex flex-nowrap overflow-x-auto border-b border-brand-border">
                  {Object.keys(NEWS).map((year) => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => setNewsYear(parseInt(year))}
                      className={`shrink-0 border-r border-brand-border px-4 py-3 font-mono text-[9px] uppercase tracking-widest soft-transition ${
                        newsYear === parseInt(year)
                          ? "bg-blue-50 text-brand-blue"
                          : "text-brand-gray hover:bg-white"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={newsYear}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="flex gap-5 p-5"
                  >
                    <NewsLinkSwitch news={news} />
                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 font-mono text-[10px] text-brand-blue">
                          {news.tag}
                        </span>
                        <a
                          href={news.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-[10px] text-slate-400 soft-transition hover:text-brand-blue"
                        >
                          {news.src}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      <a
                        href={news.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2"
                      >
                        <h3 className="font-playfair text-2xl font-bold text-brand-dark soft-transition group-hover:text-brand-blue break-words">
                          {news.title}
                        </h3>
                        <ExternalLink className="mt-1 h-4 w-4 text-slate-300 soft-transition group-hover:text-brand-blue" />
                      </a>
                      <p className="mt-2 text-sm leading-6 text-slate-600 break-words">{news.body}</p>
                      <p className="mt-2 max-w-2xl font-mono text-[11px] leading-5 text-slate-500 break-words">
                        Movimiento del Excel: {news.movement}
                      </p>
                      {news.related?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {news.related.map((item) => (
                            <a
                              key={item.url}
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 rounded-full border border-brand-border bg-white px-3 py-1 font-mono text-[10px] text-slate-500 soft-transition hover:border-brand-blue hover:text-brand-blue"
                            >
                              {item.label}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
