"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Droplet, Fuel, Gauge, Plug, ShieldCheck, Timer, Volume2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input, Label, Textarea } from "@/components/ui/field";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { GeneratorArt } from "@/components/visuals/generator-art";
import { categories, products, type CategoryId, type Product } from "@/data/products";
import { buildMailto } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

function InquiryDialog({ product }: { product: Product }) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");

  const href = buildMailto(`Upit: ${product.name}`, {
    Model: product.name,
    Snaga: product.power,
    Gorivo: product.fuel,
    "Ime i prezime": name,
    Telefon: phone,
    Poruka: message,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="glass" size="sm" className="w-full">
          Pošaljite upit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="font-display text-2xl font-bold text-white">
          Upit za {product.name}
        </DialogTitle>
        <DialogDescription className="mt-2 text-sm text-steel-400">
          Javljamo se sa cenom i rokom isporuke, najčešće istog radnog dana.
        </DialogDescription>

        <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
          <span className="rounded-lg border border-white/45 bg-white/[0.12] px-3 py-2 text-steel-300">
            {product.power}
          </span>
          <span className="rounded-lg border border-white/45 bg-white/[0.12] px-3 py-2 text-steel-300">
            {product.fuel}
          </span>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor={`name-${product.slug}`}>Ime i prezime</Label>
            <Input
              id={`name-${product.slug}`}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Petar Petrović"
              autoComplete="name"
            />
          </div>
          <div>
            <Label htmlFor={`phone-${product.slug}`}>Telefon</Label>
            <Input
              id={`phone-${product.slug}`}
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="06x xxx xx xx"
              autoComplete="tel"
            />
          </div>
          <div>
            <Label htmlFor={`msg-${product.slug}`}>Poruka</Label>
            <Textarea
              id={`msg-${product.slug}`}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Interesuje me cena i dostupnost."
            />
          </div>
        </div>

        <Button asChild size="lg" className="mt-6 w-full">
          <a href={href}>Pošaljite upit</a>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

/** Specifikacije idu kao tabela red-po-red, da se modeli mogu porediti. */
function SpecTable({ product }: { product: Product }) {
  const rows: { icon: typeof Zap; label: string; value?: string }[] = [
    { icon: Fuel, label: "Gorivo", value: product.fuel },
    { icon: Plug, label: "Napon", value: product.phase },
    { icon: Gauge, label: "Start", value: product.start },
    { icon: Volume2, label: "Nivo buke", value: product.noise },
    { icon: Droplet, label: "Rezervoar", value: product.tank },
    { icon: Timer, label: "Autonomija", value: product.runtime },
    { icon: ShieldCheck, label: "Garancija", value: product.warranty },
  ].filter((row) => Boolean(row.value));

  return (
    <dl className="mt-5 divide-y divide-white/20 overflow-hidden rounded-xl border border-white/45 bg-ink-850">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-3 px-3.5 py-2.5">
          <dt className="flex items-center gap-2 text-[12px] text-steel-500">
            <row.icon className="h-3.5 w-3.5 shrink-0 text-volt-400" />
            {row.label}
          </dt>
          <dd className="text-right text-[12px] font-semibold text-steel-300">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProductCard({ product }: { product: Product }) {
  const categoryLabel = categories.find((item) => item.id === product.category)?.label;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/45 bg-ink-800 shadow-panel transition-[border-color,box-shadow] duration-500 hover:border-volt/60 hover:shadow-panel">
      <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-white/45 bg-gradient-to-b from-white/[0.05] to-transparent">
        <div className="absolute inset-x-8 bottom-0 h-24 rounded-full bg-volt/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <GeneratorArt
          variant={product.art}
          className="relative h-28 w-auto transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/45 bg-ink-950/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-steel-300">
          {categoryLabel}
        </span>
        {product.featured && (
          <span className="absolute right-4 top-4 rounded-full border border-volt/55 bg-volt/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-volt-200">
            Izdvajamo
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold leading-tight text-white">
          {product.name}
        </h3>

        {/* snaga je glavni podatak po kome se bira, pa stoji izdvojeno */}
        <div className="mt-4 flex items-baseline gap-2 rounded-xl border border-volt-400/40 bg-volt/15 px-4 py-3">
          <Zap className="h-4 w-4 shrink-0 text-volt-400" />
          <span className="font-display text-xl font-extrabold text-white">{product.power}</span>
        </div>

        <SpecTable product={product} />

        <p className="mt-4 text-sm leading-relaxed text-steel-500">{product.useCase}</p>

        <div className="mt-auto pt-5">
          <InquiryDialog product={product} />
        </div>
      </div>
    </div>
  );
}

const INITIAL_COUNT = 6;

export function Fleet() {
  const [active, setActive] = React.useState<CategoryId>("svi");
  const [expanded, setExpanded] = React.useState(false);

  const matching = React.useMemo(
    () => (active === "svi" ? products : products.filter((item) => item.category === active)),
    [active],
  );

  const visible = expanded ? matching : matching.slice(0, INITIAL_COUNT);
  const hidden = matching.length - visible.length;

  const selectCategory = (id: CategoryId) => {
    setActive(id);
    setExpanded(false);
  };

  return (
    <section id="agregati" className="section">
      <div className="container">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Naša ponuda</span>
            <TextReveal
              className="heading-lg mt-6"
              segments={[{ text: "Agregati za" }, { text: "svaku namenu", accent: true }]}
            />
            <p className="mt-5 text-base leading-relaxed text-steel-400">
              Od tihih inverterskih modela do industrijskih dizel agregata sa automatikom.
            </p>
          </div>
          <Button asChild variant="outline" size="md" className="shrink-0 self-start lg:self-end">
            <a href="#ponuda">Tražite drugi model?</a>
          </Button>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {categories.map((category) => {
              const isActive = category.id === active;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => selectCategory(category.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors duration-300",
                    isActive
                      ? "border-transparent text-white"
                      : "border-white/45 bg-white/[0.12] text-steel-400 hover:border-white/60 hover:text-white",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="fleet-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full border border-volt/50 bg-volt/25 shadow-volt-sm"
                    />
                  )}
                  {category.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((product) => (
              <motion.div
                key={product.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-0"
              >
                <TiltCard className="h-full">
                  <ProductCard product={product} />
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {hidden > 0 && (
          <motion.div layout className="mt-8 flex justify-center">
            <Button variant="glass" size="md" onClick={() => setExpanded(true)}>
              Prikaži još {hidden}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
