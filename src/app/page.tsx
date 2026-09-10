import { Hero } from "@/components/sections/hero";
import { ServicesBento } from "@/components/sections/services-bento";
import { Fleet } from "@/components/sections/fleet";
import { QuoteForm } from "@/components/sections/quote-form";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesBento />
      <Fleet />
      <QuoteForm />
    </>
  );
}
