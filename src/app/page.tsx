import { Hero } from "@/components/sections/hero";
import { ServicesBento } from "@/components/sections/services-bento";
import { FleetTeaser } from "@/components/sections/fleet-teaser";
import { QuoteForm } from "@/components/sections/quote-form";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesBento />
      <FleetTeaser />
      <QuoteForm />
    </>
  );
}
