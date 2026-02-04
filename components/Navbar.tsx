'use client';

import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
          >
            Sri Harsha Vallabhaneni
          </Link>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#experience" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                Experience
              </Link>
              <Link href="/#projects" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                Projects
              </Link>
              <Link href="/#skills" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                Skills
              </Link>
              <Link href="/#education" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                Education
              </Link>
              <a
                href="/resume.pdf"
                download
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
              >
                Download Resume
              </a>
            </div>
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

