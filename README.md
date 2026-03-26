# ProtoAI

ProtoAI es un MVP en Next.js que transforma un requerimiento digital en un prototipo navegable, validado por reglas de dominio y generado por IA bajo un schema controlado. El objetivo no es construir software final, sino aterrizar ideas rapido, alinear expectativas y preparar la siguiente conversacion comercial o funcional.

## Estado actual

A la fecha, ProtoAI ya cuenta con:

- flujo secuencial tipo wizard en 5 pasos
- validacion estructural local del brief
- clasificacion semantica con Gemini antes de generar
- renderer controlado de prototipos con preview navegable
- vista simulada `mobile` y `desktop`
- ajustes visuales basicos
- captura final de lead
- despliegue en Vercel
- repositorio en GitHub con deploy automatico por push a `main`

## Stack

- Next.js 16 (App Router)
- TypeScript
- React 19
- Bootstrap 5.3
- Gemini API por `@google/genai`
- `next/font` para tipografia principal

## Variables de entorno

Variables minimas del proyecto:

```env
GEMINI_API_KEY=tu_api_key
GEMINI_MODEL=gemini-2.5-flash
```

Variables usadas en desarrollo operativo local:

```env
VERCEL_TOKEN=tu_token_vercel
```

Notas:

- las credenciales no deben ir al repositorio
- `.env.local` queda fuera de Git por `.gitignore`
- `.env.example` es la referencia publica minima

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir en `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Flujo funcional actual

1. El usuario define el tipo de solucion y describe su requerimiento.
2. El sistema valida longitud, estructura y consistencia basica del brief.
3. Gemini clasifica semanticamente la solicitud como `valid`, `insufficient` o `invalid`.
4. Solo si la solicitud es valida, Gemini devuelve un JSON estructurado del prototipo.
5. El sistema valida el JSON contra reglas de dominio y lo normaliza.
6. El frontend muestra el prototipo en un preview controlado.
7. El usuario revisa el resultado, ajusta colores y finalmente deja sus datos.
8. El submit final sigue siendo simulado en esta etapa.

## UX actual

El flujo de interfaz esta organizado como wizard secuencial:

- Paso 1: brief
- Paso 2: validacion y generacion
- Paso 3: resultado
- Paso 4: ajustes
- Paso 5: cierre

La UI actual privilegia:

- claridad de tarea por paso
- minimalismo visual
- mobile-first
- preview visible desde el paso 3
- lenguaje en espanol y tono amigable
- look startup peruano, juvenil y limpio

## Tipografia y estilo

La UI usa una direccion visual contemporanea basada en:

- `Plus Jakarta Sans` como fuente principal
- paleta coral + turquesa sobre fondos crema
- alto contraste en texto
- botones suaves y redondeados
- densidad visual reducida frente a versiones anteriores

## Estado de despliegue

- Produccion actual: `https://protoai-six.vercel.app`
- Proyecto Vercel: `jimmygr4dos-projects/protoai`
- Repositorio GitHub: `https://github.com/jimmygr4dos/protoai`
- Deploy automatico activo por push a `main`

## Documentacion adicional

- [Arquitectura](docs/ARCHITECTURE.md)
- [Estado del MVP](docs/MVP_STATUS.md)
- [Integracion Gemini](docs/GEMINI_INTEGRATION.md)
- [Flujo UX](docs/UX_FLOW.md)
- [Despliegue](docs/DEPLOYMENT.md)
- [Handoff Detallado](docs/HANDOFF.md)
