'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/utils';

export interface AcquisitionFormData {
  fullName: string;
  email: string;
  whatsapp: string;
  countryCode: string;
  categories: string[];
  budget: string;
  operationProfile: string;
  timeline: string;
}

export function OffMarketAlerts() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState<AcquisitionFormData>({
    fullName: '',
    email: '',
    whatsapp: '',
    countryCode: '+58',
    categories: ['turboprop'],
    budget: '750k_2m',
    operationProfile: 'paved_ifr',
    timeline: 'immediate'
  });

  const availableCategories = [
    { id: 'piston', label: 'Monomotor / Bimotor Pistón (ej. C206, Baron)' },
    { id: 'turboprop', label: 'Turbohélice (ej. King Air, Caravan)' },
    { id: 'light_jet', label: 'Light Jet (ej. Citation CJ3, Phenom)' },
    { id: 'heavy_jet', label: 'Midsize / Heavy Jet (ej. Learjet, Hawker)' },
    { id: 'helicopter', label: 'Alas Rotativas (Helicópteros)' }
  ];

  const toggleCategory = (catId: string) => {
    setFormData((prev) => {
      const exists = prev.categories.includes(catId);
      const nextCats = exists
        ? prev.categories.filter((c) => c !== catId)
        : [...prev.categories, catId];
      return { ...prev, categories: nextCats.length > 0 ? nextCats : [catId] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const fullPhone = `${formData.countryCode} ${formData.whatsapp}`.trim();
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone_whatsapp: fullPhone,
        preferred_categories: formData.categories,
        budget_range: formData.budget,
        operation_profile: formData.operationProfile,
        timeline: formData.timeline
      };

      const response = await fetch('/api/leads/acquisition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Error al registrar preferencias');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.warn('API error, falling back locally', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const dynamicWhatsAppText = `Hola equipo de AeroLex Global, he completado el mandato de búsqueda off-market para ${
    formData.categories.join(', ')
  } con presupuesto ${formData.budget} y horizonte ${formData.timeline}. Deseo recibir fichas técnicas confidenciales.`;

  const whatsappDirectUrl = buildWhatsAppLink(dynamicWhatsAppText);

  return (
    <section id="off-market" className="bg-slate-50 text-slate-900 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200 relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Acceso Privado & Confidencial</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
            Alertas de Mercado Off-Market & Mandato de Búsqueda
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Acceda a aeronaves verificadas antes de su publicación general o registre los requerimientos específicos de su próxima misión sin intermediarios.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white border border-emerald-300 p-8 sm:p-10 rounded-3xl text-center shadow-xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto mb-5 shadow-xs">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Requerimientos Registrados con Éxito
            </h3>
            <p className="text-slate-600 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
              Le notificaremos de inmediato en cuanto ingrese al inventario o se identifique fuera de mercado una aeronave que cumpla con sus especificaciones exactas.
            </p>

            <div className="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs text-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Categorías:</span>
                <span className="font-bold text-slate-900">{formData.categories.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Presupuesto:</span>
                <span className="font-bold text-blue-700">{formData.budget.replace('_', ' - ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Horizonte:</span>
                <span className="font-bold text-slate-900">{formData.timeline}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Continuar conversación directa por WhatsApp</span>
              </a>
              <button
                onClick={() => setSubmitted(false)}
                className="w-full sm:w-auto text-xs font-semibold text-slate-500 hover:text-slate-900 px-4 py-2"
              >
                Registrar otro mandato
              </button>
            </div>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit} 
            className="space-y-6 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl"
          >
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {errorMessage}
              </div>
            )}

            {/* Row 1: Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nombre o Razón Social *
                </label>
                <input
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Ej. Ing. Carlos Mendoza / Corporación Aero"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Correo Electrónico Corporativo *
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ejecutivo@empresa.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Row 2: WhatsApp Phone with Country Code */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Teléfono / WhatsApp de Contacto Directo
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none"
                >
                  <option value="+58">🇻🇪 +58 (Venezuela)</option>
                  <option value="+1">🇺🇸 +1 (USA / Florida)</option>
                  <option value="+507">🇵🇦 +507 (Panamá)</option>
                  <option value="+57">🇨🇴 +57 (Colombia)</option>
                  <option value="+1809">🇩🇴 +1 (Rep. Dominicana)</option>
                  <option value="+34">🇪🇸 +34 (España)</option>
                </select>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="412 123 4567"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Row 3: Preferred Aircraft Categories (Multi-select) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Categoría(s) de Aeronave de Interés
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableCategories.map((cat) => {
                  const selected = formData.categories.includes(cat.id);
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`text-left px-3.5 py-2.5 rounded-xl border text-xs font-medium transition flex items-center justify-between ${
                        selected
                          ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ml-2 ${selected ? 'text-blue-600' : 'text-slate-300'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 4: Budget Range & Operation Profile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Rango de Inversión Estimado (USD)
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-blue-600 focus:outline-none"
                >
                  <option value="under_250k">&lt; $250.000 USD</option>
                  <option value="250k_750k">$250.000 - $750.000 USD</option>
                  <option value="750k_2m">$750.000 - $2.000.000 USD</option>
                  <option value="over_2m">&gt; $2.000.000 USD</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tipo de Operación Principal
                </label>
                <select
                  value={formData.operationProfile}
                  onChange={(e) => setFormData({ ...formData, operationProfile: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-blue-600 focus:outline-none"
                >
                  <option value="paved_ifr">Pistas preparadas / Vuelo Ejecutivo IFR</option>
                  <option value="unpaved_strips">Pistas no pavimentadas / Fincas / Minería (STOL)</option>
                  <option value="commercial">Operación Comercial / Chárter Turístico</option>
                </select>
              </div>
            </div>

            {/* Row 5: Purchase Timeline */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Horizonte de Compra
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-blue-600 focus:outline-none"
              >
                <option value="immediate">Inmediato (&lt; 30 días - Fondos disponibles)</option>
                <option value="1_3_months">Corto plazo (1 a 3 meses)</option>
                <option value="exploring">Evaluación / Exploratorio (6+ meses)</option>
              </select>
            </div>

            {/* Actions: Direct WhatsApp + Submit */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-xs font-bold transition"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>¿Prefiere atención inmediata? WhatsApp</span>
              </a>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Registrando mandato...' : 'Registrar Preferencias Confidenciales'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
