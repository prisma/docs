'use client';

import { cn } from '@prisma-docs/ui/lib/cn';

type Status = 'operational' | 'degraded' | 'incident';

const statusConfig: Record<Status, { label: string; dotClass: string; pulseClass: string }> = {
  operational: {
    label: 'Available',
    dotClass: 'bg-emerald-500',
    pulseClass: 'bg-emerald-400',
  },
  degraded: {
    label: 'Degraded',
    dotClass: 'bg-amber-500',
    pulseClass: 'bg-amber-400',
  },
  incident: {
    label: 'Incident',
    dotClass: 'bg-red-500',
    pulseClass: 'bg-red-400',
  },
};

export function StatusIndicator({ status = 'operational' }: { status?: Status }) {
  const config = statusConfig[status];

  return (
    <a
      href="https://www.prisma-status.com"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-fd-border px-2.5 py-1 text-xs font-medium text-fd-muted-foreground transition-colors hover:text-fd-foreground hover:bg-fd-accent',
      )}
    >
      <span className="relative flex size-2">
        <span
          className={cn(
            'absolute inline-flex size-full animate-ping rounded-full opacity-75',
            config.pulseClass,
          )}
        />
        <span
          className={cn('relative inline-flex size-2 rounded-full', config.dotClass)}
        />
      </span>
      {config.label}
    </a>
  );
}
