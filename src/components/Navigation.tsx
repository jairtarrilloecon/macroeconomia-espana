"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-widest soft-transition ${
        active ? "bg-brand-blue text-white" : "text-brand-dark hover:bg-blue-50 hover:text-brand-blue"
      }`}
    >
      <span className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-[130%]">
        {label}
      </span>
      <span
        className="absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-300 ease-in-out group-hover:translate-y-0"
        aria-hidden="true"
      >
        {label}
      </span>
    </Link>
  );
}

export default function Navigation() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 32);
    setHidden(latest > previous && latest > 220);
  });

  const links = [
    { href: "/contexto", label: "Contexto" },
    { href: "/demanda", label: "Demanda" },
    { href: "/multiplicador", label: "Multiplicador" },
    { href: "/conclusion", label: "Conclusión" },
  ];

  return (
    <motion.nav
      animate={hidden ? { y: "-110%" } : { y: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed inset-x-0 top-0 z-50 border-b px-4 py-3 transition-colors duration-500 md:px-8 ${
        scrolled
          ? "border-brand-border bg-white/90 shadow-[0_12px_34px_rgba(23,32,51,0.08)] backdrop-blur-xl"
          : "border-transparent bg-white/68 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link
          href="/"
          className="font-playfair text-xl font-bold text-brand-dark soft-transition hover:text-brand-accent"
        >
          macroeconomia.
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={pathname === link.href}
            />
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
