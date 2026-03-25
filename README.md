# ProtoAI

ProtoAI es un MVP en Next.js que convierte un requerimiento digital en un prototipo navegable, validado y controlado por schema.

## Stack

- Next.js 16 (App Router)
- TypeScript
- React 19
- Bootstrap 5.3
- Gemini API por `@google/genai`

## Variables de entorno

Usa un archivo `.env.local` con lo siguiente:

```env
GEMINI_API_KEY=tu_api_key
GEMINI_MODEL=gemini-2.5-flash
```

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

## Flujo MVP actual

1. El usuario describe su requerimiento.
2. El sistema hace validacion estructural local.
3. Gemini clasifica semanticamente la solicitud como `valid`, `insufficient` o `invalid`.
4. Solo si es valida, Gemini genera un JSON estructurado del prototipo.
5. El sistema valida ese JSON contra reglas del dominio.
6. El renderer muestra el prototipo navegable.
7. El usuario puede ajustar colores.
8. El usuario deja sus datos para continuar con el siguiente paso.

## Estado de despliegue

- Produccion actual: `https://protoai-six.vercel.app`
- Proyecto Vercel: `jimmygr4dos-projects/protoai`

## Documentacion adicional

- [Arquitectura](docs/ARCHITECTURE.md)
- [Estado del MVP](docs/MVP_STATUS.md)
- [Integracion Gemini](docs/GEMINI_INTEGRATION.md)
- [Flujo UX](docs/UX_FLOW.md)
- [Despliegue](docs/DEPLOYMENT.md)
