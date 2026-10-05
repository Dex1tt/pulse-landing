"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import { assetPath } from "@/lib/assets";

const subscribeToHydration = () => () => {};

const moments = [
  {
    src: assetPath("/images/life-desk.jpg"),
    alt: "PULSE Lime Static energy drink beside a laptop and notebook on a modern desk",
    layout: "col-span-2 row-span-2 min-h-[22rem] sm:min-h-[28rem] md:min-h-0",
    sizes: "(min-width: 768px) 50vw, 100vw",
    caption: { time: "09:12", text: "первый черновик" },
  },
  {
    src: assetPath("/images/life-bike.jpg"),
    alt: "Cyclist commuting through a city at golden hour",
    layout: "col-span-1 aspect-square md:aspect-auto",
    sizes: "(min-width: 768px) 25vw, 50vw",
  },
  {
    src: assetPath("/images/life-street.jpg"),
    alt: "Modern city street at dusk with warm lights",
    layout: "col-span-1 aspect-square md:aspect-auto",
    sizes: "(min-width: 768px) 25vw, 50vw",
    caption: { time: "19:30", text: "ещё одна идея" },
  },
  {
    src: assetPath("/images/life-can.jpg"),
    alt: "Hand holding a chilled PULSE Peach Signal energy drink can",
    layout: "col-span-1 aspect-square md:aspect-auto",
    sizes: "(min-width: 768px) 25vw, 50vw",
    caption: { time: "14:48", text: "без спада" },
  },
  {
    src: assetPath("/images/life-sketch.jpg"),
    alt: "PULSE Berry Mode energy drink beside sketches in a creative workspace",
    layout: "col-span-1 aspect-square md:aspect-auto",
    sizes: "(min-width: 768px) 25vw, 50vw",
  },
];

const collageVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.12,
    },
  },
};

const photoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Lifestyle() {
  const reduceMotion = useReducedMotion();
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const initialState = mounted && !reduceMotion ? "hidden" : "visible";

  return (
    <section
      id="lifestyle"
      aria-labelledby="lifestyle-title"
      className="border-b border-ink/15 bg-soft-white py-24 md:py-32"
    >
      <div className="section-shell">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-ink/50">
          PULSE в городе
        </p>
        <h2
          id="lifestyle-title"
          className="max-w-5xl text-[clamp(2.8rem,9vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-ink"
        >
          Для дней в движении.
        </h2>

        <motion.div
          className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:auto-rows-[18rem] md:grid-cols-4 md:gap-4 lg:auto-rows-[21rem]"
          variants={collageVariants}
          initial={initialState}
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          {moments.map((moment) => (
            <motion.figure
              key={moment.src}
              variants={photoVariants}
              className={`group relative overflow-hidden rounded-lg bg-chrome ${moment.layout}`}
            >
              <Image
                src={moment.src}
                alt={moment.alt}
                fill
                quality={88}
                draggable={false}
                onContextMenu={(event) => event.preventDefault()}
                sizes={moment.sizes}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />
              {moment.caption ? (
                <figcaption className="absolute bottom-2 left-2 rounded-md bg-ink/65 px-2 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-soft-white backdrop-blur-[2px] sm:bottom-4 sm:left-4 sm:bg-ink/75 sm:px-3 sm:py-2 sm:text-xs">
                  <span>{moment.caption.time}</span>
                  <span className="hidden sm:inline"> — {moment.caption.text}</span>
                </figcaption>
              ) : null}
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
