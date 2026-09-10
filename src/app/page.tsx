import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileCallDock } from "@/components/layout/mobile-call-dock";
import { QuoteProvider } from "@/components/quote-context";
import { Hero } from "@/components/sections/hero";
import { PowerCalculator } from "@/components/sections/power-calculator";
import { ServicesBento } from "@/components/sections/services-bento";
import { Fleet } from "@/components/sections/fleet";
import { TrustStats } from "@/components/sections/trust-stats";
import { QuoteForm } from "@/components/sections/quote-form";
import { Faq } from "@/components/sections/faq";

export default function HomePage() {
  return (
    <QuoteProvider>
      <Navbar />
      <main className="pb-20 sm:pb-0">
        <Hero />
        <ServicesBento />
        <PowerCalculator />
        <Fleet />
        <TrustStats />
        <QuoteForm />
        <Faq />
      </main>
      <Footer />
      <MobileCallDock />
    </QuoteProvider>
  );
}
