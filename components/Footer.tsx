import GitHubCalendar from "@/components/GitHubCalendar";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border text-muted-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Sri Harsha Vallabhaneni</h3>
            <p className="text-muted-foreground text-sm">
              Building intelligent systems at the intersection of backend and AI.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Connect</h4>
            <div className="space-y-2">
              <a
                href="mailto:vsriharsha814@gmail.com"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                vsriharsha814@gmail.com
              </a>
              <a
                href="https://github.com/vsriharsha814"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/vallabhanenisriharsha/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Education</h4>
            <p className="text-muted-foreground text-sm">
              MS Computer Science · 4.0 GPA<br />
              University of Colorado Boulder
            </p>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground mb-4">Activity</h4>
          <GitHubCalendar />
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Sri Harsha Vallabhaneni. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
