import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";

/** Znak firme — amblem sa agregatom, isečen sa providnom pozadinom. */
export function LogoMark({
  className,
  size = 44,
  priority = false,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo-dermatina.png"
      alt={`${site.legalName} — znak firme`}
      width={size}
      height={Math.round((size * 933) / 825)}
      priority={priority}
      className={cn("h-auto w-auto select-none drop-shadow-[0_6px_18px_rgba(0,0,0,0.55)]", className)}
    />
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark size={44} priority className="h-11 w-auto" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold uppercase tracking-tight text-white">
          Dermatina
        </span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-volt-400">
          Agregati i generatori
        </span>
      </span>
    </span>
  );
}
