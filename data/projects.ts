import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "cisco-log-triage",
    title: "Cisco Log Triage Assistant",
    description: "LLM-powered log anomaly detection and semantic search over historical outages",
    longDescription: "Built a production-grade log triage assistant that uses LLMs to detect anomalies in network logs and provides semantic search capabilities over historical outage data. The system is containerized using FastAPI microservices with MongoDB for data persistence, enabling faster diagnostic workflows for network engineers.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    technologies: ["Python", "FastAPI", "MongoDB", "Docker", "LLMs", "Semantic Search"],
    githubUrl: undefined,
    liveUrl: undefined,
    featured: true,
    category: "Backend Systems",
    year: 2024,
  },
  {
    id: "agentic-document-processing",
    title: "Agentic Document Processing System",
    description: "Multi-agent workflows for semantic header mapping and unstructured document ingestion",
    longDescription: "Developed an agentic AI system that processes Excel files and unstructured documents using multi-agent workflows. The system performs semantic header mapping and automated data extraction, significantly reducing manual processing time while maintaining high accuracy through intelligent agent coordination.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    technologies: ["Python", "LangChain", "Agentic AI", "Document Processing", "NLP"],
    githubUrl: undefined,
    liveUrl: undefined,
    featured: true,
    category: "GenAI / LLMs",
    year: 2024,
  },
  {
    id: "rag-enterprise-chatbots",
    title: "RAG-based Enterprise Chatbots",
    description: "Hallucination-reduced AI assistants with 95% accuracy for enterprise use",
    longDescription: "Built production-ready RAG-based chatbots that integrate with enterprise systems. The system uses vector databases and LangChain to provide accurate, context-aware responses while minimizing hallucinations. Achieved 95% accuracy in production environments with proper UI integration and observability.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    technologies: ["Python", "LangChain", "Vector Databases", "RAG", "FastAPI", "UI Integration"],
    githubUrl: undefined,
    liveUrl: undefined,
    featured: true,
    category: "GenAI / LLMs",
    year: 2023,
  },
  {
    id: "urban-crime-forecasting",
    title: "Urban Crime Forecasting & Hotspot Detection",
    description: "ML pipeline over 1M+ Chicago crime records with XGBoost and geospatial visualization",
    longDescription: "Developed a machine learning pipeline that processes over 1 million Chicago crime records to forecast crime patterns and identify hotspots. Used XGBoost for predictive modeling with extensive feature engineering, and created geospatial visualizations to help law enforcement agencies allocate resources more effectively.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    technologies: ["Python", "XGBoost", "Pandas", "Geospatial Analysis", "Data Visualization"],
    githubUrl: undefined,
    liveUrl: undefined,
    featured: false,
    category: "Data / ML",
    year: 2023,
  },
  {
    id: "smartschedule",
    title: "SmartSchedule – Calendar Automation App",
    description: "OCR + NER pipeline for event extraction from documents and images",
    longDescription: "Built a calendar automation application that uses OCR and Named Entity Recognition (NER) to extract events from documents and images. The system includes Flask APIs for backend processing and a mobile frontend for user interaction, automating the tedious process of manual calendar entry.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
    technologies: ["Python", "Flask", "OCR", "NER", "Mobile Development"],
    githubUrl: undefined,
    liveUrl: undefined,
    featured: false,
    category: "NLP / Document Intelligence",
    year: 2022,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter((project) => project.category === category);
}

export const categories = [
  "All",
  "Backend Systems",
  "GenAI / LLMs",
  "Data / ML",
  "NLP / Document Intelligence",
  "Full Stack / Mobile",
];
