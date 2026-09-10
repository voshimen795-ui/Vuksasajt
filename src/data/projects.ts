import type { ArtVariant } from "@/components/visuals/generator-art";

export type ProjectCategory = "ugradnja" | "najam" | "servis" | "ats";

export const projectCategories: { id: ProjectCategory | "svi"; label: string }[] = [
  { id: "svi", label: "Svi radovi" },
  { id: "ugradnja", label: "Ugradnja" },
  { id: "ats", label: "ATS automatika" },
  { id: "najam", label: "Iznajmljivanje" },
  { id: "servis", label: "Servis" },
];

export type Project = {
  slug: string;
  title: string;
  category: Exclude<ProjectCategory, never>;
  summary: string;
  scope: string[];
  power: string;
  objectType: string;
  art: ArtVariant;
  /** Zameniti putanjom do stvarne fotografije u /public/galerija kada bude dostupna. */
  image?: string;
};

/**
 * Prikazani su tipovi poslova koje izvodimo, bez podataka o naručiocima.
 * Kada budu dostupne fotografije sa terena, dodati `image` i konkretne
 * detalje (lokacija, godina) za svaku stavku.
 */
export const projects: Project[] = [
  {
    slug: "hladnjaca-ats",
    title: "Rezervno napajanje hladnjače",
    category: "ats",
    summary:
      "Dizel agregat u kućištu sa automatikom, tako da rashladni sistem ne staje pri nestanku struje.",
    scope: ["Isporuka agregata", "ATS ormar", "Puštanje u rad"],
    power: "60 kVA",
    objectType: "Hladnjača",
    art: "industrial",
  },
  {
    slug: "poslovni-objekat-ugradnja",
    title: "Agregat za poslovni objekat",
    category: "ugradnja",
    summary:
      "Agregat sa kućištem za smanjenje buke, sa pripremom temelja i povezivanjem na razvodni ormar.",
    scope: ["Priprema temelja", "Montaža", "Elektro povezivanje"],
    power: "20 kVA",
    objectType: "Poslovni prostor",
    art: "industrial",
  },
  {
    slug: "gradiliste-najam",
    title: "Napajanje gradilišta",
    category: "najam",
    summary:
      "Najam za period izvođenja radova, sa dostavom, priključenjem i preuzimanjem.",
    scope: ["Dostava na teren", "Priključenje", "Preuzimanje"],
    power: "30 kVA",
    objectType: "Gradilište",
    art: "portable",
  },
  {
    slug: "ordinacija-ats",
    title: "Automatika za ordinaciju",
    category: "ats",
    summary:
      "ATS ormar koji pokreće agregat i prebacuje napajanje za nekoliko sekundi, bez intervencije osoblja.",
    scope: ["Izrada ormara", "Programiranje", "Testiranje"],
    power: "15 kVA",
    objectType: "Zdravstvena ustanova",
    art: "ats",
  },
  {
    slug: "dogadjaj-najam",
    title: "Bešumno napajanje događaja",
    category: "najam",
    summary:
      "Inverterski agregati za bine i ugostiteljsku opremu, birani prema nivou buke.",
    scope: ["Proračun snage", "Dostava", "Dežurstvo na licu mesta"],
    power: "3 – 10 kVA",
    objectType: "Događaj na otvorenom",
    art: "inverter",
  },
  {
    slug: "redovni-servis",
    title: "Redovan servis agregata",
    category: "servis",
    summary:
      "Zamena ulja i filtera, provera akumulatora i automatike, uz izveštaj o stanju.",
    scope: ["Zamena ulja i filtera", "Provera automatike", "Izveštaj"],
    power: "Sve klase",
    objectType: "Ugovoreno održavanje",
    art: "industrial",
  },
  {
    slug: "hitna-intervencija",
    title: "Hitna intervencija na terenu",
    category: "servis",
    summary:
      "Dežurni tim, dijagnostika kvara i osposobljavanje van radnog vremena.",
    scope: ["Dijagnostika", "Popravka", "Provera pod opterećenjem"],
    power: "Sve klase",
    objectType: "Dežurstvo 24/7",
    art: "industrial",
  },
  {
    slug: "pumpe-navodnjavanje",
    title: "Pumpe za navodnjavanje",
    category: "ugradnja",
    summary:
      "Motorne pumpe sa proračunom protoka i visine dizanja prema terenu.",
    scope: ["Izbor pumpe", "Isporuka", "Obuka za rukovanje"],
    power: "600 – 1000 l/min",
    objectType: "Poljoprivredno gazdinstvo",
    art: "pump",
  },
];
