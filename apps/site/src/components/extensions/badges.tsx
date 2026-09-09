import { Badge } from "@/components/ui/badge";
import { CheckBold, Database } from "@/components/icons/forma";
import {
  EXTENSION_DATABASE_LABELS,
  EXTENSION_KIND_LABELS,
  EXTENSION_SOURCE_LABELS,
  EXTENSION_STATUS_LABELS,
  type ExtensionEntry,
} from "@prisma-docs/ui/data/extensions";

export function SourceBadge({ source }: { source: ExtensionEntry["source"] }) {
  if (source === "official") {
    return (
      <Badge variant="secondary" className="bg-prism-cyan-50 text-prism-cyan-900">
        <CheckBold aria-hidden />
        {EXTENSION_SOURCE_LABELS.official}
      </Badge>
    );
  }
  return <Badge variant="outline">{EXTENSION_SOURCE_LABELS.community}</Badge>;
}

export function KindBadge({ kind }: { kind: ExtensionEntry["kind"] }) {
  return <Badge variant="secondary">{EXTENSION_KIND_LABELS[kind]}</Badge>;
}

/**
 * Release candidate is the baseline for Prisma 8 today, so only the entries
 * whose surface is still moving get a badge. The detail page still prints the
 * full status in its facts list.
 */
export function StatusBadge({ status }: { status: ExtensionEntry["status"] }) {
  if (status !== "experimental") return null;
  return (
    <Badge
      variant="outline"
      className="border-prism-yellow-200 bg-prism-yellow-50 text-prism-yellow-700"
    >
      {EXTENSION_STATUS_LABELS[status]}
    </Badge>
  );
}

export function DatabaseBadges({ databases }: { databases: ExtensionEntry["databases"] }) {
  return (
    <>
      {databases.map((database) => (
        <Badge key={database} variant="outline" className="text-muted-foreground">
          <Database aria-hidden />
          {EXTENSION_DATABASE_LABELS[database]}
        </Badge>
      ))}
    </>
  );
}
