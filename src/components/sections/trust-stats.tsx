"use client";

import { Clock, MapPin, Truck, Wrench } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { sectors } from "@/data/products";
import { site } from "@/config/site";

/** Proveriti i uskladiti brojke sa stvarnim podacima firme pre objave. */
const stats = [
  { value: 10, suffix: "+", label: "godina iskustva" },
  { value: 500, suffix: "+", label: "isporučenih agregata" },
  { value: 60, suffix: " min", label: "prosečan odziv" },
  { value: 24, suffix: "/7", label: "dežurni servis" },
];

const reasons = [
  {
    icon: Wrench,
    title: "Sopstveni servis",
    text: "Održavamo, popravljamo i obezbeđujemo delove.",
  },
  {
    icon: Truck,
    title: "Dostava i montaža",
    text: "Dovozimo, priključujemo i puštamo u rad na vašoj lokaciji.",
  },
  {
    icon: Clock,
    title: "Dežurstvo 24/7",
    text: "Dostupni smo i vikendom i praznikom.",
  },
  {
    icon: MapPin,
    title: "Cela Srbija",
    text: `Baza u ${site.address.city}u, teren širom zemlje.`,
  },
];

export function TrustStats() {
  return (
    <section id="zasto-mi" className="section">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">Zašto baš mi</span>
            <TextReveal
              className="heading-lg mt-6"
              segments={[{ text: "Ozbiljna oprema traži" }, { text: "ozbiljnu podršku", accent: true }]}
            />
            <p className="mt-5 text-base leading-relaxed text-steel-400">
              Agregat kupujete jednom, a oslanjate se na njega godinama. Uz uređaj idu
              proračun, montaža, plan održavanja i broj koji se javlja i u tri ujutru.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/[0.18] bg-white/[0.07] p-5 transition-colors duration-500 hover:border-volt/60"
                >
                  <dt className="font-display text-3xl font-extrabold text-gradient-volt sm:text-4xl">
                    <CountUp to={stat.value} />
                    {stat.suffix}
                  </dt>
                  <dd className="mt-2 text-xs uppercase tracking-[0.12em] text-steel-500">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <StaggerItem key={reason.title}>
                <div className="group h-full rounded-3xl border border-white/[0.18] bg-ink-800/65 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-volt/60 sm:p-7">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.18] bg-white/15 text-volt-400 transition-colors duration-500 group-hover:border-volt/60 group-hover:bg-volt/20">
                    <reason.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-white">{reason.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-steel-400">{reason.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1} className="mt-16">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-steel-500">
            Radimo za
          </p>
          <div className="mask-fade-x mt-6 overflow-hidden">
            <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
              {[...sectors, ...sectors].map((sector, index) => (
                <span
                  key={`${sector}-${index}`}
                  className="whitespace-nowrap rounded-full border border-white/[0.18] bg-white/[0.07] px-5 py-2.5 text-sm font-medium text-steel-500 transition-colors duration-300 hover:border-volt/60 hover:text-white"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
