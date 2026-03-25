import type { PrototypeGenerationResult, PrototypeValidationResult } from "../../domain";
import { validatePrototypeGenerationResult } from "../../domain";

export const validatePrototype = (
  result: PrototypeGenerationResult | unknown,
): PrototypeValidationResult => {
  return validatePrototypeGenerationResult(result);
};


