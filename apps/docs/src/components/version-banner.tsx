import type { Version } from "@/lib/version";

interface VersionBannerProps {
  requestedVersion: Version;
  showingVersion: Version;
}

export function VersionBanner({ requestedVersion, showingVersion }: VersionBannerProps) {
  return (
    <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
      <p className="text-sm">
        This page doesn&apos;t exist in <strong>{requestedVersion}</strong>. Showing content from{" "}
        <strong>{showingVersion}</strong>.
      </p>
    </div>
  );
}
