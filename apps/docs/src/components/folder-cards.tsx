import { getSource } from "@/lib/source";
import { readFileSync } from "fs";
import { join } from "path";

export function FolderCards({
  folder,
  version = "v7",
  components,
}: {
  folder?: string;
  version?: string;
  components?: any;
}) {
  if (!components || !folder) return null;

  const source = getSource(version as "v7" | "v6");
  const { Cards, Card } = components;

  // Read meta.json from the folder
  const metaPath = join(
    process.cwd(),
    "content/docs" + (version === "v6" ? ".v6" : ""),
    folder,
    "meta.json",
  );

  let meta: { pages?: string[] } = {};
  try {
    const metaContent = readFileSync(metaPath, "utf-8");
    meta = JSON.parse(metaContent);
  } catch (e) {
    console.error("Could not read meta.json for " + folder + ", " + e);
    return null;
  }

  if (!meta.pages?.length) return null;

  return (
    <Cards>
      {meta.pages.map((pageSlug) => {
        const pagePath = [...folder.split("/"), pageSlug];
        const page = source.getPage(pagePath);

        if (!page) return null;

        return (
          <Card
            key={pageSlug}
            title={
              <div className="flex items-center gap-2">
                {page.data.title}
                {page.data.badge && (
                  <span className="inline-flex items-center rounded-md border px-1.5 py-0.5 text-[0.65rem] font-medium whitespace-nowrap shrink-0 ms-auto">
                    {page.data.badge === "early-access"
                      ? "Early Access"
                      : page.data.badge === "preview"
                        ? "Preview"
                        : "Deprecated"}
                  </span>
                )}
              </div>
            }
            href={`/docs/${version}/${pagePath.join("/")}`}
          >
            {page.data.description}
          </Card>
        );
      })}
    </Cards>
  );
}
