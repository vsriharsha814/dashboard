"use client";

import { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { useTheme } from "./ThemeProvider";

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

const GITHUB_USERNAME = "vsriharsha814";

export default function GitHubCalendar() {
  const [data, setData] = useState<ContributionDay[]>([]);

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
          // Strip any color information from the API so the calendar
          // uses our site-wide orange theme instead of teal defaults.
          const normalized: ContributionDay[] = json.contributions.map(
            (c: { date: string; count: number; level: number }) => ({
              date: c.date,
              count: c.count,
              level: c.level,
            })
          );

          setData(normalized);
        }
      } catch (error) {
        console.error("Error loading GitHub contributions", error);
        // If live fetch fails, just leave the calendar empty rather than
        // generating date-based demo data on the server.
        setData([]);
      }
    }

    fetchContributions();
  }, []);

  const { theme } = useTheme();

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-sm font-medium text-foreground mb-3">Activity</p>
      {data.length === 0 ? (
        <p className="text-xs text-muted-foreground">GitHub activity data is loading…</p>
      ) : (
        <ActivityCalendar
          data={data}
          theme={{
            light: [
              "#f3f4f6", // light background
              "#fee2c3", // very light orange
              "#fed7aa", // light orange
              "#fb923c", // primary orange
              "#c2410c", // deep orange
            ],
            dark: [
              "#020617", // dark background (near slate-950)
              "#78350f", // very dark muted orange
              "#ea580c", // strong orange
              "#f97316", // bright orange
              "#fed7aa", // highlight light orange
            ],
          }}
          colorScheme={theme}
          blockSize={10}
          blockRadius={2}
          fontSize={12}
        />
      )}
    </div>
  );
}
