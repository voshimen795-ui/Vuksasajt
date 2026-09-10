import { Calculator, Headphones, PackageCheck, Wrench } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { GeneratorArt } from "@/components/visuals/generator-art";
import { site } from "@/config/site";

const steps = [
  {
    icon: Calculator,
    title: "Proračun snage",
    text: "Utvrdimo šta pokrećete i koliko traži start najjačeg potrošača.",
  },
  {
    icon: PackageCheck,
    title: "Izbor uređaja",
    text: "Predlažemo model prema snazi, gorivu i nivou buke.",
  },
  {
    icon: Wrench,
    title: "Montaža",
    text: "Dovozimo, povezujemo i testiramo pod opterećenjem.",
  },
  {
    icon: Headphones,
    title: "Održavanje",
    text: "Redovni servisi i dežurstvo za hitne intervencije.",
  },
];

export function AboutStory() {
  return (
    <section className="section pt-4">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <Reveal>
            <TextReveal
              className="heading-lg"
              segments={[{ text: "Agregat nije samo mašina —" }, { text: "to je vaša rezerva", accent: true }]}
            />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-steel-400">
              <p>
                {site.legalName} se bavi prodajom, iznajmljivanjem i servisom agregata i
                vodenih pumpi — za domaćinstva, gradilišta i firme kojima prekid napajanja
                pravi štetu.
              </p>
              <p>
                Pre ponude pitamo šta pokrećete, da li vam treba tih rad i da li je
                potrebna automatika. Tek onda predlažemo model.
              </p>
              <p>
                Sedište je u {site.address.city}u, na teren izlazimo širom Srbije.
                Servisiramo i uređaje kupljene drugde.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-volt/[0.10] via-ink-850 to-ink-900 p-8 sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-volt/20 blur-[90px]"
              />
              <GeneratorArt variant="industrial" className="relative h-52 w-full" />
              <p className="relative mt-6 font-display text-lg font-bold text-white">
                Od 2 kVA do industrijskih postrojenja
              </p>
              <p className="relative mt-2 text-sm leading-relaxed text-steel-400">
                Prenosivi benzinski, tihi inverterski, dizel u kućištu i ATS ormari.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-20">
          <Reveal>
            <TextReveal
              className="heading-lg max-w-xl"
              segments={[{ text: "Kako izgleda" }, { text: "saradnja", accent: true }]}
            />
          </Reveal>

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <StaggerItem key={step.title}>
                <div className="group h-full rounded-3xl border border-white/10 bg-ink-850/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-volt/30">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-volt transition-colors duration-500 group-hover:border-volt/35 group-hover:bg-volt/10">
                      <step.icon className="h-5 w-5" />
                    </span>
                    <span className="font-display text-sm font-bold text-steel-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-steel-400">{step.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
