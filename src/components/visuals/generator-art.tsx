import { cn } from "@/lib/utils";

export type ArtVariant = "portable" | "inverter" | "industrial" | "ats";

const stroke = "rgba(255,255,255,0.8)";
const accent = "#6E87D6";
const faint = "rgba(255,255,255,0.22)";

function Portable() {
  return (
    <>
      <rect x="26" y="62" width="108" height="46" rx="8" fill={faint} stroke={stroke} strokeWidth="1.5" />
      <rect x="40" y="44" width="42" height="22" rx="5" fill="none" stroke={stroke} strokeWidth="1.5" />
      <circle cx="104" cy="86" r="13" fill="none" stroke={accent} strokeWidth="2" />
      <circle cx="104" cy="86" r="5" fill={accent} opacity="0.65" />
      <path d="M22 62V44a8 8 0 0 1 8-8h100a8 8 0 0 1 8 8v18" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M26 108v10M134 108v10" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M50 78h18M50 86h12" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </>
  );
}

function Inverter() {
  return (
    <>
      <rect x="30" y="38" width="100" height="76" rx="14" fill={faint} stroke={stroke} strokeWidth="1.5" />
      <rect x="44" y="54" width="72" height="26" rx="6" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.85" />
      <path d="M62 60l-8 12h10l-6 10 16-14H64l6-8z" fill={accent} />
      <circle cx="58" cy="96" r="6" fill="none" stroke={stroke} strokeWidth="1.5" />
      <circle cx="78" cy="96" r="6" fill="none" stroke={stroke} strokeWidth="1.5" />
      <path d="M98 92h20M98 100h14" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M46 30h68" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </>
  );
}

function Industrial() {
  return (
    <>
      <rect x="18" y="46" width="124" height="60" rx="6" fill={faint} stroke={stroke} strokeWidth="1.5" />
      <path d="M34 60v32M46 60v32M58 60v32M70 60v32" stroke={stroke} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <rect x="88" y="60" width="38" height="26" rx="4" fill="none" stroke={accent} strokeWidth="1.5" />
      <path d="M96 73h22" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      <path d="M96 66h10" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M104 46V32h26v14" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <rect x="26" y="106" width="14" height="10" rx="2" fill={stroke} opacity="0.5" />
      <rect x="120" y="106" width="14" height="10" rx="2" fill={stroke} opacity="0.5" />
    </>
  );
}

function Ats() {
  return (
    <>
      <rect x="42" y="30" width="76" height="88" rx="8" fill={faint} stroke={stroke} strokeWidth="1.5" />
      <path d="M56 48h48M56 62h32" stroke={stroke} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <circle cx="66" cy="88" r="7" fill="none" stroke={accent} strokeWidth="2" />
      <circle cx="66" cy="88" r="2.5" fill={accent} />
      <path d="M84 80l-6 12h8l-5 10 14-14h-8l5-8z" fill={accent} opacity="0.9" />
      <path d="M42 74H24M118 74h18" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

const variants: Record<ArtVariant, () => JSX.Element> = {
  portable: Portable,
  inverter: Inverter,
  industrial: Industrial,
  ats: Ats,
};

export function GeneratorArt({
  variant,
  className,
}: {
  variant: ArtVariant;
  className?: string;
}) {
  const Shape = variants[variant];

  return (
    <svg
      viewBox="0 0 160 140"
      role="img"
      aria-hidden
      className={cn("h-full w-full", className)}
    >
      <Shape />
    </svg>
  );
}
