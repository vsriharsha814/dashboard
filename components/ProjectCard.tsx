import { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-slate-700 hover:scale-105">
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-slate-700">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:opacity-90 transition-opacity duration-200"
        />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-gray-700 dark:text-slate-300 rounded-md text-xs font-medium border border-gray-200 dark:border-slate-600">
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 dark:text-slate-400">{project.year}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-slate-300 mb-4 text-sm leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-blue-300 rounded text-xs border border-blue-200 dark:border-slate-600"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400 rounded text-xs border border-gray-200 dark:border-slate-600">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
        <Link
          href={`/projects/${project.id}`}
          className="inline-block w-full text-center px-4 py-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 text-sm shadow-sm hover:shadow-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
