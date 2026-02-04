import { Experience } from "@/types/experience";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-12">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="border-l-2 border-primary pl-6 relative"
          >
            <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary ring-4 ring-[var(--background)]" />
            <div className="mb-2">
              <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
              <p className="text-lg font-semibold text-foreground">{exp.company}</p>
              <p className="text-sm text-muted-foreground">
                {exp.period} {exp.location && `• ${exp.location}`}
              </p>
            </div>
            <ul className="mt-4 space-y-2">
              {exp.bullets.map((bullet, index) => (
                <li key={index} className="text-muted-foreground flex items-start gap-2">
                  <span className="text-primary shrink-0">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

