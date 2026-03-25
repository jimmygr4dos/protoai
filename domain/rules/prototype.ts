import {
  COMPONENT_TYPES,
  DEFAULT_CUSTOMIZATION_OPTIONS,
  LAYOUT_TYPES,
  NAVIGATION_TYPES,
  PROTOTYPE_LIMITS,
  VISUAL_STYLES,
} from "../constants/prototype";
import { REQUEST_STATUSES, SOLUTION_TYPES } from "../constants/request";
import type {
  CustomizationOptions,
  PrototypeComponent,
  PrototypeDefinition,
  PrototypeGenerationResult,
  PrototypeScreen,
  PrototypeValidationError,
  PrototypeValidationResult,
} from "../types/prototype";
import {
  isBoolean,
  isNonEmptyString,
  isNonNullObject,
} from "../../shared/utils/type-guards";

export const createDefaultCustomizationOptions = (): CustomizationOptions => ({
  allow_primary_color: DEFAULT_CUSTOMIZATION_OPTIONS.allowPrimaryColor,
  allow_secondary_color: DEFAULT_CUSTOMIZATION_OPTIONS.allowSecondaryColor,
  allow_layout_variant: DEFAULT_CUSTOMIZATION_OPTIONS.allowLayoutVariant,
  allow_section_reorder: DEFAULT_CUSTOMIZATION_OPTIONS.allowSectionReorder,
  allow_component_style: DEFAULT_CUSTOMIZATION_OPTIONS.allowComponentStyle,
});

export const repairPrototypeGenerationResult = (
  value: unknown,
): PrototypeGenerationResult | unknown => {
  if (!isNonNullObject(value)) {
    return value;
  }

  return {
    ...value,
    request_status: REQUEST_STATUSES.includes(value.request_status as never)
      ? value.request_status
      : "invalid",
    reason: isNonEmptyString(value.reason)
      ? value.reason
      : buildFallbackReason(
          REQUEST_STATUSES.includes(value.request_status as never)
            ? (value.request_status as PrototypeGenerationResult["request_status"])
            : "invalid",
        ),
  };
};

