import type { Metadata } from "next";
import { Sora, Figtree } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lucas Coelho — UX/UI Designer & Web Designer",
  description:
    "Portfolio de Lucas Coelho. Transformando ideias em experiências digitais impactantes através de UX/UI Design, Web Design e Product Design.",
  authors: [{ name: "Lucas Coelho" }],
  keywords: [
    "UX/UI Designer",
    "Web Designer",
    "Product Designer",
    "Portfolio",
    "Design de Interfaces",
    "Experiência do Usuário",
  ],
  openGraph: {
    title: "Lucas Coelho — UX/UI Designer & Web Designer",
    description:
      "Transformando ideias em experiências digitais impactantes.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${sora.variable} ${figtree.variable} dark h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
