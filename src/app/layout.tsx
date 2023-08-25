import Header from "./Header";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neswletter App",
  description: "Next.js, TailwindCSS, TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-zinc-900 transition-all duration-700 dark:text-white">
        <Header />
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
