"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getBentoProjects, type ProjectItem } from "@/lib/data";
import { Brain, FileSpreadsheet, ArrowRight } from "lucide-react";

const FAKE_LOG_LINES = [
  "[INFO] router-01 BGP session established",
  "[WARN] switch-03 port 7 CRC errors +12",
  "[ERROR] firewall-02 connection timeout 192.168.1.1",
  "[INFO] LLM triage: severity=high, suggested: check BGP",
  "[INFO] router-01 BGP session established",
  "[WARN] switch-03 port 7 CRC errors +12",
];

function CiscoTerminalCard({ project }: { project: ProjectItem }) {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <Card className="h-full overflow-hidden border-border bg-card hover:border-primary/50 transition-colors group flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono">triage-agent.log</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </CardHeader>
          <CardContent className="pt-0 flex-1 flex flex-col min-h-0">
            <div className="rounded-md bg-black/60 border border-border p-3 font-mono text-xs text-emerald-400/90 overflow-hidden flex-1 min-h-0">
              <div className="space-y-0.5 animate-pulse-slow">
                {FAKE_LOG_LINES.map((line, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-muted-foreground shrink-0">
                      {String(i + 1).padStart(2)}
                    </span>
                    <span className="truncate">{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

function DarwinboxMetricCard({ project }: { project: ProjectItem }) {
  const metric = project.metric ?? "95% Hallucination Reduction";
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <Card className="h-full overflow-hidden border-border bg-card hover:border-primary/50 transition-colors group flex flex-col justify-between">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <Brain className="h-5 w-5" />
              <span className="text-sm font-medium">Darwinbox</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
              {metric}
            </p>
            <p className="text-xs text-muted-foreground mt-2">RAG-based GenAI in production</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

function EmpoweredCard({ project }: { project: ProjectItem }) {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <Card className="h-full overflow-hidden border-border bg-card hover:border-primary/50 transition-colors group flex flex-col justify-between">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <FileSpreadsheet className="h-5 w-5" />
              <span className="text-sm font-medium">Empowered Margins</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
            <p className="text-2xl font-bold text-primary">{project.metric ?? "85% Reduction"}</p>
          </CardHeader>
        </Card>
      </Link>
    </motion.div>
  );
}

export default function BentoGrid() {
  const bento = getBentoProjects();
  const cisco = bento.find((p) => p.slug === "cisco");
  const darwinbox = bento.find((p) => p.slug === "darwinbox");
  const empowered = bento.find((p) => p.slug === "empowered-margins");

  return (
    <section id="featured-work" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Engineering Excellence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Production systems at Cisco, Empowered Margins and Darwinbox
          </p>
        </motion.div>

        <div className="overflow-x-auto pb-4 w-full">
          <div
            className="grid gap-6 justify-center w-max mx-auto"
            style={{
              gridAutoFlow: "column",
              gridAutoColumns: "minmax(280px, 320px)",
            }}
          >
            {cisco && (
              <div className="min-h-0 h-full">
                <CiscoTerminalCard project={cisco} />
              </div>
            )}
            {empowered && (
              <div className="min-h-0 h-full">
                <EmpoweredCard project={empowered} />
              </div>
            )}
            {darwinbox && (
              <div className="min-h-0 h-full">
                <DarwinboxMetricCard project={darwinbox} />
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/experience">
              View all work experiences
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
