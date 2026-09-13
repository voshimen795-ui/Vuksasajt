import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/layout/logo";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/config/site";

export function CtaBand({
  title,
  text,
  primary = { label: "Zatražite ponudu", href: "/#ponuda" },
}: {
  title: string;
  text: string;
  primary?: { label: string; href: string };
}) {
  return (
    <section className="section pt-0">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.18] bg-gradient-to-br from-volt/[0.12] via-ink-800/80 to-ink-850/80 p-8 sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-volt/20 blur-[100px]"
            />
            <LogoMark
              size={320}
              className="pointer-events-none absolute -bottom-20 -right-10 z-0 hidden h-60 w-auto opacity-[0.12] lg:block"
            />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-steel-400">{text}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
                <Button asChild size="lg">
                  <Link href={primary.href}>
                    {primary.label}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="glass" size="lg">
                  <a href={site.phones.mobile.href}>
                    <Phone className="h-4 w-4 text-volt-400" />
                    {site.phones.mobile.label}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
