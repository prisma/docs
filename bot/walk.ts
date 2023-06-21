import fs from 'fs'
import path from 'path'

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
const mdxFiles = getMdxFiles(path.join(__dirname, '..', 'content'), excludedFilesPattern)

for (const file of mdxFiles) {
  console.log(file)
}

// TODO: Extract sections from each mdx file
