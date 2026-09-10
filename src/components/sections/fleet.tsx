"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Fuel, Gauge, ShieldCheck, Volume2, Zap } from "lucide-react";
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
          <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-steel-300">
            {product.power}
          </span>
          <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-steel-300">
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

function ProductCard({ product }: { product: Product }) {
  const specs = [
    { icon: Zap, label: product.power },
    { icon: Fuel, label: product.fuel },
    { icon: Volume2, label: product.noise },
    { icon: ShieldCheck, label: product.warranty },
  ];

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-850/60 transition-all duration-500 hover:-translate-y-1.5 hover:border-volt/35 hover:shadow-panel">
      {product.featured && (
        <span className="absolute left-5 top-5 z-10 rounded-full border border-volt/35 bg-volt/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-volt-200">
          Izdvajamo
        </span>
      )}

      <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent">
        <div className="absolute inset-x-8 bottom-0 h-24 rounded-full bg-volt/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <GeneratorArt
          variant={product.art}
          className="relative h-32 w-auto transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold text-white">{product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-steel-500">{product.useCase}</p>

        <ul className="mt-5 grid grid-cols-2 gap-2">
          {specs.map((spec) => (
            <li
              key={spec.label}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2 text-[11px] font-medium text-steel-300"
            >
              <spec.icon className="h-3.5 w-3.5 shrink-0 text-volt" />
              <span className="truncate">{spec.label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-2 text-xs text-steel-500">
          <Gauge className="h-3.5 w-3.5 text-steel-500" />
          {product.start}
        </div>

        <div className="mt-5 pt-1">
          <InquiryDialog product={product} />
        </div>
      </div>
    </div>
  );
}

export function Fleet() {
  const [active, setActive] = React.useState<CategoryId>("svi");

  const visible = React.useMemo(
    () => (active === "svi" ? products : products.filter((item) => item.category === active)),
    [active],
  );

  return (
    <section id="agregati" className="section">
      <div className="container">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Naša ponuda</span>
            <h2 className="heading-lg mt-6">Agregati za svaku namenu</h2>
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
                  onClick={() => setActive(category.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors duration-300",
                    isActive
                      ? "border-transparent text-white"
                      : "border-white/10 bg-white/[0.03] text-steel-400 hover:border-white/25 hover:text-white",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="fleet-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full border border-volt/50 bg-volt/15 shadow-volt-sm"
                    />
                  )}
                  {category.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
