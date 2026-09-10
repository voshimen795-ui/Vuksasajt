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
        title={[{ text: "Poslovi koje" }, { text: "svakodnevno izvodimo", accent: true }]}
        lede="Ugradnja sa automatikom, najam za gradilišta i događaje, servis i hitni izlasci. Izaberite vrstu posla da vidite šta obuhvata."
      />

      <Gallery />

      <CtaBand
        title="Imate sličan objekat?"
        text="Recite nam šta pokrećete i gde — izlazimo na teren i predlažemo rešenje."
      />
    </>
  );
}
