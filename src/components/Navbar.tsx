'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, 
  Plane, 
  Calculator, 
  FileText, 
  Lock, 
  Menu, 
  X, 
  MessageSquare,
  Compass,
  Briefcase
} from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Catálogo Aeronaves', href: '/brokerage', icon: Plane },
    { name: 'Inspección PPI in situ', href: '/inspeccion', icon: ShieldCheck },
    { name: 'Calculadora Costos', href: '/calculadora', icon: Calculator },
    { name: 'Oportunidades Off-Market', href: '/off-market', icon: Compass },
    { name: 'Portal Propietario', href: '/portal', icon: Lock, badge: 'Privado' },
    { name: 'CMS Abogado', href: '/cms', icon: Briefcase, badge: 'Admin' },
  ];

  const whatsappDirect = buildWhatsAppLink(
    'Hola Cap. Abg. Nelson, requiero asesoría legal aeronáutica o peritaje de una aeronave.'
  );

  return (
    <header className="sticky top-0 z-50 bg-[#080d1a]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Authority Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-lg bg-gradient-to-br from-amber-500/20 to-sky-600/30 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:border-amber-400 transition">
              <Plane className="w-6 h-6 transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-amber-400 transition">
                  NELSON R.
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 font-semibold tracking-wider uppercase">
                  Pilot-Lawyer
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Derecho Aeronáutico & Mercantil • Brokerage
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-800/90 text-amber-400 border border-amber-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 opacity-80" />}
                  {link.name}
                  {link.badge && (
                    <span className={`text-[9px] px-1 rounded uppercase tracking-tighter ${
                      link.badge === 'Admin' 
                        ? 'bg-amber-950/70 text-amber-300 border border-amber-800/60'
                        : 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30 transition"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Directo</span>
            </a>

            <Link
              href="/inspeccion"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 hover:from-amber-500 hover:to-amber-400 shadow-sm transition"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Agendar Inspección</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-[#0c1527] border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-slate-800 text-amber-400 border border-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {Icon && <Icon className="w-4 h-4 text-slate-400" />}
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-4 flex flex-col gap-2">
            <a
              href={whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-500/40"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Contactar por WhatsApp</span>
            </a>
            <Link
              href="/inspeccion"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold bg-amber-500 text-slate-950"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Agendar Inspección PPI</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
