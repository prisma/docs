// TypeScript definitions for Cloudflare Pages Functions
interface EventContext<Env = unknown> {
  request: Request;
  env: Env;
  params: Record<string, string>;
  data: Record<string, unknown>;
  next: () => Promise<Response>;
  waitUntil: (promise: Promise<unknown>) => void;
  passThroughOnException: () => void;
}

type PagesFunction<Env = unknown> = (context: EventContext<Env>) => Response | Promise<Response>;
