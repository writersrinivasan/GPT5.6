import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "GPT 5.6 & LangGraph Training | Hexaware",
  description: "Interactive training session on OpenAI GPT 5.6 and LangGraph for Hexaware employees",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ background: '#0a0a1a' }}>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#1a1a3a', color: '#fff', border: '1px solid #7C3AED' },
          }}
        />
        {children}
      </body>
    </html>
  );
}
