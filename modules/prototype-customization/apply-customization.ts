import type { PrototypeDefinition } from "../../domain";

export interface PrototypeCustomizationInput {
  primaryColor?: string;
  secondaryColor?: string;
  layoutVariant?: string;
}

export interface CustomizedPrototypeResult {
  prototype: PrototypeDefinition;
  appliedChanges: PrototypeCustomizationInput;
}

export const applyCustomization = (
  prototype: PrototypeDefinition,
  changes: PrototypeCustomizationInput,
): CustomizedPrototypeResult => {
  return {
    prototype: {
      ...prototype,
      mock_data: {
        ...prototype.mock_data,
        theme: {
          ...(typeof prototype.mock_data.theme === "object" && prototype.mock_data.theme !== null
            ? (prototype.mock_data.theme as Record<string, unknown>)
            : {}),
          primaryColor: changes.primaryColor ?? "#0f766e",
          secondaryColor: changes.secondaryColor ?? "#f97316",
          layoutVariant: changes.layoutVariant ?? null,
        },
      },
    },
    appliedChanges: changes,
  };
};
