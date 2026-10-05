"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useSyncExternalStore, type ReactNode } from "react";

const subscribeToHydration = () => () => {};

const promises: Array<{
  title: string;
  word: string;
  description: string;
  stat: string;
  background: string;
  hoverBackground: string;
  accent: string;
  icon: ReactNode;
}> = [
  {
    title: "Фокус без суеты",
    word: "ФОКУС",
    description: "Кофеин из зелёного чая и L-теанин помогают держать спокойную, устойчивую концентрацию.",
    stat: "120 мг",
    background: "#EDF8D3",
    hoverBackground: "#E1F7AB",
    accent: "#255CFF",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className="size-12">
        <path d="M9 34 22 21l8 8 10-14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M31 15h9v9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Без сахарного спада",
    word: "РОВНО",
    description: "Ноль сахара и никакой тяжёлой сладости — только чистый вкус без резкого отката.",
    stat: "0 г",
    background: "#F8E4DC",
    hoverBackground: "#FFD1C0",
    accent: "#D95735",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className="size-12">
        <path d="M5 25c4.25-10 8.5-10 12.75 0s8.5 10 12.75 0S39 15 43 25" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Для реальной жизни",
    word: "ДОЛЬШЕ",
    description: "Для дедлайнов, поездок, ночных идей и утра после слишком короткого сна.",
    stat: "24/7",
    background: "#E8E1F7",
    hoverBackground: "#DCCFF7",
    accent: "#6E42E8",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className="size-12">
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.75" />
        <path d="M24 4v5M24 39v5M4 24h5M39 24h5M9.9 9.9l3.55 3.55M34.55 34.55l3.55 3.55M38.1 9.9l-3.55 3.55M13.45 34.55 9.9 38.1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export function PromiseSection() {
  const reduceMotion = useReducedMotion();
  const mounted = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const initialState = mounted && !reduceMotion ? "hidden" : "visible";

  return (
    <section id="promise" aria-labelledby="promise-title" className="border-b border-ink/15 bg-chrome/20 py-24 md:py-32">
      <motion.div className="section-shell" variants={containerVariants} initial={initialState} whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
          <motion.div variants={itemVariants}>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-ink/50">Почему PULSE</p>
            <h2 id="promise-title" className="max-w-5xl text-5xl font-extrabold leading-[0.91] tracking-[-0.06em] text-ink sm:text-6xl lg:text-8xl">
              Энергия,
              <span className="block text-ink/35">а не перегруз.</span>
            </h2>
          </motion.div>
          <motion.p variants={itemVariants} className="max-w-md text-base leading-7 text-ink/60 lg:pb-2 lg:text-lg">
            Формула работает вместе с твоим ритмом: мягко включается, держит фокус и не требует расплачиваться за него позже.
          </motion.p>
        </div>

        <motion.div variants={itemVariants} className="mt-14 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-ink/15 py-4 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink/55 md:mt-20">
          <span className="text-electric-blue">Сигнал включён</span>
          <span aria-hidden="true">→</span>
          <span>120 мг кофеина</span>
          <span aria-hidden="true">→</span>
          <span>L-теанин</span>
          <span aria-hidden="true">→</span>
          <span>0 г сахара</span>
        </motion.div>

        <div className="mt-6 grid overflow-hidden rounded-md border border-ink/15 bg-soft-white text-ink md:grid-cols-3">
          {promises.map((promise, index) => (
            <motion.article
              key={promise.title}
              variants={itemVariants}
              initial={false}
              whileHover={reduceMotion ? undefined : { backgroundColor: promise.hoverBackground }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ backgroundColor: promise.background }}
              className="group relative flex min-h-[25rem] flex-col justify-between overflow-hidden border-b border-ink/15 p-6 last:border-b-0 md:border-b-0 md:border-r md:p-8 md:last:border-r-0 lg:min-h-[29rem] lg:p-10"
            >
              <div className="flex items-start justify-between">
                <div style={{ color: promise.accent }}>{promise.icon}</div>
                <span className="text-xs font-bold tracking-[0.16em] text-ink/35">0{index + 1}</span>
              </div>

              <div className="relative z-10">
                <p className="mb-5 text-6xl font-extrabold leading-none tracking-[-0.07em] text-ink/10 lg:text-7xl">
                  {promise.stat}
                </p>
                <h3 className="text-2xl font-extrabold tracking-[-0.04em] lg:text-3xl">{promise.title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-6 text-ink/60 lg:text-base lg:leading-7">
                  {promise.description}
                </p>
              </div>

              <p aria-hidden="true" className="absolute -bottom-3 -right-2 text-[4.6rem] font-extrabold leading-none tracking-[-0.08em] text-ink/[0.045] transition-transform duration-500 group-hover:-translate-y-2 md:text-[5.5rem]">
                {promise.word}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
