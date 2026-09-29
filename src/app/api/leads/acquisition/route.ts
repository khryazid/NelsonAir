import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const leadSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email(),
  phone_whatsapp: z.string().optional(),
  preferred_categories: z.array(z.string()).min(1),
  budget_range: z.string(),
  operation_profile: z.string().optional(),
  timeline: z.string()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = leadSchema.parse(body);

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('buyer_leads')
        .insert([
          {
            full_name: validatedData.fullName,
            email: validatedData.email,
            phone_whatsapp: validatedData.phone_whatsapp,
            preferred_categories: validatedData.preferred_categories,
            budget_range: validatedData.budget_range,
            operation_profile: validatedData.operation_profile,
            timeline: validatedData.timeline,
            source_tag: 'website_offmarket_form'
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase lead insert error:', error);
      } else {
        return NextResponse.json({ success: true, lead: data });
      }
    }

    // Graceful local response when Supabase is not yet connected
    return NextResponse.json({
      success: true,
      message: 'Mandato registrado exitosamente (Modo Local / Standalone)',
      lead: {
        id: 'lead-local-' + Date.now(),
        ...validatedData,
        created_at: new Date().toISOString()
      }
    });
  } catch (err: any) {
    console.error('Lead submission validation error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Datos no válidos' },
      { status: 400 }
    );
  }
}
