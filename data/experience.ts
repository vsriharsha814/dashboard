import { Experience } from "@/types/experience";

export const experiences: Experience[] = [
  {
    id: "cisco",
    company: "Cisco Systems",
    role: "Software Engineering Intern",
    period: "2024",
    location: "San Jose, CA",
    bullets: [
      "Built production-grade LLM-powered log triage assistant for network diagnostics",
      "Designed FastAPI microservices with MongoDB & Docker for scalable deployment",
      "Integrated anomaly detection into diagnostic workflows, reducing triage time",
    ],
  },
  {
    id: "empowered-margins",
    company: "Empowered Margins",
    role: "Software Engineering Intern",
    period: "2024",
    location: "Remote",
    bullets: [
      "Built agentic AI pipelines for document extraction and semantic header mapping",
      "Reduced manual processing time by 85% through automated workflows",
      "Outperformed rule-based systems by 40% in accuracy metrics",
    ],
  },
  {
    id: "darwinbox",
    company: "Darwinbox",
    role: "Software Development Engineer (SDE → SDE2)",
    period: "2022 - 2024",
    location: "Hyderabad, India",
    bullets: [
      "Built RAG-based AI chatbots used in production with 95% accuracy",
      "Designed observability pipelines with real-time logs and dashboards",
      "Improved reporting latency and user engagement metrics",
    ],
  },
];

