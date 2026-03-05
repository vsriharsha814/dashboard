/**
 * Central resume & portfolio data for Sri Harsha Vallabhaneni.
 * Used by pages, Bento Grid, and AI chat system prompt.
 */

export const RESUME_TEXT = `
Sri Harsha Vallabhaneni — AI and Systems Engineer.

Education:
- MS Computer Science, University of Colorado Boulder — 4.0 GPA. Aug 2024 – May 2026.
- BE (Bachelor of Engineering), BITS Pilani.

Experience:
- AI Project Engineer at Cisco (Capstone): Built enterprise incident triage system using LLMs and FastAPI. Reduced triage latency. Production-grade log triage assistant for network diagnostics; FastAPI microservices with MongoDB and Docker.
- AI Intern at Empowered Margins: Built agentic AI pipelines for Excel data extraction and semantic header mapping. 85% reduction in manual processing. Multi-agent workflows for document processing.
- SDE 2 at Darwinbox: Led RAG-based GenAI systems. Reduced hallucinations by 95%. Built RAG-based AI chatbots in production; observability pipelines with real-time logs and dashboards. Hyderabad, India. 2022–2024.

Key Projects:
- Exactly-Once Event Processing System: Systems engineering; idempotency keys for exactly-once semantics.
- FaithCircle: Flutter mobile app with admin dashboard; cross-platform iOS/Android.
- Urban Crime Forecasting: ML pipeline; Chicago crime data; XGBoost, geospatial visualization.

Technical Stack: FastAPI, Python, RAG, LangChain, Docker, MongoDB, vector databases, LLMs, agentic AI, TypeScript, Next.js.
`;

export interface Education {
  degree: string;
  institution: string;
  gpa?: string;
  period: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  bullets: string[];
  slug: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  year: number;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  metric?: string; // e.g. "95% Hallucination Reduction"
  kind?: "experience" | "project";
}

export const education: Education[] = [
  {
    degree: "MS Computer Science",
    institution: "University of Colorado Boulder",
    gpa: "4.0",
    period: "Aug 2024 – May 2026",
  },
  {
    degree: "BE Electronics and Communication Engineering",
    institution: "BITS Pilani",
    period: "Aug 2018 – May 2022",
  },
];

