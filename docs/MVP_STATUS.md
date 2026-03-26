# Estado Actual del MVP

## Resumen ejecutivo

El proyecto ya paso de una base tecnica inicial a un MVP funcional con interfaz navegable, flujo guiado y despliegue activo. Lo que existe hoy ya permite mostrar una experiencia comercial util: el usuario describe una necesidad, ProtoAI valida el brief, genera un prototipo, lo muestra en preview controlado, permite un ajuste visual minimo y cierra con captura de datos.

## Ya implementado

### Producto

- generacion de prototipos basada en brief
- clasificacion semantica del requerimiento antes de generar
- renderer controlado de pantallas y componentes
- submit final simulado
- experiencia en espanol

### UX/UI

- flujo secuencial tipo wizard en 5 pasos
- interfaz simplificada y mas minimalista que iteraciones anteriores
- preview visible desde el paso 3
- vista simulada de dispositivo con `mobile` por defecto y alternativa `desktop`
- personalizacion basica de color
- tipografia moderna integrada con `next/font`
- direccion visual startup, juvenil y amigable

### Integracion IA

- proveedor real Gemini integrado
- proveedor mock de respaldo para desarrollo
- prompts separados para clasificacion y generacion
- parsing y validacion del JSON de salida
- reparacion minima de `reason` faltante sin inventar campos estructurales

### Infraestructura

- app desplegada en Vercel
- repositorio en GitHub
- deploy automatico por push a `main`

## Validaciones actuales

- clasificacion local de request: `valid`, `insufficient`, `invalid`
- clasificacion semantica con IA sobre alineacion y claridad del brief
- schema del prototipo
- limite de pantallas y componentes
- validacion simple de correo y telefono en el cierre
- limites y contador de caracteres para el brief
- placeholders guiados para brief y datos de contacto
- build y lint funcionando

## Punto exacto del UX actual

### Paso 1: Brief

- seleccion de tipo de solucion
- descripcion del requerimiento
- contador de caracteres
- placeholder guiado
- CTA para generar

### Paso 2: Generacion

- estado de carga
- resultado de clasificacion
- avance controlado hacia el resultado

### Paso 3: Resultado

- preview del prototipo
- navegacion entre pantallas si aplica
- cambio entre vista `mobile` y `desktop`
- acceso a ajustes

### Paso 4: Ajustes

- cambio de color principal
- cambio de color secundario
- preview sigue visible mientras se ajusta

### Paso 5: Cierre

- nombre o razon social
- correo
- telefono
- CTA de continuidad

## Estado del deploy

- alias de produccion: `https://protoai-six.vercel.app`
- repo: `https://github.com/jimmygr4dos/protoai`
- workflow actual: `push a main -> deploy automatico en Vercel`

## Pendiente o mejorable

### Producto

- persistencia real de leads y prototipos
- resumen exportable o enviado por correo
- mas layouts y componentes del SPEC con variantes visuales
- analytics de conversion del funnel
- autenticacion administrativa o panel interno, si luego hiciera falta

### IA

- endurecer aun mas prompts y reglas post-validacion
- detectar mejor salidas demasiado genericas
- afinar mock data por contexto de negocio
- evaluar si conviene fallback o retry controlado ante respuestas borderline del modelo

### UX/UI

- microcopy mas fino por paso
- mejorar todavia espaciados y densidad en mobile
- refinar la experiencia del paso 2 para que comunique mejor progreso real
- decidir si conviene agregar progreso porcentual o solo estados textuales

### Negocio

- definir si el cierre final sera formulario, agenda, correo o CRM
- definir almacenamiento real de leads
- decidir si se capturara metadata de conversion

## Verificaciones completadas

- `npm run build`
- `npm run lint`
- llamada real al SDK de Gemini con la key configurada
- despliegue productivo en Vercel
- push a GitHub con deploy automatico validado
