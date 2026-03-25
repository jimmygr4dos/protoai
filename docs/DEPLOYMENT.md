# Despliegue

## Estado actual

ProtoAI ya esta publicado en Vercel.

- URL productiva: `https://protoai-six.vercel.app`
- URL directa del deployment actual: `https://protoai-1s49pcf1k-jimmygr4dos-projects.vercel.app`
- Proyecto Vercel: `jimmygr4dos-projects/protoai`

## Configuracion aplicada

- framework fijado en `Next.js` mediante `vercel.json`
- version de Node fijada en `22.x` desde `package.json`
- variables configuradas en Vercel para `production` y `development`:
  - `GEMINI_API_KEY`
  - `GEMINI_MODEL`

## Estado de integracion continua

Todavia no existe repositorio Git enlazado a este directorio.

Eso significa que:

- el proyecto ya se puede desplegar manualmente por CLI
- aun no hay deploy automatico por push
- para tener flujo continuo falta crear o conectar un repositorio remoto

## Dominio propio

En la cuenta de Vercel no hay dominios registrados todavia.

Para conectar dominio propio falta:

1. agregar el dominio en Vercel
2. configurar DNS segun las instrucciones de Vercel
3. asignarlo al proyecto `protoai`

## Comandos utiles

```bash
npx vercel deploy --prod
npx vercel env ls
npx vercel project inspect protoai
```

## Siguiente cierre recomendado

1. crear o conectar repositorio Git
2. definir dominio final
3. configurar deploy automatico por rama principal
