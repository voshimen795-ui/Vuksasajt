"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center py-3",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-white/15">
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-volt-500 to-volt shadow-[0_0_18px_rgba(74,98,190,0.75)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      aria-label="Izaberite snagu"
      className="block h-6 w-6 rounded-full border-2 border-volt bg-ink-900 shadow-[0_0_0_6px_rgba(74,98,190,0.22)] transition-shadow hover:shadow-[0_0_0_10px_rgba(74,98,190,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:pointer-events-none"
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;
