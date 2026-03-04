"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { UIMessage } from "ai";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getOrCreateChatId,
  loadStoredMessages,
  saveStoredMessages,
  getUsageToday,
  incrementUsageToday,
  getUsageThisMinute,
  incrementUsageThisMinute,
  MAX_REQUESTS_PER_DAY,
  MAX_REQUESTS_PER_MINUTE,
} from "@/lib/chat-storage";

const STARTER_QUESTIONS = [
  "Give me a quick overview of Harsha as an engineer.",
  "What is Harsha's tech stack and what is he strongest at?",
  "Why should I hire Harsha for an AI / ML engineer role?",
  "Walk me through Harsha's most impactful project.",
];

function renderWithBold(text: string) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g);

  return segments.map((segment, index) => {
    if (segment.startsWith("**") && segment.endsWith("**") && segment.length > 4) {
      const content = segment.slice(2, -2);
      return (
        <strong key={index}>
          {content}
        </strong>
      );
    }

    return (
      <span key={index}>
        {segment}
      </span>
    );
  });
}

function renderMessageContent(text: string) {
  const lines = text.split("\n");
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={`list-${blocks.length}`} className="list-disc list-inside space-y-1">
        {listItems.map((item, idx) => (
          <li key={idx}>{renderWithBold(item)}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    const isBullet = trimmed.startsWith("* ") || trimmed.startsWith("- ");

    if (isBullet) {
      const content = trimmed.slice(2);
      listItems.push(content);
    } else {
      flushList();
      if (trimmed.length > 0) {
        blocks.push(
          <p key={`p-${blocks.length}`} className="leading-relaxed">
            {renderWithBold(line)}
          </p>
        );
      }
    }
  }

  flushList();

  return blocks;
}

function ChatWidgetContent({
  chatId,
  initialMessages,
}: {
  chatId: string;
  initialMessages: UIMessage[];
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [limitReachedMessage, setLimitReachedMessage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { messages, sendMessage, status } = useChat({
    id: chatId,
    messages: initialMessages,
    onFinish: ({ messages: nextMessages }) => {
      saveStoredMessages(nextMessages);
      incrementUsageToday();
      incrementUsageThisMinute();
    },
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest: ({ messages: msgs }) => {
        const recentMessages = msgs.slice(-6);
        return {
          body: {
            messages: recentMessages,
          },
        };
      },
    }),
  });

  const isLoading = status === "streaming" || status === "submitted";
  const usageToday = getUsageToday();
  const usageThisMinute = getUsageThisMinute();
  const atDayLimit = usageToday >= MAX_REQUESTS_PER_DAY;
  const atMinuteLimit = usageThisMinute >= MAX_REQUESTS_PER_MINUTE;
  const atLimit = atDayLimit || atMinuteLimit;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLimitReachedMessage(null);
    if (!input.trim() || isLoading) return;
    if (atDayLimit) {
      setLimitReachedMessage(
        `Glitch has hit its daily limit of ${MAX_REQUESTS_PER_DAY} questions. Even AI needs a reset — try again tomorrow.`
      );
      return;
    }
    if (atMinuteLimit) {
      setLimitReachedMessage(
        `Whoa, speedrunner. I can only handle ${MAX_REQUESTS_PER_MINUTE} questions per minute — give me a couple of seconds to cool down.`
      );
      return;
    }
    sendMessage({ text: input.trim() });
    setInput("");
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg border border-border bg-primary text-primary-foreground hover:bg-primary/90 hover:border-primary z-50"
            aria-label="Open chat"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md flex flex-col p-0 bg-background border-border"
        >
          <SheetHeader className="p-4 border-b border-border">
            <SheetTitle className="text-foreground">Glitch</SheetTitle>
            <p className="text-sm text-muted-foreground font-normal">
              I answer questions about Harsha&apos;s skills, projects, and experience.{" "}
              {usageToday}/{MAX_REQUESTS_PER_DAY} today · up to {MAX_REQUESTS_PER_MINUTE}/min.
            </p>
          </SheetHeader>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0"
          >
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <p className="text-sm font-medium text-foreground">
                    👋 Meet <span className="font-semibold">Glitch</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    I&apos;m Harsha&apos;s chat companion &mdash; ask me anything related to his background,
                    skills, and projects, and I&apos;ll give clear, honest answers.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Try a question:</p>
                  <div className="flex flex-wrap gap-2">
                    {STARTER_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setInput(q)}
                        disabled={atLimit}
                        className="px-3 py-2 text-left text-sm rounded-lg bg-muted hover:bg-muted/80 text-foreground border border-border transition-colors disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "rounded-lg p-3 text-sm border shadow-sm",
                  m.role === "user"
                    ? "ml-8 bg-card text-foreground border-border"
                    : "mr-8 bg-muted/70 text-foreground border-border/80"
                )}
              >
                <span className="font-medium text-muted-foreground text-xs block mb-1">
                  {m.role === "user" ? "You" : "Glitch"}
                </span>
                <div className="space-y-1">
                  {m.parts
                    ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
                    .map((p, i) => (
                      <div key={i}>{renderMessageContent(p.text)}</div>
                    )) ?? null}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mr-8 rounded-lg p-3 bg-muted border border-border flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Thinking...
              </div>
            )}
            {limitReachedMessage && (
              <p className="text-sm text-amber-600 dark:text-amber-400">{limitReachedMessage}</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about experience or skills..."
              className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              disabled={isLoading || atLimit}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim() || atLimit}
              className="shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default function ChatWidget() {
  const [ready, setReady] = useState(false);
  const [chatId, setChatId] = useState("");
  const [initialMessages, setInitialMessages] = useState<UIMessage[]>([]);

  /* eslint-disable */
  useEffect(() => {
    const id = getOrCreateChatId();
    const stored = loadStoredMessages();
    setChatId(id);
    setInitialMessages(stored);
    setReady(true);
  }, []);
  /* eslint-enable */

  if (!ready) {
    return (
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg border border-border bg-primary text-primary-foreground hover:bg-primary/90 hover:border-primary z-50"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return <ChatWidgetContent chatId={chatId} initialMessages={initialMessages} />;
}
