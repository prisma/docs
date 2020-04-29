var vfile = require('to-vfile')
var report = require('vfile-reporter')
var remark = require('remark')
var links = require('remark-validate-links')

remark()
  .use(links)
  .process(vfile.readSync('content/01-getting-started/02-setup-prisma/03-start-from-scratch-prisma-migrate.mdx'), function(err, file) {
    console.error(report(err || file))
  })