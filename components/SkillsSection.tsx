export default function SkillsSection() {
  const skillGroups = [
    {
      title: "Languages",
      skills: ["Python", "JavaScript", "TypeScript", "SQL"],
    },
    {
      title: "Backend & APIs",
      skills: ["Node.js", "Flask", "FastAPI", "REST APIs", "Microservices"],
    },
    {
      title: "GenAI / ML",
      skills: [
        "LLMs",
        "RAG",
        "LangChain",
        "Sentence Transformers",
        "PyTorch",
        "Agentic AI workflows",
        "Semantic search",
      ],
    },
    {
      title: "Data & Infra",
      skills: [
        "MongoDB",
        "Redis",
        "Kafka",
        "Vector Databases (Pinecone)",
        "Docker",
        "Kubernetes",
        "GCP",
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group) => (
            <div key={group.title} className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-blue-300 rounded-md text-sm border border-blue-200 dark:border-slate-600 hover:bg-blue-100 dark:hover:bg-slate-600 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

