# Integracion Gemini

## Proveedor usado

Se usa el SDK oficial `@google/genai`.

Archivos principales:

- `ai/providers/gemini-provider.ts`
- `ai/prompt/build-request-classification-prompt.ts`
- `ai/prompt/build-prototype-prompt.ts`

## Configuracion

Variables requeridas:

```env
GEMINI_API_KEY=tu_api_key
GEMINI_MODEL=gemini-2.5-flash
```

## Modelo recomendado actual

Se dejo `gemini-2.5-flash` como modelo por defecto por equilibrio entre velocidad y calidad para este MVP.

## Flujo

1. `buildRequestClassificationPrompt` construye la instruccion para clasificar el brief.
2. `GeminiAIProvider.classifyRequest` decide si el requerimiento es `valid`, `insufficient` o `invalid`.
3. Si la solicitud es valida, `buildPrototypePrompt` arma el prompt de generacion.
4. `GeminiAIProvider.generatePrototype` llama a `generateContent`.
5. La respuesta se fuerza a `application/json`.
6. El parser limpia y convierte la salida.
7. El validador revisa que cumpla el schema.
8. Solo si pasa validacion se renderiza en UI.

## Nota de seguridad

La API key actual fue usada para integracion local y debe rotarse luego.
No debe persistirse en repositorios ni exponerse en frontend.
