import { cn } from "@prisma-docs/ui/lib/cn";
import type { ComponentProps } from "react";

export function Badge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-1.5 py-0.5 text-[0.65rem] font-medium whitespace-nowrap shrink-0",
        className,
      )}
      {...props}
    />
  );
}
