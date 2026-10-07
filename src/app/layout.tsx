import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloating } from '@/components/WhatsAppFloating';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const interMono = Inter({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AeroLex Global | Derecho Aeronáutico, Executive Brokerage & Peritaje in situ',
  description:
    'AeroLex Global: Firma especializada en derecho aeronáutico mercantil, inspección técnica de aeronaves (PPI) in situ y corretaje ejecutivo bajo estándares INAC y FAA en Caracas, Venezuela (SVCS, SVMI, SVFM).',
  keywords: [
    'AeroLex Global',
    'AeroLex Aviation Advisory',
    'Derecho Aeronáutico Venezuela',
    'Peritaje Aeronave Caracas',
    'Pre-Purchase Inspection PPI Charallave SVCS',
    'Brokerage Aeronaves Venezuela',
    'Trámites INAC',
    'Aeronaves en Venta Venezuela King Air Citation',
    'Administración Aeronáutica Turn-Key'
  ],
  authors: [{ name: 'AeroLex Global' }],
  openGraph: {
    title: 'AeroLex Global | Derecho Aeronáutico & Executive Brokerage',
    description:
      'Inspección técnica al mando de un piloto + blindaje legal mercantil y aeronáutico. Caracas, Venezuela.',
    type: 'website',
    locale: 'es_VE'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${plusJakartaSans.variable} ${interMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-blue-600 selection:text-white font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloating />
      </body>
    </html>
  );
}
