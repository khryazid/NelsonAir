# 📋 Guía de Tareas Pendientes para el Usuario (`taskUser.md`)

Este documento detalla todas las acciones, configuraciones y pasos que debes realizar para poner en marcha la **Plataforma Integral del Despacho Aeronáutico & Brokerage (Cap. Abg. Nelson R.)**.

---

## 🚀 Resumen del Proyecto Construido

El proyecto ha sido completamente desarrollado bajo la arquitectura híbrida especificada en el plan técnico:

1. **Capa Pública de Autoridad**:
   - **Página de Inicio (`/`)**: Posicionamiento ejecutivo *Pilot-Lawyer* ("Inspección técnica al mando de un piloto + blindaje legal mercantil y aeronáutico"). Presencia en terminales de Caracas (Charallave SVCS, Maiquetía SVMI, La Carlota SVFM) y multijurisdicción (YV / FAA N-Number).
   - **Catálogo de Brokerage (`/brokerage`)**: Inventario de aeronaves con filtros en tiempo real (Pistón, Turbohélice, Jet, INAC vs FAA), fichas técnicas detalladas (TTAF, SMOH, aviónica, historial de daños, título libre de gravamen).
   - **Calculadora Interactiva de Costos (`/calculadora`)**: Estimación de presupuesto mensual y anual por categoría de aeronave (combustible, reserva de overhaul/TBO, hangaraje, seguros y tripulación).
   - **Inspección Pre-Compra PPI in situ (`/inspeccion`)**: Módulo de agendamiento con checklist técnico preliminar (célula, boroscopia, run-up, vuelo de prueba y auditoría registral).
   - **Oportunidades Off-Market & Mandatos (`/off-market`)**: Formulario de segmentación y calificación de compradores de alto patrimonio con doble canal (formulario + WhatsApp con mensaje contextualizado).

2. **Capa Privada (Portal del Propietario - `/portal`)**:
   - Selector de aeronave bajo administración.
   - Monitoreo en tiempo real de estatus legal y operativo.
   - Sistema de alertas regulatorias (Vencimiento de Certificado INAC, Pólizas de Casco y Responsabilidad Civil, Inspecciones de 100 horas / 24 meses).
   - Bóveda documental cifrada para descarga segura de títulos, pólizas y bitácoras escaneadas.
   - Historial de informes mensuales de gestión con desglose de costos operativos.

3. **CMS Administrativo del Abogado (`/cms`)**:
   - Gestor integral de inventario (Carga manual con validación estricta Zod en TypeScript).
   - **Asistente de Ingesta Automatizada con IA (`AiSpecImporter`)**: Normalización automática de fichas desestructuradas (Controller, Trade-A-Plane, Spec Sheets).
   - **Emisor de Dictámenes de Inspección PPI (`PpiReportGenerator`)**: Generador de informes periciales con membrete legal formal, listo para imprimir o exportar a PDF.
   - Gestor de mandatos y leads off-market con enlace directo a WhatsApp.
   - Gestor de solicitudes de inspección recibidas.

