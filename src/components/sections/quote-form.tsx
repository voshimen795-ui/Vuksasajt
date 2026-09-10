"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/field";
import { Reveal } from "@/components/motion/reveal";
import { profiles } from "@/data/calculator";
import { site } from "@/config/site";
import { buildMailto } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

const serviceTypes = ["Kupovina", "Iznajmljivanje", "Servis / popravka", "ATS ormar"];
const powerRanges = ["do 5 kVA", "5 – 15 kVA", "15 – 60 kVA", "60 – 150 kVA", "preko 150 kVA"];
const timelines = ["Hitno (24h)", "Ove nedelje", "Ovog meseca", "Samo se raspitujem"];

const steps = ["Tip objekta", "Potrebna snaga", "Kontakt podaci"];

function ChipGroup({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={active}
            className={cn(
              "rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300",
              active
                ? "border-volt/50 bg-volt/15 text-white shadow-volt-sm"
                : "border-white/10 bg-white/[0.03] text-steel-400 hover:border-white/25 hover:text-white",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export function QuoteForm() {
  const [step, setStep] = React.useState(0);
  const [sent, setSent] = React.useState(false);

  const [objectType, setObjectType] = React.useState("");
  const [serviceType, setServiceType] = React.useState("");
  const [power, setPower] = React.useState("");
  const [timeline, setTimeline] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [note, setNote] = React.useState("");

  // prefill from the power calculator, which hands its result over in the URL
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tip = params.get("tip");
    const napomena = params.get("napomena");
    const kva = Number(params.get("kva"));

    if (tip && profiles.some((profile) => profile.label === tip)) setObjectType(tip);
    if (napomena) setNote(napomena);
    if (kva > 0) {
      setPower(
        kva <= 5
          ? powerRanges[0]
          : kva <= 15
            ? powerRanges[1]
            : kva <= 60
              ? powerRanges[2]
              : kva <= 150
                ? powerRanges[3]
                : powerRanges[4],
      );
    }
  }, []);

  const canContinue = step === 0 ? Boolean(objectType && serviceType) : Boolean(power && timeline);
  const canSubmit = name.trim().length > 1 && phone.trim().length > 5;

  const href = buildMailto("Zahtev za ponudu — agregat", {
    "Tip objekta": objectType,
    Usluga: serviceType,
    "Potrebna snaga": power,
    Rok: timeline,
    "Ime i prezime": name,
    Telefon: phone,
    "E-mail": email,
    Lokacija: location,
    Napomena: note,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    window.location.href = href;
    setSent(true);
  };

  return (
    <section id="ponuda" className="section">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 mx-auto h-[420px] max-w-5xl rounded-full bg-volt/[0.07] blur-[130px]" />

      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">Zatražite ponudu</span>
            <h2 className="heading-lg mt-6">Ponuda na osnovu vaših stvarnih potreba</h2>
            <p className="mt-5 text-base leading-relaxed text-steel-400">
              Tri kratka koraka do konkretne cene, bez skrivenih troškova.
            </p>

            <ul className="mt-10 space-y-3">
              <li>
                <a
                  href={site.phones.mobile.href}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors duration-300 hover:border-volt/35"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-volt/15 text-volt">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.14em] text-steel-500">
                      Hitno / mobilni
                    </span>
                    <span className="block font-semibold text-white">{site.phones.mobile.label}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.phones.office.href}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors duration-300 hover:border-volt/35"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-volt-400">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.14em] text-steel-500">
                      Kancelarija
                    </span>
                    <span className="block font-semibold text-white">{site.phones.office.label}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors duration-300 hover:border-volt/35"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-volt-400">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-[0.14em] text-steel-500">
                      E-mail
                    </span>
                    <span className="block truncate font-semibold text-white">{site.email}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-volt-400">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.14em] text-steel-500">
                    Adresa
                  </span>
                  <span className="block font-semibold text-white">
                    {site.address.street}, {site.address.district}
                  </span>
                </span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="panel p-6 shadow-panel sm:p-8 lg:p-10">
              {sent ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-400">
                    <Check className="h-8 w-8" strokeWidth={2.5} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold text-white">
                    Upit je spreman za slanje
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-steel-400">
                    Otvorili smo vaš mail program sa popunjenim podacima. Ako se ništa nije
                    otvorilo, pozovite nas direktno — javljamo se odmah.
                  </p>
                  <Button asChild size="lg" className="mt-7">
                    <a href={site.phones.mobile.href}>
                      <Phone className="h-4 w-4" />
                      {site.phones.mobile.label}
                    </a>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center gap-3">
                    {steps.map((label, index) => (
                      <div key={label} className="flex flex-1 flex-col gap-2">
                        <div className="h-1 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            initial={false}
                            animate={{ width: index <= step ? "100%" : "0%" }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full rounded-full bg-gradient-to-r from-volt-500 to-volt"
                          />
                        </div>
                        <span
                          className={cn(
                            "text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors",
                            index <= step ? "text-volt-400" : "text-steel-500",
                          )}
                        >
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 min-h-[340px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-7"
                      >
                        {step === 0 && (
                          <>
                            <div>
                              <Label>Za kakav objekat vam treba napajanje?</Label>
                              <ChipGroup
                                options={profiles.map((profile) => profile.label)}
                                value={objectType}
                                onChange={setObjectType}
                              />
                            </div>
                            <div>
                              <Label>Šta vas zanima?</Label>
                              <ChipGroup
                                options={serviceTypes}
                                value={serviceType}
                                onChange={setServiceType}
                              />
                            </div>
                          </>
                        )}

                        {step === 1 && (
                          <>
                            <div>
                              <Label>Potrebna snaga</Label>
                              <ChipGroup options={powerRanges} value={power} onChange={setPower} />
                              <p className="mt-3 text-xs text-steel-500">
                                Niste sigurni?{" "}
                                <a href="/kalkulator" className="text-volt-400 underline underline-offset-4">
                                  Iskoristite kalkulator snage
                                </a>
                                .
                              </p>
                            </div>
                            <div>
                              <Label>Kada vam treba?</Label>
                              <ChipGroup options={timelines} value={timeline} onChange={setTimeline} />
                            </div>
                          </>
                        )}

                        {step === 2 && (
                          <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <Label htmlFor="q-name">Ime i prezime *</Label>
                                <Input
                                  id="q-name"
                                  required
                                  value={name}
                                  onChange={(event) => setName(event.target.value)}
                                  placeholder="Petar Petrović"
                                  autoComplete="name"
                                />
                              </div>
                              <div>
                                <Label htmlFor="q-phone">Telefon *</Label>
                                <Input
                                  id="q-phone"
                                  required
                                  type="tel"
                                  value={phone}
                                  onChange={(event) => setPhone(event.target.value)}
                                  placeholder="06x xxx xx xx"
                                  autoComplete="tel"
                                />
                              </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <Label htmlFor="q-email">E-mail</Label>
                                <Input
                                  id="q-email"
                                  type="email"
                                  value={email}
                                  onChange={(event) => setEmail(event.target.value)}
                                  placeholder="vas@email.com"
                                  autoComplete="email"
                                />
                              </div>
                              <div>
                                <Label htmlFor="q-location">Lokacija</Label>
                                <Input
                                  id="q-location"
                                  value={location}
                                  onChange={(event) => setLocation(event.target.value)}
                                  placeholder="Grad / opština"
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="q-note">Napomena</Label>
                              <Textarea
                                id="q-note"
                                value={note}
                                onChange={(event) => setNote(event.target.value)}
                                placeholder="Opišite ukratko šta pokrećete i gde se objekat nalazi."
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
                    {step > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="md"
                        onClick={() => setStep((value) => value - 1)}
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Nazad
                      </Button>
                    )}

                    <div className="ml-auto">
                      {step < 2 ? (
                        <Button
                          type="button"
                          size="lg"
                          disabled={!canContinue}
                          onClick={() => setStep((value) => value + 1)}
                        >
                          Dalje
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Button>
                      ) : (
                        <Button type="submit" size="lg" disabled={!canSubmit}>
                          <Send className="h-4 w-4" />
                          Pošaljite zahtev
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
