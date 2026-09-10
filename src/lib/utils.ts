import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatKw(value: number) {
  return new Intl.NumberFormat("sr-RS", { maximumFractionDigits: 1 }).format(value);
}
