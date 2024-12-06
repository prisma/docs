Prism.languages.prisma = Prism.languages.extend("clike", {
  keyword: /\b(?:datasource|enum|generator|model|view)\b/, // Removed `type` from here
  "type-class-name": /(\s+)[A-Z]\w+/,
});

Prism.languages.javascript["class-name"][0].pattern =
  /(\b(?:model|datasource|enum|generator|type|model|view)\s+)[\w.\\]+/;

Prism.languages.insertBefore("prisma", "function", {
  annotation: {
    pattern: /(^|[^.])@+\w+/,
    lookbehind: true,
    alias: "punctuation",
  },
});

Prism.languages.insertBefore("prisma", "punctuation", {
  "type-args": /\b(?:references|fields|onDelete|onUpdate):/,
});

// Match `type` and the name in type definitions separately.
Prism.languages.insertBefore("prisma", "keyword", {
  "type-definition": {
    pattern: /(^|\s)type\s+\w+\s*(?=\{)/,
    lookbehind: true,
    inside: {
      keyword: /^type/, // Highlight `type` as keyword
      "type-class-name": /\b\w+\b/, // Highlight `Address` as type-class-name
    },
  },
});

// Add `type` to plain text (not as a keyword) in other contexts.
Prism.languages.insertBefore("prisma", "type-class-name", {
  "plain-type": {
    pattern: /(\bmodel\b.*\btype\s+)[A-Z]\w*/,
    lookbehind: true,
    alias: null, // Ensures it's treated as plain text
  },
});

Prism.languages.json5 = Prism.languages.js;
