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
  title: 'Cap. Abg. Nelson R. | Derecho Aeronáutico, Brokerage & Peritaje in situ',
  description:
    'Plataforma integral de derecho aeronáutico y mercantil en Caracas, Venezuela (SVCS, SVMI, SVFM). Inspección técnica de aeronaves al mando de un piloto comercial + blindaje jurídico registral INAC / FAA sin intermediarios.',
  keywords: [
    'Abogado Aeronáutico Venezuela',
    'Peritaje Aeronave Caracas',
    'Pre-Purchase Inspection PPI Charallave SVCS',
    'Brokerage Aeronaves Venezuela',
    'Trámites INAC',
    'Piloto Abogado',
    'Aeronaves en Venta Venezuela King Air Citation',
    'Administración Aeronáutica Turn-Key'
  ],
  authors: [{ name: 'Cap. Abg. Nelson R.' }],
  openGraph: {
    title: 'Cap. Abg. Nelson R. | Derecho Aeronáutico & Brokerage',
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
