import { Experience } from "@/types/experience";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Experience
        </h2>
        <div className="space-y-12">
          {experiences.map((exp) => (
            <div key={exp.id} className="border-l-2 border-gray-300 dark:border-gray-700 pl-6 relative">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              <div className="mb-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {exp.role}
                </h3>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {exp.company}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {exp.period} {exp.location && `• ${exp.location}`}
                </p>
              </div>
              <ul className="mt-4 space-y-2">
                {exp.bullets.map((bullet, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-300 flex items-start">
                    <span className="mr-2 text-gray-400 dark:text-gray-500">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

