import { education } from "@/lib/data";
import { GraduationCap, Award } from "lucide-react";

const COURSEWORK = {
  "University of Colorado Boulder": [
    "Datacenter Scale Computing",
    "NLP",
    "Big Data Architecture",
    "Neural Networks and Deep Learning",
    "Data Mining",
  ],
  "BITS Pilani": [
    "Digital Image Processing",
    "Operating Systems",
    "Software Engineering",
    "IoT",
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
  ],
};

export default function EducationSection() {
  return (
    <section id="education" className="py-20 bg-background">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl text-foreground">
            Education
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            Academic foundation in Computer Science
          </p>
        </div>
        <div className="grid max-w-5xl grid-cols-1 gap-8 mx-auto md:grid-cols-2">
          {education.map((edu, index) => (
            <div
              key={edu.institution}
              className="p-6 transition-colors border rounded-lg bg-card border-border hover:border-primary/50"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                  {index === 0 ? (
                    <Award className="w-6 h-6 text-primary" />
                  ) : (
                    <GraduationCap className="w-6 h-6 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-xl font-bold text-foreground">
                    {edu.degree}
                  </h3>
                  <p className="mb-2 text-lg font-semibold text-primary">
                    {edu.institution}
                  </p>
                  {edu.gpa && (
                    <p className="mb-3 text-sm text-muted-foreground">
                      GPA: <span className="font-semibold text-foreground">{edu.gpa}</span>
                    </p>
                  )}
                  <p className="mb-4 text-sm text-muted-foreground">{edu.period}</p>
                  {COURSEWORK[edu.institution as keyof typeof COURSEWORK] && (
                    <div className="pt-4 mt-4 border-t border-border">
                      <p className="mb-2 text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                        Key Coursework
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {COURSEWORK[edu.institution as keyof typeof COURSEWORK].map((course) => (
                          <span
                            key={course}
                            className="px-2 py-1 text-xs border rounded bg-muted text-muted-foreground border-border"
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
