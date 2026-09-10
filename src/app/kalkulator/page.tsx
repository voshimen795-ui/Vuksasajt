import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { PowerCalculator } from "@/components/sections/power-calculator";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { PowerGrid } from "@/components/visuals/power-grid";

export const metadata: Metadata = {
  title: "Kalkulator snage agregata",
  description:
    "Izračunajte koliko kilovata vam treba. Izaberite tip objekta i potrošače sa jakim startom i dobijte preporučenu klasu agregata u kVA.",
  alternates: { canonical: "/kalkulator" },
};

export default function CalculatorPage() {
  return (
    <>
      <div className="relative">
        <PowerGrid className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] w-full opacity-50" />
        <PageHero
          eyebrow="Kalkulator snage"
          title={
            <>
              Koliko kilovata <span className="text-gradient-volt">vam zaista treba?</span>
            </>
          }
          lede="Premali agregat se gasi pod opterećenjem, preveliki troši gorivo bez potrebe. Pomerite klizač, označite potrošače i dobićete preporučenu klasu."
        />
      </div>

      <PowerCalculator />
      <Faq />
      <CtaBand
        title="Proverite proračun sa inženjerom"
        text="Pošaljite rezultat i javljamo se sa cenom, rokom i predlogom automatike."
      />
    </>
  );
}
