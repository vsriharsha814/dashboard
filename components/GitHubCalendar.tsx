"use client";

import { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

const GITHUB_USERNAME = "vsriharsha814";

// Fallback demo data in case the live API fails.
function generateDemoData(): ContributionDay[] {
  const data: ContributionDay[] = [];
  const end = new Date();
  const start = new Date();
  start.setFullYear(end.getFullYear() - 1);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10);
    data.push({ date: dateStr, count: 0, level: 0 });
  }
  return data;
}

const DEMO_DATA: ContributionDay[] = generateDemoData();

export default function GitHubCalendar() {
  const [data, setData] = useState<ContributionDay[]>(DEMO_DATA);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const to = new Date();
        const from = new Date();
        from.setFullYear(to.getFullYear() - 1);

        const toStr = to.toISOString().slice(0, 10);
        const fromStr = from.toISOString().slice(0, 10);

        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?from=${fromStr}&to=${toStr}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch GitHub contributions");
        }

        const json = await res.json();

        if (Array.isArray(json.contributions)) {
          setData(json.contributions as ContributionDay[]);
        }
      } catch (error) {
        console.error("Error loading GitHub contributions", error);
        // Fall back to demo data if live fetch fails.
        setData(DEMO_DATA);
      }
    }

    fetchContributions();
  }, []);

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-sm font-medium text-foreground mb-3">Activity</p>
      <ActivityCalendar
        data={data}
        theme={{
          light: [
            "#0f172a",
            "oklch(0.8 0.18 40 / 0.3)",
            "oklch(0.8 0.18 40 / 0.6)",
            "oklch(0.8 0.18 40 / 0.8)",
            "oklch(0.8 0.18 40)",
          ],
          dark: [
            "#0f172a",
            "oklch(0.8 0.18 40 / 0.3)",
            "oklch(0.8 0.18 40 / 0.6)",
            "oklch(0.8 0.18 40 / 0.8)",
            "oklch(0.8 0.18 40)",
          ],
        }}
        colorScheme="dark"
        blockSize={10}
        blockRadius={2}
        fontSize={12}
      />
    </div>
  );
}
