"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cog, Droplet, Gauge, ShieldCheck, Timer, Volume2, Zap } from "lucide-react";
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
    { icon: Cog, label: "Motor", value: product.engine },
    { icon: Gauge, label: "Start", value: product.start },
    { icon: Volume2, label: "Nivo buke", value: product.noise },
    { icon: Droplet, label: "Rezervoar", value: product.tank },
    { icon: Timer, label: "Autonomija", value: product.runtime },
  ].filter((row) => Boolean(row.value));

  return (
    <dl className="mt-5 divide-y divide-white/20 overflow-hidden rounded-xl border border-white/45 bg-ink-850">
      {rows.map((row) => (
        <div key={row.label} className="flex items-start justify-between gap-3 px-3.5 py-2.5">
          <dt className="flex items-center gap-2 whitespace-nowrap text-[12px] text-steel-500">
            <row.icon className="h-3.5 w-3.5 shrink-0 text-volt-400" />
            {row.label}
          </dt>
          <dd className="text-right text-[12px] font-semibold text-steel-300">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Fotografija stoji na svetloj ploči 4:3 — svi modeli su isečeni na istu
 * podlogu, pa se u mreži kartice čitaju kao jedan katalog.
 */
function ProductMedia({ product, categoryLabel }: { product: Product; categoryLabel?: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden border-b border-white/45 bg-white">
      {product.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.image}
          alt={`${product.brand} ${product.name} — agregat ${product.power}`}
          loading="lazy"
          width={1200}
          height={900}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <GeneratorArt variant={product.art} className="h-28 w-auto" />
        </div>
      )}

      {/* odsjaj koji prelazi preko fotografije kada se pređe mišem */}
      <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-sheen group-hover:opacity-100" />

      {/* tanka linija u boji brenda umesto tvrde ivice ka telu kartice */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-volt-400/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <span className="absolute left-3.5 top-3.5 rounded-full bg-ink-950/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-steel-300 backdrop-blur-sm">
        {categoryLabel}
      </span>
      {product.featured && (
        <span className="absolute right-3.5 top-3.5 rounded-full bg-volt-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-volt-sm">
          Izdvajamo
        </span>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const categoryLabel = categories.find((item) => item.id === product.category)?.label;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/45 bg-ink-800 shadow-panel transition-[border-color,box-shadow] duration-500 hover:border-volt/60 hover:shadow-volt">
      <ProductMedia product={product} categoryLabel={categoryLabel} />

      <div className="flex flex-1 flex-col p-6">
        {/* proizvođač stoji iznad naziva — brend se prepoznaje pre modela */}
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-volt-400">
          {product.brand}
        </span>
        <h3 className="mt-1.5 font-display text-lg font-bold leading-tight text-white">
          {product.name}
        </h3>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-full border border-white/45 bg-white/[0.12] px-2.5 py-1 text-[11px] font-medium text-steel-400">
            {product.fuel}
          </span>
          {product.phase && (
            <span className="rounded-full border border-white/45 bg-white/[0.12] px-2.5 py-1 text-[11px] font-medium text-steel-400">
              {product.phase}
            </span>
          )}
        </div>

        {/* snaga je glavni podatak po kome se bira, pa stoji izdvojeno */}
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-volt-400/40 bg-volt/15 px-4 py-3">
          <Zap className="h-4 w-4 shrink-0 text-volt-400" />
          <span className="font-display text-xl font-extrabold leading-none text-white">
            {product.power}
          </span>
        </div>

        <SpecTable product={product} />

        <p className="mt-4 text-sm leading-relaxed text-steel-500">{product.useCase}</p>

        <div className="mt-auto pt-5">
          <p className="mb-3 flex items-center gap-1.5 text-[11px] text-steel-500">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-volt-400" />
            Garancija {product.warranty} · servis i delovi kod nas
          </p>
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
              Od tihih Honda invertera do industrijskih dizel agregata sa automatikom. Radimo sa
              proverenim markama — Honda, Pramac, Kohler SDMO, FG Wilson, KJ Power i Endress.
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
