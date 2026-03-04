"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { ProjectItem } from "@/lib/data";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop";

interface BentoProjectGridProps {
  projects: ProjectItem[];
  /** When true, cards are in a single horizontal row with overflow-x scroll */
  horizontal?: boolean;
}

function BentoProjectCard({ project }: { project: ProjectItem }) {
  const href = `/projects/${project.slug ?? project.id}`;
  const imageSrc = project.image ?? PLACEHOLDER_IMAGE;
  return (
    <Link href={href} className="block h-full">
      <Card className="h-full overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300 group flex flex-col p-0 gap-0">
        <div className="relative h-40 w-full overflow-hidden bg-muted shrink-0">
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            className="object-cover group-hover:opacity-90 transition-opacity duration-200"
          />
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-card/90 backdrop-blur-sm text-foreground rounded-md text-xs font-medium border border-border">
              {project.category}
            </span>
          </div>
        </div>
        <CardContent className="p-4 md:p-5 flex flex-col flex-1">
          <span className="text-xs text-muted-foreground">{project.year}</span>
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mt-0.5 mb-1.5">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs border border-primary/20"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs border border-border">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
          <span className="inline-block mt-3 text-sm font-medium text-primary group-hover:underline">
            View Details →
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function BentoProjectGrid({
  projects,
  horizontal = false,
}: BentoProjectGridProps) {
  if (projects.length === 0) return null;

  const content = projects.map((project, index) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.05 * index }}
      className={horizontal ? "shrink-0 w-[min(320px,85vw)]" : undefined}
    >
      <BentoProjectCard project={project} />
    </motion.div>
  ));

  if (horizontal) {
    return (
      <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-6">{content}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {content}
    </div>
  );
}
