import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/data";
import { getProjectById } from "@/data/projects";
import { ChevronLeft } from "lucide-react";
import MermaidDiagram from "@/components/MermaidDiagram";

/** Resolve project from either lib/data (Bento slugs) or data/projects (All Projects grid ids). */
function getProject(id: string) {
  const fromLib = getProjectBySlug(id);
  if (fromLib) return fromLib;
  const fromLegacy = getProjectById(id);
  if (fromLegacy) {
    return {
      ...fromLegacy,
      slug: fromLegacy.id,
      metric: undefined as string | undefined,
    };
  }
  return null;
}

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Sri Harsha Vallabhaneni`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href="/#projects"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors font-medium gap-1"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to Projects
        </Link>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          {project.image && (
            <div className="relative h-72 md:h-96 w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm font-medium border border-primary/20">
                {project.category}
              </span>
              <span className="text-muted-foreground text-sm">{project.year}</span>
              {project.metric && (
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm font-semibold border border-primary/20">
                  {project.metric}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {project.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              {project.description}
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                About This Project
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {(project.slug === "exactly-once" || project.id === "exactly-once") && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Idempotency Key Flow
                </h2>
                <MermaidDiagram />
              </div>
            )}

            {(project.githubUrl || project.liveUrl) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    View on GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-secondary transition-colors"
                  >
                    View Live Demo
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
