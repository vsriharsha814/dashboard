import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import { experiences } from "@/lib/data";
import { projects as legacyProjects } from "@/data/projects";
import ProjectGrid from "@/components/ProjectGrid";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <BentoGrid />
      <section id="experience" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI & systems engineering across enterprise and startups
            </p>
          </div>
          <ExperienceSection experiences={experiences} />
        </div>
      </section>
      <section id="skills" className="py-20 bg-background">
        <SkillsSection />
      </section>
      <section id="projects-all" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              All Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Systems, GenAI, and full-stack work
            </p>
          </div>
          <ProjectGrid projects={legacyProjects} />
        </div>
      </section>
      <section id="about" className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
            About
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground text-lg leading-relaxed">
              I&apos;m an AI and Systems Engineer (MS CS, CU Boulder, 4.0 GPA) focused on
              building reliable systems at the intersection of backend engineering and
              applied AI. My work spans enterprise-scale systems at Cisco and fast-moving
              AI teams, where I&apos;ve built production-grade LLM systems, RAG pipelines,
              and agentic workflows.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mt-4">
              I focus on systems that reduce ambiguity and deliver measurable impact:
              observability, scale, and exactly-once semantics.
            </p>
            <div className="mt-8 p-6 bg-card rounded-lg border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Education
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-foreground">
                    MS Computer Science, University of Colorado Boulder
                  </p>
                  <p className="text-sm text-muted-foreground">
                    GPA: 4.0 · Aug 2024 – May 2026
                  </p>
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    BE, BITS Pilani
                  </p>
                  <p className="text-sm text-muted-foreground">
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
