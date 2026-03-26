# Arquitectura ProtoAI

## Objetivo

ProtoAI no construye software final. Genera un prototipo navegable a partir de un brief y lo usa como artefacto de validacion comercial y funcional.

## Principio rector

La IA no diseña ni renderiza directamente la interfaz final. Gemini solo devuelve JSON estructurado. El frontend interpreta ese JSON dentro de un conjunto limitado de tipos, layouts y componentes permitidos.

## Capas principales

### `domain/`

Contiene contratos, tipos, constantes y reglas puras.

Responsabilidades:

- tipos de request
- tipos de prototipo
- estados permitidos
- layouts y componentes soportados
- validacion del JSON devuelto por IA
- reglas locales de longitud y estructura del brief
- normalizacion ligera de la respuesta antes de renderizar

Archivos importantes:

- `domain/constants/request.ts`
- `domain/constants/prototype.ts`
- `domain/types/request.ts`
- `domain/types/prototype.ts`
- `domain/rules/request.ts`
- `domain/rules/prototype.ts`

### `modules/`

Orquesta el flujo de negocio sin acoplarlo a la UI.

Responsabilidades:

- captura de request
- validacion local
- clasificacion semantica con IA
- generacion de prototipo
- validacion de prototipo
- customizacion
- submit simulado

Archivos importantes:

- `modules/request-validation/validate-request.ts`
- `modules/request-classification/classify-request.ts`
- `modules/prototype-generation/generate-prototype.ts`
- `modules/prototype-validation/validate-prototype.ts`
- `modules/prototype-customization/apply-customization.ts`
- `modules/prototype-submission/submit-prototype.ts`

### `ai/`

Encapsula la integracion con proveedores de IA.

Responsabilidades:

- construir prompts de clasificacion y generacion
- parsear respuestas JSON
- desacoplar proveedores por interfaz
- ofrecer proveedor `mock` para desarrollo temprano
- ofrecer proveedor `gemini` para generacion real

Archivos importantes:

- `ai/providers/types.ts`
- `ai/providers/mock-provider.ts`
- `ai/providers/gemini-provider.ts`
- `ai/prompt/build-request-classification-prompt.ts`
- `ai/prompt/build-prototype-prompt.ts`
- `ai/parsers/parse-json-response.ts`

### `renderer/`

Interpreta el JSON ya validado y lo convierte en UI controlada.

Responsabilidades:

- render de pantallas
- render de componentes soportados
- fallback para bloques no implementados
- control estricto del output visual

Archivos importantes:

- `renderer/core/render-prototype-screen.tsx`
- `renderer/core/render-prototype-component.tsx`
- `renderer/blocks/content-blocks.tsx`
- `renderer/blocks/navbar-block.tsx`
- `renderer/blocks/hero-block.tsx`

### `components/` y `app/`

Contienen la UI, el wizard y los endpoints App Router.

Responsabilidades:

- flujo secuencial del producto
- feedback visual y estados de carga
- preview del prototipo
- personalizacion basica
- captura final de datos
- endpoints server-side para validacion, generacion, customizacion y submit

Archivos importantes de UI:

- `components/prototype/protoai-workspace.tsx`
- `components/request/request-form.tsx`
- `components/wizard/generation-step.tsx`
- `components/prototype/prototype-preview.tsx`
- `components/prototype/prototype-canvas.tsx`
- `components/customization/customization-panel.tsx`
- `components/contact/lead-capture-panel.tsx`
- `components/layout/flow-steps.tsx`

Archivos importantes de app:

- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `app/api/generate-prototype/route.ts`
- `app/api/validate-request/route.ts`
- `app/api/apply-customization/route.ts`
- `app/api/submit-prototype/route.ts`

## Flujo de extremo a extremo

```text
brief del usuario
-> validacion local
-> clasificacion semantica con Gemini
-> generacion de JSON estructurado
-> validacion del schema
-> normalizacion de prototipo
-> renderer controlado
-> ajustes visuales
-> submit simulado
```

## Principios aplicados

- salida de IA solo en JSON estructurado
- clasificacion semantica separada de la generacion
- sin HTML crudo
- sin ejecucion dinamica
- credenciales por variables de entorno
- proveedor Gemini desacoplado por interfaz
- validacion estricta antes de renderizar
- UI mobile-first y orientada a flujo guiado
- separacion clara entre dominio, orquestacion, renderer y presentacion

## Decisiones relevantes tomadas hasta hoy

- el lead no se pide al inicio; se captura al final del flujo
- el preview aparece desde el paso 3, no desde el inicio
- el wizard actual es secuencial en 5 pasos
- el preview mantiene vista `mobile` por defecto y opcion `desktop`
- el renderer sigue siendo limitado y controlado, no libre
- `Gemini` clasifica antes de generar para filtrar briefs pobres o fuera de alcance

## Riesgos vigentes

- la calidad del prototipo sigue dependiendo del prompt y de la consistencia del modelo
- no existe persistencia real de leads ni prototipos
- no hay analitica de conversion ni panel interno
- el output del renderer todavia puede crecer en cantidad de layouts y bloques soportados
