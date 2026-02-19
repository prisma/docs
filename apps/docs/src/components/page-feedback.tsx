'use client';

import { useState, useEffect, useCallback } from 'react';
import { ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import { cn } from '@prisma-docs/ui/lib/cn';
import { usePathname } from 'fumadocs-core/framework';
import posthog from 'posthog-js';

type FeedbackState = 'idle' | 'upvoted' | 'downvoted' | 'submitted';

function getStorageKey(path: string) {
  return `prisma-docs:page-feedback:${path}`;
}

export function PageFeedback() {
  const pathname = usePathname();
  const [state, setState] = useState<FeedbackState>('idle');
  const [comment, setComment] = useState('');
  const [showTextarea, setShowTextarea] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(getStorageKey(pathname));
      if (stored) setState('submitted');
    } catch {}
  }, [pathname]);

  const persist = useCallback(
    (vote: 'up' | 'down', text?: string) => {
      try {
        localStorage.setItem(getStorageKey(pathname), JSON.stringify({ vote, text }));
      } catch {}
      posthog.capture('docs:page_feedback', {
        path: pathname,
        vote,
        comment: text ?? null,
      });
    },
    [pathname],
  );

  const handleUp = () => {
    setState('submitted');
    persist('up');
  };

  const handleDown = () => {
    setState('downvoted');
    setShowTextarea(true);
  };

  const handleSubmitComment = () => {
    setState('submitted');
    persist('down', comment || undefined);
  };

  if (state === 'submitted') {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-4 py-3 text-sm text-fd-muted-foreground">
        <span>Thanks for your feedback!</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-fd-border bg-fd-card px-4 py-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-fd-foreground">
          Was this page helpful?
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleUp}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md border border-fd-border px-3 py-1.5 text-sm transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground',
              'text-fd-muted-foreground',
            )}
          >
            <ThumbsUp className="size-3.5" />
            Yes
          </button>
          <button
            type="button"
            onClick={handleDown}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md border border-fd-border px-3 py-1.5 text-sm transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground',
              showTextarea
                ? 'bg-fd-accent text-fd-accent-foreground'
                : 'text-fd-muted-foreground',
            )}
          >
            <ThumbsDown className="size-3.5" />
            No
          </button>
        </div>
      </div>

      {showTextarea && (
        <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What was missing or unclear? (optional)"
            rows={3}
            className="w-full resize-none rounded-md border border-fd-border bg-fd-background px-3 py-2 text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus:outline-none focus:ring-2 focus:ring-fd-ring"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmitComment}
              className="inline-flex items-center gap-1.5 rounded-md bg-fd-primary px-3 py-1.5 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
            >
              <Send className="size-3.5" />
              Send feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
