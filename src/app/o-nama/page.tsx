import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { AboutStory } from "@/components/sections/about-story";
import { TrustStats } from "@/components/sections/trust-stats";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "O nama",
  description: `${site.legalName} — prodaja, iznajmljivanje i servis agregata, generatora struje i vodenih pumpi. Sedište u ${site.address.city}u, izlazak na teren širom Srbije.`,
  alternates: { canonical: "/o-nama" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="O nama"
        title={
          <>
            Ljudi koji <span className="text-gradient-volt">drže struju u pogonu</span>
          </>
        }
        lede={`${site.legalName} pokriva sve — proračun snage, izbor uređaja, montažu i automatiku, servis i hitne intervencije.`}
      />

      <AboutStory />
      <TrustStats />
      <Faq />
      <CtaBand
        title="Popričajmo o vašem objektu"
        text="Recite nam šta pokrećete — ponudu šaljemo najčešće istog radnog dana."
      />
    </>
  );
}
