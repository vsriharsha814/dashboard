import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import ChatWidget from "@/components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sri Harsha Vallabhaneni - AI Engineer Portfolio | RAG Expert | CU Boulder",
  description: "AI and Systems Engineer. MS CS @ CU Boulder (4.0 GPA). Building production-grade RAG systems, LLM pipelines, and distributed systems. Experience at Cisco, Darwinbox, Empowered Margins.",
  keywords: [
    "AI Engineer Portfolio",
    "RAG Expert",
    "Sri Harsha Vallabhaneni",
    "GenAI",
    "FastAPI",
    "CU Boulder",
    "Machine Learning Engineer",
    "LLM Systems",
    "Distributed Systems",
    "BITS Pilani",
  ],
  authors: [{ name: "Sri Harsha Vallabhaneni" }],
  creator: "Sri Harsha Vallabhaneni",
  openGraph: {
    title: "Sri Harsha Vallabhaneni - AI Engineer Portfolio",
    description: "Building Intelligent Systems & Agentic AI. MS CS @ CU Boulder (4.0). RAG, GenAI, Systems Engineering. 95% hallucination reduction in production RAG systems.",
    type: "website",
    locale: "en_US",
    siteName: "Sri Harsha Vallabhaneni Portfolio",
    url: "https://vsriharsha814.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Harsha Vallabhaneni - AI Engineer Portfolio",
    description: "RAG Expert · GenAI · Systems Engineering · CU Boulder",
    creator: "@vsriharsha814",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var theme = (saved === 'light' || saved === 'dark') ? saved : 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
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
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
