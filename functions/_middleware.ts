interface Env {
  ASSETS: {
    fetch: typeof fetch;
  };
}

const AI_CRAWLER_PATTERNS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ChatGPT-User 2.0',
  'anthropic-ai',
  'OpenAI',
  'ClaudeBot',
  'claude-web',
  'Claude/',
  'Claude-User',
  'anthropic',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'BingBot',
  'Amazonbot',
  'Applebot',
  'Applebot-Extended',
  'FacebookBot',
  'meta-externalagent',
  'LinkedInBot',
  'Bytespider',
  'AI2Bot',
  'CCBot',
  'Diffbot',
  'DuckAssistBot',
  'DuckDuckGo',
  'DeepSeekBot',
  'cohere-ai',
  'omgili',
  'TimpiBot',
  'YouBot',
  'MistralAI-User',
  'ImagesiftBot',
  'Scrapy',

  'chatgpt',
  'openai',
  'gpt',
  'claude',
  'anthropic',
  'cursor',
  'windsurf',
  'perplexity',
  'copilot',
  'ai-agent',
  'llm-agent',
];

function isAICrawler(request: Request): boolean {
  // if (!userAgent) return false;

  const userAgent = request.headers.get('user-agent') || '';
  const accept = request.headers.get('accept') || '';

  const hasHtml = accept.includes('text/html');

  const prefersNonHtml =
    !hasHtml &&
    (accept.includes('application/json') ||
      accept.includes('text/plain') ||
      accept.includes('application/xml'));

  const hasAiUserAgent = AI_CRAWLER_PATTERNS.some((pattern) => userAgent.toLowerCase().includes(pattern.toLowerCase()));

  return prefersNonHtml || hasAiUserAgent

  // const normalizedUA = userAgent.toLowerCase();
  // return AI_CRAWLER_PATTERNS.some((pattern) => normalizedUA.includes(pattern.toLowerCase()));
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, next } = context;

  if (isAICrawler(request)) {
    const url = new URL(request.url);
    const urlPath = url.pathname;

    const markdownPath = `${urlPath}.md`;

    const markdownRequest = new Request(new URL(markdownPath, url.origin), {
      method: request.method,
      headers: request.headers,
    });

    const response = await context.env.ASSETS.fetch(markdownRequest);

    if (response.ok) {
      // Check what content type we actually got
      const actualContentType = response.headers.get('content-type');
      console.log(`Fetched ${markdownPath}, got content-type: ${actualContentType}`);

      return new Response(response.body, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    return next();
  }

  return next();
};
