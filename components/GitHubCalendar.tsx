"use client";

import { ActivityCalendar } from "react-activity-calendar";

// Demo data: last 365 days with varied activity (green/dark theme)
function generateDemoData() {
  const data: { date: string; count: number; level: number }[] = [];
  const end = new Date();
  const start = new Date(end);
  start.setDate(start.getDate() - 365);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10);
    const count = Math.floor(Math.random() * 12);
    const level = count === 0 ? 0 : Math.min(4, Math.ceil(count / 3));
    data.push({ date: dateStr, count, level });
  }
  return data;
}

const DEMO_DATA = generateDemoData();

export default function GitHubCalendar() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-sm font-medium text-foreground mb-3">Activity</p>
      <ActivityCalendar
        data={DEMO_DATA}
        theme={{
          light: ["#0f172a", "oklch(0.65 0.2 165 / 0.3)", "oklch(0.65 0.2 165 / 0.6)", "oklch(0.65 0.2 165 / 0.8)", "oklch(0.65 0.2 165)"],
          dark: ["#0f172a", "oklch(0.65 0.2 165 / 0.3)", "oklch(0.65 0.2 165 / 0.6)", "oklch(0.65 0.2 165 / 0.8)", "oklch(0.65 0.2 165)"],
        }}
        colorScheme="dark"
        blockSize={10}
        blockRadius={2}
        fontSize={12}
      />
    </div>
  );
}
