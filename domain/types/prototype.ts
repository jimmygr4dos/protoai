import type {
  COMPONENT_TYPES,
  LAYOUT_TYPES,
  NAVIGATION_TYPES,
  VISUAL_STYLES,
} from "../constants/prototype";
import type { RequestStatus, SolutionType } from "./request";

export type VisualStyle = (typeof VISUAL_STYLES)[number];
export type NavigationType = (typeof NAVIGATION_TYPES)[number];
export type LayoutType = (typeof LAYOUT_TYPES)[number];
export type ComponentType = (typeof COMPONENT_TYPES)[number];

export interface CustomizationOptions {
  allow_primary_color: boolean;
  allow_secondary_color: boolean;
  allow_layout_variant: boolean;
  allow_section_reorder: boolean;
  allow_component_style: boolean;
}

export interface PrototypeComponent {
  type: ComponentType;
  label: string;
  position: number;
  props: Record<string, unknown>;
}

export interface PrototypeScreen {
  id: string;
  name: string;
  purpose: string;
  route: string;
  layout: LayoutType;
  components: PrototypeComponent[];
}

export interface PrototypeDefinition {
  name: string;
  summary: string;
  visual_style: VisualStyle;
  navigation_type: NavigationType;
  screens: PrototypeScreen[];
  mock_data: Record<string, unknown>;
  customization_options: CustomizationOptions;
}

export interface PrototypeGenerationResult {
  request_status: RequestStatus;
  solution_type: SolutionType | string;
  reason: string;
  prototype: PrototypeDefinition | null;
}

export interface PrototypeValidationError {
  field: string;
  message: string;
}

export interface PrototypeValidationResult {
  isValid: boolean;
  errors: PrototypeValidationError[];
}


