import Link from "next/link";
import { ArrowRight, Gauge, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { categories, products } from "@/data/products";

/**
 * Na početnoj ne stoji ceo katalog — samo četiri modela koja pokrivaju sve
 * četiri kategorije, kao uvod u stranicu /agregati.
 */
const SHOWCASE = ["honda-eu22i", "honda-ec5500", "sdmo-kohler-10lc", "fgwilson-p22"];

const showcase = SHOWCASE.map((slug) => products.find((item) => item.slug === slug)).filter(
  (item): item is (typeof products)[number] => Boolean(item),
);

/** Raspon snaga se čita iz kataloga, da ne zastari kad se doda novi model. */
function powerRange() {
  const values = products
    .map((item) => Number(item.power.split("/").pop()?.replace(/[^\d,.]/g, "").replace(",", ".")))
    .filter((value) => Number.isFinite(value) && value > 0);

  if (!values.length) return null;
  const format = (value: number) => String(value).replace(".", ",");
  return `${format(Math.min(...values))} – ${format(Math.max(...values))} kVA`;
}

export function FleetTeaser() {
  const range = powerRange();
  const groups = categories
    .filter((category) => category.id !== "svi")
    .map((category) => ({
      ...category,
      count: products.filter((item) => item.category === category.id).length,
    }))
    .filter((category) => category.count > 0);

  return (
    <section id="agregati" className="section">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          {/* ------------------------------------------------------- tekst */}
          <Reveal>
            <span className="eyebrow">Naša ponuda</span>
            <TextReveal
              className="heading-lg mt-6"
              segments={[{ text: "Agregati za" }, { text: "svaku namenu", accent: true }]}
            />
            <p className="mt-5 max-w-xl text-base leading-relaxed text-steel-400">
              Od tihih Honda invertera za kamp i vikendicu do industrijskih dizel agregata sa
              automatikom koji pokreću ceo objekat. Radimo sa proverenim markama — Honda, Pramac,
              Kohler SDMO, FG Wilson, KJ Power i Endress.
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <div>
                <dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-steel-500">
                  <Gauge className="h-3.5 w-3.5 text-volt-400" />
                  Modela u ponudi
                </dt>
                <dd className="mt-1 font-display text-2xl font-extrabold text-white">
                  {products.length}
                </dd>
              </div>
              {range && (
                <div>
                  <dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-steel-500">
                    <Zap className="h-3.5 w-3.5 text-volt-400" />
                    Raspon snage
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-extrabold text-white">{range}</dd>
                </div>
              )}
            </dl>

            <div className="mt-8 flex flex-wrap gap-2">
              {groups.map((group) => (
                <span
                  key={group.id}
                  className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/[0.12] px-3.5 py-2 text-[13px] font-medium text-steel-400"
                >
                  {group.label}
                  <span className="font-bold text-volt-400">{group.count}</span>
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/agregati">
                  Pogledajte sve agregate
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg">
                <Link href="/kalkulator">Kalkulator snage</Link>
              </Button>
            </div>
          </Reveal>

          {/* ------------------------------------------ četiri predstavnika */}
          <Stagger className="grid grid-cols-2 gap-4 sm:gap-5">
            {showcase.map((product) => (
              <StaggerItem key={product.slug}>
                <Link
                  href="/agregati"
                  className="group block overflow-hidden rounded-2xl border border-white/45 bg-ink-800 shadow-panel transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-volt/60 hover:shadow-volt"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-white/45 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={`${product.brand} ${product.name}`}
                      loading="lazy"
                      width={1200}
                      height={900}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-volt-400">
                      {product.brand}
                    </span>
                    {/* dva reda, da se duži nazivi ne seku na uskom ekranu */}
                    <p className="mt-1 line-clamp-2 min-h-[2.6em] font-display text-sm font-bold leading-tight text-white">
                      {product.name}
                    </p>
                    <p className="mt-1 text-[12px] font-semibold text-steel-500">{product.power}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
