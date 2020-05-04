import Prism from "prism-react-renderer/prism";
(typeof global !== "undefined" ? global : window).Prism = Prism;

Prism.languages.prisma = Prism.languages.extend('clike', {
	'class-name': [
		Prism.languages.clike['class-name'],
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
			lookbehind: true
		}
	],
	'string': [
		{
			pattern: /("""|''')(?:[^\\]|\\[\s\S])*?\1|\$\/(?:\$\/\$|[\s\S])*?\/\$/,
			greedy: true
		},
		{
			// TODO: Slash strings (e.g. /foo/) can contain line breaks but this will cause a lot of trouble with
			// simple division (see JS regex), so find a fix maybe?
			pattern: /(["'/])(?:\\.|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		}
	],
	'keyword': /\b(?:as|def|in|abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|datasource|do|double|else|enum|extends|final|finally|float|for|generator|goto|if|implements|import|instanceof|int|interface|long|model|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|trait|transient|try|type|void|volatile|while)\b/,
	'number': /\b(?:0b[01_]+|0x[\da-f_]+(?:\.[\da-f_p\-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?[\d]+)?)[glidf]?\b/i,
	'operator': {
		pattern: /(^|[^.])(?:~|==?~?|\?[.:]?|\*(?:[.=]|\*=?)?|\.[@&]|\.\.<|\.\.(?!\.)|-[-=>]?|\+[+=]?|!=?|<(?:<=?|=>?)?|>(?:>>?=?|=)?|&[&=]?|\|[|=]?|\/=?|\^=?|%=?)/,
		lookbehind: true
	},
	'punctuation': /\.+|[{}[\];(),.:$]/,
});


Prism.languages.javascript['class-name'][0].pattern = /(\b(?:model|generator|datasource|enum)\s+)[\w.\\]+/;

Prism.languages.insertBefore('prisma', 'string', {
	'shebang': {
		pattern: /#!.+/,
		alias: 'comment'
	}
});

Prism.languages.insertBefore('prisma', 'punctuation', {
	'spock-block': /\b(?:setup|given|when|then|and|cleanup|expect|where):/
});

Prism.languages.insertBefore('prisma', 'punctuation', {
	'type-args': /\b(?:references|fields):/
});

Prism.languages.insertBefore('prisma', 'function', {
	'annotation': {
		pattern: /(^|[^.])@+\w+/,
		lookbehind: true,
		alias: 'punctuation'
	}
});

// Prism.languages.insertBefore('prisma', 'function', {
// 	'args': {
// 		pattern: /\[\w+/,
// 		lookbehind: true
// 	}
// });

// Handle string interpolation
Prism.hooks.add('wrap', function(env) {
	if (env.language === 'prisma' && env.type === 'string') {
		var delimiter = env.content[0];

		if (delimiter != "'") {
			var pattern = /([^\\])(?:\$(?:\{.*?\}|[\w.]+))/;
			if (delimiter === '$') {
				pattern = /([^\$])(?:\$(?:\{.*?\}|[\w.]+))/;
			}

			// To prevent double HTML-encoding we have to decode env.content first
			env.content = env.content.replace(/&lt;/g, '<').replace(/&amp;/g, '&');

			env.content = Prism.highlight(env.content, {
				'expression': {
					pattern: pattern,
					lookbehind: true,
					inside: Prism.languages.prisma
				}
			});

			env.classes.push(delimiter === '/' ? 'regex' : 'gstring');
		}
	}
});
