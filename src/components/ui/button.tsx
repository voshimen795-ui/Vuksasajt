import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "btn-sheen overflow-hidden bg-volt text-white shadow-volt-sm hover:bg-volt-500 hover:shadow-volt",
        glass:
          "glass text-white hover:border-white/40 hover:bg-white/[0.13]",
        outline:
          "border border-volt/60 text-volt-400 hover:border-volt hover:bg-volt/20 hover:text-volt-200",
        ghost: "text-steel-300 hover:bg-white/15 hover:text-white",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[15px]",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
