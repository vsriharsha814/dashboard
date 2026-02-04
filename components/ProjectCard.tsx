import { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden bg-muted">
        <Image
          src={project.image}
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
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{project.year}</span>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-primary/10 text-primary rounded text-xs border border-primary/20"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs border border-border">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
        <Link
          href={`/projects/${project.id}`}
          className="inline-block w-full text-center px-4 py-2 bg-primary text-primary-foreground hover:opacity-90 rounded-lg font-medium transition-opacity text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
