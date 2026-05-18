import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Macroeconomía | Unidad 2",
  description: "Análisis Macroeconómico de España - Scrollytelling interactivo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="antialiased">
      <body
        suppressHydrationWarning
        className="bg-brand-light text-brand-dark min-h-screen font-sans"
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
