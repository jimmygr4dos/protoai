# Flujo UX

## Objetivo UX

El MVP busca que un usuario llegue rapido a un tangible sin perder claridad ni control. Por eso el flujo evita pedir datos de contacto al inicio y entrega valor primero.

## Estructura actual

### Paso 1: Brief

El usuario completa:

- tipo de solucion
- descripcion del requerimiento

La UI ofrece:

- placeholder guiado
- ayuda contextual
- contador de caracteres
- minimo recomendado de `40`
- maximo sugerido de `700`
- bloqueo del CTA si el texto es demasiado corto o demasiado largo
- feedback visible junto al boton mientras se genera el prototipo

### Paso 2: Generacion

El sistema:

- valida estructura localmente
- clasifica semanticamente el brief con Gemini
- genera el prototipo solo si la clasificacion es valida
- presenta la propuesta en una vista simulada de dispositivo con `mobile` por defecto y alternativa `desktop`

### Paso 3: Ajuste y cierre

El usuario puede:

- cambiar color principal
- cambiar color secundario
- revisar pantallas y resumen
- dejar nombre, correo y telefono para continuar

## Criterios de diseno aplicados

- mobile-first
- flujo guiado y visible
- baja friccion al inicio
- captura de lead despues de entregar valor
- lenguaje claro en espanol
- interfaz simple con estetica startup
- preview visual orientado a cliente, no solo a demo tecnica

## Componentes UX clave

- `components/layout/flow-steps.tsx`
- `components/request/request-form.tsx`
- `components/prototype/prototype-preview.tsx`
- `components/prototype/prototype-canvas.tsx`
- `components/prototype/prototype-summary.tsx`
- `components/customization/customization-panel.tsx`

## Mejoras futuras sugeridas

- mensajes de error mas granulares por campo
- previsualizacion de ejemplo por tipo de solucion
- CTA final mas orientado a agenda o envio real
- guardado de borrador del brief
