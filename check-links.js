var vfile = require('to-vfile')
var report = require('vfile-reporter')
var remark = require('remark')
var links = require('remark-validate-links')

remark()
  .use(links)
  .process(vfile.readSync('content/01-getting-started/01-quickstart.mdx'), function(err, file) {
    console.error(report(err || file))
  })