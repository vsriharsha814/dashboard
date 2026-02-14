import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { experiences } from "@/lib/data";
import ExperienceSection from "@/components/ExperienceSection";

export const metadata = {
  title: "Work Experience - Sri Harsha Vallabhaneni",
  description:
    "AI and systems engineering experience at Cisco, Empowered Margins, Darwinbox, and Malhar Industries.",
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link
          href="/#experience"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-12 transition-colors font-medium gap-1"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to Home
        </Link>

        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Work Experience
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI & systems engineering across enterprise and startups
          </p>
        </div>

        <ExperienceSection experiences={experiences} />
      </div>
    </main>
  );
}
