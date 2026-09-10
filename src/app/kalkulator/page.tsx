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
          lede="Agregat koji je premali gasi se pod opterećenjem, a preveliki nepotrebno troši gorivo. Pomerite klizač, označite potrošače koji se pale zajedno i za nekoliko sekundi dobijate preporučenu klasu."
        />
      </div>

      <PowerCalculator />
      <Faq />
      <CtaBand
        title="Proverite proračun sa inženjerom"
        text="Pošaljite rezultat i javljamo se sa konkretnom ponudom, rokom isporuke i predlogom automatike."
      />
    </>
  );
}
