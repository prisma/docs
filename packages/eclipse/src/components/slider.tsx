"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "../lib/cn";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    isErrored?: boolean;
  }
>(({ isErrored, className, ...props }, ref) => {
  const values = props.defaultValue || props.value || [0];

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center data-disabled:pointer-events-none",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-background-default">
        <SliderPrimitive.Range
          className={cn(
            "absolute h-full bg-background-ppg-reverse data-disabled:bg-background-neutral-strong transition-colors",
            isErrored && "bg-background-error-reverse",
          )}
        />
      </SliderPrimitive.Track>
      {values.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="block h-4 w-4 rounded-full border data-disabled:border-stroke-neutral-weak border-stroke-neutral bg-background-default transition-colors cursor-grab active:cursor-grabbing"
        />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
