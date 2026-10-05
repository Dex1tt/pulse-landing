"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";

const subscribeToHydration = () => () => {};

export function FinalCta() {
  const reduceMotion = useReducedMotion();
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-title"
      className="bg-soft-white py-28 text-center md:py-40"
    >
      <motion.div
        className="section-shell flex flex-col items-center"
        initial={mounted && !reduceMotion ? { opacity: 0, y: 32 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2
          id="final-cta-title"
          className="text-[clamp(2.75rem,7.5vw,8.5rem)] font-extrabold leading-[0.86] tracking-[-0.06em] text-ink"
        >
          <span className="block">Оставайся ярким.</span>
          <span className="block text-ink/40">Продолжай движение.</span>
        </h2>
        <p className="mt-9 text-lg font-medium text-ink/60 md:text-xl">
          Твоя следующая банка уже ждёт.
        </p>
        <a href="#flavours" className="cta-pill mt-10 px-9 py-5 text-base">
          Собрать набор из 12 банок
        </a>
      </motion.div>
    </section>
  );
}
