import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/data";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop";

export const metadata = {
  title: "All Projects - Sri Harsha Vallabhaneni",
  description:
    "Systems, GenAI, and full-stack projects: RAG, FastAPI, agentic AI, and distributed systems.",
};

export default function AllProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href="/#projects"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors font-medium gap-1"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            All Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Systems, GenAI, and full-stack work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block h-full"
            >
              <Card className="h-full overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300 group flex flex-col">
                <div className="relative h-40 w-full overflow-hidden bg-muted shrink-0">
                  <Image
                    src={project.image ?? PLACEHOLDER_IMAGE}
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
                  <span className="text-xs text-muted-foreground">
                    {project.year}
                  </span>
                  <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mt-0.5 mb-1.5">
                    {project.title}
                  </h2>
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
          ))}
        </div>
      </div>
    </main>
  );
}