export const experiences: ExperienceItem[] = [
  {
    id: "cisco",
    slug: "cisco",
    company: "Cisco",
    role: "AI Project Engineer (Capstone)",
    period: "2024",
    location: "San Jose, CA",
    bullets: [
      "Built enterprise incident triage system using LLMs and FastAPI",
      "Reduced triage latency; production-grade log triage assistant for network diagnostics",
      "Designed FastAPI microservices with MongoDB and Docker for scalable deployment",
    ],
  },
  {
    id: "empowered-margins",
    slug: "empowered-margins",
    company: "Empowered Margins",
    role: "AI Intern",
    period: "2024",
    location: "Remote",
    bullets: [
      "Built agentic AI pipelines for Excel data extraction and semantic header mapping",
      "85% reduction in manual processing through automated workflows",
      "Multi-agent workflows for document processing",
    ],
  },
  {
    id: "darwinbox",
    slug: "darwinbox",
    company: "Darwinbox",
    role: "SDE 2",
    period: "2022 – 2024",
    location: "Hyderabad, India",
    bullets: [
      "Led RAG-based GenAI systems; reduced hallucinations by 95%",
      "Built RAG-based AI chatbots used in production with high accuracy",
      "Designed observability pipelines with real-time logs and dashboards",
    ],
  },
  {
    id: "malhar-industries",
    slug: "malhar-industries",
    company: "Malhar Industries",
    role: "Intern",
    period: "May – July 2020",
    bullets: [
      "Completed internship in software and systems support",
      "Contributed to development and operational workflows",
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    id: "cisco",
    slug: "cisco",
    title: "Enterprise Incident Triage System",
    description: "LLM-powered incident triage with FastAPI. Reduced triage latency.",
    longDescription:
      "Built a production-grade incident triage system using LLMs and FastAPI for enterprise network diagnostics. The system analyzes log streams, detects anomalies, and reduces triage latency. Containerized microservices with MongoDB and Docker.",
    category: "Backend Systems",
    year: 2025,
    technologies: ["Python", "FastAPI", "MongoDB", "Docker", "LLMs"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    featured: true,
    kind: "experience",
  },
  {
    id: "faithcircle",
    slug: "faithcircle",
    title: "FaithCircle",
    description:
      "Cross-platform mobile app built with Flutter, with an admin dashboard for content and user management.",
    longDescription:
      "FaithCircle is a full-stack mobile application built with Flutter for iOS and Android, demonstrating end-to-end mobile development. The app is supported by a web-based admin dashboard for managing content and users. The project showcases cross-platform UI with Flutter/Dart, state management, and integration with a backend and admin tooling.",
    category: "Full Stack / Mobile",
    year: 2026,
    technologies: [
      "Flutter",
      "Dart",
      "Mobile Development",
      "Admin Dashboard",
      "Cross-Platform",
      "REST APIs",
    ],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    featured: false,
  },
  {
    id: "empowered-margins",
    slug: "empowered-margins",
    title: "Agentic Document Processing",
    description: "Agentic AI pipelines for Excel extraction. 85% reduction in manual processing.",
    longDescription:
      "Built agentic AI pipelines for Excel data extraction and semantic header mapping at Empowered Margins. Multi-agent workflows reduced manual processing by 85% while maintaining high accuracy.",
    category: "GenAI / LLMs",
    year: 2024,
    technologies: ["Python", "LangChain", "Agentic AI", "Document Processing"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    featured: true,
    metric: "85% Reduction in Manual Processing",
    kind: "experience",
  },
  {
    id: "exactly-once",
    slug: "exactly-once",
    title: "Exactly-Once Event Processing System",
    description: "Systems engineering with idempotency keys for exactly-once semantics.",
    longDescription:
      "Designed and implemented an exactly-once event processing system using idempotency keys. Ensures each event is processed precisely once across distributed consumers, critical for financial and audit workflows.",
    category: "Systems Engineering",
    year: 2025,
    technologies: ["Distributed Systems", "Idempotency", "Event Streaming"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    featured: true,
  },
  {
    id: "urban-crime",
    slug: "urban-crime",
    title: "Urban Crime Forecasting",
    description: "ML pipeline over 1M+ Chicago crime records with XGBoost and geospatial visualization.",
    longDescription:
      "Developed ML pipeline processing 1M+ Chicago crime records for forecasting and hotspot detection. XGBoost with geospatial visualization for resource allocation.",
    category: "Data / ML",
    year: 2025,
    technologies: ["Python", "XGBoost", "Pandas", "Geospatial Analysis"],
    image: "https://images.unsplash.com/photo-1453873531674-2151bcd01707?w=800&h=600&fit=crop",
    featured: false,
  },
  {
    id: "operation-classified",
    slug: "operation-classified",
    title: "In The Buff — Operation Classified",
    description:
      "Live, spy-themed concert experience with agent check-in and a real-time big-screen roster powered by Firestore.",
    longDescription:
      "Operation Classified powers a live, spy-themed experience for the In The Buff a cappella audience. The system has a narrative briefing page, a phone-friendly agent check-in flow for uploading photos and aliases, and a projector-ready big-screen roster that feels like a classified surveillance console. Agent photos are cropped into passport-style portraits, tagged with codenames, stories, and status, and streamed into a continuously scrolling 10-wide data wall. A central focus card cycles through agents with threat levels, coordinates, and mission text, while layered HUD effects, scanlines, and hex grids make the venue feel like mission control.",
    category: "Creative / Live Systems",
    year: 2026,
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
      "Firestore",
      "Realtime UI",
    ],
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop",
    liveUrl: "https://itbheist.vercel.app",
    demoUrl: "https://itbheist.vercel.app/screen",
    featured: true,
  },
  {
    id: "adamara",
    slug: "adamara",
    title: "AdAmara – Ad Request Portal",
    description:
      "Production ad-request portal for Amaravati Communications with structured briefs, timelines, and admin review.",
    longDescription:
      "AdAmara is a full-stack ad-request portal built for Amaravati Communications Pvt. Ltd. It replaces ad-hoc emails and chats with a single, structured workflow where individuals and teams can submit ad requests with audiences, budgets, timelines, and reference files. Approved admins log into a simple dashboard to review, track, and export requests so campaigns actually ship on time. The product is live in production at Amaravati Communications and is actively used by the team to run their advertising workflow end to end.",
    category: "Full Stack / Tools",
    year: 2022,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Form Handling", "Vercel"],
    image:
      "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&h=600&fit=crop",
    liveUrl: "https://adamara.vercel.app",
    demoUrl: "https://adamara.vercel.app",
    featured: false,
  },
  {
    id: "darwinbox",
    slug: "darwinbox",
    title: "RAG-based GenAI Systems",
    description: "Production RAG chatbots with 95% hallucination reduction.",
    longDescription:
      "Led development of RAG-based GenAI systems at Darwinbox. Built production-ready chatbots with vector databases and LangChain, achieving 95% hallucination reduction. Integrated observability pipelines and real-time dashboards.",
    category: "GenAI / LLMs",
    year: 2022,
    technologies: ["Python", "LangChain", "RAG", "Vector Databases", "FastAPI"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    featured: true,
    metric: "95% Hallucination Reduction",
    kind: "experience",
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return projects.find((p) => p.slug === slug || p.id === slug);
}

export function getExperienceBySlug(slug: string): ExperienceItem | undefined {
  return experiences.find((e) => e.slug === slug || e.id === slug);
}

export function getBentoProjects(): ProjectItem[] {
  return projects.filter(
    (p) => p.slug === "cisco" || p.slug === "darwinbox" || p.slug === "empowered-margins"
  );
}
