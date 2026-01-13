import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ThemeDebug from "@/components/ThemeDebug";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";

export default function Home() {
  return (
    <main className="min-h-screen">
      <ThemeDebug />
      <Hero />
      <section id="projects" className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
              Production-grade systems built for real environments
            </p>
          </div>
          <ProjectGrid projects={projects} />
        </div>
      </section>
      <ExperienceSection experiences={experiences} />
      <SkillsSection />
      <section id="about" className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            About
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed">
              I'm a Software Engineer and MSCS student at the University of Colorado Boulder,
              focused on building reliable systems at the intersection of backend engineering and
              applied AI. My work spans enterprise-scale systems at Cisco and fast-moving AI
              startups, where I've built production-grade LLM systems, RAG pipelines, and agentic
              workflows.
            </p>
            <p className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed mt-4">
              I enjoy building systems that reduce ambiguity and focus on reliability, observability,
              and scale. Before starting any project, I think deeply about why a system should exist
              and how it can deliver measurable impact in production environments.
            </p>
            <div className="mt-8 p-6 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Education
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    MS Computer Science, University of Colorado Boulder
                  </p>
                  <p className="text-sm text-gray-600 dark:text-slate-400">
                    GPA: 4.0 • Aug 2024 – May 2026
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    BE Electronics & Communication, BITS Pilani Hyderabad
                  </p>
                  <p className="text-sm text-gray-600 dark:text-slate-400">
                    Aug 2018 – May 2022
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
