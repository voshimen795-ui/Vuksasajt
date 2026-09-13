export const site = {
  brand: "DERMATINA",
  legalName: '"DERMATINA" d.o.o.',
  tagline: "Agregati i generatori struje",
  domain: "https://agregati-generatori.com",
  description:
    "Prodaja, iznajmljivanje i servis dizel i benzinskih agregata u Srbiji. Automatski ormari (ATS) i hitne intervencije 24/7.",
  address: {
    street: "Kanadska 2",
    district: "Višnjička banja",
    postal: "11060",
    city: "Beograd",
    country: "Srbija",
  },
  email: "dermatinadoo@gmail.com",
  phones: {
    office: { label: "011 / 20 85 910", href: "tel:+381112085910" },
    mobile: { label: "063 / 825 15 31", href: "tel:+381638251531" },
  },
  hours: [
    { days: "Ponedeljak – Petak", time: "08:00 – 17:00" },
    { days: "Subota", time: "09:00 – 14:00" },
    { days: "Hitne intervencije", time: "24 / 7" },
  ],
  responseTime: "60 min",
  mapsQuery: "Kanadska 2, Višnjička banja, 11060 Beograd",
} as const;

export const navLinks = [
  { label: "Usluge", href: "/#usluge" },
  { label: "Agregati", href: "/#agregati" },
  { label: "Kalkulator", href: "/kalkulator" },
  { label: "Galerija", href: "/galerija" },
  { label: "O nama", href: "/o-nama" },
] as const;

export const serviceLinks = [
  { label: "Prodaja agregata", href: "/#agregati" },
  { label: "Iznajmljivanje agregata", href: "/#usluge" },
  { label: "Servis agregata", href: "/#usluge" },
  { label: "Automatski ormari (ATS)", href: "/#usluge" },
  { label: "Kalkulator snage", href: "/kalkulator" },
  { label: "Galerija radova", href: "/galerija" },
] as const;

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;
