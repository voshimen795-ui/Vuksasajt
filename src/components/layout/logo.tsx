import { cn } from "@/lib/utils";
import { site } from "@/config/site";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-volt/30 bg-volt/20">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path
            d="M13.5 2 5 13.2h5.2L9.6 22 19 10.4h-5.4L13.5 2Z"
            fill="#FF5500"
          />
        </svg>
        <span className="absolute inset-0 rounded-xl bg-volt/25 blur-lg" aria-hidden />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold tracking-tight text-white">
          {site.brand}
        </span>
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-steel-500">
          Agregati
        </span>
      </span>
    </span>
  );
}
