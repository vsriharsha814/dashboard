# Portfolio Website

A professional, resume-first portfolio website for Sri Harsha Vallabhaneni, showcasing production-grade backend systems and applied GenAI work.

## Features

- 🎯 Resume-adjacent, minimal design
- 🚀 Built with Next.js 16 and TypeScript
- 💅 Clean typography with Tailwind CSS
- 📱 Fully responsive and mobile-friendly
- ⚡ Optimized for performance
- 🎯 SEO-friendly with metadata
- 🌙 Dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customization

### Updating Projects

Edit the `data/projects.ts` file to add or modify projects:

```typescript
{
  id: "unique-project-id",
  title: "Project Title",
  description: "One-line problem statement",
  longDescription: "Detailed description of the project...",
  image: "/path/to/image.jpg", // or use external URL
  technologies: ["Python", "FastAPI", "MongoDB"],
  githubUrl: "https://github.com/yourusername/project", // optional
  liveUrl: "https://your-project.vercel.app", // optional
  featured: true,
  category: "Backend Systems", // or "GenAI / LLMs", "Data / ML", etc.
  year: 2024,
}
```

### Updating Experience

Edit `data/experience.ts` to update work experience with impact-focused bullets.

### Updating Skills

Edit `components/SkillsSection.tsx` to update skill groups and technologies.

### Updating Personal Information

1. **Hero Section**: Edit `components/Hero.tsx` to update name, headline, and focus areas
2. **About Section**: Edit `app/page.tsx` to update the about section and education
3. **Contact**: Update email and social links in `components/Hero.tsx` and `components/Footer.tsx`
4. **Metadata**: Update site metadata in `app/layout.tsx`

## Deployment to Vercel

This project is ready to deploy to Vercel for free:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect Next.js and configure the build
6. Click "Deploy"

That's it! Your portfolio will be live in minutes.

### Environment Variables

No environment variables are required for basic deployment.

## Project Structure

```
dashboard/
├── app/
│   ├── layout.tsx          # Root layout with Navbar and Footer
│   ├── page.tsx            # Homepage with all sections
│   ├── globals.css         # Global styles
│   └── projects/
│       └── [id]/
│           └── page.tsx     # Individual project pages
├── components/
│   ├── Hero.tsx            # Hero section component
│   ├── Navbar.tsx          # Navigation bar
│   ├── Footer.tsx          # Footer component
│   ├── ProjectCard.tsx     # Project card component
│   ├── ProjectGrid.tsx     # Project grid layout
│   ├── ExperienceSection.tsx  # Experience timeline
│   └── SkillsSection.tsx   # Skills grouped by category
├── data/
│   ├── projects.ts        # Project data
│   └── experience.ts       # Work experience data
└── types/
    ├── project.ts          # TypeScript types for projects
    └── experience.ts       # TypeScript types for experience
```

## Design Philosophy

This portfolio follows a minimal, resume-adjacent design:
- Clean typography and spacing
- No gradient-heavy UI elements
- Scannable, professional layout
- Focus on content over decoration
- Production-minded presentation

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Deployment platform

## License

This project is open source and available under the MIT License.
