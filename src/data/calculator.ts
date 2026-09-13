export type ProfileId =
  | "domacinstvo"
  | "vikendica"
  | "gradiliste"
  | "dogadjaji"
  | "poslovni"
  | "industrija";

export type Profile = {
  id: ProfileId;
  label: string;
  blurb: string;
  baseKw: number;
  minKw: number;
  maxKw: number;
};

export const profiles: Profile[] = [
  {
    id: "domacinstvo",
    label: "Domaćinstvo",
    blurb: "Rasveta, frižider, kotao, TV i internet tokom nestanka struje.",
    baseKw: 5,
    minKw: 2,
    maxKw: 20,
  },
  {
    id: "vikendica",
    label: "Vikendica",
    blurb: "Povremeno korišćenje, manja potrošnja, tih rad u prirodi.",
    baseKw: 3,
    minKw: 1,
    maxKw: 12,
  },
  {
    id: "gradiliste",
    label: "Gradilište",
    blurb: "Mešalice, cirkulari, bušilice i reflektori sa jakim startom.",
    baseKw: 9,
    minKw: 3,
    maxKw: 45,
  },
  {
    id: "dogadjaji",
    label: "Događaji",
    blurb: "Bina, ozvučenje, rasveta i ugostiteljska oprema na otvorenom.",
    baseKw: 15,
    minKw: 3,
    maxKw: 120,
  },
  {
    id: "poslovni",
    label: "Poslovni objekat",
    blurb: "Kase, serveri, rashladne vitrine i liftovi bez prekida rada.",
    baseKw: 18,
    minKw: 5,
    maxKw: 80,
  },
  {
    id: "industrija",
    label: "Industrijski objekat",
    blurb: "Motori, kompresori i proizvodne linije u neprekidnom pogonu.",
    baseKw: 60,
    minKw: 20,
    maxKw: 250,
  },
];

export type LoadId = "klima" | "motor" | "grejanje" | "it";

export const heavyLoads: { id: LoadId; label: string; kw: number; surge: number }[] = [
  { id: "klima", label: "Klima uređaji", kw: 3, surge: 2.4 },
  { id: "motor", label: "Elektromotori / kompresor", kw: 5, surge: 3 },
  { id: "grejanje", label: "Grejanje / bojler", kw: 4, surge: 1.1 },
  { id: "it", label: "Serveri / osetljiva elektronika", kw: 2, surge: 1.2 },
];

const POWER_FACTOR = 0.8;
const CLASSES = [3, 5, 7.5, 10, 15, 20, 30, 45, 60, 80, 100, 150, 200, 275, 350];

export type Recommendation = {
  continuousKw: number;
  peakKw: number;
  recommendedKva: number;
  recommendedKw: number;
  headroom: number;
  needsAts: boolean;
  fuel: "Benzinski ili inverterski" | "Dizel agregat" | "Industrijski dizel agregat";
};

export function recommend(baseKw: number, selectedLoads: LoadId[]): Recommendation {
  const loads = heavyLoads.filter((load) => selectedLoads.includes(load.id));
  const extraKw = loads.reduce((sum, load) => sum + load.kw, 0);
  const continuousKw = baseKw + extraKw;

  const largestSurge = loads.reduce((max, load) => Math.max(max, load.surge), 1);
  const largestLoadKw = loads.reduce((max, load) => Math.max(max, load.kw), 0);
  const peakKw = continuousKw - largestLoadKw + largestLoadKw * largestSurge;

  const requiredKva = peakKw / POWER_FACTOR;
  const recommendedKva = CLASSES.find((value) => value >= requiredKva) ?? CLASSES[CLASSES.length - 1];
  const recommendedKw = Math.round(recommendedKva * POWER_FACTOR * 10) / 10;

  return {
    continuousKw: Math.round(continuousKw * 10) / 10,
    peakKw: Math.round(peakKw * 10) / 10,
    recommendedKva,
    recommendedKw,
    headroom: Math.max(0, Math.round(((recommendedKw - continuousKw) / Math.max(continuousKw, 1)) * 100)),
    needsAts: recommendedKva >= 10,
    fuel:
      recommendedKva <= 7.5
        ? "Benzinski ili inverterski"
        : recommendedKva <= 60
          ? "Dizel agregat"
          : "Industrijski dizel agregat",
  };
}
