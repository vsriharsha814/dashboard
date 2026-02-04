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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Skills
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Tech stack and tools
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            <h3 className="text-xl font-semibold text-foreground mb-4">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

