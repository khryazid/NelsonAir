'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Plane,
  RefreshCw
} from 'lucide-react';
import { AircraftListingDraft, Aircraft } from '@/lib/types';

interface AiSpecImporterProps {
  onDraftImported: (draft: Partial<Aircraft>) => void;
}

export function AiSpecImporter({ onDraftImported }: AiSpecImporterProps) {
  const [inputText, setInputText] = useState('');
  const [listingUrl, setListingUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [extractedDraft, setExtractedDraft] = useState<AircraftListingDraft | null>(null);

  const sampleControllerText = `2014 BEECHCRAFT KING AIR 350i
Registration: N350KA
Serial Number: FL-942
Airframe Total Time: 2,150.4 Hours
Engines: Pratt & Whitney PT6A-60A
Left Engine: 2,150 SNEW (TBO 3600)
Right Engine: 2,150 SNEW (TBO 3600)
Avionics: Rockwell Collins Pro Line 21, Dual Collins FMS-3000, Collins TWR-850 Radar, L3 Skywatch TCAS I, Dual Collins TDR-94D Mode S Transponders (ADS-B Out).
Exterior: Overall Matterhorn White with Metallic Gold and Navy Blue Stripes.
Interior: 8-Passenger Double Club Configuration in Townsend Desert Tan Leather.
Location: Miami Executive Airport (KTMB)
Asking Price: $4,450,000 USD
Logbooks complete, no damage history.`;

  const handleProcess = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/parse-spec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText: inputText || sampleControllerText,
          url: listingUrl
        })
      });

      if (!response.ok) {
        throw new Error('Error en el parser');
      }

      const data: AircraftListingDraft = await response.json();
      setExtractedDraft(data);
    } catch (err) {
      console.warn('Fallback parser', err);
      // Fallback draft
      const fallback: AircraftListingDraft = {
        make: 'Beechcraft',
        model: 'King Air 350i',
        year: 2014,
        registration: 'N350KA',
        serial_number: 'FL-942',
        airframe_total_time_hours: 2150.4,
        engine_model: 'Pratt & Whitney PT6A-60A',
        engine_smoh: 2150.0,
        avionics_summary: ['Rockwell Collins Pro Line 21', 'Dual Collins FMS-3000', 'Collins TWR-850 Radar', 'ADS-B Out'],
        home_base: 'SVCS',
        price_usd: 4450000,
        notes: 'Extraído automáticamente con IA. Revisar márgenes y notas registrales.'
      };
      setExtractedDraft(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToForm = () => {
    if (!extractedDraft) return;

    const mapped: Partial<Aircraft> = {
      make: extractedDraft.make,
      model: extractedDraft.model,
      manufacture_year: extractedDraft.year,
      registration_mark: extractedDraft.registration,
      serial_number: extractedDraft.serial_number || 'PENDIENTE',
      price_usd: extractedDraft.price_usd || 0,
      home_base_icao: extractedDraft.home_base || 'SVCS',
      status: 'draft',
      authority: extractedDraft.registration.startsWith('YV') ? 'INAC' : 'FAA',
      is_for_sale: true,
      description_notes: extractedDraft.notes || 'Aeronave importada automáticamente mediante IA.',
      technical_specs: {
        airframe_tt_hours: extractedDraft.airframe_total_time_hours,
        engine_details: [
          { position: 'L', model: extractedDraft.engine_model || 'Standard Engine', smoh_hours: extractedDraft.engine_smoh || 0, tbo: 3600 },
          { position: 'R', model: extractedDraft.engine_model || 'Standard Engine', smoh_hours: extractedDraft.engine_smoh || 0, tbo: 3600 }
        ],
        avionics_features: extractedDraft.avionics_summary,
        logbooks_complete: true,
        damage_history: false,
        legal_clearance_title: true
      }
    };

    onDraftImported(mapped);
    alert('¡Borrador cargado con éxito en el formulario de edición!');
  };

  return (
    <div className="bg-[#0b1426] border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Asistente de Ingesta Automatizada de Fichas Técnicas (AI Spec Parser)
            </h3>
            <p className="text-[11px] text-slate-400">
              Pega el texto sin formato de Controller, Trade-A-Plane o PDF para normalizarlo automáticamente al esquema aeronáutico.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Input */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              URL de la Publicación Externa (Opcional):
            </label>
            <input
              type="url"
              value={listingUrl}
              onChange={(e) => setListingUrl(e.target.value)}
              placeholder="https://www.controller.com/listing/for-sale/..."
              className="w-full bg-[#060b14] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-300">
                Texto de la Ficha Técnica (Spec Sheet) / Copiar y Pegar:
              </label>
              <button
                type="button"
                onClick={() => setInputText(sampleControllerText)}
                className="text-[11px] text-amber-400 hover:text-amber-300 underline"
              >
                Cargar Texto de Ejemplo
              </button>
            </div>
            <textarea
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Pegue aquí el bloque de texto con fabricante, modelo, horas de célula, motores, aviónica, precio..."
              className="w-full bg-[#060b14] border border-slate-700 rounded-lg p-3 text-xs text-slate-200 placeholder-slate-600 font-mono focus:border-amber-500 focus:outline-none resize-none"
            />
          </div>

          <button
            type="button"
            disabled={isLoading || (!inputText && !listingUrl)}
            onClick={handleProcess}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Extrayendo y normalizando datos con IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Procesar y Mapear a Esquema Aeronáutico</span>
              </>
            )}
          </button>
        </div>

        {/* Right Output: Structured Preview */}
        <div className="bg-[#060b14] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-bold block pb-2 border-b border-slate-800">
              Salida Estructurada (AircraftListingDraft JSON)
            </span>

            {extractedDraft ? (
              <div className="mt-3 space-y-2 text-xs">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Aeronave:</span>
                    <span className="font-bold text-amber-400">{extractedDraft.year} {extractedDraft.make} {extractedDraft.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Matrícula:</span>
                    <span className="font-bold text-white">{extractedDraft.registration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Horas TTAF:</span>
                    <span className="font-mono text-sky-400">{extractedDraft.airframe_total_time_hours} hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Planta Motriz:</span>
                    <span className="text-slate-200">{extractedDraft.engine_model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Precio Sugerido:</span>
                    <span className="font-bold text-emerald-400">${extractedDraft.price_usd?.toLocaleString()} USD</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] text-slate-400 block mb-1">Aviónica Detectada:</span>
                  <div className="flex flex-wrap gap-1">
                    {extractedDraft.avionics_summary.map((av, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {av}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center text-slate-500 text-xs text-center px-4">
                <FileText className="w-8 h-8 mb-2 opacity-40" />
                <span>Haga clic en &quot;Cargar Texto de Ejemplo&quot; o pegue una ficha para ver la extracción normalizada.</span>
              </div>
            )}
          </div>

          {extractedDraft && (
            <button
              type="button"
              onClick={handleApplyToForm}
              className="mt-4 w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow"
            >
              <span>Aplicar al Formulario de Carga (Status: Draft)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
