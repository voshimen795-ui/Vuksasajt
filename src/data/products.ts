import type { ArtVariant } from "@/components/visuals/generator-art";

export type CategoryId = "svi" | "benzinski" | "dizel" | "inverterski" | "industrijski";

export const categories: { id: CategoryId; label: string }[] = [
  { id: "svi", label: "Svi" },
  { id: "benzinski", label: "Benzinski" },
  { id: "dizel", label: "Dizel" },
  { id: "inverterski", label: "Tih / Inverterski" },
  { id: "industrijski", label: "Industrijski" },
];

export type Product = {
  slug: string;
  name: string;
  /** Proizvođač — stoji iznad naziva na kartici. */
  brand: string;
  category: Exclude<CategoryId, "svi">;
  /** Fotografija u /public/proizvodi, odnos stranica 4:3. */
  image: string;
  /** Crtež koji se koristi ako fotografija nedostaje. */
  art: ArtVariant;
  power: string;
  fuel: string;
  noise: string;
  warranty: string;
  start: string;
  useCase: string;
  /** Motor, po potrebi i alternator. */
  engine?: string;
  /** Napon i broj faza. */
  phase?: string;
  /** Zapremina rezervoara, npr. "15 l". */
  tank?: string;
  /** Autonomija pri ~75% opterećenja, npr. "8 h". */
  runtime?: string;
  featured?: boolean;
};

/**
 * Modeli iz naše ponude. Fotografije su isečene iz materijala dobijenog od
 * vlasnika i ujednačene na istu podlogu (skripta nije deo repozitorijuma —
 * nove slike dodati u /public/proizvodi kao 1200×900 .webp).
 *
 * NAPOMENA: snage i ostale specifikacije su unete prema katalozima
 * proizvođača. Pre puštanja u produkciju proveriti ih sa stvarnim
 * mašinama u magacinu — menja se samo ovaj fajl, kartice se same ažuriraju.
 */
