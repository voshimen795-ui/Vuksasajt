"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Fuel, Info, Plug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Reveal } from "@/components/motion/reveal";
import { heavyLoads, profiles, recommend, type LoadId, type ProfileId } from "@/data/calculator";
import { cn, formatKw } from "@/lib/utils";

export function PowerCalculator() {
  const [profileId, setProfileId] = React.useState<ProfileId>("domacinstvo");
  const profile = profiles.find((item) => item.id === profileId) ?? profiles[0];
  const [kw, setKw] = React.useState(profile.baseKw);
  const [loads, setLoads] = React.useState<LoadId[]>([]);

  const selectProfile = (id: ProfileId) => {
    const next = profiles.find((item) => item.id === id);
    if (!next) return;
    setProfileId(id);
    setKw(next.baseKw);
  };

  const toggleLoad = (id: LoadId) => {
    setLoads((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  };

  const result = React.useMemo(() => recommend(kw, loads), [kw, loads]);

  // the quote form lives on the home page, so the result travels in the URL
  const quoteHref = `/?tip=${encodeURIComponent(profile.label)}&kva=${result.recommendedKva}&napomena=${encodeURIComponent(
    `Kalkulator: ${formatKw(result.continuousKw)} kW stalno / ${formatKw(result.peakKw)} kW u startu.`,
  )}#ponuda`;

  return (
    <section id="kalkulator" className="section pt-4">
      <div className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 mx-auto h-[380px] max-w-4xl rounded-full bg-volt/[0.07] blur-[120px]" />

      <div className="container">
        <Reveal>
          <div className="panel overflow-hidden shadow-panel">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-steel-500">
                  1. Tip objekta
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {profiles.map((item) => {
                    const active = item.id === profileId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => selectProfile(item.id)}
                        aria-pressed={active}
                        className={cn(
                          "relative rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300",
                          active
                            ? "border-volt/50 bg-volt/15 text-white shadow-volt-sm"
                            : "border-white/10 bg-white/[0.03] text-steel-400 hover:border-white/25 hover:text-white",
                        )}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-steel-500">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-volt/70" />
                  {profile.blurb}
                </p>

                <div className="mt-9">
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-steel-500">
                      2. Procenjena potrošnja
                    </p>
                    <p className="font-display text-2xl font-bold text-white">
                      {formatKw(kw)}
                      <span className="ml-1 text-sm font-semibold text-steel-400">kW</span>
                    </p>
                  </div>
                  <Slider
                    className="mt-4"
                    value={[kw]}
                    min={profile.minKw}
                    max={profile.maxKw}
                    step={0.5}
                    onValueChange={([value]) => setKw(value)}
                  />
                  <div className="flex justify-between text-xs text-steel-500">
                    <span>{profile.minKw} kW</span>
                    <span>{profile.maxKw} kW</span>
                  </div>
                </div>

                <div className="mt-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-steel-500">
                    3. Potrošači sa jakim startom
                  </p>
                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {heavyLoads.map((load) => {
                      const active = loads.includes(load.id);
                      return (
                        <button
                          key={load.id}
                          type="button"
                          onClick={() => toggleLoad(load.id)}
                          aria-pressed={active}
                          className={cn(
                            "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-300",
                            active
                              ? "border-volt/45 bg-volt/10 text-white"
                              : "border-white/10 bg-white/[0.02] text-steel-400 hover:border-white/25 hover:text-white",
                          )}
                        >
                          <span className="font-medium">{load.label}</span>
                          <span
                            className={cn(
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                              active ? "border-volt bg-volt text-white" : "border-white/20",
                            )}
                          >
                            {active && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="relative bg-gradient-to-b from-volt/[0.07] to-transparent p-6 sm:p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-steel-500">
                  Preporučena klasa
                </p>

                <motion.div
                  key={result.recommendedKva}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 flex items-baseline gap-2"
                >
                  <span className="font-display text-6xl font-extrabold leading-none text-gradient-volt sm:text-7xl">
                    {formatKw(result.recommendedKva)}
                  </span>
                  <span className="font-display text-2xl font-bold text-white">kVA</span>
                </motion.div>
                <p className="mt-2 text-sm text-steel-400">
                  ≈ {formatKw(result.recommendedKw)} kW radne snage
                </p>

                <dl className="mt-8 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <dt className="text-steel-400">Stalno opterećenje</dt>
                    <dd className="font-semibold text-white">{formatKw(result.continuousKw)} kW</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <dt className="text-steel-400">Vrh pri startu</dt>
                    <dd className="font-semibold text-white">{formatKw(result.peakKw)} kW</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <dt className="text-steel-400">Rezerva snage</dt>
                    <dd className="font-semibold text-emerald-400">+{result.headroom}%</dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-steel-300">
                    <Fuel className="h-3.5 w-3.5 text-volt" />
                    {result.fuel}
                  </span>
                  {result.needsAts && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-volt/30 bg-volt/10 px-3 py-1.5 text-xs font-semibold text-volt-200">
                      <Plug className="h-3.5 w-3.5" />
                      Preporučen ATS ormar
                    </span>
                  )}
                </div>

                <Button asChild size="lg" className="mt-8 w-full">
                  <a href={quoteHref}>
                    Naruči ovaj model
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </a>
                </Button>
                <p className="mt-3 text-center text-xs leading-relaxed text-steel-500">
                  Rezultat je orijentacioni. Naš inženjer besplatno proverava proračun pre ponude.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
