"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Flavour, FlavourColor } from "@/data/flavours";
import { useCart } from "@/components/CartProvider";

const colourMap: Record<FlavourColor, string> = {
  lime: "#C6FF3E",
  peach: "#FF9E7A",
  berry: "#6E42E8",
};

const textColourMap: Record<FlavourColor, string> = {
  lime: "#141414",
  peach: "#141414",
  berry: "#F6F4EF",
};

type FlavourDetailProps = {
  flavour: Flavour;
  recommendations: Flavour[];
};

export function FlavourDetail({ flavour, recommendations }: FlavourDetailProps) {
  const reduceMotion = useReducedMotion();
  const { addItem } = useCart();
  const accent = colourMap[flavour.color];

  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="overflow-hidden bg-soft-white text-ink">
      <section
        className="relative min-h-screen px-5 pb-24 pt-40 sm:px-8 lg:px-12 lg:pt-44"
        style={{
          background: `radial-gradient(circle at 27% 42%, ${accent}26 0%, transparent 35%), #F6F4EF`,
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.12,
                delayChildren: reduceMotion ? 0 : 0.08,
              },
            },
          }}
          className="mx-auto grid min-h-[calc(100vh-11rem)] max-w-[1440px] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16"
        >
          <motion.div
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex min-h-[420px] items-center justify-center lg:min-h-[650px]"
          >
            <div
              aria-hidden="true"
              className="absolute h-[58%] w-[58%] rounded-full blur-3xl"
              style={{ backgroundColor: `${accent}36` }}
            />
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -12, 0], rotate: [-1, 1, -1] }}
              transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-[430px] w-[270px] sm:h-[520px] sm:w-[330px] lg:h-[620px] lg:w-[390px]"
            >
              <Image
                src={flavour.image}
                alt={`PULSE ${flavour.name} sparkling energy drink can`}
                fill
                priority
                draggable={false}
                onContextMenu={(event) => event.preventDefault()}
                sizes="(max-width: 640px) 270px, (max-width: 1024px) 330px, 390px"
                className="object-contain"
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={reveal}
            transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <Link
              href="/#flavours"
              className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-ink/55 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-4"
            >
              <span aria-hidden="true">←</span> Все вкусы
            </Link>

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-ink/55">
              Газированная функциональная энергия
            </p>
            <h1 className="text-[clamp(3.6rem,8vw,8.5rem)] font-extrabold leading-[0.82] tracking-[-0.075em]">
              <span
                className="inline-block rounded-md px-3 pb-3 pt-2 sm:px-5"
                style={{ backgroundColor: accent, color: textColourMap[flavour.color] }}
              >
                {flavour.name}
              </span>
            </h1>
            <p className="mt-8 text-2xl font-bold leading-tight tracking-[-0.03em] sm:text-3xl">
              {flavour.tagline}
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-ink/70 sm:text-lg sm:leading-8">
              {flavour.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() =>
                  addItem({
                    id: flavour.slug,
                    name: flavour.name,
                    image: flavour.image,
                    price: 3.2,
                    currency: "USD",
                    note: "Одна банка · 250 мл",
                  })
                }
                className="rounded-full bg-ink px-8 py-4 text-sm font-bold uppercase tracking-[0.08em] text-soft-white transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-4 active:scale-[0.98]"
              >
                Добавить в корзину
              </button>
              <p className="text-2xl font-extrabold tracking-[-0.04em]">
                {flavour.price} <span className="text-sm font-medium text-ink/50">/ банка</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
        className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-[1440px] border-y border-ink/15 py-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/50">Состав</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {flavour.ingredients.map((ingredient) => (
              <span
                key={ingredient}
                className="rounded-full border border-ink/20 px-5 py-3 text-sm font-medium text-ink sm:text-base"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="px-5 pb-28 sm:px-8 lg:px-12 lg:pb-36">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="max-w-3xl text-4xl font-extrabold leading-[0.95] tracking-[-0.055em] sm:text-6xl">
              Попробуй другие вкусы.
            </h2>
            <Link
              href="/#flavours"
              className="hidden text-sm font-bold underline decoration-1 underline-offset-4 transition-opacity hover:opacity-60 sm:block"
            >
              Смотреть все
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {recommendations.map((item, index) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : index * 0.1 }}
              >
                <Link
                  href={`/flavours/${item.slug}`}
                  className="group grid min-h-[470px] grid-cols-1 grid-rows-[auto_16rem] overflow-hidden rounded-md border border-ink/15 bg-soft-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-4 sm:min-h-[390px] sm:grid-cols-[1fr_1.2fr] sm:grid-rows-1"
                  style={{ "--card-accent": colourMap[item.color] } as React.CSSProperties}
                >
                  <div className="flex flex-col justify-between p-6 sm:p-8">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink/50">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-3xl font-extrabold tracking-[-0.05em] sm:text-4xl">
                        {item.name}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-ink/60">{item.tagline}</p>
                      <span className="mt-6 inline-block text-sm font-bold underline decoration-1 underline-offset-4">
                        Открыть вкус
                      </span>
                    </div>
                  </div>
                  <div
                    className="relative transition-colors duration-300"
                    style={{ backgroundColor: `${colourMap[item.color]}66` }}
                  >
                    <Image
                      src={item.image}
                      alt={`PULSE ${item.name} sparkling energy drink can`}
                      fill
                      draggable={false}
                      onContextMenu={(event) => event.preventDefault()}
                      sizes="(max-width: 768px) 55vw, 330px"
                      className="object-contain p-7 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
