import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import BentoProjectGrid from "@/components/BentoProjectGrid";
import { experiences, projects } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
      <EducationSection />
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
          <BentoProjectGrid projects={projects} horizontal />
          <div className="mt-8 flex justify-center">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/projects">
                View all projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
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
          </div>
        </div>
      </section>
    </main>
  );
}
