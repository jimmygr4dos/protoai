# Flujo UX

## Objetivo UX

El MVP busca que un usuario llegue rapido a un tangible sin perder claridad ni control. Por eso el flujo evita pedir datos de contacto al inicio, entrega valor primero y organiza la experiencia como un wizard secuencial.

## Estructura actual

### Paso 1: Brief

El usuario completa:

- tipo de solucion
- descripcion del requerimiento

La UI ofrece:

- placeholder guiado
- ayuda contextual minima
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
- muestra estados intermedios de validacion y generacion

### Paso 3: Resultado

El usuario:

- revisa el preview principal
- cambia entre `mobile` y `desktop`
- recorre las pantallas generadas
- decide si continuar a ajustes

### Paso 4: Ajustes

El usuario:

- cambia color principal
- cambia color secundario
- observa el preview en tiempo real

### Paso 5: Cierre

El usuario:

- deja nombre o razon social
- deja correo
- deja telefono
- simula el siguiente paso del proyecto

## Decisiones UX actuales

- el hero grande fue removido para priorizar la tarea activa
- la barra de pasos se redujo a una navegacion compacta
- el preview no aparece al inicio; aparece desde el paso 3
- el preview sigue visible en ajustes y cierre
- se removieron bloques redundantes de resumen y contexto para simplificar la lectura

## Criterios de diseno aplicados

- mobile-first
- flujo guiado y visible
- baja friccion al inicio
- captura de lead despues de entregar valor
- lenguaje claro en espanol
- interfaz simple con estetica startup
- look inspirado en tono visual startup peruano, sin copiar marcas concretas
- tipografia contemporanea con `Plus Jakarta Sans`
- direccion minimalista y enfocada en tarea

## Componentes UX clave

- `components/layout/flow-steps.tsx`
- `components/request/request-form.tsx`
- `components/wizard/generation-step.tsx`
- `components/prototype/prototype-preview.tsx`
- `components/prototype/prototype-canvas.tsx`
- `components/customization/customization-panel.tsx`
- `components/contact/lead-capture-panel.tsx`
- `components/prototype/protoai-workspace.tsx`

## Riesgos UX aun abiertos

- el paso 2 podria comunicar mejor el progreso real del sistema
- el preview podria necesitar mas limpieza visual si se agregan mas bloques
- faltan pruebas con usuarios reales para validar conversion y claridad del flujo

## Mejoras futuras sugeridas

- mensajes de error mas granulares por campo
- previsualizacion de ejemplo por tipo de solucion
- CTA final mas orientado a agenda o envio real
- guardado de borrador del brief
- refinamiento adicional de espaciados y estados interactivos
