import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Slassi CMS - Back-Office Direction & Gestion des Layouts",
  description: "Portail d'administration pour la direction générale de Slassi Travaux SARL AU (17M MAD). Gestion de l'arborescence et des gabarits backend de site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className="min-h-screen bg-[#0b0f19] text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
