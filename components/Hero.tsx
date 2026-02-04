"use client";

import { motion } from "framer-motion";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { Typewriter } from "@/components/ui/typewriter";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-background border-b border-border">
      <AnimatedGridPattern
        className="opacity-60 dark:opacity-100"
        gridWidth={48}
        gridHeight={48}
        gap={24}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
            AI & Systems Engineer
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
            Sri Harsha Vallabhaneni
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-primary font-medium min-h-[1.5em] mb-2">
            <Typewriter
              text="Building Intelligent Systems & Agentic AI."
              speed={50}
              delay={800}
            />
          </p>
          <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-2xl mx-auto">
            MS CS @ CU Boulder (4.0) · RAG, FastAPI, Distributed Systems
          </p>
        </motion.div>
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium text-foreground">
            RAG & GenAI
          </span>
          <span className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium text-foreground">
            FastAPI & Docker
          </span>
          <span className="px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium text-foreground">
            Systems Engineering
          </span>
        </motion.div>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <Button asChild size="lg" className="gap-2">
            <a
              href="https://github.com/vsriharsha814"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <a
              href="https://www.linkedin.com/in/vallabhanenisriharsha/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg" className="gap-2">
            <a href="mailto:vsriharsha814@gmail.com">
              <Mail className="h-5 w-5" />
              Email
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