export const products: Product[] = [
  /* ---------------------------------------------------------------- tihi */
  {
    slug: "honda-eu65is",
    name: "Honda EU65is",
    brand: "Honda",
    category: "inverterski",
    image: "/proizvodi/honda-eu65is.webp",
    art: "inverter",
    power: "5,5 kW / 6,5 kVA",
    fuel: "Benzin",
    engine: "Honda GX390",
    phase: "230 V, jednofazni",
    noise: "52 – 60 dB",
    tank: "19,2 l",
    runtime: "do 8,8 h",
    start: "Elektro start",
    warranty: "2 godine",
    useCase: "Najjači inverter u ponudi — bine, snimanja i osetljiva oprema koja traži čistu sinusoidu.",
    featured: true,
  },
  {
    slug: "honda-eu30is",
    name: "Honda EU30is",
    brand: "Honda",
    category: "inverterski",
    image: "/proizvodi/honda-eu30is.webp",
    art: "inverter",
    power: "2,6 kW / 3,0 kVA",
    fuel: "Benzin",
    engine: "Honda GX200",
    phase: "230 V, jednofazni",
    noise: "49 – 60 dB",
    tank: "13 l",
    runtime: "do 7,1 h",
    start: "Elektro start",
    warranty: "2 godine",
    useCase: "Tih rad na točkovima — ugostiteljstvo, štandovi i manji događaji u naselju.",
  },
  {
    slug: "honda-eu22i",
    name: "Honda EU22i",
    brand: "Honda",
    category: "inverterski",
    image: "/proizvodi/honda-eu22i.webp",
    art: "inverter",
    power: "1,8 kW / 2,2 kVA",
    fuel: "Benzin",
    engine: "Honda GXR120",
    phase: "230 V, jednofazni",
    noise: "48 – 57 dB",
    tank: "3,6 l",
    runtime: "3,4 – 8,1 h",
    start: "Ručno paljenje",
    warranty: "2 godine",
    useCase: "Klasik za kamp i vikendicu — nosi se jednom rukom, a struja je čista za laptop i TV.",
  },
  {
    slug: "honda-eu10i",
    name: "Honda EU10i",
    brand: "Honda",
    category: "inverterski",
    image: "/proizvodi/honda-eu10i.webp",
    art: "inverter",
    power: "0,9 kW / 1,0 kVA",
    fuel: "Benzin",
    engine: "Honda GXH50",
    phase: "230 V, jednofazni",
    noise: "46 – 57 dB",
    tank: "2,1 l",
    runtime: "3,9 – 8,3 h",
    start: "Ručno paljenje",
    warranty: "2 godine",
    useCase: "Najmanji i najtiši model — rasveta, punjači i alat male snage.",
  },

  /* ----------------------------------------------------------- benzinski */
  {
    slug: "honda-ec5500",
    name: "Honda EC5500",
    brand: "Honda",
    category: "benzinski",
    image: "/proizvodi/honda-ec5500.webp",
    art: "portable",
    power: "5,0 kW / 5,5 kVA",
    fuel: "Benzin",
    engine: "Honda GX390 sa AVR regulacijom",
    phase: "230 V, jednofazni",
    noise: "~ 72 dB",
    tank: "6,2 l",
    runtime: "~ 4,5 h",
    start: "Ručno paljenje",
    warranty: "2 godine",
    useCase: "Radni konj na gradilištu — cevna konstrukcija, AVR i motor koji trpi ceo dan.",
  },
  {
    slug: "endress-ese606",
    name: "Endress ESE 606 GT",
    brand: "Endress",
    category: "benzinski",
    image: "/proizvodi/endress-ese606.webp",
    art: "portable",
    power: "5,4 kW / 6,0 kVA",
    fuel: "Benzin",
    engine: "Honda GX390 sa AVR regulacijom",
    phase: "230 V, jednofazni",
    noise: "~ 70 dB",
    tank: "6,5 l",
    runtime: "~ 4 h",
    start: "Ručno paljenje",
    warranty: "2 godine",
    useCase: "Nemačka izrada sa Honda motorom — zanatske radionice i rezerva za domaćinstvo.",
  },

  /* --------------------------------------------------------------- dizel */
  {
    slug: "sdmo-kohler-10lc",
    name: "Kohler SDMO 10 LC A AVR",
    brand: "Kohler SDMO",
    category: "dizel",
    image: "/proizvodi/sdmo-kohler-10lc.webp",
    art: "industrial",
    power: "8 kW / 10 kVA",
    fuel: "Dizel",
    engine: "Kohler dizel, Stage V",
    phase: "230 V, jednofazni",
    noise: "~ 62 dB",
    tank: "24 l",
    runtime: "do 10 h",
    start: "Elektro start",
    warranty: "2 godine",
    useCase: "Zvučno izolovano kućište — prodavnica, apoteka ili kuća u gusto naseljenom delu.",
  },
  {
    slug: "pramac-s6000",
    name: "Pramac S6000",
    brand: "Pramac",
    category: "dizel",
    image: "/proizvodi/pramac-s6000.webp",
    art: "portable",
    power: "4,2 kW / 5,3 kVA",
    fuel: "Dizel",
    engine: "Yanmar L100, vazdušno hlađen",
    phase: "230 V / 400 V",
    noise: "~ 73 dB",
    tank: "5,5 l",
    runtime: "~ 5 h",
    start: "Elektro start",
    warranty: "2 godine",
    useCase: "Dizel na otvorenom ramu — gradilište, poljoprivreda i mešoviti jednofazni i trofazni alat.",
  },
  {
    slug: "pramac-p11000",
    name: "Pramac P11000",
    brand: "Pramac",
    category: "dizel",
    image: "/proizvodi/pramac-p11000.webp",
    art: "industrial",
    power: "8,3 kW / 10,4 kVA",
    fuel: "Dizel",
    engine: "Yanmar dizel u ProTech kućištu",
    phase: "230 V, jednofazni",
    noise: "~ 66 dB",
    tank: "38 l",
    runtime: "do 14 h",
    start: "Elektro start, spreman za ATS",
    warranty: "2 godine",
    useCase: "Veliki rezervoar i tiho kućište — noćni rad bez dolivanja goriva.",
  },

  /* -------------------------------------------------------- industrijski */
  {
    slug: "fgwilson-p22",
    name: "FG Wilson P22-1",
    brand: "FG Wilson",
    category: "industrijski",
    image: "/proizvodi/fgwilson-p22.webp",
    art: "industrial",
    power: "17,6 kW / 22 kVA",
    fuel: "Dizel",
    engine: "Perkins dizel",
    phase: "400 V, trofazni",
    noise: "~ 66 dB",
    start: "Automatski (ATS)",
    warranty: "2 godine",
    useCase: "Ulazna klasa industrijskih agregata — poslovni objekat, pumpna stanica, server soba.",
    featured: true,
  },
  {
    slug: "kjpower-kjk33",
    name: "KJ Power KJK33",
    brand: "KJ Power",
    category: "industrijski",
    image: "/proizvodi/kjpower-kjk33.webp",
    art: "industrial",
    power: "26,4 kW / 33 kVA",
    fuel: "Dizel",
    engine: "Kohler dizel",
    phase: "400 V, trofazni",
    noise: "~ 68 dB",
    start: "Automatski (ATS)",
    warranty: "2 godine",
    useCase: "Kućište za spoljnu montažu — hladnjače, hoteli i proizvodne hale.",
  },
  {
    slug: "kjpower-kjp33",
    name: "KJ Power KJP33",
    brand: "KJ Power",
    category: "industrijski",
    image: "/proizvodi/kjpower-kjp33.webp",
    art: "industrial",
    power: "26,4 kW / 33 kVA",
    fuel: "Dizel",
    engine: "Perkins motor, Stamford alternator",
    phase: "400 V, trofazni",
    noise: "~ 68 dB",
    start: "Automatski (ATS)",
    warranty: "2 godine",
    useCase: "Perkins i Stamford u istom kućištu — gradilišta i duži zakup na terenu.",
  },
  {
    slug: "kjpower-kjk66",
    name: "KJ Power KJK66",
    brand: "KJ Power",
    category: "industrijski",
    image: "/proizvodi/kjpower-kjk66.webp",
    art: "industrial",
    power: "52,8 kW / 66 kVA",
    fuel: "Dizel",
    engine: "Kohler dizel",
    phase: "400 V, trofazni",
    noise: "~ 70 dB",
    start: "Automatski (ATS)",
    warranty: "2 godine",
    useCase: "Snaga za ceo objekat — isporučujemo na prikolici i puštamo u rad na licu mesta.",
  },
];

/** Sektori u kojima radimo — zameniti logotipima referenci kada budu dostupni. */
export const sectors = [
  "Gradilišta",
  "Hoteli i restorani",
  "Zdravstvo i apoteke",
  "Hladnjače",
  "Proizvodne hale",
  "Telekomunikacije",
  "Poljoprivreda",
  "Događaji i bine",
];
