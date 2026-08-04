import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "btn-3d inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-extrabold uppercase tracking-wide cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_4px_0_0_var(--primary-edge)] hover:brightness-105",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_4px_0_0_color-mix(in_oklab,var(--destructive)_70%,black)] hover:brightness-105",
        outline:
          "border-2 border-border bg-background text-foreground shadow-[0_4px_0_0_var(--border)] hover:bg-muted",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_4px_0_0_var(--secondary-edge)] hover:brightness-105",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        link: "text-secondary underline-offset-4 hover:underline normal-case",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-13 rounded-2xl px-8 text-base",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
