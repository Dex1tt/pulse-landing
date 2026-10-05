"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import { assetPath } from "@/lib/assets";

const subscribeToHydration = () => () => {};

const callouts = [
  { number: "01", label: "Кофеин из зелёного чая", detail: "120 мг спокойной энергии", position: "left-[6%] top-[17%]", side: "left", duration: 5.4, delay: 0.2 },
  { number: "02", label: "L-теанин", detail: "Ровный фокус без суеты", position: "right-[7%] top-[12%]", side: "right", duration: 6.2, delay: 0.9 },
  { number: "03", label: "Электролиты", detail: "Поддержка водного баланса", position: "left-[8%] bottom-[17%]", side: "left", duration: 5.8, delay: 0.6 },
  { number: "04", label: "Витамин B12", detail: "Для естественного метаболизма", position: "right-[8%] bottom-[19%]", side: "right", duration: 6.6, delay: 1.3 },
  { number: "05", label: "Без сахара", detail: "Ноль граммов. Никакого спада.", position: "bottom-[3%] left-1/2 -translate-x-1/2", side: "bottom", duration: 5, delay: 0.4 },
];

const stageVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.1 } },
};

const canVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const tagVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function ProtectedCan({ sizes }: { sizes: string }) {
  return (
    <Image
      src={assetPath("/images/can-lime.png")}
      alt="PULSE Lime Static sparkling energy drink can with functional ingredients"
      fill
      quality={90}
      draggable={false}
      onContextMenu={(event) => event.preventDefault()}
      sizes={sizes}
      className="select-none object-contain"
    />
  );
}

function Connector({ side }: { side: string }) {
  if (side === "bottom") {
    return (
      <span aria-hidden="true" className="absolute bottom-full left-1/2 flex -translate-x-1/2 flex-col items-center">
        <span className="size-2 rounded-full bg-electric-blue" />
        <span className="h-12 w-px bg-ink/35" />
      </span>
    );
  }

  const onLeft = side === "left";
  return (
    <span aria-hidden="true" className={`absolute top-1/2 flex -translate-y-1/2 items-center ${onLeft ? "left-full" : "right-full flex-row-reverse"}`}>
      <span className="w-20 border-t border-ink/35 xl:w-32" />
      <span className="size-2 rounded-full bg-electric-blue" />
    </span>
  );
}

export function Ingredients() {
  const reduceMotion = useReducedMotion();
  const mounted = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const initialState = mounted && !reduceMotion ? "hidden" : "visible";

  return (
    <section id="ingredients" aria-labelledby="ingredients-title" className="border-b border-ink/15 bg-soft-white py-20 md:py-28 lg:py-32">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-ink/50 md:mb-5">Что внутри</p>
            <h2 id="ingredients-title" className="max-w-4xl text-[clamp(2.8rem,12vw,6rem)] font-extrabold leading-[0.91] tracking-[-0.06em] text-ink lg:text-8xl">
              Только то,
              <span className="block text-ink/35">что работает.</span>
            </h2>
          </div>

          <div className="grid grid-cols-3 divide-x divide-ink/15 border-y border-ink/15 py-4 lg:w-[28rem]">
            {[["120 мг", "кофеина"], ["0 г", "сахара"], ["5", "компонентов"]].map(([value, label]) => (
              <div key={label} className="min-w-0 px-2.5 sm:px-4 lg:first:pl-4">
                <strong className="block text-lg font-extrabold tracking-[-0.04em] sm:text-xl">{value}</strong>
                <span className="mt-1 block text-[0.56rem] font-bold uppercase leading-4 tracking-[0.06em] text-ink/45 sm:text-[0.65rem] sm:tracking-[0.12em]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <motion.div role="list" aria-label="Состав PULSE" className="mt-12 overflow-hidden rounded-md border border-ink/15 bg-[#eeece6] lg:hidden" variants={stageVariants} initial={initialState} whileInView="visible" viewport={{ once: true, amount: 0.12 }}>
          <div className="flex items-center justify-between border-b border-ink/10 px-4 py-4 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-ink/40 sm:px-6">
            <span>PULSE / формула 01</span>
            <span>250 мл</span>
          </div>

          <motion.div variants={canVariants} className="relative mx-auto h-[27rem] w-full max-w-[19rem] sm:h-[34rem] sm:max-w-[23rem]">
            <div aria-hidden="true" className="absolute inset-x-[24%] bottom-[5%] h-10 rounded-full bg-ink/15 blur-xl" />
            <ProtectedCan sizes="(min-width: 640px) 23rem, 19rem" />
          </motion.div>

          <div className="grid border-t border-ink/10 sm:grid-cols-2">
            {callouts.map((callout, index) => (
              <motion.article key={callout.label} role="listitem" variants={tagVariants} className={`min-w-0 border-b border-ink/10 p-4 sm:p-5 ${index % 2 === 0 ? "sm:border-r" : ""} ${index === callouts.length - 1 ? "border-b-0 sm:col-span-2 sm:border-r-0" : ""}`}>
                <span className="text-[0.62rem] font-bold tracking-[0.16em] text-electric-blue">{callout.number}</span>
                <h3 className="mt-1.5 text-base font-extrabold tracking-[-0.025em]">{callout.label}</h3>
                <p className="mt-1.5 text-xs leading-5 text-ink/55">{callout.detail}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div role="list" aria-label="Состав PULSE" className="relative mx-auto mt-20 hidden h-[50rem] w-full overflow-hidden rounded-md border border-ink/15 bg-[#eeece6] lg:block" variants={stageVariants} initial={initialState} whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <div aria-hidden="true" className="absolute inset-x-0 top-1/2 border-t border-dashed border-ink/10" />
          <div aria-hidden="true" className="absolute inset-y-0 left-1/2 border-l border-dashed border-ink/10" />
          <p className="absolute left-5 top-5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink/35">PULSE / формула 01</p>
          <p className="absolute right-5 top-5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ink/35">250 мл</p>

          <motion.div variants={canVariants} className="absolute inset-x-0 top-[5%] z-10 mx-auto h-[41rem] w-[26rem]">
            <div aria-hidden="true" className="absolute inset-x-[22%] bottom-[7%] h-12 rounded-full bg-ink/20 blur-xl" />
            <ProtectedCan sizes="26rem" />
          </motion.div>

          {callouts.map((callout) => (
            <motion.div key={callout.label} role="listitem" variants={tagVariants} className={`absolute z-20 ${callout.position}`}>
              <motion.div animate={reduceMotion ? undefined : { y: [0, -7, 0] }} transition={{ duration: callout.duration, delay: callout.delay, ease: "easeInOut", repeat: Infinity }} className="relative min-w-48 rounded-md border border-ink/20 bg-soft-white px-5 py-4">
                <Connector side={callout.side} />
                <span className="text-[0.62rem] font-bold tracking-[0.16em] text-electric-blue">{callout.number}</span>
                <h3 className="mt-1 text-base font-extrabold tracking-[-0.025em]">{callout.label}</h3>
                <p className="mt-1 text-xs text-ink/50">{callout.detail}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
