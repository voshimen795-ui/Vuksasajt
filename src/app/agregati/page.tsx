import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Fleet } from "@/components/sections/fleet";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Agregati i generatori struje",
  description:
    "Ponuda agregata: tihi Honda inverteri, benzinski agregati, dizel agregati u kućištu i industrijski sa ATS automatikom. Honda, Pramac, Kohler SDMO, FG Wilson, KJ Power i Endress.",
  alternates: { canonical: "/agregati" },
};

export default function AgregatiPage() {
  return (
    <>
      <PageHero
        eyebrow="Agregati"
        title={[{ text: "Agregati za" }, { text: "svaku namenu", accent: true }]}
        lede="Od tihih Honda invertera za kamp i vikendicu do industrijskih dizel agregata sa automatikom koji pokreću ceo objekat. Filtrirajte po vrsti i uporedite snage."
      />

      <Fleet />

      <CtaBand
        title="Niste sigurni koja snaga vam treba?"
        text="Recite nam šta pokrećete — predlažemo model i izlazimo na teren."
      />
    </>
  );
}
