interface Env {
  ASSETS: {
    fetch: typeof fetch;
  };
}

const AI_CRAWLER_PATTERNS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "anthropic-ai",
  "ClaudeBot",
  "claude-web",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "BingBot",
  "Amazonbot",
  "Applebot",
  "Applebot-Extended",
  "FacebookBot",
  "meta-externalagent",
  "LinkedInBot",
  "Bytespider",
  "AI2Bot",
  "CCBot",
  "Diffbot",
  "DuckAssistBot",
  "cohere-ai",
  "omgili",
  "TimpiBot",
  "YouBot",
  "MistralAI-User",
];

function isAICrawler(userAgent: string | null): boolean {
  if (!userAgent) return false;

  const normalizedUA = userAgent.toLowerCase();
  return AI_CRAWLER_PATTERNS.some((pattern) => normalizedUA.includes(pattern.toLowerCase()));
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, next } = context;
  const userAgent = request.headers.get("user-agent");

  if (isAICrawler(userAgent)) {
    return Response.redirect("https://test.com", 302);
  }

  return next();
};
