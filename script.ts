import * as fs from "fs";
import * as path from "path";

// Define a basic type for the OpenAPI spec for better type safety.
interface OpenApiSpec {
  paths: {
    [path: string]: {
      [method: string]: {
        tags?: string[];
        [key: string]: any;
      };
    };
  };
  tags?: { name: string; description: string }[];
  servers?: { url: string; description?: string }[];
  [key: string]: any;
}

// The URL of the remote OpenAPI spec
const SPEC_URL = "https://api.prisma.io/v0/doc";

// The local path where the corrected spec will be saved
const OUTPUT_PATH = path.join(__dirname, "openapi", "management-api.json");

/**
 * Fetches the remote spec, adds the required top-level tags and servers block,
 * and saves it to a local file.
 */
async function generateCorrectedSpec(): Promise<void> {
  try {
    console.log(`Fetching spec from ${SPEC_URL}...`);
    const response = await fetch(SPEC_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch spec: ${response.statusText}`);
    }
    const spec: OpenApiSpec = await response.json();
    console.log("Successfully fetched spec.");

    // --- Add top-level tags ---
    const allTags = new Set<string>();
    for (const path in spec.paths) {
      for (const method in spec.paths[path]) {
        if (spec.paths[path][method].tags) {
          spec.paths[path][method].tags.forEach((tag: string) => allTags.add(tag));
        }
      }
    }
    spec.tags = Array.from(allTags).map((tag: string) => ({
      name: tag,
      description: `Operations related to ${tag}`,
    }));
    console.log("Successfully generated top-level tags.");

    // --- Add servers block for "Try it out" functionality ---
    if (!spec.servers || spec.servers.length === 0) {
      spec.servers = [
        {
          url: "https://api.prisma.io/v0",
          description: "Prisma Data Platform API Server",
        },
      ];
      console.log("Successfully added servers block.");
    }
    // --- End of new logic ---

    // Ensure the output directory exists
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the corrected spec to the local file
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(spec, null, 2));
    console.log(`✅ Corrected spec saved to ${OUTPUT_PATH}`);
  } catch (error) {
    console.error("Error generating spec file:", error);
    process.exit(1); // Exit with an error code
  }
}

// Run the script
generateCorrectedSpec();
