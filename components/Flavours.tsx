"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { flavours, type FlavourColor } from "@/data/flavours";
import { useCart } from "@/components/CartProvider";

const flavourStyles: Record<
  FlavourColor,
  { background: string; hoverText: string; rotation: number }
> = {
  lime: { background: "#C6FF3E", hoverText: "#141414", rotation: -3 },
  peach: { background: "#FF9E7A", hoverText: "#141414", rotation: 3 },
  berry: { background: "#6E42E8", hoverText: "#F6F4EF", rotation: -3 },
};

const cardVariants: Variants = {
  rest: { backgroundColor: "#F6F4EF" },
  hover: (background: string) => ({ backgroundColor: background }),
};

const canVariants: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: (rotation: number) => ({ scale: 1.04, rotate: rotation }),
};

const textVariants: Variants = {
  rest: { color: "#141414" },
  hover: (color: string) => ({ color }),
};

const descriptionVariants: Variants = {
  rest: { opacity: 0.58, y: 4 },
  hover: { opacity: 1, y: 0 },
};

const actionVariants: Variants = {
  rest: { opacity: 1, y: 0 },
  hover: { opacity: 1, y: 0 },
};

export function Flavours() {
  const reduceMotion = useReducedMotion();
  const { addItem } = useCart();
  const duration = reduceMotion ? 0 : 0.38;

  return (
    <section
      id="flavours"
      aria-labelledby="flavours-title"
      className="border-b border-ink/15 bg-soft-white py-24 md:py-32"
    >
      <div className="section-shell">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-ink/50">
          Три вкуса — три режима
        </p>
        <h2
          id="flavours-title"
          className="max-w-5xl text-[clamp(2.8rem,9vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-ink"
        >
          Выбери свой режим.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-3 md:mt-20 md:grid-cols-3 md:gap-3">
          {flavours.map((flavour, index) => {
            const style = flavourStyles[flavour.color];

            return (
            <motion.article
              key={flavour.slug}
              custom={style.background}
              variants={cardVariants}
              initial={false}
              animate="rest"
              whileHover="hover"
              transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
              className="group relative grid h-[38rem] cursor-pointer grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-md border border-ink/20 p-5 sm:h-[42rem] sm:p-6 md:h-[38rem] lg:h-[42rem] lg:p-8 xl:h-[44rem]"
            >
              <Link
                href={`/flavours/${flavour.slug}`}
                aria-label={`Открыть вкус ${flavour.name}`}
                className="absolute inset-0 z-10 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-electric-blue"
              />
              <motion.div
                custom={style.hoverText}
                variants={textVariants}
                transition={{ duration }}
                className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.14em]"
              >
                <span>PULSE / вкус</span>
                <span>0{index + 1}</span>
              </motion.div>

              <div className="flex min-h-0 items-center justify-center overflow-hidden py-5">
                <motion.div
                  custom={reduceMotion ? 0 : style.rotation}
                  variants={canVariants}
                  transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full w-full max-w-[17rem] shrink-0 md:max-w-[13rem] lg:max-w-[16rem] xl:max-w-[17rem]"
                >
                  <Image
                    src={flavour.image}
                    alt={`PULSE ${flavour.name} sparkling energy drink can`}
                    fill
                    quality={90}
                    draggable={false}
                    onContextMenu={(event) => event.preventDefault()}
                    sizes="(min-width: 1280px) 17rem, (min-width: 1024px) 16rem, (min-width: 768px) 13rem, 17rem"
                    className="select-none object-contain"
                  />
                </motion.div>
              </div>

              <motion.div
                custom={style.hoverText}
                variants={textVariants}
                transition={{ duration }}
                className="relative z-10"
              >
                <h3 className="text-3xl font-extrabold tracking-[-0.045em] lg:text-4xl">
                  {flavour.name}
                </h3>
                <motion.p
                  variants={descriptionVariants}
                  transition={{ duration }}
                  className="mt-2 min-h-12 text-sm font-medium leading-relaxed lg:text-base"
                >
                  {flavour.tagline}
                </motion.p>
                <motion.div
                  variants={actionVariants}
                  transition={{ duration }}
                  className="relative z-20 mt-5 w-fit"
                >
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      addItem({
                        id: flavour.slug,
                        name: flavour.name,
                        image: flavour.image,
                        price: 320,
                        currency: "RUB",
                        note: "Одна банка · 250 мл",
                      });
                    }}
                    aria-label={`Добавить ${flavour.name} в корзину`}
                    className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold uppercase tracking-[0.06em] text-soft-white transition-colors hover:bg-electric-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-blue"
                  >
                    Добавить в корзину
                  </button>
                </motion.div>
              </motion.div>
            </motion.article>
          );
          })}
        </div>
      </div>
    </section>
  );
}
