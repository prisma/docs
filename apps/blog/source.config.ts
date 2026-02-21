import remarkDirective from 'remark-directive';
import {
  remarkDirectiveAdmonition,
  remarkMdxFiles,
} from 'fumadocs-core/mdx-plugins';
import { remarkImage } from 'fumadocs-core/mdx-plugins';
import {
  defineCollections,
  defineConfig,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import lastModified from 'fumadocs-mdx/plugins/last-modified';
import { z } from 'zod';
import convert from 'npm-to-yarn';

const blogPostTypes = [
  'release',
  'user-story',
  'tutorial',
  'community',
  'postgres',
  'changelog',
] as const;

export const blogPosts = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: frontmatterSchema.extend({
    authors: z.array(z.string()),
    date: z.coerce.date(),
    heroImagePath: z.string().optional(),
    metaImagePath: z.string().optional(),
    type: z.enum(blogPostTypes).optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
  }),
  postprocess: {
    includeProcessedMarkdown: true,
  },
});

export default defineConfig({
  plugins: [lastModified()],
  mdxOptions: {
    remarkPlugins: [
      remarkDirective,
      remarkDirectiveAdmonition,
      [remarkImage, { useImport: false }],
      remarkMdxFiles,
    ],
    remarkCodeTabOptions: { parseMdx: true },
    remarkNpmOptions: {
      persist: { id: 'package-manager' },
      // Custom package managers to add --bun flag for bunx commands
      packageManagers: [
        { command: (cmd: string) => convert(cmd, 'npm'), name: 'npm' },
        { command: (cmd: string) => convert(cmd, 'pnpm'), name: 'pnpm' },
        { command: (cmd: string) => convert(cmd, 'yarn'), name: 'yarn' },
        {
          command: (cmd: string) => {
            const converted = convert(cmd, 'bun');
            if (!converted) return undefined;
            return converted.replace(/^bun x /, 'bunx --bun ');
          },
          name: 'bun',
        },
      ],
    },
  },
});
