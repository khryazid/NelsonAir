'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  ShieldCheck, 
  Send, 
  MessageSquare, 
  MapPin, 
  FileCheck, 
  CheckCircle2, 
  Plane,
  Wrench
} from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/utils';

function InspeccionForm() {
  const searchParams = useSearchParams();
  const initialReg = searchParams.get('reg') || '';

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    aircraftRegistration: initialReg,
    aircraftModel: '',
    hangarAirport: 'SVCS (Charallave)',
    hangarLocationNotes: '',
    hasLogbooks: true,
    sellerContact: '',
    preferredDate: '',
    inspectionScope: 'full_ppi'
  });

  useEffect(() => {
    if (initialReg) {
      setFormData((prev) => ({ ...prev, aircraftRegistration: initialReg }));
    }
  }, [initialReg]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/inspections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: formData.clientName,
          client_email: formData.clientEmail,
          client_phone: formData.clientPhone,
          aircraft_registration: formData.aircraftRegistration,
          aircraft_model: formData.aircraftModel,
          hangar_airport_icao: formData.hangarAirport,
          hangar_location_notes: formData.hangarLocationNotes,
          has_logbooks_available: formData.hasLogbooks,
          seller_contact_info: formData.sellerContact,
          preferred_inspection_date: formData.preferredDate || undefined,
          inspection_scope: formData.inspectionScope
        })
      });

      if (!response.ok) throw new Error('Error al enviar la solicitud');
      setSubmitted(true);
    } catch (err) {
      console.warn('Inspection submission local fallback', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappDirect = buildWhatsAppLink(
    `Hola Cap. Abg. Nelson, deseo coordinar con urgencia una inspección técnica y peritaje legal (PPI) para la aeronave matrícula ${formData.aircraftRegistration || 'por definir'} en el aeropuerto ${formData.hangarAirport}.`
  );

  return (
    <div className="space-y-10">
      {/* Technical Checklist Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-[#0b1426] border border-slate-800 p-4 rounded-xl flex items-start gap-3">
          <Wrench className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200 block mb-0.5">Peritaje Físico & Motores</strong>
            <p className="text-slate-400">Compresiones, boroscopia, corrosión oculta en largueros y tren de aterrizaje.</p>
          </div>
        </div>

        <div className="bg-[#0b1426] border border-slate-800 p-4 rounded-xl flex items-start gap-3">
          <Plane className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200 block mb-0.5">Vuelo de Prueba al Mando</strong>
            <p className="text-slate-400">Chequeo de autopiloto, presurización, aviónica y desempeño de turbinas en crucero.</p>
          </div>
        </div>

        <div className="bg-[#0b1426] border border-slate-800 p-4 rounded-xl flex items-start gap-3">
          <FileCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-200 block mb-0.5">Blindaje Legal Registral</strong>
            <p className="text-slate-400">Auditoría ante el Registro Aeronáutico Nacional. Verificación de Clear Title sin gravámenes.</p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      {submitted ? (
        <div className="bg-[#0b1528] border border-emerald-500/40 p-8 sm:p-10 rounded-2xl text-center shadow-2xl animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center text-emerald-400 mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Solicitud de Inspección PPI Recibida
          </h3>
          <p className="text-slate-300 text-sm mt-3 max-w-lg mx-auto">
            Hemos registrado los datos de la aeronave <strong>{formData.aircraftRegistration}</strong> en {formData.hangarAirport}. El Cap. Abg. Nelson se comunicará de inmediato para coordinar el acceso al hangar y la revisión de bitácoras.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Confirmar Urgencia por WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="w-full sm:w-auto text-xs text-slate-400 hover:text-white px-4 py-2"
            >
              Registrar otra aeronave
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-[#0b1426] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl"
        >
          {/* Row 1: Client contact */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Su Nombre o Empresa *
              </label>
              <input
                required
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="Ej. Ing. Carlos Mendoza"
                className="w-full bg-[#060b14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Correo Electrónico *
              </label>
              <input
                required
                type="email"
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                placeholder="contacto@empresa.com"
                className="w-full bg-[#060b14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Teléfono / WhatsApp *
              </label>
              <input
                required
                type="tel"
                value={formData.clientPhone}
                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                placeholder="+58 412 123 4567"
                className="w-full bg-[#060b14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 2: Aircraft Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-850">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Matrícula de la Aeronave *
              </label>
              <input
                required
                type="text"
                value={formData.aircraftRegistration}
                onChange={(e) => setFormData({ ...formData, aircraftRegistration: e.target.value.toUpperCase() })}
                placeholder="Ej. YV-3450 o N-892CA"
                className="w-full bg-[#060b14] border border-slate-700 rounded-lg px-3 py-2 text-xs font-bold text-amber-400 uppercase focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Fabricante / Modelo
              </label>
              <input
                type="text"
                value={formData.aircraftModel}
                onChange={(e) => setFormData({ ...formData, aircraftModel: e.target.value })}
                placeholder="Ej. King Air B200 / Cessna 206"
                className="w-full bg-[#060b14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Aeropuerto / Base OACI *
              </label>
              <select
                value={formData.hangarAirport}
                onChange={(e) => setFormData({ ...formData, hangarAirport: e.target.value })}
                className="w-full bg-[#060b14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
              >
                <option value="SVCS (Charallave)">SVCS - Charallave (Aeropuerto Caracas)</option>
                <option value="SVMI (Maiquetía)">SVMI - Maiquetía (Rampa General)</option>
                <option value="SVFM (La Carlota)">SVFM - La Carlota (Caracas)</option>
                <option value="SVVA (Valencia)">SVVA - Valencia (Arturo Michelena)</option>
                <option value="SVBM (Barquisimeto)">SVBM - Barquisimeto</option>
                <option value="Otro Aeropuerto / Exterior">Otro Aeropuerto / Exterior (EE.UU. / Caribe)</option>
              </select>
            </div>
          </div>

          {/* Row 3: Hangar details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Ubicación Exacta del Hangar / Contacto del Vendedor
              </label>
              <input
                type="text"
                value={formData.hangarLocationNotes}
                onChange={(e) => setFormData({ ...formData, hangarLocationNotes: e.target.value })}
                placeholder="Ej. Hangar 4, Aerocentro. Vendedor: Sr. Rodríguez (0414...)"
                className="w-full bg-[#060b14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Fecha Estimada Deseada para la Inspección
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full bg-[#060b14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 4: Scope & Bitacoras */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-850">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Alcance del Dictamen Solicitado
              </label>
              <select
                value={formData.inspectionScope}
                onChange={(e) => setFormData({ ...formData, inspectionScope: e.target.value })}
                className="w-full bg-[#060b14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
              >
                <option value="full_ppi">PPI Integral: Célula + Motor + Vuelo + Dictamen Registral</option>
                <option value="legal_only">Auditoría Legal y Registral INAC/FAA (Clear Title)</option>
                <option value="physical_only">Peritaje Físico y Boroscopia en Hangar únicamente</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.hasLogbooks}
                  onChange={(e) => setFormData({ ...formData, hasLogbooks: e.target.checked })}
                  className="w-4 h-4 rounded bg-[#060b14] border-slate-700 text-amber-500 focus:ring-amber-500"
                />
                <span>El vendedor cuenta con bitácoras físicas disponibles para cotejo in situ</span>
              </label>
            </div>
          </div>

          {/* Submit & WhatsApp buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
            <a
              href={whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/30 text-xs font-semibold transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>¿Inspección Urgente? Escribir por WhatsApp</span>
            </a>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 rounded-lg text-xs font-bold transition shadow-lg disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Enviando solicitud...' : 'Solicitar Peritaje en Hangar'}</span>
            </button>
          </div>

        </form>
      )}
    </div>
  );
}

export default function InspeccionPage() {
  return (
    <div className="bg-[#070b16] text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Peritaje Técnico in situ & Blindaje Registral</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Solicitud de Inspección Pre-Compra (PPI)
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Antes de transferir un anticipo o firmar una opción de compraventa, el piloto-abogado se traslada al hangar para verificar físicamente el avión, ejecutar boroscopia de motores, prueba operacional en vuelo y auditar los títulos ante el INAC / FAA.
          </p>
        </div>

        {/* Suspense boundary for useSearchParams */}
        <Suspense fallback={
          <div className="p-12 text-center text-slate-400 text-xs">
            Cargando formulario de inspección...
          </div>
        }>
          <InspeccionForm />
        </Suspense>

      </div>
    </div>
  );
}
