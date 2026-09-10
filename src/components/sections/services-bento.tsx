"use client";

import * as React from "react";
import {
  ArrowUpRight,
  CalendarClock,
  Droplets,
  PackageCheck,
  ShieldAlert,
  ToggleRight,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { GeneratorArt } from "@/components/visuals/generator-art";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: PackageCheck,
    title: "Prodaja agregata",
    description:
      "Novi i provereni polovni dizel i benzinski agregati, sa garancijom i puštanjem u rad.",
    points: ["Novi i polovni", "Garancija do 2 godine", "Puštanje u rad"],
    art: "portable" as const,
    className: "lg:col-span-2 lg:row-span-2",
    featured: true,
  },
  {
    icon: CalendarClock,
    title: "Iznajmljivanje",
    description: "Od jednog dana do cele sezone, sa dostavom i priključenjem.",
    points: ["Dnevni i mesečni najam", "Dostava i priključenje"],
    art: "inverter" as const,
    className: "lg:col-span-2",
  },
  {
    icon: ShieldAlert,
    title: "Servis i hitne intervencije",
    description: "Redovno održavanje po planu i dežurni tim na terenu non-stop.",
    points: ["24/7 dežurstvo", "Originalni delovi"],
    art: "industrial" as const,
    className: "lg:col-span-2",
    urgent: true,
  },
  {
    icon: ToggleRight,
    title: "Automatski ormari (ATS)",
    description: "Automatika koja prebacuje napajanje na agregat za nekoliko sekundi.",
    points: ["ATS / DEA", "Daljinski nadzor"],
    art: "ats" as const,
    className: "lg:col-span-2",
  },
  {
    icon: Droplets,
    title: "Vodene pumpe",
    description: "Motorne pumpe za navodnjavanje, gradilišta i ispumpavanje.",
    points: ["2″ i 3″", "Servis i delovi"],
    art: "pump" as const,
    className: "lg:col-span-2",
  },
];

function SpotlightCard({
  children,
  className,
  featured,
}: {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-volt/35 sm:p-8",
        featured ? "bg-gradient-to-br from-volt/[0.09] via-ink-850/80 to-ink-900" : "bg-ink-850/60",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(255,85,0,0.14), transparent 65%)",
        }}
      />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}

export function ServicesBento() {
  return (
    <section id="usluge" className="section">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Naše usluge</span>
          <h2 className="heading-lg mt-6">Sve za neprekidno napajanje na jednom mestu</h2>
          <p className="mt-5 text-base leading-relaxed text-steel-400">
            Od izbora i montaže do održavanja i hitnog izlaska na teren.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-4 sm:gap-5 lg:grid-cols-6">
          {services.map((service) => (
            <StaggerItem key={service.title} className={cn("min-w-0", service.className)}>
              <SpotlightCard featured={service.featured} className="h-full">
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={cn(
                      "inline-flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors duration-500",
                      service.urgent
                        ? "border-volt/40 bg-volt/15 text-volt"
                        : "border-white/10 bg-white/5 text-volt-400 group-hover:border-volt/30",
                    )}
                  >
                    <service.icon className="h-6 w-6" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-steel-500 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-volt" />
                </div>

                <h3 className="mt-6 font-display text-xl font-bold text-white sm:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-steel-400">
                  {service.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-steel-300"
                    >
                      {point}
                    </li>
                  ))}
                </ul>

                {service.featured && (
                  <div className="pointer-events-none mt-auto hidden pt-10 opacity-70 transition-opacity duration-500 group-hover:opacity-100 lg:block">
                    <GeneratorArt variant={service.art} className="h-44 w-full" />
                  </div>
                )}
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