export const validatePrototypeGenerationResult = (
  value: unknown,
): PrototypeValidationResult => {
  const errors: PrototypeValidationError[] = [];

  if (!isNonNullObject(value)) {
    return invalidResult("root", "The AI response must be an object.");
  }

  validateRootFields(value, errors);

  if (value.prototype !== null && value.prototype !== undefined) {
    validatePrototypeDefinition(value.prototype, "prototype", errors);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const isValidPrototypeGenerationResult = (
  value: unknown,
): value is PrototypeGenerationResult => {
  return validatePrototypeGenerationResult(value).isValid;
};

const buildFallbackReason = (
  requestStatus: PrototypeGenerationResult["request_status"],
): string => {
  switch (requestStatus) {
    case "valid":
      return "Solicitud valida. Se genero una propuesta estructurada para el prototipo.";
    case "insufficient":
      return "La solicitud requiere mas detalle antes de generar un prototipo confiable.";
    case "invalid":
    default:
      return "La solicitud no cumple con el formato o alcance esperado para este MVP.";
  }
};

const validateRootFields = (
  value: Record<string, unknown>,
  errors: PrototypeValidationError[],
): void => {
  if (!REQUEST_STATUSES.includes(value.request_status as never)) {
    errors.push({
      field: "request_status",
      message: "The request status is invalid or missing.",
    });
  }

  if (!isNonEmptyString(value.solution_type)) {
    errors.push({
      field: "solution_type",
      message: "The solution type is required.",
    });
  } else if (!SOLUTION_TYPES.includes(value.solution_type as never)) {
    errors.push({
      field: "solution_type",
      message: "The solution type is not allowed.",
    });
  }

  if (!isNonEmptyString(value.reason)) {
    errors.push({
      field: "reason",
      message: "The reason is required.",
    });
  }

  if (value.prototype !== null && value.prototype !== undefined) {
    if (!isNonNullObject(value.prototype)) {
      errors.push({
        field: "prototype",
        message: "The prototype must be an object or null.",
      });
    }
  } else if (value.request_status === "valid") {
    errors.push({
      field: "prototype",
      message: "A valid request must include a prototype definition.",
    });
  }
};

const validatePrototypeDefinition = (
  value: unknown,
  fieldPath: string,
  errors: PrototypeValidationError[],
): void => {
  if (!isNonNullObject(value)) {
    errors.push({
      field: fieldPath,
      message: "Prototype definition must be an object.",
    });
    return;
  }

  if (!isNonEmptyString(value.name)) {
    errors.push({ field: `${fieldPath}.name`, message: "Name is required." });
  }

  if (!isNonEmptyString(value.summary)) {
    errors.push({
      field: `${fieldPath}.summary`,
      message: "Summary is required.",
    });
  }

  if (!VISUAL_STYLES.includes(value.visual_style as never)) {
    errors.push({
      field: `${fieldPath}.visual_style`,
      message: "Visual style is invalid.",
    });
  }

  if (!NAVIGATION_TYPES.includes(value.navigation_type as never)) {
    errors.push({
      field: `${fieldPath}.navigation_type`,
      message: "Navigation type is invalid.",
    });
  }

  validateScreens(value.screens, `${fieldPath}.screens`, errors);
  validateMockData(value.mock_data, `${fieldPath}.mock_data`, errors);
  validateCustomizationOptions(
    value.customization_options,
    `${fieldPath}.customization_options`,
    errors,
  );
};

const validateScreens = (
  value: unknown,
  fieldPath: string,
  errors: PrototypeValidationError[],
): void => {
  if (!Array.isArray(value)) {
    errors.push({
      field: fieldPath,
      message: "Screens must be an array.",
    });
    return;
  }

  if (value.length === 0) {
    errors.push({
      field: fieldPath,
      message: "At least one screen is required.",
    });
  }

  if (value.length > PROTOTYPE_LIMITS.maxScreens) {
    errors.push({
      field: fieldPath,
      message: `A prototype cannot exceed ${PROTOTYPE_LIMITS.maxScreens} screens.`,
    });
  }

  value.forEach((screen, index) => {
    validateScreen(screen, `${fieldPath}[${index}]`, errors);
  });
};

const validateScreen = (
  value: unknown,
  fieldPath: string,
  errors: PrototypeValidationError[],
): void => {
  if (!isNonNullObject(value)) {
    errors.push({
      field: fieldPath,
      message: "Screen must be an object.",
    });
    return;
  }

  if (!isNonEmptyString(value.id)) {
    errors.push({ field: `${fieldPath}.id`, message: "Id is required." });
  }

  if (!isNonEmptyString(value.name)) {
    errors.push({ field: `${fieldPath}.name`, message: "Name is required." });
  }

  if (!isNonEmptyString(value.purpose)) {
    errors.push({
      field: `${fieldPath}.purpose`,
      message: "Purpose is required.",
    });
  }

  if (!isNonEmptyString(value.route)) {
    errors.push({
      field: `${fieldPath}.route`,
      message: "Route is required.",
    });
  }

  if (!LAYOUT_TYPES.includes(value.layout as never)) {
    errors.push({
      field: `${fieldPath}.layout`,
      message: "Layout is invalid.",
    });
  }

  validateComponents(value.components, `${fieldPath}.components`, errors);
};

const validateComponents = (
  value: unknown,
  fieldPath: string,
  errors: PrototypeValidationError[],
): void => {
  if (!Array.isArray(value)) {
    errors.push({
      field: fieldPath,
      message: "Components must be an array.",
    });
    return;
  }

  if (value.length > PROTOTYPE_LIMITS.maxComponentsPerScreen) {
    errors.push({
      field: fieldPath,
      message: `A screen cannot exceed ${PROTOTYPE_LIMITS.maxComponentsPerScreen} components.`,
    });
  }

  value.forEach((component, index) => {
    validateComponent(component, `${fieldPath}[${index}]`, errors);
  });
};

const validateComponent = (
  value: unknown,
  fieldPath: string,
  errors: PrototypeValidationError[],
): void => {
  if (!isNonNullObject(value)) {
    errors.push({
      field: fieldPath,
      message: "Component must be an object.",
    });
    return;
  }

  if (!COMPONENT_TYPES.includes(value.type as never)) {
    errors.push({
      field: `${fieldPath}.type`,
      message: "Component type is invalid.",
    });
  }

  if (!isNonEmptyString(value.label)) {
    errors.push({
      field: `${fieldPath}.label`,
      message: "Label is required.",
    });
  }

  if (typeof value.position !== "number" || Number.isNaN(value.position)) {
    errors.push({
      field: `${fieldPath}.position`,
      message: "Position must be a number.",
    });
  }

  if (!isNonNullObject(value.props)) {
    errors.push({
      field: `${fieldPath}.props`,
      message: "Props must be an object.",
    });
  }
};

const validateMockData = (
  value: unknown,
  fieldPath: string,
  errors: PrototypeValidationError[],
): void => {
  if (!isNonNullObject(value)) {
    errors.push({
      field: fieldPath,
      message: "Mock data must be an object.",
    });
  }
};

const validateCustomizationOptions = (
  value: unknown,
  fieldPath: string,
  errors: PrototypeValidationError[],
): void => {
  if (!isNonNullObject(value)) {
    errors.push({
      field: fieldPath,
      message: "Customization options must be an object.",
    });
    return;
  }

  const keys: Array<keyof CustomizationOptions> = [
    "allow_primary_color",
    "allow_secondary_color",
    "allow_layout_variant",
    "allow_section_reorder",
    "allow_component_style",
  ];

  keys.forEach((key) => {
    if (!isBoolean(value[key])) {
      errors.push({
        field: `${fieldPath}.${key}`,
        message: `${key} must be a boolean.`,
      });
    }
  });
};

const invalidResult = (
  field: string,
  message: string,
): PrototypeValidationResult => ({
  isValid: false,
  errors: [{ field, message }],
});

export const sortScreenComponents = (
  components: PrototypeComponent[],
): PrototypeComponent[] => {
  return [...components].sort((left, right) => left.position - right.position);
};

export const sortPrototypeScreens = (
  screens: PrototypeScreen[],
): PrototypeScreen[] => {
  return [...screens].map((screen) => ({
    ...screen,
    components: sortScreenComponents(screen.components),
  }));
};

export const normalizePrototypeDefinition = (
  prototype: PrototypeDefinition,
): PrototypeDefinition => {
  return {
    ...prototype,
    name: prototype.name.trim(),
    summary: prototype.summary.trim(),
    screens: sortPrototypeScreens(prototype.screens),
  };
};
