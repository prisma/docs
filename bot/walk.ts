import fs from 'fs'
import path from 'path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxjs from 'remark-mdxjs'

function getMdxFiles(dir: string, excludedFilesPattern: RegExp): string[] {
  const files = fs.readdirSync(dir)
  const mdxFiles: string[] = []

  for (const file of files) {
    const p = path.join(dir, file)

    if (fs.lstatSync(p).isDirectory()) {
      const subdirectoryFiles = getMdxFiles(p, excludedFilesPattern)
      mdxFiles.push(...subdirectoryFiles)
    } else if (file.endsWith('.mdx') && !file.match(excludedFilesPattern)) {
      mdxFiles.push(p)
    }
  }

  return mdxFiles
}

// walk directory and find mdx files
const excludedFilesPattern = /\.(svg|png|jpg|jpeg)$|^404\.mdx$/
let mdxFiles = getMdxFiles(path.join(__dirname, '..', 'content'), excludedFilesPattern)

// TODO: Extract sections from each mdx file
async function extractSections(mdxFile: string) {
  const content = fs.readFileSync(mdxFile, 'utf8')

  const processor = unified()
    .use(remarkParse)
    .use(remarkMdxjs)
    .use(remarkFrontmatter)
    .use(remarkMdx)
    .use(remarkRehype)
    .use(rehypeStringify)

  try {
    const file = await processor.process(content)
    console.log(String(file))
  } catch (err) {
    console.error(err)
  }
}

for (const file of mdxFiles) {
  console.log(`Extracting sections from ${file}`)
  extractSections(file)
}
