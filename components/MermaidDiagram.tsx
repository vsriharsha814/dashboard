"use client";

import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";

const IDEMPOTENCY_SEQUENCE = `
sequenceDiagram
  participant C as Consumer
  participant S as Store
  participant P as Processor

  C->>S: Process(event_id, idempotency_key)
  S->>S: Lookup(idempotency_key)
  alt Key exists
    S-->>C: Return cached result (exactly once)
  else Key new
    S->>S: Reserve(idempotency_key)
    S->>P: Forward event
    P->>P: Process event
    P->>S: Store result(idempotency_key, result)
    S-->>C: Return result
  end
`;

export default function MermaidDiagram() {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      themeVariables: {
        primaryColor: "#22c55e",
        primaryTextColor: "#f1f5f9",
        primaryBorderColor: "#334155",
        lineColor: "#64748b",
        secondaryColor: "#1e293b",
        tertiaryColor: "#0f172a",
      },
    });

    mermaid
      .render(`mermaid-${id}`, IDEMPOTENCY_SEQUENCE)
      .then(({ svg: rendered }) => setSvg(rendered))
      .catch((e) => setError(e.message ?? "Failed to render diagram"));
  }, [id]);

  if (error) {
    return (
      <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
        Diagram could not be rendered: {error}
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="rounded-lg border border-border bg-muted/50 p-8 flex items-center justify-center text-muted-foreground">
        Loading diagram...
      </div>
    );
  }

  return (
    <div
      className="rounded-lg border border-border bg-card p-4 overflow-x-auto [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:mx-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
