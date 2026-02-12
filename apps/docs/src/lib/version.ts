export const VERSIONS = ["v7", "v6"] as const;
export type Version = (typeof VERSIONS)[number];
export const LATEST_VERSION: Version = "v7";

export function isValidVersion(v: string): v is Version {
  return VERSIONS.includes(v as Version);
}
