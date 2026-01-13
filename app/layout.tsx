import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sri Harsha Vallabhaneni - Backend & GenAI Engineer",
  description: "Software Engineer and MSCS student at CU Boulder. Building production-grade AI systems with experience at Cisco, Empowered Margins, and Darwinbox.",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-icon.png',
  },
  metadataBase: new URL('https://sriharshavallabhaneni.com'),
  openGraph: {
    title: "Sri Harsha Vallabhaneni - Backend & GenAI Engineer",
    description: "Building production-grade AI systems with experience at Cisco, Empowered Margins, and Darwinbox.",
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: "Sri Harsha Vallabhaneni - Backend & GenAI Engineer",
    description: "Building production-grade AI systems",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Clear any previously stored theme for testing
                  // localStorage.removeItem('theme'); // Uncomment to reset
                  
                  function getTheme() {
                    const saved = localStorage.getItem('theme');
                    console.log('Saved theme:', saved);
                    if (saved === 'light' || saved === 'dark') {
                      return saved;
                    }
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    console.log('Browser prefers dark:', prefersDark);
                    return prefersDark ? 'dark' : 'light';
                  }
                  
                  const theme = getTheme();
                  console.log('Applying theme:', theme);
                  
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Theme script error:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