4. **Base de Datos & Backend**:
   - Archivo [`supabase/schema.sql`](file:///c:/Users/Khris/dev/Nelson/supabase/schema.sql) con el esquema relacional completo PostgreSQL, enums, índices GIN y políticas Row Level Security (RLS).
   - Endpoints API en `/api/leads/acquisition`, `/api/inspections`, `/api/ai/parse-spec` y `/api/aircraft`.
   - Soporte dual: Funciona 100% de inmediato con datos semilla y almacenamiento local, y se conecta automáticamente a Supabase en cuanto configures tus credenciales.

---

## 🛠️ Checklist de Tareas del Usuario

### 1. Configuración de Variables de Entorno (`.env.local`)
Crea un archivo llamado `.env.local` en la raíz del proyecto basándote en [`.env.example`](file:///c:/Users/Khris/dev/Nelson/.env.example):

- [ ] **WhatsApp Directo**:
  - Cambia `NEXT_PUBLIC_WHATSAPP_PHONE=584120000000` por el número telefónico real del abogado-piloto (código de país sin `+` ni guiones, ej. `584141234567`).
- [ ] **Supabase (Opcional para modo producción en la nube)**:
  - Ve a [Supabase.com](https://supabase.com) y crea un nuevo proyecto gratuito.
  - En *Project Settings -> API*, copia la URL y la Anon Key:
    - `NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key`
- [ ] **OpenAI API Key (Para el importador de fichas con IA)**:
  - Si deseas usar GPT-4o-mini para extraer fichas técnicas complejas pegadas de Controller o PDFs, añade `OPENAI_API_KEY=sk-proj-...`. *(Nota: la app ya incluye un extractor heurístico inteligente que funciona sin clave)*.
- [ ] **Resend & Cal.com**:
  - Si deseas agendamiento automático en Google Calendar, añade tu enlace de [Cal.com](https://cal.com) o Calendly en `NEXT_PUBLIC_CAL_LINK`.
  - Para envío de correos transaccionales automáticos, configura `RESEND_API_KEY`.

---

### 2. Despliegue de la Base de Datos en Supabase (5 minutos)
- [ ] Inicia sesión en el panel de tu proyecto en Supabase.
- [ ] Ve a la pestaña **SQL Editor** en el menú lateral izquierdo.
- [ ] Abre el archivo [`supabase/schema.sql`](file:///c:/Users/Khris/dev/Nelson/supabase/schema.sql) de este proyecto, copia todo su contenido y pégalo en el editor SQL.
- [ ] Haz clic en **Run**. Esto creará:
  - Los tipos enumerados: `user_role`, `aircraft_status`, `aviation_authority`.
  - Las tablas: `profiles`, `aircraft`, `aircraft_technical_specs`, `aircraft_documents`, `management_reports`, `compliance_alerts`, `buyer_leads`, `inspection_requests`.
  - Las políticas de seguridad Row Level Security (RLS) y los índices de rendimiento.
- [ ] En la sección **Storage** de Supabase, crea dos buckets:
  - `aircraft-public`: Acceso público (para fotos de las aeronaves).
  - `vault-private`: Acceso privado / autenticado (para PDFs de bitácoras y contratos confidenciales).

---

### 3. Personalización del Perfil y Datos Legales
- [ ] **Credenciales del Abogado**:
  - Revisa y ajusta el nombre, número de colegiatura y habilitación aeronáutica en [`src/components/PpiReportGenerator.tsx`](file:///c:/Users/Khris/dev/Nelson/src/components/PpiReportGenerator.tsx#L180-L200) y en el pie de página [`src/components/Footer.tsx`](file:///c:/Users/Khris/dev/Nelson/src/components/Footer.tsx).
- [ ] **Precios de Administración y Tarifas**:
  - Si deseas modificar los valores de cálculo por hora de combustible, tarifas de hangaraje o fee mensual, edita los presets en [`src/components/CostCalculator.tsx`](file:///c:/Users/Khris/dev/Nelson/src/components/CostCalculator.tsx#L33-L80).
- [ ] **Inventario Inicial**:
  - Puedes modificar o agregar aeronaves semilla en [`src/lib/data-store.ts`](file:///c:/Users/Khris/dev/Nelson/src/lib/data-store.ts), o darlas de alta directamente desde el panel administrativo en [`/cms`](http://localhost:3000/cms).

---

### 4. Ejecución y Pruebas Locales
Para iniciar el servidor de desarrollo y probar la plataforma en tu navegador:

```bash
npm run dev
```

Abre en tu navegador:
- [http://localhost:3000](http://localhost:3000) - Página Principal (Hero, Servicios, Autoridad)
- [http://localhost:3000/brokerage](http://localhost:3000/brokerage) - Catálogo con filtros y fichas técnicas
- [http://localhost:3000/calculadora](http://localhost:3000/calculadora) - Calculadora de Costos
- [http://localhost:3000/inspeccion](http://localhost:3000/inspeccion) - Solicitud de Inspección PPI in situ
- [http://localhost:3000/off-market](http://localhost:3000/off-market) - Mandatos Off-Market
- [http://localhost:3000/portal](http://localhost:3000/portal) - Portal Privado del Propietario (Bóveda y Alertas)
- [http://localhost:3000/cms](http://localhost:3000/cms) - Panel del Abogado (AI Parser, Reportes PPI, Leads)

---

### 5. Despliegue en Producción (Vercel + Cloudflare)
- [ ] **Vercel**:
  1. Sube este repositorio a GitHub (`git init`, `git add .`, `git commit -m "feat: plataforma aeronautica"`, `git push`).
  2. Entra en [Vercel](https://vercel.com) e importa el repositorio.
  3. En la sección *Environment Variables*, añade las mismas claves que configuraste en `.env.local`.
  4. Haz clic en **Deploy**. El despliegue tomará menos de 2 minutos.
- [ ] **Cloudflare (Recomendado para conexiones locales en Venezuela)**:
  1. Apunta los DNS de tu dominio (ej. `abogadoaeronautico.com`) a Cloudflare.
  2. Activa el proxy con SSL/TLS en modo *Full (Strict)* y la regla WAF para protección contra ataques DDoS y optimización de caché perimetral.

---

### 6. Estrategia Comercial de Captación Recomendada
1. **Códigos QR en Hangares**: Imprime tarjetas ejecutivas o folletos con código QR directo a `/inspeccion` y colócalos en las salas de pilotos y FBOs de Charallave (Aerocentro, Premier), Maiquetía y Valencia.
2. **Campañas Off-Market**: Cuando obtengas un mandato de búsqueda exclusivo, compártelo mediante el enlace `/off-market` con contactos clave y operadores para filtrar curiosos.
3. **Cierre de Venta con PPI**: Utiliza el generador de reportes en `/cms` tras cada revisión en hangar; la entrega de un dictamen técnico con membrete legal impreso genera una ventaja competitiva insuperable frente a brokers tradicionales.
