import Prism from 'prism-react-renderer/prism'
;(typeof global !== 'undefined' ? global : window).Prism = Prism
Prism.languages.prisma = Prism.languages.extend('clike', {
  keyword: /\b(?:datasource|enum|generator|model|type|view)\b/,
  'type-class-name': /(\s+)[A-Z]\w+/, ///(\b)(\s+)[A-Z]\w+/
})

Prism.languages.javascript['class-name'][0].pattern =
  /(\b(?:model|datasource|enum|generator|type|model|view)\s+)[\w.\\]+/

Prism.languages.insertBefore('prisma', 'function', {
  annotation: {
    pattern: /(^|[^.])@+\w+/,
    lookbehind: true,
    alias: 'punctuation',
  },
})

Prism.languages.insertBefore('prisma', 'punctuation', {
  'type-args': /\b(?:references|fields|onDelete|onUpdate):/,
})

Prism.languages.insertBefore('prisma', 'type-class-name', {
  'not-class': /\n(\s+)[A-Z]\w+/,
})

Prism.languages.json5 = Prism.languages.js
