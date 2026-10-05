"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { BrandMark } from "@/components/BrandMark";

const navItems = [
  { label: "Вкусы", href: "/#flavours" },
  { label: "Состав", href: "/#ingredients" },
  { label: "Наш подход", href: "/#promise" },
  { label: "Купить", href: "/#subscription" },
];

const marqueeText = "БЕЗ САХАРА — СПОКОЙНАЯ ЭНЕРГИЯ — 120 МГ НАТУРАЛЬНОГО КОФЕИНА —";

function BagIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="size-4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.5 8.5h13l1 12h-15l1-12Z" />
      <path d="M9 9V6.5a3 3 0 0 1 6 0V9" />
    </svg>
  );
}

function MarqueeGroup() {
  return (
    <div aria-hidden="true" className="flex shrink-0 items-center">
      {Array.from({ length: 4 }, (_, index) => (
        <span key={index} className="shrink-0 px-4 sm:px-6">
          {marqueeText}
        </span>
      ))}
    </div>
  );
}

function Marquee() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden bg-ink py-2.5 text-soft-white">
      <span className="sr-only">{marqueeText}</span>
      <motion.div
        className="flex w-max text-[0.6875rem] font-bold uppercase tracking-[0.18em]"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 20, ease: "linear", repeat: Infinity }
        }
      >
        <MarqueeGroup />
        <MarqueeGroup />
      </motion.div>
    </div>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 16);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <header
        id="header"
        className={`h-16 transition-colors duration-300 md:h-20 ${
          isScrolled
            ? "border-b border-ink/15 bg-soft-white"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="section-shell grid h-full grid-cols-[1fr_auto] items-center gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-5">
          <Link
            href="/"
            aria-label="PULSE — на главную"
            className="w-fit text-2xl font-extrabold leading-none tracking-[-0.06em] text-ink outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-4 focus-visible:ring-offset-soft-white md:text-3xl"
          >
            <BrandMark withWord />
          </Link>

          <nav aria-label="Основная навигация" className="hidden items-center gap-7 md:flex lg:gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative py-2 text-sm font-medium text-ink outline-none"
              >
                {item.label}
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Корзина, товаров: ${count}`}
            className="cta-pill justify-self-end px-3.5 py-2.5 text-xs normal-case tracking-normal sm:px-4 sm:text-sm md:px-5"
          >
            <BagIcon />
            <span>Корзина ({count})</span>
          </button>
        </div>
      </header>

      <Marquee />
    </div>
  );
}
