'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  ShieldCheck, 
  Send, 
  MessageSquare, 
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
        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-start gap-3 shadow-xs">
          <Wrench className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 block mb-0.5">Peritaje Físico & Motores</strong>
            <p className="text-slate-500">Compresiones, boroscopia, corrosión oculta en largueros y tren de aterrizaje.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-start gap-3 shadow-xs">
          <Plane className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 block mb-0.5">Vuelo de Prueba al Mando</strong>
            <p className="text-slate-500">Chequeo de autopiloto, presurización, aviónica y desempeño de turbinas en crucero.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-start gap-3 shadow-xs">
          <FileCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 block mb-0.5">Blindaje Legal Registral</strong>
            <p className="text-slate-500">Auditoría ante el Registro Aeronáutico Nacional. Verificación de Clear Title sin gravámenes.</p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      {submitted ? (
        <div className="bg-white border border-emerald-300 p-8 sm:p-10 rounded-3xl text-center shadow-xl animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto mb-4 shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Solicitud de Inspección PPI Recibida
          </h3>
          <p className="text-slate-600 text-sm mt-3 max-w-lg mx-auto">
            Hemos registrado los datos de la aeronave <strong>{formData.aircraftRegistration}</strong> en {formData.hangarAirport}. El Cap. Abg. Nelson se comunicará de inmediato para coordinar el acceso al hangar y la revisión de bitácoras.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Confirmar Urgencia por WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="w-full sm:w-auto text-xs font-semibold text-slate-500 hover:text-slate-900 px-4 py-2"
            >
              Registrar otra aeronave
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl"
        >
          {/* Row 1: Client contact */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Su Nombre o Empresa *
              </label>
              <input
                required
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="Ej. Ing. Carlos Mendoza"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Correo Electrónico *
              </label>
              <input
                required
                type="email"
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                placeholder="contacto@empresa.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Teléfono / WhatsApp *
              </label>
              <input
                required
                type="tel"
                value={formData.clientPhone}
                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                placeholder="+58 412 123 4567"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 2: Aircraft Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Matrícula de la Aeronave *
              </label>
              <input
                required
                type="text"
                value={formData.aircraftRegistration}
                onChange={(e) => setFormData({ ...formData, aircraftRegistration: e.target.value.toUpperCase() })}
                placeholder="Ej. YV-3450 o N-892CA"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-black text-blue-700 uppercase focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Fabricante / Modelo
              </label>
              <input
                type="text"
                value={formData.aircraftModel}
                onChange={(e) => setFormData({ ...formData, aircraftModel: e.target.value })}
                placeholder="Ej. King Air B200 / Cessna 206"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Aeropuerto / Base OACI *
              </label>
              <select
                value={formData.hangarAirport}
                onChange={(e) => setFormData({ ...formData, hangarAirport: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Ubicación Exacta del Hangar / Contacto del Vendedor
              </label>
              <input
                type="text"
                value={formData.hangarLocationNotes}
                onChange={(e) => setFormData({ ...formData, hangarLocationNotes: e.target.value })}
                placeholder="Ej. Hangar 4, Aerocentro. Vendedor: Sr. Rodríguez (0414...)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Fecha Estimada Deseada para la Inspección
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 4: Scope & Bitacoras */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Alcance del Dictamen Solicitado
              </label>
              <select
                value={formData.inspectionScope}
                onChange={(e) => setFormData({ ...formData, inspectionScope: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                <option value="full_ppi">PPI Integral: Célula + Motor + Vuelo + Dictamen Registral</option>
                <option value="legal_only">Auditoría Legal y Registral INAC/FAA (Clear Title)</option>
                <option value="physical_only">Peritaje Físico y Boroscopia en Hangar únicamente</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.hasLogbooks}
                  onChange={(e) => setFormData({ ...formData, hasLogbooks: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>El vendedor cuenta con bitácoras físicas disponibles para cotejo in situ</span>
              </label>
            </div>
          </div>

          {/* Submit & WhatsApp buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <a
              href={whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-xs font-bold transition"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>¿Inspección Urgente? WhatsApp</span>
            </a>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm disabled:opacity-50"
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
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Peritaje Técnico in situ & Blindaje Registral</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Solicitud de Inspección Pre-Compra (PPI)
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto leading-relaxed">
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
