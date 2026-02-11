import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const actionVariants = cva(
  "flex items-center justify-center rounded-square shrink-0",
  {
    variants: {
      color: {
        ppg: "bg-background-ppg",
        orm: "bg-background-orm",
        error: "bg-background-error",
        success: "bg-background-success",
        warning: "bg-background-warning",
        cyan: "bg-background-cyan",
        fuchsia: "bg-background-fuchsia",
        lime: "bg-background-lime",
        pink: "bg-background-pink",
        purple: "bg-background-purple",
        sky: "bg-background-sky",
        violet: "bg-background-violet",
        yellow: "bg-background-yellow",
        neutral: "bg-background-neutral",
        "neutral-reversed": "bg-background-neutral-reverse",
      },
      size: {
        lg: "h-7 w-7 p-1.5",
        "2xl": "h-9 w-9 p-2",
        "4xl": "h-12 w-12 p-3",
        "5xl": "h-16 w-16 p-4",
      },
      isFramed: {
        true: "border",
        false: "",
      },
    },
    compoundVariants: [
      // Framed border colors for each color variant
      {
        color: "ppg",
        isFramed: true,
        className: "border-stroke-ppg",
      },
      {
        color: "orm",
        isFramed: true,
        className: "border-stroke-orm",
      },
      {
        color: "error",
        isFramed: true,
        className: "border-stroke-error",
      },
      {
        color: "success",
        isFramed: true,
        className: "border-stroke-success",
      },
      {
        color: "warning",
        isFramed: true,
        className: "border-stroke-warning",
      },
      {
        color: "cyan",
        isFramed: true,
        className: "border-stroke-neutral",
      },
      {
        color: "fuchsia",
        isFramed: true,
        className: "border-stroke-neutral",
      },
      {
        color: "lime",
        isFramed: true,
        className: "border-stroke-neutral",
      },
      {
        color: "pink",
        isFramed: true,
        className: "border-stroke-neutral",
      },
      {
        color: "purple",
        isFramed: true,
        className: "border-stroke-neutral",
      },
      {
        color: "sky",
        isFramed: true,
        className: "border-stroke-neutral",
      },
      {
        color: "violet",
        isFramed: true,
        className: "border-stroke-neutral",
      },
      {
        color: "yellow",
        isFramed: true,
        className: "border-stroke-neutral",
      },
      {
        color: "neutral",
        isFramed: true,
        className: "border-stroke-neutral",
      },
      {
        color: "neutral-reversed",
        isFramed: true,
        className: "border-stroke-neutral",
      },
    ],
    defaultVariants: {
      color: "neutral",
      size: "lg",
      isFramed: false,
    },
  },
);

export interface ActionProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof actionVariants> {}

const Action = React.forwardRef<HTMLDivElement, ActionProps>(
  ({ className, color, size, isFramed, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(actionVariants({ color, size, isFramed }), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Action.displayName = "Action";

export { Action, actionVariants };
