export const VISUAL_STYLES = ["modern_startup"] as const;

export const NAVIGATION_TYPES = ["single_page", "multi_view"] as const;

export const LAYOUT_TYPES = [
  "single_scroll",
  "topbar_hero_sections",
  "topbar_cards_table",
  "sidebar_dashboard",
  "chat_layout",
  "form_summary",
  "steps_timeline",
] as const;

export const COMPONENT_TYPES = [
  "navbar",
  "hero",
  "feature_cards",
  "service_cards",
  "form",
  "table",
  "stats_cards",
  "dashboard_panel",
  "chat_window",
  "chat_bubbles",
  "timeline",
  "steps",
  "faq",
  "cta_banner",
  "footer",
  "tabs",
  "sidebar",
  "list_group",
  "summary_card",
  "kanban_mock",
] as const;

export const PROTOTYPE_LIMITS = {
  maxScreens: 5,
  maxComponentsPerScreen: 6,
} as const;

export const DEFAULT_CUSTOMIZATION_OPTIONS = {
  allowPrimaryColor: true,
  allowSecondaryColor: true,
  allowLayoutVariant: true,
  allowSectionReorder: true,
  allowComponentStyle: true,
} as const;


