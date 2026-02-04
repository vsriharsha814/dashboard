import { education } from "@/lib/data";
import { GraduationCap, Award } from "lucide-react";

const COURSEWORK = {
  "CU Boulder": [
    "Advanced Machine Learning",
    "Distributed Systems",
    "Database Systems",
    "Computer Networks",
    "Software Engineering",
  ],
  "BITS Pilani": [
    "Data Structures & Algorithms",
    "Database Management Systems (DBMS)",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
    "Object-Oriented Programming",
  ],
};

export default function EducationSection() {
  return (
    <section id="education" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Academic foundation in Computer Science
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <div
              key={edu.institution}
              className="bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                  {index === 0 ? (
                    <Award className="h-6 w-6 text-primary" />
                  ) : (
                    <GraduationCap className="h-6 w-6 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-lg font-semibold text-primary mb-2">
                    {edu.institution}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-muted-foreground mb-3">
                      GPA: <span className="font-semibold text-foreground">{edu.gpa}</span>
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mb-4">{edu.period}</p>
                  {COURSEWORK[edu.institution as keyof typeof COURSEWORK] && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Key Coursework
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {COURSEWORK[edu.institution as keyof typeof COURSEWORK].map((course) => (
                          <span
                            key={course}
                            className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs border border-border"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
