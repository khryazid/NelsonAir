import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloating } from '@/components/WhatsAppFloating';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#070b16] text-slate-100 selection:bg-amber-500 selection:text-slate-950">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloating />
      </body>
    </html>
  );
}
