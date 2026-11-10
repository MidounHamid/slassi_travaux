import type { Metadata } from 'next';
import { Montserrat, Inter, Cairo } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '../context/LanguageContext';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Slassi De Travaux Divers | Entreprise Générale de BTP & Génie Civil à Fès, Maroc',
  description: 'Slassi De Travaux Divers (Slassi Travaux) - Entreprise générale de BTP, Génie Civil, Gros Œuvre, VRD, Voirie et Rénovation à Fès et partout au Maroc. SARL AU au capital de 17 000 000 DH.',
  keywords: [
    'Slassi Travaux',
    'Slassi De Travaux Divers',
    'BTP Fès',
    'Entreprise BTP Maroc',
    'Génie Civil Fès',
    'Gros Oeuvre Fès',
    'VRD Maroc',
    'Travaux Publics Maroc',
    'Construction Fès',
    'Rénovation Maroc',
    '17M MAD'
  ],
  authors: [{ name: 'Slassi De Travaux Divers SARL AU' }],
  icons: {
    icon: [
      { url: '/icon.png?v=3', type: 'image/png' },
      { url: '/favicon.ico?v=3', sizes: 'any' },
    ],
    shortcut: '/favicon.ico?v=3',
    apple: '/icon.png?v=3',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" dir="ltr" className={`${montserrat.variable} ${inter.variable} ${cairo.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/icon.png?v=3" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico?v=3" />
        <link rel="apple-touch-icon" href="/icon.png?v=3" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0B1120] text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950">
        <LanguageProvider>
          <TopBar />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}
