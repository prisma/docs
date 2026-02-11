"use client";
import { RootProvider } from "fumadocs-ui/provider/next";
import { NextProvider } from "fumadocs-core/framework/next";
import CustomSearchDialog from "@/components/search";
import type { ReactNode } from "react";

export function Provider({ children }: { children: ReactNode }) {
  return (
    <NextProvider>
      <RootProvider
        search={{
          SearchDialog: CustomSearchDialog,
        }}
      >
        {children}
      </RootProvider>
    </NextProvider>
  );
}
