"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Gauge, Phone, ShieldCheck, Timer, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { TextReveal } from "@/components/motion/text-reveal";
import { site } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const highlights = [
  { icon: Timer, label: "Odziv na teren", value: site.responseTime },
  { icon: Wrench, label: "Servis i delovi", value: "Sve marke" },
  { icon: ShieldCheck, label: "Garancija", value: "do 2 godine" },
  { icon: Gauge, label: "Opseg snage", value: "2 – 350 kVA" },
];

function HeroBackdrop({ style }: { style?: React.ComponentProps<typeof motion.div>["style"] }) {
  const reduced = useReducedMotion();

  return (
    <motion.div style={style} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/video/hero-poster.jpg"
          alt=""
          className="h-full w-full object-cover opacity-70"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/hero-poster.jpg"
          aria-hidden
          className="h-full w-full object-cover opacity-80"
        >
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-ink-950/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/25 to-ink-950" />
      <div className="absolute inset-0 bg-grid-lines bg-[size:64px_64px] opacity-25" />
      <div className="absolute left-1/2 top-1/3 h-[420px] w-[760px] max-w-[130vw] -translate-x-1/2 rounded-full bg-volt/[0.10] blur-[130px]" />
    </motion.div>
  );
}

export function Hero() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const backdropScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const backdropOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-40"
    >
      <HeroBackdrop style={{ scale: backdropScale, opacity: backdropOpacity }} />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex justify-center"
          >
            <span className="eyebrow">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Dežurni tim dostupan 24 / 7
            </span>
          </motion.div>

          <TextReveal
            as="h1"
            className="heading-xl mt-7"
            delay={0.1}
            segments={[
              { text: "Neprekidna energija za" },
              { text: "vaš biznis i dom", accent: true },
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: EASE }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-steel-300 sm:text-lg"
          >
            Prodaja, iznajmljivanje i servis agregata širom Srbije — sa automatikom
            koja preuzima napajanje u sekundi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24, ease: EASE }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Magnetic className="w-full sm:w-auto">
              <Button asChild size="lg" className="w-full overflow-hidden sm:w-auto">
                <a href="#ponuda">
                  Zatražite ponudu
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </Button>
            </Magnetic>

            <Magnetic className="w-full sm:w-auto">
              <Button asChild variant="glass" size="lg" className="w-full sm:w-auto">
                <a href={site.phones.mobile.href}>
                  <Phone className="h-4 w-4 text-volt" />
                  Pozovite odmah: {site.phones.mobile.label}
                </a>
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.42, ease: EASE }}
            className="mt-8 flex justify-center"
          >
            <span className="animate-float-slow rounded-full border border-volt/25 bg-volt/[0.08] px-4 py-2 text-sm font-semibold text-volt-200 shadow-volt-sm backdrop-blur-sm">
              ⚡ Odziv na teren u roku od {site.responseTime}
            </span>
          </motion.div>
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {highlights.map((item) => (
            <li
              key={item.label}
              className="glass rounded-2xl px-4 py-5 text-center transition-colors duration-300 hover:border-volt/25"
            >
              <item.icon className="mx-auto h-5 w-5 text-volt" />
              <p className="mt-3 font-display text-lg font-bold text-white">{item.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-steel-500">{item.label}</p>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
