'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send, ShieldCheck } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/utils';

interface WhatsAppFloatingProps {
  defaultMessage?: string;
  phoneNumber?: string;
}

export function WhatsAppFloating({
  defaultMessage = 'Hola, me gustaría conversar directamente sobre asesoría legal aeronáutica o búsqueda de una aeronave.',
  phoneNumber = '584120000000'
}: WhatsAppFloatingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState(defaultMessage);

  const handleSend = () => {
    const link = buildWhatsAppLink(customMsg, phoneNumber);
    window.open(link, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
      {/* Popover dialog */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-[#0c1527] border border-emerald-500/40 rounded-2xl shadow-2xl p-4 text-white animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-600/30 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-wide text-white">
                  Cap. Abg. Nelson R.
                </h4>
                <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  En línea para consultas urgentes
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3">
            <p className="text-xs text-slate-300 mb-2">
              Mensaje directo al teléfono del piloto-abogado (sin secretarias ni filtros):
            </p>
            <textarea
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              rows={3}
              className="w-full bg-[#070d18] border border-slate-700/80 rounded-lg p-2.5 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none resize-none"
              placeholder="Escriba su consulta..."
            />
          </div>

          <button
            onClick={handleSend}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Iniciar Chat en WhatsApp</span>
          </button>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-emerald-600/30 transition-all duration-300 transform hover:scale-105"
        aria-label="Contactar por WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageSquare className="w-5 h-5 text-white" />
        <span className="text-xs font-bold hidden sm:inline-block tracking-wide">
          WhatsApp Directo
        </span>
      </button>
    </div>
  );
}
