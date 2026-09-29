'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, 
  Plane, 
  Calculator, 
  Lock, 
  Menu, 
  X, 
  MessageSquare,
  Compass,
  Briefcase,
  ChevronDown
} from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [portalsOpen, setPortalsOpen] = useState(false);
  const pathname = usePathname();

  const mainLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Catálogo', href: '/brokerage', icon: Plane },
    { name: 'Inspección PPI', href: '/inspeccion', icon: ShieldCheck },
    { name: 'Calculadora', href: '/calculadora', icon: Calculator },
    { name: 'Off-Market', href: '/off-market', icon: Compass },
  ];

  const portalLinks = [
    { name: 'Portal Propietario', href: '/portal', icon: Lock, badge: 'Clientes' },
    { name: 'Panel Legal CMS', href: '/cms', icon: Briefcase, badge: 'Abogado' },
  ];

  const whatsappDirect = buildWhatsAppLink(
    'Hola Cap. Abg. Nelson, requiero asesoría legal aeronáutica o peritaje de una aeronave.'
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Authority */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Plane className="w-5 h-5 transform -rotate-45" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  NELSON R.
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 uppercase tracking-wider">
                  Pilot-Lawyer
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                Derecho Aeronáutico & Mercantil • Brokerage
              </p>
            </div>
          </Link>

          {/* Desktop Navigation (Concise, Clean & Spacious) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {mainLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/70 shadow-xs'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />}
                  <span>{link.name}</span>
                </Link>
              );
            })}

            {/* Portals Dropdown (Keeps navbar completely clean) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPortalsOpen(!portalsOpen)}
                onBlur={() => setTimeout(() => setPortalsOpen(false), 200)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition flex items-center gap-1 text-slate-600 hover:text-blue-600 hover:bg-slate-50 ${
                  pathname === '/portal' || pathname === '/cms' ? 'text-blue-700 bg-blue-50 font-bold' : ''
                }`}
              >
                <span>Portales</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {portalsOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Accesos Privados
                  </div>
                  {portalLinks.map((portal) => {
                    const Icon = portal.icon;
                    return (
                      <Link
                        key={portal.name}
                        href={portal.href}
                        className="flex items-center justify-between px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-blue-600" />
                          <span>{portal.name}</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                          {portal.badge}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Action Buttons (Right) */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 hover:text-emerald-800 transition shadow-xs"
              title="Contacto directo por WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/inspeccion"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/20 transition-all transform hover:-translate-y-0.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Agendar Inspección</span>
            </Link>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {mainLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {Icon && <Icon className="w-4 h-4 text-blue-600" />}
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="pt-2 border-t border-slate-100">
            <div className="px-3.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Áreas Privadas
            </div>
            {portalLinks.map((portal) => {
              const Icon = portal.icon;
              return (
                <Link
                  key={portal.name}
                  href={portal.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-blue-600" />
                    <span>{portal.name}</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                    {portal.badge}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="pt-4 flex flex-col gap-2">
            <a
              href={whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Contactar por WhatsApp</span>
            </a>
            <Link
              href="/inspeccion"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Agendar Inspección PPI in situ</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
