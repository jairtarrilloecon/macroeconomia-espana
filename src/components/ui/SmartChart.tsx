"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { X, Maximize2 } from "lucide-react";
import type { QuarterData } from "@/lib/dataStore";

interface SmartChartProps {
  data: QuarterData[];
  dataKey: keyof Pick<QuarterData, "Y" | "C" | "I" | "G" | "XN" | "YD" | "T" | "t">;
  title: string;
  color?: string;
}

function formatAxisValue(value: number) {
  return Math.abs(value) >= 1000 ? `${(value / 1000).toFixed(0)}k` : value.toFixed(1);
}

function ChartContent({
  data,
  dataKey,
  title,
  color,
  expanded,
}: {
  data: QuarterData[];
  dataKey: SmartChartProps["dataKey"];
  title: string;
  color: string;
  expanded: boolean;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 12, right: 18, bottom: 8, left: expanded ? 6 : 0 }}>
        {expanded && (
          <XAxis
            dataKey="quarter"
            tick={{ fontSize: 11, fill: "#667085" }}
            tickLine={false}
            axisLine={false}
            minTickGap={34}
          />
        )}
        {expanded && (
          <YAxis
            tick={{ fontSize: 11, fill: "#667085" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => formatAxisValue(Number(value))}
          />
        )}
        <Tooltip
          contentStyle={{
            backgroundColor: "#FFFFFF",
            color: "#172033",
            border: "1px solid #DDE5F0",
            borderRadius: "14px",
            boxShadow: "0 18px 44px rgba(23, 32, 51, 0.14)",
            fontSize: "12px",
          }}
          labelStyle={{ color: "#667085", marginBottom: 4 }}
          itemStyle={{ color }}
          formatter={(value) => [`${Number(value).toLocaleString("es-ES")} M€`, title]}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={expanded ? 3 : 2.4}
          dot={false}
          activeDot={{ r: expanded ? 6 : 4, fill: color, stroke: "#FFFFFF", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default function SmartChart({ data, dataKey, title, color = "#2563EB" }: SmartChartProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <motion.div
        layoutId={`chart-${dataKey}`}
        className="group light-panel soft-transition relative h-52 w-full cursor-pointer rounded-[8px] p-5 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(23,32,51,0.12)]"
        onDoubleClick={() => setIsExpanded(true)}
        whileHover={{ y: -4 }}
      >
        <div className="absolute left-5 top-4 z-10 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray">
            {title}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="absolute right-4 top-4 rounded-full border border-brand-border bg-white p-2 text-brand-gray opacity-0 soft-transition group-hover:opacity-100 hover:border-brand-blue hover:text-brand-blue"
          aria-label={`Expandir ${title}`}
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
        <div className="mt-8 h-36 w-full">
          {mounted ? (
            <ChartContent data={data} dataKey={dataKey} title={title} color={color} expanded={isExpanded} />
          ) : (
            <div className="h-full rounded-[8px] bg-slate-50" />
          )}
        </div>
        <div className="absolute bottom-3 right-4 text-[9px] uppercase tracking-widest text-slate-300">
          Doble clic
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-100/80 backdrop-blur-md"
              onClick={() => setIsExpanded(false)}
            />
            <motion.div
              layoutId={`chart-${dataKey}`}
              className="relative flex h-[80vh] w-[92vw] max-w-6xl flex-col rounded-[8px] border border-brand-border bg-white p-8 shadow-[0_28px_90px_rgba(23,32,51,0.18)]"
            >
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="absolute right-5 top-5 rounded-full border border-brand-border bg-white p-2 text-brand-dark soft-transition hover:border-brand-accent hover:text-brand-accent"
                aria-label="Cerrar gráfico"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="mb-8 font-playfair text-3xl font-bold text-brand-dark">{title}</h3>
              <div className="h-full w-full flex-1">
                <ChartContent data={data} dataKey={dataKey} title={title} color={color} expanded />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
