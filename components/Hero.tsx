"use client";

import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef, useSyncExternalStore } from "react";
import { assetPath } from "@/lib/assets";

const subscribeToHydration = () => () => {};

type CanProps = {
  src: string;
  alt: string;
  className: string;
  delay: number;
  floatDelay: number;
  scrollYProgress: MotionValue<number>;
  scrollY: number;
  scrollRotate: number;
  mounted: boolean;
};

function ProductCan({
  src,
  alt,
  className,
  delay,
  floatDelay,
  scrollYProgress,
  scrollY,
  scrollRotate,
  mounted,
}: CanProps) {
  const reduceMotion = useReducedMotion();
  const y = useTransform(scrollYProgress, [0, 1], [0, scrollY]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, scrollRotate]);

  return (
    <div className={`absolute ${className}`}>
      <motion.div className="w-full" style={reduceMotion ? undefined : { y, rotate }}>
      <motion.div
        initial={false}
        animate={
          mounted && !reduceMotion
            ? { opacity: [0, 1], y: [72, 0] }
            : { opacity: 1, y: 0 }
        }
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -11, 0], rotate: [0, 1.25, 0] }}
          transition={{
            duration: 5.5,
            delay: floatDelay,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="w-full"
        >
          <Image
            src={src}
            alt={alt}
            width={1024}
            height={1536}
            priority
            quality={90}
            draggable={false}
            onContextMenu={(event) => event.preventDefault()}
            className="h-auto w-full select-none object-contain"
          />
        </motion.div>
      </motion.div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-title"
      className="relative min-h-screen overflow-hidden border-b border-ink/15 bg-soft-white pb-20 pt-36 md:pb-24 md:pt-44"
    >
      <div className="section-shell grid min-h-[calc(100vh-14rem)] items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-2">
        <div className="relative z-10 max-w-[44rem]">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-ink/50">
            Газированная функциональная энергия
          </p>

          <h1 id="hero-title" className="font-extrabold text-ink">
            <span className="text-hero block">
              <span className="block">Энергия в твоём</span>
              <span className="block">ритме.</span>
            </span>
            <span className="mt-6 block text-[clamp(2.5rem,3.4vw,4.25rem)] font-medium leading-[0.94] tracking-[-0.055em] text-ink/45">
              Без перегруза.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-ink/70 md:mt-10 md:text-lg">
            Чистый фокус с натуральным кофеином, L-теанином и без сахара. Для долгих дней,
            поздних идей и всего, что между ними.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
            <a href="#subscription" className="cta-pill">
              Купить новинку
            </a>
            <a
              href="#flavours"
              className="inline-flex items-center justify-center rounded-full border border-ink bg-transparent px-7 py-4 text-sm font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-ink hover:text-soft-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-blue"
            >
              Выбрать вкус
            </a>
          </div>
        </div>

        <div className="relative mx-auto h-[34rem] w-full max-w-[50rem] lg:-mr-10 lg:h-[42rem] lg:w-[108%]">
          <div className="absolute inset-[2%] rounded-full bg-[radial-gradient(circle_at_center,rgba(198,255,62,0.2),rgba(201,205,210,0.08)_42%,transparent_72%)]" />
          <div className="absolute bottom-[2%] left-1/2 h-12 w-[88%] -translate-x-1/2 rounded-full bg-ink/10 blur-2xl" />

          <ProductCan
            src={assetPath("/images/can-lime.png")}
            alt="PULSE Lime Static sparkling energy drink can"
            className="left-0 top-[19%] z-10 w-[10rem] -rotate-[8deg] sm:w-[14rem] lg:top-[15%] lg:w-[18rem]"
            delay={0.12}
            floatDelay={0.4}
            scrollYProgress={scrollYProgress}
            scrollY={-55}
            scrollRotate={-7}
            mounted={mounted}
          />
          <ProductCan
            src={assetPath("/images/can-peach.png")}
            alt="PULSE Peach Signal sparkling energy drink can"
            className="inset-x-0 top-0 z-20 mx-auto w-[13rem] rotate-[2deg] sm:w-[17rem] lg:-top-[4%] lg:w-[22rem]"
            delay={0.26}
            floatDelay={1.1}
            scrollYProgress={scrollYProgress}
            scrollY={-90}
            scrollRotate={8}
            mounted={mounted}
          />
          <ProductCan
            src={assetPath("/images/can-berry.png")}
            alt="PULSE Berry Mode sparkling energy drink can"
            className="right-0 top-[21%] z-30 w-[10rem] rotate-[8deg] sm:w-[14rem] lg:top-[17%] lg:w-[18rem]"
            delay={0.4}
            floatDelay={1.8}
            scrollYProgress={scrollYProgress}
            scrollY={-35}
            scrollRotate={12}
            mounted={mounted}
          />
        </div>
      </div>
    </section>
  );
}
