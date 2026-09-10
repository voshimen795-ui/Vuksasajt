import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { mapsLink, mapsUrl, navLinks, serviceLinks, site } from "@/config/site";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-900/60">
      <div className="container py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.7fr_0.7fr_1.1fr] lg:gap-10">
          <div>
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-steel-400 transition-colors hover:border-volt/35 hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-steel-400 transition-colors hover:border-volt/35 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <nav aria-label="Meni">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Meni</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-steel-500 transition-colors hover:text-volt-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Usluge">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Usluge</h2>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-steel-500 transition-colors hover:text-volt-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Kontakt</h2>

            <a
              href={site.phones.mobile.href}
              className="mt-5 flex items-center gap-3 rounded-2xl border border-volt/25 bg-volt/[0.08] p-4 transition-colors hover:border-volt/50"
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
                  <Phone className="h-4 w-4 shrink-0 text-volt" />
                  {site.phones.office.label}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 break-all transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-volt" />
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
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-volt" />
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

        <div className="mt-14 overflow-hidden rounded-3xl border border-white/10">
          <iframe
            src={mapsUrl}
            title={`Lokacija — ${site.legalName}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[280px] w-full grayscale-[0.4] contrast-125"
          />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-steel-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Sva prava zadržana.
          </p>
          <p>Agregati i generatori struje — prodaja, najam i servis u Srbiji.</p>
        </div>
      </div>
    </footer>
  );
}
