import type { RequestClassificationResult } from "../../domain";
import type { AIProvider, ClassifyRequestParams, GeneratePrototypeParams } from "./types";
import type { PrototypeGenerationResult } from "../../domain";
import { classifyRequest } from "../../domain";

const buildWebsitePrototype = (description: string) => ({
  name: "Prototipo de sitio web",
  summary: description,
  visual_style: "modern_startup" as const,
  navigation_type: "multi_view" as const,
  screens: [
    {
      id: "home",
      name: "Inicio",
      purpose: "Presentar la propuesta principal y sus secciones clave.",
      route: "/",
      layout: "topbar_hero_sections" as const,
      components: [
        { type: "navbar" as const, label: "Navegacion principal", position: 1, props: { items: ["Producto", "Prueba", "Precios"] } },
        { type: "hero" as const, label: "Hero principal", position: 2, props: { title: "Una primera vista clara de la idea", description } },
        {
          type: "feature_cards" as const,
          label: "Bloques de valor",
          position: 3,
          props: { items: [
            { title: "Valor claro", description: "Explica rapido que problema resuelve la propuesta." },
            { title: "Confianza", description: "Muestra evidencia para reducir dudas iniciales." },
            { title: "Accion", description: "Lleva a una siguiente accion concreta." },
          ] },
        },
        { type: "cta_banner" as const, label: "CTA principal", position: 4, props: { text: "Solicitar reunion de alcance" } },
        { type: "footer" as const, label: "Pie de pagina", position: 5, props: {} },
      ],
    },
    {
      id: "details",
      name: "Detalle",
      purpose: "Mostrar servicios, alcances y preguntas frecuentes.",
      route: "/details",
      layout: "single_scroll" as const,
      components: [
        {
          type: "service_cards" as const,
          label: "Detalle del servicio",
          position: 1,
          props: { items: [
            { title: "Alcance inicial", description: "Que se entrega primero y con que prioridad." },
            { title: "Velocidad", description: "Que tan rapido se podria ejecutar la siguiente etapa." },
            { title: "Acompanamiento", description: "Como se activa el paso posterior al prototipo." },
          ] },
        },
        {
          type: "faq" as const,
          label: "Preguntas frecuentes",
          position: 2,
          props: { items: [
            { title: "Que incluye?", description: "Un prototipo estructurado y una base para definir alcance." },
            { title: "Ya es software final?", description: "No. Es una representacion controlada del concepto." },
          ] },
        },
      ],
    },
  ],
  mock_data: {
    generated_by: "mock",
    theme: { primaryColor: "#0f766e", secondaryColor: "#f97316" },
  },
  customization_options: {
    allow_primary_color: true,
    allow_secondary_color: true,
    allow_layout_variant: true,
    allow_section_reorder: true,
    allow_component_style: true,
  },
});

const buildDashboardPrototype = (description: string) => ({
  name: "Prototipo de dashboard operativo",
  summary: description,
  visual_style: "modern_startup" as const,
  navigation_type: "multi_view" as const,
  screens: [
    {
      id: "overview",
      name: "Resumen",
      purpose: "Resaltar metricas y actividad actual.",
      route: "/",
      layout: "sidebar_dashboard" as const,
      components: [
        { type: "sidebar" as const, label: "Navegacion", position: 1, props: { items: ["Resumen", "Pedidos", "Alertas", "Equipo"] } },
        {
          type: "stats_cards" as const,
          label: "KPIs principales",
          position: 2,
          props: { items: [
            { label: "A tiempo", value: "94%" },
            { label: "Alertas abiertas", value: "12" },
            { label: "Pedidos hoy", value: "248" },
            { label: "Demora promedio", value: "18 min" },
          ] },
        },
        {
          type: "table" as const,
          label: "Operaciones recientes",
          position: 3,
          props: { columns: ["Pedido", "Estado", "ETA"], rows: [
            { Pedido: "OR-1023", Estado: "En ruta", ETA: "15 min" },
            { Pedido: "OR-1031", Estado: "Retrasado", ETA: "42 min" },
            { Pedido: "OR-1038", Estado: "Entregado", ETA: "Listo" },
          ] },
        },
      ],
    },
    {
      id: "workflows",
      name: "Flujos",
      purpose: "Visualizar tareas y estado operativo.",
      route: "/workflows",
      layout: "steps_timeline" as const,
      components: [
        {
          type: "kanban_mock" as const,
          label: "Tablero operativo",
          position: 1,
          props: { columns: [
            { title: "Pendiente", items: ["Revisar ruta", "Asignar courier"] },
            { title: "En proceso", items: ["Despachar unidad", "Resolver alerta"] },
            { title: "Cerrado", items: ["Cerrar incidencia"] },
          ] },
        },
        {
          type: "timeline" as const,
          label: "Secuencia de ejecucion",
          position: 2,
          props: { items: [
            { title: "Ingresa el pedido", description: "El sistema marca prioridad y SLA." },
            { title: "Actua el equipo", description: "Operaciones revisa alertas y responsables." },
            { title: "Supervisa gestion", description: "La jefatura revisa indicadores y cierre." },
          ] },
        },
      ],
    },
  ],
  mock_data: {
    generated_by: "mock",
    theme: { primaryColor: "#1d4ed8", secondaryColor: "#f97316" },
  },
  customization_options: {
    allow_primary_color: true,
    allow_secondary_color: true,
    allow_layout_variant: true,
    allow_section_reorder: true,
    allow_component_style: true,
  },
});

