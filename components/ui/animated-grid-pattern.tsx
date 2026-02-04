"use client";

import { cn } from "@/lib/utils";

interface AnimatedGridPatternProps {
  className?: string;
  gridWidth?: number;
  gridHeight?: number;
  lineWidth?: number;
  gap?: number;
}

export function AnimatedGridPattern({
  className,
  gridWidth = 60,
  gridHeight = 60,
  lineWidth = 0.5,
  gap = 4,
}: AnimatedGridPatternProps) {
  const width = gridWidth + gap;
  const height = gridHeight + gap;

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden bg-transparent", className)}
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full text-[var(--grid-glow,oklch(0.65_0.15_165/0.12))]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${width} 0 L 0 0 0 ${height}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={lineWidth}
              className="opacity-40"
            />
          </pattern>
          <linearGradient id="grid-fade-top" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--background)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--background)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grid-fade-bottom" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="var(--background)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--background)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        <rect
          width="100%"
          height="40%"
          fill="url(#grid-fade-top)"
          className="pointer-events-none"
        />
        <rect
          width="100%"
          height="40%"
          y="60%"
          fill="url(#grid-fade-bottom)"
          className="pointer-events-none"
        />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--primary)/0.08,transparent)]" />
    </div>
  );
}
