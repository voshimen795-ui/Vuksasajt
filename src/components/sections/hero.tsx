"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Gauge, Phone, ShieldCheck, Timer, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { TextReveal } from "@/components/motion/text-reveal";
import { LogoMark } from "@/components/layout/logo";
import { site } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const highlights = [
  { icon: Timer, label: "Odziv na teren", value: site.responseTime },
  { icon: Wrench, label: "Servis i delovi", value: "Sve marke" },
  { icon: ShieldCheck, label: "Garancija", value: "do 2 godine" },
  { icon: Gauge, label: "Opseg snage", value: "2 – 350 kVA" },
];

/**
 * Snimak je nižeg kvaliteta, pa ide blago zamućen i uvećan — tako radi kao
 * atmosfera iza teksta, a artefakti kompresije se ne vide.
 */
function HeroBackdrop({ style }: { style?: React.ComponentProps<typeof motion.div>["style"] }) {
  const reduced = useReducedMotion();
  const media = "h-full w-full scale-[1.15] object-cover blur-[3px] brightness-[0.95] saturate-110";

  return (
    <motion.div style={style} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/video/hero-poster.jpg" alt="" className={media} />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/video/hero-poster.jpg"
          aria-hidden
          className={media}
        >
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* vinjeta drži pažnju na sredini, a donji prelaz spaja hero sa stranom */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_40%,transparent_20%,rgba(8,8,14,0.55)_70%,rgba(8,8,14,0.85)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-transparent to-ink-950" />
      <div className="absolute left-1/2 top-1/3 h-[560px] w-[980px] max-w-[140vw] -translate-x-1/2 rounded-full bg-volt/20 blur-[160px]" />
    </motion.div>
  );
}

export function Hero() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const backdropScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const backdropOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36"
    >
      <HeroBackdrop style={{ scale: backdropScale, opacity: backdropOpacity }} />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container">
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex justify-center"
          >
            <LogoMark size={110} priority className="h-24 w-auto sm:h-28" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="mt-6 flex justify-center"
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
            className="heading-xl text-hard mt-7"
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
            className="text-hard mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
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
                  <Phone className="h-4 w-4 text-volt-200" />
                  {site.phones.mobile.label}
                </a>
              </Button>
            </Magnetic>
          </motion.div>
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
        >
          {highlights.map((item) => (
            <li
              key={item.label}
              className="rounded-2xl border border-white/40 bg-ink-950/70 px-4 py-5 text-center shadow-panel backdrop-blur-xl transition-colors duration-300 hover:border-volt-400"
            >
              <item.icon className="mx-auto h-5 w-5 text-volt-400" />
              <p className="mt-3 font-display text-lg font-extrabold text-white">{item.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-steel-400">
                {item.label}
              </p>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
