import type { ArtVariant } from "@/components/visuals/generator-art";

export type CategoryId = "svi" | "benzinski" | "dizel" | "inverterski" | "industrijski" | "pumpe";

export const categories: { id: CategoryId; label: string }[] = [
  { id: "svi", label: "Svi" },
  { id: "benzinski", label: "Benzinski" },
  { id: "dizel", label: "Dizel" },
  { id: "inverterski", label: "Tih / Inverterski" },
  { id: "industrijski", label: "Industrijski" },
  { id: "pumpe", label: "Vodene pumpe" },
];

export type Product = {
  slug: string;
  name: string;
  category: Exclude<CategoryId, "svi">;
  art: ArtVariant;
  power: string;
  fuel: string;
  noise: string;
  warranty: string;
  start: string;
  useCase: string;
  featured?: boolean;
};

/**
 * Katalog je pripremljen kao struktura — zameniti stvarnim modelima i
 * specifikacijama iz magacina pre puštanja sajta u produkciju.
 */
export const products: Product[] = [
  {
    slug: "benzinski-3kw",
    name: "Benzinski agregat 3 kW",
    category: "benzinski",
    art: "portable",
    power: "3 kW / 3,7 kVA",
    fuel: "Benzin",
    noise: "~ 68 dB",
    warranty: "2 godine",
    start: "Ručno paljenje",
    useCase: "Vikendica, alat, manje gradilište",
  },
  {
    slug: "benzinski-6kw",
    name: "Benzinski agregat 6 kW",
    category: "benzinski",
    art: "portable",
    power: "6 kW / 7,5 kVA",
    fuel: "Benzin",
    noise: "~ 72 dB",
    warranty: "2 godine",
    start: "Elektro start",
    useCase: "Domaćinstvo, radionica",
    featured: true,
  },
  {
    slug: "inverter-2kw",
    name: "Inverterski agregat 2 kW",
    category: "inverterski",
    art: "inverter",
    power: "2 kW / 2,2 kVA",
    fuel: "Benzin",
    noise: "~ 52 dB",
    warranty: "2 godine",
    start: "Ručno paljenje",
    useCase: "Kamp, osetljiva elektronika",
  },
  {
    slug: "inverter-3kw",
    name: "Inverterski agregat 3 kW",
    category: "inverterski",
    art: "inverter",
    power: "3 kW / 3,2 kVA",
    fuel: "Benzin",
    noise: "~ 55 dB",
    warranty: "2 godine",
    start: "Elektro start",
    useCase: "Ugostiteljstvo, događaji, bešumni rad",
    featured: true,
  },
  {
    slug: "dizel-10kva",
    name: "Dizel agregat 10 kVA",
    category: "dizel",
    art: "portable",
    power: "8 kW / 10 kVA",
    fuel: "Dizel",
    noise: "~ 70 dB",
    warranty: "2 godine",
    start: "Elektro start",
    useCase: "Kuća, mala firma, prodavnica",
  },
  {
    slug: "dizel-20kva",
    name: "Dizel agregat 20 kVA u kućištu",
    category: "dizel",
    art: "industrial",
    power: "16 kW / 20 kVA",
    fuel: "Dizel",
    noise: "~ 62 dB",
    warranty: "2 godine",
    start: "Automatski (ATS spreman)",
    useCase: "Poslovni objekat, apoteka, server soba",
    featured: true,
  },
  {
    slug: "dizel-60kva",
    name: "Dizel agregat 60 kVA",
    category: "industrijski",
    art: "industrial",
    power: "48 kW / 60 kVA",
    fuel: "Dizel",
    noise: "~ 65 dB",
    warranty: "2 godine",
    start: "Automatski (ATS)",
    useCase: "Proizvodnja, hladnjača, hotel",
  },
  {
    slug: "dizel-150kva",
    name: "Dizel agregat 150 kVA",
    category: "industrijski",
    art: "industrial",
    power: "120 kW / 150 kVA",
    fuel: "Dizel",
    noise: "~ 68 dB",
    warranty: "2 godine",
    start: "Automatski (ATS)",
    useCase: "Industrija, data centar, bolnica",
  },
  {
    slug: "pumpa-2-cola",
    name: "Vodena pumpa 2″",
    category: "pumpe",
    art: "pump",
    power: "600 l/min",
    fuel: "Benzin",
    noise: "~ 70 dB",
    warranty: "2 godine",
    start: "Ručno paljenje",
    useCase: "Navodnjavanje, ispumpavanje",
  },
  {
    slug: "pumpa-3-cola",
    name: "Vodena pumpa 3″",
    category: "pumpe",
    art: "pump",
    power: "1000 l/min",
    fuel: "Benzin",
    noise: "~ 72 dB",
    warranty: "2 godine",
    start: "Ručno paljenje",
    useCase: "Gradilište, poplavljeni prostor",
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
