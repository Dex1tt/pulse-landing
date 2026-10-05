"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import { useCart } from "@/components/CartProvider";
import { flavours } from "@/data/flavours";

const subscribeToHydration = () => () => {};

const benefits = [
  "12 банок каждые 2 недели",
  "Выбирай любые вкусы",
  "Бесплатная доставка",
  "Пауза или отмена в любой момент",
  "Выгода 15% к разовой покупке",
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.08, staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="mt-0.5 size-5 shrink-0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12.5 4.2 4.2L19 7" />
    </svg>
  );
}

export function Subscription() {
  const reduceMotion = useReducedMotion();
  const mounted = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const initialState = mounted && !reduceMotion ? "hidden" : "visible";
  const { addItem } = useCart();
  const [selectedFlavour, setSelectedFlavour] = useState(flavours[0].slug);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const flavour = flavours.find((item) => item.slug === selectedFlavour) ?? flavours[0];

    addItem({
      id: `subscription-${flavour.slug}`,
      name: `Подписка PULSE — ${flavour.name}`,
      image: flavour.image,
      price: 3060,
      currency: "RUB",
      note: "12 банок · доставка каждые 2 недели",
    });
  }

  return (
    <section id="subscription" aria-labelledby="subscription-title" className="border-b border-soft-white/15 bg-berry py-24 text-soft-white md:py-32">
      <motion.div className="section-shell grid items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20" variants={containerVariants} initial={initialState} whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
        <div className="lg:sticky lg:top-36">
          <motion.p variants={itemVariants} className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-soft-white/65">Подписка PULSE</motion.p>
          <motion.h2 id="subscription-title" variants={itemVariants} className="max-w-4xl text-[clamp(2.8rem,9vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.055em]">
            Запас энергии —
            <span className="block text-lime">по расписанию.</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-7 max-w-xl text-lg leading-8 text-soft-white/65">
            Выбери вкус и оставь контакты. Набор появится в корзине, а все данные останутся только в этой форме.
          </motion.p>

          <motion.ul variants={containerVariants} className="mt-10 grid gap-4 sm:grid-cols-2 lg:max-w-2xl">
            {benefits.map((benefit) => (
              <motion.li key={benefit} variants={itemVariants} className="flex items-start gap-3 text-sm font-medium leading-6 text-soft-white/85 sm:text-base">
                <span className="text-lime"><CheckIcon /></span>
                <span>{benefit}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.form onSubmit={handleSubmit} variants={itemVariants} className="rounded-md border border-soft-white/15 bg-ink p-6 text-soft-white sm:p-9 lg:p-10">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-soft-white/50">Шаг 01 / Настрой набор</p>
              <h3 className="mt-4 text-4xl font-extrabold tracking-[-0.055em] sm:text-5xl">Подписка −15%</h3>
            </div>
            <span className="rounded-full bg-lime px-3 py-2 text-xs font-extrabold text-ink">12 банок</span>
          </div>

          <div className="mt-9 grid gap-5">
            <label className="grid gap-2 text-sm font-bold">
              Имя
              <input required name="name" autoComplete="name" placeholder="Как к тебе обращаться" className="h-14 rounded-md border border-soft-white/20 bg-soft-white/5 px-4 font-medium text-soft-white outline-none placeholder:text-soft-white/30 focus:border-lime focus:ring-1 focus:ring-lime" />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Email
              <input required type="email" name="email" autoComplete="email" placeholder="you@example.com" className="h-14 rounded-md border border-soft-white/20 bg-soft-white/5 px-4 font-medium text-soft-white outline-none placeholder:text-soft-white/30 focus:border-lime focus:ring-1 focus:ring-lime" />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Основной вкус
              <select value={selectedFlavour} onChange={(event) => setSelectedFlavour(event.target.value)} className="h-14 rounded-md border border-soft-white/20 bg-ink px-4 font-medium text-soft-white outline-none focus:border-lime focus:ring-1 focus:ring-lime">
                {flavours.map((flavour) => <option key={flavour.slug} value={flavour.slug}>{flavour.name}</option>)}
              </select>
            </label>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-y border-soft-white/15 py-6 sm:flex-row sm:items-end sm:gap-5">
            <div>
              <del className="text-sm font-medium text-soft-white/40">3 600 ₽</del>
              <p className="mt-1 text-4xl font-extrabold tracking-[-0.05em] text-lime">3 060 ₽</p>
            </div>
            <p className="max-w-40 text-left text-xs leading-5 text-soft-white/45 sm:max-w-28 sm:text-right">за коробку каждые 2 недели</p>
          </div>

          <label className="mt-6 flex items-start gap-3 text-xs leading-5 text-soft-white/55">
            <input required type="checkbox" className="mt-1 size-4 accent-[#C6FF3E]" />
            <span>Я согласен получать информацию о подписке и понимаю, что это демонстрационная форма без реального списания.</span>
          </label>

          <button type="submit" className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-lime px-7 py-4 text-sm font-extrabold uppercase tracking-[0.07em] text-ink transition-colors hover:bg-soft-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime">
            Добавить подписку в корзину
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
}
