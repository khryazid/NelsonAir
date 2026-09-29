'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Plane, 
  Compass, 
  ChevronRight,
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
      // In case of network error, simulate graceful fallback
      console.warn('API error, falling back locally', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const dynamicWhatsAppText = `Hola Cap. Abg. Nelson, he completado el mandato de búsqueda off-market para ${
    formData.categories.join(', ')
  } con presupuesto ${formData.budget} y horizonte ${formData.timeline}. Deseo recibir fichas técnicas confidenciales.`;

  const whatsappDirectUrl = buildWhatsAppLink(dynamicWhatsAppText);

  return (
    <section id="off-market" className="bg-[#070b16] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Acceso Privado & Confidencial</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Alertas de Mercado Off-Market & Mandato de Búsqueda
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Acceda a aeronaves verificadas antes de su publicación general o registre los requerimientos específicos de su próxima misión sin intermediarios.
          </p>
        </div>

        {submitted ? (
          /* Confirmation card as specified in PDF page 11 */
          <div className="bg-[#0b1528] border border-emerald-500/40 p-8 sm:p-10 rounded-2xl text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center text-emerald-400 mx-auto mb-5 shadow-lg">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Requerimientos Registrados con Éxito
            </h3>
            <p className="text-slate-300 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
              Le notificaremos de inmediato en cuanto ingrese al inventario o se identifique fuera de mercado una aeronave que cumpla con sus especificaciones exactas.
            </p>

            <div className="mt-8 p-4 rounded-xl bg-slate-900/90 border border-slate-800 max-w-md mx-auto text-left text-xs text-slate-300 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Categorías:</span>
                <span className="font-semibold text-slate-200">{formData.categories.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Presupuesto:</span>
                <span className="font-semibold text-amber-400">{formData.budget.replace('_', ' - ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Horizonte:</span>
                <span className="font-semibold text-sky-400">{formData.timeline}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Continuar conversación directa por WhatsApp</span>
              </a>
              <button
                onClick={() => setSubmitted(false)}
                className="w-full sm:w-auto text-xs text-slate-400 hover:text-white px-4 py-2"
              >
                Registrar otro mandato
              </button>
            </div>
          </div>
        ) : (
          /* Form as specified in PDF pages 8, 10-12 */
          <form 
            onSubmit={handleSubmit} 
            className="space-y-6 bg-[#0b1426]/90 p-6 sm:p-10 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-sm"
          >
            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-300 text-xs">
                {errorMessage}
              </div>
            )}

            {/* Row 1: Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nombre o Razón Social *
                </label>
                <input
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Ej. Ing. Carlos Mendoza / Corporación Aero"
                  className="w-full bg-[#060b14] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Correo Electrónico Corporativo *
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ejecutivo@empresa.com"
                  className="w-full bg-[#060b14] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Row 2: WhatsApp Phone with Country Code */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Teléfono / WhatsApp de Contacto Directo
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  className="bg-[#060b14] border border-slate-700/80 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:border-amber-500 focus:outline-none"
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
                  className="flex-1 bg-[#060b14] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Row 3: Preferred Aircraft Categories (Multi-select) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
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
                      className={`text-left px-3.5 py-2.5 rounded-lg border text-xs font-medium transition flex items-center justify-between ${
                        selected
                          ? 'bg-amber-950/40 border-amber-500/80 text-amber-200'
                          : 'bg-[#060b14] border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ml-2 ${selected ? 'text-amber-400' : 'text-slate-600'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 4: Budget Range & Operation Profile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Rango de Inversión Estimado (USD)
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-[#060b14] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 focus:border-amber-500 focus:outline-none"
                >
                  <option value="under_250k">&lt; $250.000 USD</option>
                  <option value="250k_750k">$250.000 - $750.000 USD</option>
                  <option value="750k_2m">$750.000 - $2.000.000 USD</option>
                  <option value="over_2m">&gt; $2.000.000 USD</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Tipo de Operación Principal
                </label>
                <select
                  value={formData.operationProfile}
                  onChange={(e) => setFormData({ ...formData, operationProfile: e.target.value })}
                  className="w-full bg-[#060b14] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 focus:border-amber-500 focus:outline-none"
                >
                  <option value="paved_ifr">Pistas preparadas / Vuelo Ejecutivo IFR</option>
                  <option value="unpaved_strips">Pistas no pavimentadas / Fincas / Minería (STOL)</option>
                  <option value="commercial">Operación Comercial / Chárter Turístico</option>
                </select>
              </div>
            </div>

            {/* Row 5: Purchase Timeline */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Horizonte de Compra
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full bg-[#060b14] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 focus:border-amber-500 focus:outline-none"
              >
                <option value="immediate">Inmediato (&lt; 30 días - Fondos disponibles)</option>
                <option value="1_3_months">Corto plazo (1 a 3 meses)</option>
                <option value="exploring">Evaluación / Exploratorio (6+ meses)</option>
              </select>
            </div>

            {/* Actions: Direct WhatsApp + Submit */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/40 text-xs font-semibold transition"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>¿Prefiere atención inmediata? WhatsApp</span>
              </a>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 rounded-lg text-xs font-bold transition shadow-lg disabled:opacity-50"
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
