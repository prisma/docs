const remark = require('remark')
const mdx = require('remark-mdx')
const searchable = require('./remark-mdx-searchable')

module.exports = (doc) => {
  const result = remark().use(mdx).use(searchable).processSync(doc)
  return result.data
}
