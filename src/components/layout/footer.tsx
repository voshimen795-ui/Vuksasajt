import Link from "next/link";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { mapsLink, navLinks, serviceLinks, site } from "@/config/site";

export function Footer() {
  return (
    <footer className="relative border-t border-white/45 bg-ink-800">
      {/* donji razmak ostavlja mesta plutajućoj traci za poziv na mobilnom */}
      <div className="container pb-28 pt-16 sm:pb-16 lg:py-20">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.7fr_0.7fr_1.1fr] lg:gap-10">
          <div className="sm:order-1 lg:order-none">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel-500">
              {site.legalName} — prodaja, iznajmljivanje i servis agregata i generatora struje
              na teritoriji cele Srbije.
            </p>

            <div className="mt-6 flex gap-2">
              <a
                href="https://www.facebook.com/"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/45 bg-white/[0.12] text-steel-400 transition-colors hover:border-volt/60 hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/45 bg-white/[0.12] text-steel-400 transition-colors hover:border-volt/60 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>

            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-8 flex h-[160px] max-w-xs items-center justify-center overflow-hidden rounded-2xl border border-white/45 bg-ink-850 transition-colors hover:border-volt/60"
            >
              <span
                aria-hidden
                className="absolute inset-0 bg-grid-lines bg-[size:34px_34px] opacity-70"
              />
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt/30 blur-3xl"
              />
              <span className="relative flex flex-col items-center gap-2 px-5 text-center">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-volt/55 bg-volt/25 text-volt-200">
                  <MapPin className="h-4 w-4" />
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-volt/30" />
                </span>
                <span className="font-display text-sm font-bold text-white">
                  {site.address.street}, {site.address.district}
                </span>
                <span className="text-xs text-steel-500">otvorite u Google Mapama</span>
              </span>
            </a>
          </div>

          <nav aria-label="Meni" className="sm:order-3 lg:order-none">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Meni</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-steel-500 transition-colors hover:text-volt-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Usluge" className="sm:order-4 lg:order-none">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Usluge</h2>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-steel-500 transition-colors hover:text-volt-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:order-2 lg:order-none">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Kontakt</h2>

            <a
              href={site.phones.mobile.href}
              className="mt-5 flex items-center gap-3 rounded-2xl border border-volt/50 bg-volt/[0.08] p-4 transition-colors hover:border-volt/50"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.14em] text-volt-200">
                  Hitne intervencije 24/7
                </span>
                <span className="block font-display text-lg font-bold text-white">
                  {site.phones.mobile.label}
                </span>
              </span>
            </a>

            <ul className="mt-5 space-y-3 text-sm text-steel-500">
              <li>
                <a
                  href={site.phones.office.href}
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-volt-400" />
                  {site.phones.office.label}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 break-all transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-volt-400" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 transition-colors hover:text-white"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-volt-400" />
                  <span>
                    {site.address.street}, {site.address.district}
                    <br />
                    {site.address.postal} {site.address.city}
                  </span>
                </a>
              </li>
            </ul>

            <ul className="mt-5 space-y-2 text-sm text-steel-500">
              {site.hours.map((entry) => (
                <li key={entry.days} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2.5">
                    <Clock className="h-4 w-4 shrink-0 text-steel-500" />
                    {entry.days}
                  </span>
                  <span className="font-medium text-steel-300">{entry.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>


        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/45 pt-8 text-center text-xs text-steel-500 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Sva prava zadržana.
          </p>
          <p>Agregati i generatori struje — prodaja, najam i servis u Srbiji.</p>
        </div>
      </div>
    </footer>
  );
}
