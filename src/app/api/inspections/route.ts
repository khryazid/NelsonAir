import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const inspectionSchema = z.object({
  client_name: z.string().min(2),
  client_email: z.string().email(),
  client_phone: z.string().min(6),
  aircraft_registration: z.string().min(3),
  aircraft_model: z.string().optional(),
  hangar_airport_icao: z.string().min(3),
  hangar_location_notes: z.string().optional(),
  has_logbooks_available: z.boolean().default(true),
  seller_contact_info: z.string().optional(),
  preferred_inspection_date: z.string().optional(),
  inspection_scope: z.enum(['full_ppi', 'legal_only', 'physical_only']).default('full_ppi')
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = inspectionSchema.parse(body);

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('inspection_requests')
        .insert([
          {
            ...validatedData,
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase inspection insert error:', error);
      } else {
        return NextResponse.json({ success: true, inspection: data });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Solicitud de peritaje PPI registrada exitosamente',
      inspection: {
        id: 'insp-local-' + Date.now(),
        ...validatedData,
        status: 'pending',
        created_at: new Date().toISOString()
      }
    });
  } catch (err: any) {
    console.error('Inspection request validation error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Error en los datos de inspección' },
      { status: 400 }
    );
  }
}
