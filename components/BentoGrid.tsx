"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getBentoProjects, type ProjectItem } from "@/lib/data";
import { Terminal, Brain, FileSpreadsheet } from "lucide-react";
import { cn } from "@/lib/utils";

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <Card className="h-full overflow-hidden border-border bg-card hover:border-primary/50 transition-colors group">
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
          <CardContent className="pt-0">
            <div className="rounded-md bg-black/60 border border-border p-3 font-mono text-xs text-emerald-400/90 overflow-hidden">
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <Card className="h-full overflow-hidden border-border bg-card hover:border-primary/50 transition-colors group">
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
    <section id="projects" className="py-20 md:py-28 bg-background">
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
            Production systems at Cisco, Darwinbox, and Empowered Margins
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cisco && <CiscoTerminalCard project={cisco} />}
          {darwinbox && <DarwinboxMetricCard project={darwinbox} />}
          {empowered && <EmpoweredCard project={empowered} />}
        </div>
      </div>
    </section>
  );
}
