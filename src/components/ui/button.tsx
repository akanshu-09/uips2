import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-lg font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 touch-manipulation",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl active:scale-[0.98]",
        outline: "border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground shadow-md hover:shadow-lg active:scale-[0.98]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:shadow-xl active:scale-[0.98]",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl active:scale-[0.98]",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-lg hover:shadow-xl active:scale-[0.98]",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 shadow-lg hover:shadow-xl active:scale-[0.98]",
        ghost: "hover:bg-muted/50 active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline",
        // Special variants for rural app
        capture: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl hover:shadow-3xl border-2 border-primary/20 active:scale-[0.96] min-h-[64px] text-lg",
        large: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-xl hover:shadow-2xl active:scale-[0.98] min-h-[56px] text-base",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-lg",
        xl: "h-16 px-10 py-5 text-xl",
        icon: "h-12 w-12",
        "icon-lg": "h-16 w-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
