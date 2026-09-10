import * as React from "react";
import { cn } from "@/lib/utils";

const base =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-[15px] text-white placeholder:text-steel-500 transition-colors hover:border-white/20 focus:border-volt/60 focus:bg-white/[0.05] focus:outline-none focus:ring-0";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(base, "h-12", className)} {...props} />
  ),
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(base, "min-h-[120px] resize-y py-3", className)} {...props} />
));
Textarea.displayName = "Textarea";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-steel-400", className)}
      {...props}
    />
  );
}
