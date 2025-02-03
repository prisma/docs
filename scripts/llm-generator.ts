import axios from "axios";
import { parseString } from "xml2js";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateMarkdownLinks() {
  try {
    // Ensure static directory exists
    const staticDir = join(__dirname, "..", "static");
    if (!existsSync(staticDir)) {
      mkdirSync(staticDir, { recursive: true });
    }

    // Fetch the sitemap
    const response = await axios.get("https://www.prisma.io/docs/sitemap.xml");
    const sitemapXml = response.data;

    // Parse the XML
    let urls: string[] = [];
    parseString(sitemapXml, (err, result) => {
      if (err) throw err;
      urls = result.urlset.url.map((urlObj: any) => urlObj.loc[0]);
    });

    // Get rid of internal pages
    urls = urls
      .filter((url) => !url.includes("/docs/about"))
      .filter((url) => !url.includes("/docs/tags"))
      .filter((url) => !url.includes("/docs/search"));

    console.log("Fetching URLs...");

    // Fetch titles and generate markdown links with sections
    const markdownSections = await urls.reduce(async (accPromise, url) => {
      const acc = await accPromise;
      try {
        const pageResponse = await axios.get(url, { maxRedirects: 1 });
        const titleMatch = pageResponse.data.match(/<title data-rh=true>(.*?)<\/title>/);
        const title = titleMatch ? titleMatch[1].split(" | Prisma")[0] : url;

        // check if it's a top-level docs page
        const match = url.match(/\/docs\/([^/]+)$/);
        if (match) {
          return acc + `\n## ${title}\n\n- [${title}](${url})\n`;
        }

        return acc + `- [${title}](${url})\n`;
      } catch (error) {
        console.error(`Error fetching ${url}`);
        return acc;
      }
    }, Promise.resolve(""));

    // Write the links to file
    const outputPath = join(staticDir, "llms.txt");
    const header = `# Prisma Documentation\n\n> Prisma ORM is a next-generation ORM that consists of these tools: Prisma Client (auto-generated and type-safe query builder for Node.js & TypeScript), Prisma Migrate (declarative data modeling & migration system), and Prisma Studio (GUI to view and edit data).\n\n`;
    writeFileSync(outputPath, header + markdownSections);
    console.log(`markdown links written to ${outputPath}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

generateMarkdownLinks()
  .then(() => {
    console.log("Done");
  })
  .catch(console.error);
