"use client";

import { useState } from "react";
import { Check, Copy } from "@/components/icons/forma";
import { cn } from "@/lib/utils";

export const MONO = "font-[ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

/** A monospace install command that copies itself on click. */
export function CopyCommand({
  command,
  className,
  size = "md",
}: {
  command: string;
  className?: string;
  size?: "md" | "lg";
}) {
  const [copied, setCopied] = useState(false);

  const copy = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be denied; the command stays visible for manual copy.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : `Copy ${command}`}
      className={cn(
        "group/copy flex w-full cursor-pointer items-center gap-3 rounded-xl border border-black/[0.06] bg-paper text-left text-foreground transition-colors hover:border-prism-cyan-400/60",
        MONO,
        size === "lg" ? "px-4 py-3 text-sm sm:text-[15px]" : "px-3 py-2 text-[13px]",
        className,
      )}
    >
      <span className="select-none text-muted-foreground" aria-hidden>
        $
      </span>
      <span className="min-w-0 flex-1 truncate">{command}</span>
      {copied ? (
        <Check className="size-4 shrink-0 text-prism-cyan-700" aria-hidden />
      ) : (
        <Copy
          className="size-4 shrink-0 text-muted-foreground transition-colors group-hover/copy:text-foreground"
          aria-hidden
        />
      )}
    </button>
  );
}
