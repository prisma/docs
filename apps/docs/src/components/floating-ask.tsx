'use client';

import { useEffect, useCallback, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@prisma-docs/ui/lib/cn';
import { useAIChatContext } from '@/hooks/use-ai-chat';

export function FloatingAsk() {
  const { setIsOpen, setPrompt } = useAIChatContext();
  const [visible, setVisible] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(navigator.platform?.toUpperCase().includes('MAC') ?? true);
  }, []);

  const checkScroll = useCallback(() => {
    const distanceFromBottom =
      document.documentElement.scrollHeight -
      window.scrollY -
      window.innerHeight;
    setVisible(distanceFromBottom > 200);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => window.removeEventListener('scroll', checkScroll);
  }, [checkScroll]);

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setPrompt(inputValue.trim());
    }
    setIsOpen(true);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className={cn(
        'fixed bottom-6 left-1/2 z-40 -translate-x-1/2 w-full max-w-lg px-4 transition-opacity duration-500 ease-in-out max-md:hidden',
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none',
      )}
    >
      <div className="group flex flex-col gap-2 rounded-2xl border border-fd-foreground/20 bg-fd-background/80 px-4 pt-3 pb-3 shadow-lg backdrop-blur-xl transition-transform duration-200 ease-out hover:scale-[1.025]">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          className="w-full bg-transparent text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus:outline-none"
        />
        <div className="flex items-center justify-end gap-2">
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-fd-border bg-fd-muted px-1.5 py-0.5 text-[10px] font-medium text-fd-muted-foreground">
            {isMac ? '⌘' : 'Ctrl'}I
          </kbd>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex size-7 items-center justify-center rounded-full bg-fd-primary text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
