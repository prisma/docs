"use client";

import type { ReactNode } from "react";
import { TooltipProvider } from "./tooltip";

export function TooltipExample({ children }: { children: ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
