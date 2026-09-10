"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gauge, Phone, ShieldCheck, Timer, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { PowerGrid } from "@/components/visuals/power-grid";
import { site } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const highlights = [
  { icon: Timer, label: "Odziv na teren", value: `${site.responseTime}` },
  { icon: Wrench, label: "Servis i delovi", value: "Sve marke" },
  { icon: ShieldCheck, label: "Garancija", value: "do 2 godine" },
  { icon: Gauge, label: "Opseg snage", value: "2 – 350 kVA" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-44">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-lines bg-[size:64px_64px] mask-fade-b opacity-60" />
        <PowerGrid className="absolute inset-0 h-full w-full opacity-70" />
        <div className="absolute left-1/2 top-[-18%] h-[520px] w-[820px] max-w-[130vw] -translate-x-1/2 rounded-full bg-volt/[0.16] blur-[130px]" />
        <div className="absolute bottom-[-30%] right-[-10%] h-[420px] w-[520px] rounded-full bg-volt-700/10 blur-[120px]" />
      </div>

      <div className="container">
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

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
            className="heading-xl mt-7"
          >
            Neprekidna energija za{" "}
            <span className="text-gradient-volt">vaš biznis i dom</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: EASE }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-steel-400 sm:text-lg"
          >
            Prodaja, iznajmljivanje i servis dizel i benzinskih agregata širom Srbije.
            Postavljamo automatiku koja preuzima napajanje u sekundi — i izlazimo na teren
            kada struja stane.
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
                  <span className="absolute inset-0 -z-10 bg-gradient-to-r from-volt-500 via-volt to-volt-700 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
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
            <span className="animate-float-slow rounded-full border border-volt/25 bg-volt/[0.08] px-4 py-2 text-sm font-semibold text-volt-200 shadow-volt-sm">
              ⚡ Odziv na teren u roku od {site.responseTime}
            </span>
          </motion.div>
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
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
      </div>
    </section>
  );
}
