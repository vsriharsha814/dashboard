export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-gray-300 dark:text-slate-400 py-12 border-t border-gray-800 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Sri Harsha Vallabhaneni</h3>
            <p className="text-gray-400 dark:text-slate-400 text-sm">
              Building reliable systems at the intersection of backend and AI.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Connect</h4>
            <div className="space-y-2">
              <a
                href="mailto:srva5218@colorado.edu"
                className="block text-gray-400 dark:text-slate-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm"
              >
                srva5218@colorado.edu
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 dark:text-slate-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 dark:text-slate-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Education</h4>
            <p className="text-gray-400 dark:text-slate-400 text-sm">
              MS Computer Science<br />
              University of Colorado Boulder
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 dark:border-slate-800 text-center text-gray-400 dark:text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Sri Harsha Vallabhaneni. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
