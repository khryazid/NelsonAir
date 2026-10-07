'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, 
  Plane, 
  Menu, 
  X, 
  MessageSquare,
  ChevronDown,
  Lock,
  Briefcase
} from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [portalsOpen, setPortalsOpen] = useState(false);
  const pathname = usePathname();

  const mainLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Catálogo', href: '/brokerage' },
    { name: 'Inspección PPI', href: '/inspeccion' },
    { name: 'Calculadora', href: '/calculadora' },
    { name: 'Off-Market', href: '/off-market' },
  ];

  const portalLinks = [
    { name: 'Portal Propietario', href: '/portal', icon: Lock, badge: 'Clientes' },
    { name: 'Panel Legal CMS', href: '/cms', icon: Briefcase, badge: 'Abogado' },
  ];

  const whatsappDirect = buildWhatsAppLink(
    'Hola equipo de AeroLex Global, requiero asesoría legal aeronáutica o peritaje de una aeronave.'
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo & Authority */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Plane className="w-5 h-5 transform -rotate-45" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                  AEROLEX GLOBAL
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider whitespace-nowrap">
                  GLOBAL ADVISORY
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide whitespace-nowrap">
                Aviation Law & Executive Brokerage
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links (Single-line, pristine horizontal alignment, no wrapping) */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5 shrink-0">
            {mainLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-2xs border border-blue-200/80'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Portals Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPortalsOpen(!portalsOpen)}
                onBlur={() => setTimeout(() => setPortalsOpen(false), 200)}
                className={`px-3 py-2 rounded-xl text-xs font-bold tracking-wide whitespace-nowrap transition flex items-center gap-1 text-slate-600 hover:text-blue-600 hover:bg-slate-50 ${
                  pathname === '/portal' || pathname === '/cms' ? 'text-blue-700 bg-blue-50 font-black' : ''
                }`}
              >
                <span>Portales</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {portalsOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Accesos Privados
                  </div>
                  {portalLinks.map((portal) => {
                    const Icon = portal.icon;
                    return (
                      <Link
                        key={portal.name}
                        href={portal.href}
                        className="flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-blue-600" />
                          <span>{portal.name}</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                          {portal.badge}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Action CTAs (Right side) */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Portales button for lg screens when xl is not reached */}
            <div className="xl:hidden relative">
              <button
                type="button"
                onClick={() => setPortalsOpen(!portalsOpen)}
                onBlur={() => setTimeout(() => setPortalsOpen(false), 200)}
                className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-50 border border-slate-200 flex items-center gap-1 whitespace-nowrap"
              >
                <span>Portales</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {portalsOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50">
                  {portalLinks.map((portal) => (
                    <Link
                      key={portal.name}
                      href={portal.href}
                      className="block px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                    >
                      {portal.name} ({portal.badge})
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a
              href={whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 hover:text-emerald-800 transition whitespace-nowrap shadow-2xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/inspeccion"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/25 transition whitespace-nowrap transform hover:-translate-y-0.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Agendar Inspección</span>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none border border-slate-200"
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-5 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
            Navegación Principal
          </div>
          {mainLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-100 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
              Portales Privados
            </div>
            {portalLinks.map((portal) => (
              <Link
                key={portal.name}
                href={portal.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700"
              >
                <span>{portal.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                  {portal.badge}
                </span>
              </Link>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-2.5">
            <a
              href={whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Contactar por WhatsApp</span>
            </a>
            <Link
              href="/inspeccion"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-black bg-blue-600 text-white shadow-sm"
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
