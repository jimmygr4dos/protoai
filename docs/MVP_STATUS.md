# Estado Actual del MVP

## Ya implementado

- estructura base del proyecto alineada al SPEC
- dominio y reglas de validacion
- App Next.js funcional
- flujo guiado en 3 pasos
- UI en espanol
- preview navegable con varias pantallas
- vista simulada de dispositivo con modo `mobile` por defecto y opcion `desktop`
- resumen final de la propuesta y siguiente paso recomendado
- personalizacion basica de colores
- formulario final de lead
- submit simulado
- integracion real con Gemini
- proveedor mock de respaldo
- validacion semantica del requerimiento con Gemini antes de generar
- despliegue productivo activo en Vercel

## Validaciones actuales

- clasificacion local de request: `valid`, `insufficient`, `invalid`
- clasificacion semantica con IA sobre alineacion y claridad del brief
- schema del prototipo
- limite de pantallas y componentes
- validacion simple de correo y telefono en el cierre
- limites y contador de caracteres para el brief
- placeholders guiados para brief y datos de contacto

## Pendiente o mejorable

- persistencia real de leads y prototipos
- resumen exportable o enviado por correo
- mas layouts y componentes del SPEC con variantes visuales
- mas robustez en prompts y manejo de errores de Gemini
- analytics de conversion del funnel
- autenticacion administrativa o panel interno, si luego hiciera falta
- repositorio Git para deploy automatico
- dominio propio en Vercel

## Verificaciones completadas

- `npm run build`
- `npm run lint`
- llamada real al SDK de Gemini con la key configurada
- despliegue productivo en Vercel
