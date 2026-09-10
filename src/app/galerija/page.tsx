import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Gallery } from "@/components/sections/gallery";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Galerija radova",
  description:
    "Pregled poslova koje izvodimo: ugradnja agregata, ATS automatika, iznajmljivanje za gradilišta i događaje, servis i hitne intervencije.",
  alternates: { canonical: "/galerija" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Galerija"
        title={
          <>
            Poslovi koje <span className="text-gradient-volt">svakodnevno izvodimo</span>
          </>
        }
        lede="Od ugradnje agregata sa automatikom, preko najma za gradilišta i događaje, do servisa i hitnih izlazaka na teren. Izaberite vrstu posla da vidite šta tačno obuhvata."
      />

      <Gallery />

      <CtaBand
        title="Imate sličan objekat?"
        text="Recite nam šta pokrećete i gde se objekat nalazi — izlazimo na teren, merimo i predlažemo rešenje."
      />
    </>
  );
}
