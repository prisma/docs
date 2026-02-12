import * as React from "react";

import { cn } from "../lib/cn";

export interface InputProps extends Omit<
  React.ComponentProps<"input">,
  "size"
> {
  size?: "lg" | "xl" | "2xl";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, ...props }, ref) => {
    const sizes = {
      lg: "padding-btn-lg",
      xl: "padding-btn-xl",
      "2xl": "padding-btn-2xl",
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-square border border-stroke-neutral bg-background-default px-3 py-1 text-foreground-neutral transition-colors placeholder:text-foreground-neutral-weak focus-visible:outline-none focus-visible:shadow-drop-low focus-visible:ring-ring focus-visible:border-stroke-neutral-strong disabled:cursor-not-allowed disabled:text-foreground-neutral-weaker disabled:placeholder:text-foreground-neutral-weaker disabled:border-stroke-neutral-weak disabled:bg-background-neutral-weak aria-invalid:border-stroke-error aria-invalid:text-foreground-error aria-invalid:focus-visible:border-stroke-error text-sm",
          sizes[size ?? "lg"],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
