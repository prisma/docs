import { RoleKicker } from "@/components/brand/role-kicker";
import { Texture } from "@/components/brand/texture";
import { cn } from "@/lib/utils";

/**
 * The wrapped-panel hero shared by the extension pages: paper surface,
 * hairline border, one cyan wash along the bottom edge. `align` switches
 * between the centered directory hero and the left-aligned detail hero.
 */
export function PanelHero({
  kicker,
  title,
  lead,
  align = "center",
  breadcrumb,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  align?: "center" | "start";
  breadcrumb?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const centered = align === "center";
  return (
    <section className="bg-white px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative mx-auto max-w-[96rem] overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[16rem] overflow-hidden"
        >
          <div
            className="absolute -bottom-1/2 left-1/2 h-full w-[140%] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(52% 60% at 50% 100%, color-mix(in srgb, var(--color-prism-cyan-400) 16%, transparent), transparent 70%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-t from-transparent to-white" />
        </div>
        <Texture opacity={0.06} blend="multiply" />
        <div className="relative px-4 sm:px-8">
          <div
            className={cn(
              "mx-auto flex max-w-site flex-col pb-14 pt-28 md:pb-16",
              centered ? "items-center text-center md:pt-40" : "items-start md:pt-36",
            )}
          >
            {breadcrumb ? <div className="mb-6">{breadcrumb}</div> : null}
            <RoleKicker color="bg-prism-cyan-400" className={cn(centered && "justify-center")}>
              {kicker}
            </RoleKicker>
            <h1
              className={cn(
                "isolate mt-4 max-w-[20ch] text-balance text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.06]",
                !centered && "max-w-[24ch] text-[clamp(2.25rem,3.5vw,3rem)]",
              )}
            >
              {title}
            </h1>
            <p
              className={cn(
                "mt-6 max-w-[52ch] text-pretty text-lg leading-relaxed text-muted-foreground",
                !centered && "max-w-[62ch]",
              )}
            >
              {lead}
            </p>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
