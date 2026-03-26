# Integracion Gemini

## Proveedor usado

Se usa el SDK oficial `@google/genai`.

Archivos principales:

- `ai/providers/gemini-provider.ts`
- `ai/prompt/build-request-classification-prompt.ts`
- `ai/prompt/build-prototype-prompt.ts`
- `ai/parsers/parse-json-response.ts`
- `domain/rules/prototype.ts`

## Configuracion

Variables requeridas:

```env
GEMINI_API_KEY=tu_api_key
GEMINI_MODEL=gemini-2.5-flash
```

## Modelo recomendado actual

Se dejo `gemini-2.5-flash` como modelo por defecto por equilibrio entre velocidad y calidad para este MVP.

## Flujo actual

1. `buildRequestClassificationPrompt` construye la instruccion para clasificar el brief.
2. `GeminiAIProvider.classifyRequest` decide si el requerimiento es `valid`, `insufficient` o `invalid`.
3. Si la solicitud es valida, `buildPrototypePrompt` arma el prompt de generacion.
4. `GeminiAIProvider.generatePrototype` llama a `generateContent`.
5. La respuesta se fuerza a `application/json`.
6. El parser limpia y convierte la salida.
7. El validador revisa que cumpla el schema.
8. Solo si pasa validacion se renderiza en UI.

## Reglas importantes del prompt actual

El prompt de generacion busca asegurar:

- JSON valido y sin contenido extra
- texto visible en espanol
- mock data contextual al dominio del requerimiento
- respeto por el schema del MVP
- salida compatible con renderer controlado

## Resiliencia actual

La capa actual ya contempla:

- parseo defensivo del texto devuelto por Gemini
- validacion estricta del schema
- reparacion minima de `reason` cuando falta
- rechazo de respuestas mal estructuradas
- mensajes tecnicos al log y mensajes limpios para el usuario

## Riesgos y limites vigentes

- Gemini puede seguir devolviendo contenido demasiado generico si el brief es pobre
- la contextualizacion del mock data todavia puede afinarse mas
- la calidad final depende bastante del prompt y del dominio del requerimiento
- aun no existe una capa de retry inteligente ni re-prompt automatico por incumplimiento parcial

## Nota de seguridad

La API key actual fue usada para integracion local y debe rotarse luego.
No debe persistirse en repositorios ni exponerse en frontend.
