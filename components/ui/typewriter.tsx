"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
}

export function Typewriter({
  text,
  className,
  speed = 60,
  delay = 0,
  cursor = true,
}: TypewriterProps) {
  const [display, setDisplay] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (delay > 0 && !started) {
      const t = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(t);
    }
    if (!started && delay === 0) setStarted(true);
  }, [delay, started]);

  useEffect(() => {
    if (!started) return;
    if (display.length >= text.length) return;
    const t = setTimeout(() => {
      setDisplay(text.slice(0, display.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [started, text, display, speed]);

  return (
    <span className={cn("inline", className)}>
      {display}
      {cursor && (
        <span
          className="ml-0.5 inline-block h-[1em] w-2 animate-pulse bg-primary align-baseline"
          aria-hidden
        />
      )}
    </span>
  );
}
