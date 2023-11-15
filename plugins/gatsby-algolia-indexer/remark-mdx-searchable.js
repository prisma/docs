const visit = require('unist-util-visit')
const textTypes = ['text', 'emphasis', 'strong', 'inlineCode', 'code']

const flattenNode = (node) => {
  const p = []
  visit(node, (node) => {
    if (!textTypes.includes(node.type)) return
    p.push(node.value)
  })
  return p.join(``)
}

module.exports = () => (tree, file) => {
  file.data = []
  let heading = null
  let prev = ''
  let prevType = ''
  let langVal = ''
  let dbVal = ''

  visit(
    tree,
    ({ type }) => {
      return ['heading', 'paragraph', 'code', 'table', 'jsx', 'tableCell', 'tableRow'].includes(
        type
      )
    },
    (node) => {
      if (node.type === 'jsx' && node.value.includes('<SwitchTech')) {
        const val = node.value
          .replace('<SwitchTech technologies={[', '')
          .replace(']}>', '')
          .replace(/\'/g, '')
        langVal = val.split(', ')[0]
        dbVal = val.split(', ')[1]
      }

      if (node.type === 'jsx' && node.value.includes('</SwitchTech>')) {
        langVal = ''
        dbVal = ''
      }
      if (node.type === 'heading') {
        if (prevType === 'heading') {
          file.data.push({
            heading: prev,
            text: '',
            langVal,
            dbVal,
          })
        }
        prev = flattenNode(node)
        prevType = node.type
        return (heading = flattenNode(node))
      }

      prev = flattenNode(node)
      prevType = node.type

      file.data.push({
        heading,
        text: flattenNode(node),
        langVal,
        dbVal,
      })
    }
  )
}
