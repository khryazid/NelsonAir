import React from 'react';
import Link from 'next/link';
import { Plane, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/utils';

export function Footer() {
  const whatsappUrl = buildWhatsAppLink(
    'Hola Cap. Abg. Nelson Sánchez, deseo realizar una consulta jurídica o técnica.'
  );

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Authority */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900 font-black text-base">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <Plane className="w-4 h-4 transform -rotate-45" />
              </div>
              <span>DESPACHO AERONÁUTICO</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-[12px]">
              Asesoría legal mercantil & aeronáutica integral, peritaje técnico in situ y corretaje exclusivo al mando del <strong>Cap. Abg. Nelson Sánchez</strong> (piloto comercial activo y abogado especialista).
            </p>
            <div className="text-[11px] text-blue-700 font-semibold pt-1">
              • Caracas, Venezuela • Multijurisdicción YV (INAC) / FAA N-Number
            </div>
          </div>

          {/* Operational Bases */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase">
              Bases Operativas & Hangares
            </h4>
            <ul className="space-y-2 text-[12px]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-800 font-semibold">SVCS / Charallave</span>
                  <p className="text-[11px] text-slate-400">Aeropuerto Int. Óscar Machado Zuloaga</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-800 font-semibold">SVMI / Maiquetía</span>
                  <p className="text-[11px] text-slate-400">Aeropuerto Int. Simón Bolívar</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-800 font-semibold">SVFM / La Carlota</span>
                  <p className="text-[11px] text-slate-400">Base Aérea Generalísimo Francisco de Miranda</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Specialized Services */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase">
              Servicios Especializados
            </h4>
            <ul className="space-y-1.5 text-[12px]">
              <li>
                <Link href="/inspeccion" className="hover:text-blue-600 transition flex items-center gap-1">
                  <span>Pre-Purchase Inspection (PPI) in situ</span>
                </Link>
              </li>
              <li>
                <Link href="/brokerage" className="hover:text-blue-600 transition flex items-center gap-1">
                  <span>Brokerage & Adquisición Aeronáutica</span>
                </Link>
              </li>
              <li>
                <Link href="/calculadora" className="hover:text-blue-600 transition flex items-center gap-1">
                  <span>Calculadora de Costos Operativos</span>
                </Link>
              </li>
              <li>
                <Link href="/off-market" className="hover:text-blue-600 transition flex items-center gap-1">
                  <span>Mandatos de Búsqueda Off-Market</span>
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-blue-600 transition flex items-center gap-1">
                  <span>Portal Privado de Administración</span>
                </Link>
              </li>
              <li>
                <Link href="/cms" className="hover:text-blue-600 transition flex items-center gap-1">
                  <span>Panel Administrativo (CMS Abogado)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Communication & Cal.com */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase">
              Atención Directa & Citas
            </h4>
            <p className="text-slate-500 text-[12px]">
              Canal prioritario sin intermediarios para propietarios, compradores y despachos corporativos.
            </p>
            <div className="space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-semibold text-[12px]"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>+58 412 000 0000 (WhatsApp)</span>
              </a>
              <div className="flex items-center gap-2 text-slate-600 text-[12px]">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>nelson.sanchez@abogadoaeronautico.com</span>
              </div>
            </div>
            <div className="pt-2">
              <a
                href="https://cal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-[11px] font-semibold border border-blue-200 transition"
              >
                <span>Agendar Reunión (Cal.com)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Cap. Abg. Nelson Sánchez • Despacho Legal Aeronáutico & Mercantil. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Regulado bajo Normativa Técnica INAC & FAA</span>
            <span>•</span>
            <span>Aeronavegabilidad & Peritaje</span>
            <span>•</span>
            <span>Confidencialidad Rigurosa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
