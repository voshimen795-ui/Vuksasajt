import { Hero } from "@/components/sections/hero";
import { ServicesBento } from "@/components/sections/services-bento";
import { Fleet } from "@/components/sections/fleet";
import { CtaBand } from "@/components/sections/cta-band";
import { QuoteForm } from "@/components/sections/quote-form";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesBento />
      <Fleet />
      <CtaBand
        title="Niste sigurni koliko kilovata vam treba?"
        text="Kalkulator vas kroz tri koraka vodi do preporučene klase agregata, a naš inženjer proračun proverava besplatno."
        primary={{ label: "Otvorite kalkulator", href: "/kalkulator" }}
      />
      <QuoteForm />
    </>
  );
}
