# Arquitectura ProtoAI

## Objetivo

ProtoAI no construye software final. Genera un prototipo navegable a partir de un brief y lo usa como artefacto de validacion comercial y funcional.

## Capas principales

### `domain/`

Contiene contratos, tipos, constantes y reglas puras.

- tipos de request
- tipos de prototipo
- estados permitidos
- layouts y componentes soportados
- validacion del JSON devuelto por IA
- reglas locales de longitud y estructura del brief

### `modules/`

Orquesta el flujo de negocio sin acoplarlo a la UI.

- captura de request
- validacion y clasificacion local
- clasificacion semantica con IA
- generacion de prototipo
- validacion de prototipo
- customizacion
- submit simulado

### `ai/`

Encapsula la integracion con proveedores de IA.

- builder de prompt de clasificacion
- builder de prompt de generacion
- parser de respuesta
- validadores
- proveedor `mock`
- proveedor `gemini`

### `renderer/`

Interpreta el JSON ya validado y lo convierte en UI controlada.

- render de pantallas
- render de componentes soportados
- fallback para bloques no implementados

### `components/` y `app/`

Contienen la UI y los endpoints App Router.

## Principios aplicados

- salida de IA solo en JSON estructurado
- clasificacion semantica separada de la generacion
- sin HTML crudo
- sin ejecucion dinamica
- credenciales por variables de entorno
- proveedor Gemini desacoplado por interfaz
- validacion estricta antes de renderizar
- UI mobile-first y orientada a flujo guiado
