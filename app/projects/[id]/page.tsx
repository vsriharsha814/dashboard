import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/data";
import { getProjectById } from "@/data/projects";
import { getProjectScreenshots } from "@/lib/screenshots";
import { ChevronLeft, ExternalLink, Github } from "lucide-react";
import MermaidDiagram from "@/components/MermaidDiagram";
import ProjectGallery from "@/components/ProjectGallery";

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

  const screenshots = await getProjectScreenshots(project.slug);
  const hasDemoUrl = project.demoUrl || project.liveUrl;
  const hasRepoUrl = project.repoUrl || project.githubUrl;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href="/projects"
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

            {screenshots.length > 0 && (
              <ProjectGallery images={screenshots} projectTitle={project.title} />
            )}

            {(project.slug === "exactly-once" || project.id === "exactly-once") && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Architecture: Idempotency Key Flow
                </h2>
                <MermaidDiagram />
              </div>
            )}

            {project.slug === "cisco" && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Technical Deep-Dive: Anomaly Detection Pipeline
                </h2>
                <div className="bg-muted/50 rounded-lg border border-border p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    The system uses a multi-stage anomaly detection pipeline:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Real-time log ingestion via FastAPI endpoints</li>
                    <li>LLM-powered semantic analysis for pattern recognition</li>
                    <li>Historical context retrieval from MongoDB for similar incidents</li>
                    <li>Automated triage scoring to prioritize critical alerts</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    This architecture reduced triage latency by enabling faster root cause identification through semantic search over past outages.
                  </p>
                </div>
              </div>
            )}

            {project.slug === "darwinbox" && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Technical Deep-Dive: RAG Pipeline & Hallucination Reduction
                </h2>
                <div className="bg-muted/50 rounded-lg border border-border p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Achieved 95% hallucination reduction through:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Semantic chunking with overlap to preserve context boundaries</li>
                    <li>Hybrid retrieval combining dense vectors (embeddings) and sparse (BM25) for better recall</li>
                    <li>Re-ranking pipeline to prioritize most relevant chunks</li>
                    <li>Strict prompt engineering with context window management</li>
                    <li>Post-generation validation against source documents</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    The system integrates with enterprise knowledge bases and provides real-time observability through custom dashboards.
                  </p>
                </div>
              </div>
            )}

            {project.slug === "empowered-margins" && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Technical Deep-Dive: Multi-Agent Workflows
                </h2>
                <div className="bg-muted/50 rounded-lg border border-border p-6">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Built agentic AI pipelines that reduced manual processing by 85%:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Header detection agent: Identifies column headers using semantic similarity</li>
                    <li>Data extraction agent: Extracts structured data from Excel cells</li>
                    <li>Normalization agent: Standardizes formats and validates data integrity</li>
                    <li>Orchestration layer: Coordinates agents with error handling and retries</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    The multi-agent approach outperformed rule-based systems by 40% in accuracy while handling diverse document formats.
                  </p>
                </div>
              </div>
            )}

            {(hasRepoUrl || hasDemoUrl) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {hasRepoUrl && (
                  <a
                    href={project.repoUrl || project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Github className="h-5 w-5" />
                    View Repository
                  </a>
                )}
                {hasDemoUrl && (
                  <a
                    href={project.demoUrl || project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-secondary transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                    Live Demo
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
