import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { getSiteContent } from "@/lib/content/fetch-content";
import AuthProvider from "./AuthProvider";
import "./globals.css";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent<{ name: string; description: string }>();
  return {
    title: {
      default: `${site.name} — Métier de libraire`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400;7..72,600;7..72,700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen font-sans">
        <AuthProvider>
          <div className="flex">
            <Sidebar />
            <main className="min-h-screen flex-1 bg-canvas px-8 py-6 lg:px-12 xl:px-16">{children}</main>
          </div>
          <ChatBot />
        </AuthProvider>
      </body>
    </html>
  );
}
