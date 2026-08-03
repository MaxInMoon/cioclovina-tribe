import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-transparent px-6 py-3 text-center text-sm leading-5 font-bold transition-[color,background-color,border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-rust disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-forest text-white shadow-sm hover:bg-forest-light hover:shadow-md active:translate-y-0",
        light: "bg-cream text-forest shadow-sm hover:bg-white hover:shadow-md active:translate-y-0",
        outline:
          "border-forest/35 bg-transparent text-forest hover:border-forest hover:bg-forest hover:text-white active:translate-y-0",
        inverted:
          "border-white/60 bg-transparent text-white hover:border-white hover:bg-white hover:text-forest active:translate-y-0",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
}
