import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-14 pt-32 sm:pb-16 sm:pt-36 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-lines bg-[size:64px_64px] mask-fade-b opacity-40" />
        <div className="absolute left-1/2 top-[-30%] h-[420px] w-[720px] max-w-[130vw] -translate-x-1/2 rounded-full bg-volt/[0.12] blur-[130px]" />
      </div>

      <div className="container">
        <nav aria-label="Putanja" className="flex items-center gap-1.5 text-xs text-steel-500">
          <Link href="/" className="transition-colors hover:text-white">
            Početna
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-steel-300">{eyebrow}</span>
        </nav>

        <div className="mt-8 max-w-3xl">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="heading-xl mt-6">{title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-steel-400 sm:text-lg">{lede}</p>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
