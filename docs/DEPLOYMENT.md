# Despliegue

## Estado actual

ProtoAI ya esta publicado y operativo en Vercel.

- URL productiva: `https://protoai-six.vercel.app`
- deployment reciente verificado: `https://protoai-kq53cx737-jimmygr4dos-projects.vercel.app`
- proyecto Vercel: `jimmygr4dos-projects/protoai`
- repositorio GitHub: `https://github.com/jimmygr4dos/protoai`

## Configuracion aplicada

- `framework` fijado en `Next.js` mediante `vercel.json`
- version de Node fijada en `22.x` desde `package.json`
- variables configuradas en Vercel para `production` y `development`:
  - `GEMINI_API_KEY`
  - `GEMINI_MODEL`
- proyecto enlazado a GitHub para deploy automatico

## Estado de integracion continua

Hoy el flujo operativo es este:

```text
commit local
-> push a main
-> GitHub recibe cambios
-> Vercel detecta push
-> Vercel genera deployment de produccion
```

Este flujo ya fue probado de extremo a extremo durante la implementacion.

## Notas importantes

- `.env.local` se mantiene fuera de Git
- el proyecto usa tambien `VERCEL_TOKEN` de forma local para tareas operativas por CLI
- Vercel puede seguir mostrando ciertos defaults genericos en inspecciones, pero el proyecto construye correctamente porque la configuracion local ya fuerza `Next.js`

## Dominio propio

Actualmente no se esta usando dominio propio.

- alias activo: `protoai-six.vercel.app`
- suficiente para esta etapa del MVP

Si luego se quiere dominio propio, faltaria:

1. agregar el dominio en Vercel
2. configurar DNS segun las instrucciones de Vercel
3. asignarlo al proyecto `protoai`

## Comandos utiles

```bash
npx vercel deploy --prod
npx vercel env ls
npx vercel project inspect protoai
npx vercel ls protoai
```

## Riesgos operativos vigentes

- las credenciales actuales fueron compartidas durante desarrollo y deberian rotarse luego
- el proyecto depende hoy de variables cargadas manualmente en Vercel
- conviene revisar en otra etapa si se agregara entorno `preview` mas formal o ramas de trabajo con deploy separado
