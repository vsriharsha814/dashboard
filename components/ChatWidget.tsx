"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STARTER_QUESTIONS = [
  "Tell me about the Cisco project",
  "What is your tech stack?",
  "How did you reduce hallucinations?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const isLoading = status === "streaming" || status === "submitted";

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary z-50"
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
            <SheetTitle className="text-foreground">Ask about Harsha</SheetTitle>
            <p className="text-sm text-muted-foreground font-normal">
              Skills, experience & projects
            </p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Try a question:</p>
                <div className="flex flex-wrap gap-2">
                  {STARTER_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => {
                        setInput(q);
                      }}
                      className="px-3 py-2 text-left text-sm rounded-lg bg-muted hover:bg-muted/80 text-foreground border border-border transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "rounded-lg p-3 text-sm",
                  m.role === "user"
                    ? "ml-8 bg-primary/10 text-foreground border border-primary/20"
                    : "mr-8 bg-muted text-foreground border border-border"
                )}
              >
                <span className="font-medium text-muted-foreground text-xs block mb-1">
                  {m.role === "user" ? "You" : "Harsha's AI"}
                </span>
                <div className="whitespace-pre-wrap">
                  {m.parts
                    ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
                    .map((p, i) => (
                      <span key={i}>{p.text}</span>
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
          </div>

          <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim() || isLoading) return;
            sendMessage({ text: input.trim() });
            setInput("");
          }}
          className="p-4 border-t border-border flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about experience or skills..."
            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="shrink-0">
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