const buildChatPrototype = (description: string) => ({
  name: "Prototipo de chatbot",
  summary: description,
  visual_style: "modern_startup" as const,
  navigation_type: "single_page" as const,
  screens: [
    {
      id: "chat",
      name: "Chat",
      purpose: "Simular la conversacion principal y el flujo de soporte.",
      route: "/",
      layout: "chat_layout" as const,
      components: [
        {
          type: "chat_window" as const,
          label: "Flujo conversacional",
          position: 1,
          props: { items: [
            { role: "assistant", text: "Hola, cuentame en que te ayudo." },
            { role: "user", text: "Quiero revisar mi ultimo pedido y saber cuando llega." },
            { role: "assistant", text: "Ya encontre tu pedido y puedo mostrarte estado, ETA y opciones de soporte." },
          ] },
        },
        {
          type: "summary_card" as const,
          label: "Resumen de intencion",
          position: 2,
          props: { summary: "El bot entiende la consulta, muestra datos clave y ofrece una accion siguiente.", bullets: ["Ver pedido", "Revisar ETA", "Escalar soporte"] },
        },
      ],
    },
  ],
  mock_data: {
    generated_by: "mock",
    theme: { primaryColor: "#7c3aed", secondaryColor: "#10b981" },
  },
  customization_options: {
    allow_primary_color: true,
    allow_secondary_color: true,
    allow_layout_variant: true,
    allow_section_reorder: true,
    allow_component_style: true,
  },
});

const buildDefaultPrototype = (description: string) => ({
  name: "Prototipo de descubrimiento",
  summary: description,
  visual_style: "modern_startup" as const,
  navigation_type: "multi_view" as const,
  screens: [
    {
      id: "home",
      name: "Resumen",
      purpose: "Sintetizar el concepto y las primeras acciones.",
      route: "/",
      layout: "topbar_hero_sections" as const,
      components: [
        { type: "navbar" as const, label: "Navegacion", position: 1, props: { items: ["Resumen", "Flujo", "CTA"] } },
        { type: "hero" as const, label: "Introduccion", position: 2, props: { title: "Primero prototipo, luego desarrollo", description } },
        {
          type: "summary_card" as const,
          label: "Que cubre esta propuesta",
          position: 3,
          props: { summary: "Un artefacto visual para validar entendimiento antes de construir.", bullets: ["Pantallas clave", "Flujo visible", "Siguiente paso"] },
        },
        {
          type: "steps" as const,
          label: "Ruta sugerida",
          position: 4,
          props: { items: [
            { title: "Entender la necesidad", description: "Capturar el brief base." },
            { title: "Visualizar la propuesta", description: "Renderizar una experiencia limitada pero tangible." },
            { title: "Pasar a alcance", description: "Usar el prototipo para definir la fase real." },
          ] },
        },
      ],
    },
  ],
  mock_data: {
    generated_by: "mock",
    theme: { primaryColor: "#0f766e", secondaryColor: "#f97316" },
  },
  customization_options: {
    allow_primary_color: true,
    allow_secondary_color: true,
    allow_layout_variant: true,
    allow_section_reorder: true,
    allow_component_style: true,
  },
});

export class MockAIProvider implements AIProvider {
  public readonly name = "mock";

  public async classifyRequest(
    params: ClassifyRequestParams,
  ): Promise<RequestClassificationResult> {
    return classifyRequest({
      solutionType: params.request.solutionType,
      description: params.request.description,
    });
  }

  public async generatePrototype(params: GeneratePrototypeParams): Promise<PrototypeGenerationResult> {
    const { request } = params;

    const prototype =
      request.solutionType === "website" || request.solutionType === "landing_page"
        ? buildWebsitePrototype(request.description)
        : request.solutionType === "dashboard"
          ? buildDashboardPrototype(request.description)
          : request.solutionType === "chatbot"
            ? buildChatPrototype(request.description)
            : buildDefaultPrototype(request.description);

    return {
      request_status: "valid",
      solution_type: request.solutionType,
      reason: "Se genero una propuesta base con datos simulados para revisar alcance y enfoque.",
      prototype,
    };
  }
}
