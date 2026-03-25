import { REQUEST_STATUSES, SOLUTION_TYPES } from "../constants/request";
import type {
  RequestClassificationResult,
  RequestInput,
  RequestStatus,
} from "../types/request";

export const MIN_DESCRIPTION_LENGTH = 40;
export const MAX_DESCRIPTION_LENGTH = 700;

export const normalizeRequestInput = (
  input: RequestInput,
): RequestClassificationResult["normalizedInput"] => {
  return {
    solutionType: input.solutionType.trim().toLowerCase(),
    description: input.description.trim().replace(/\s+/g, " "),
  };
};

export const isAllowedSolutionType = (value: string): boolean => {
  return SOLUTION_TYPES.includes(value as (typeof SOLUTION_TYPES)[number]);
};

export const classifyRequest = (
  input: RequestInput,
): RequestClassificationResult => {
  const normalizedInput = normalizeRequestInput(input);

  if (!normalizedInput.solutionType || !normalizedInput.description) {
    return buildClassificationResult(
      "invalid",
      "Debes indicar el tipo de solucion y describir lo que necesitas.",
      normalizedInput,
    );
  }

  if (!isAllowedSolutionType(normalizedInput.solutionType)) {
    return buildClassificationResult(
      "invalid",
      "Ese tipo de solucion aun no esta soportado en este MVP.",
      normalizedInput,
    );
  }

  if (normalizedInput.description.length < MIN_DESCRIPTION_LENGTH) {
    return buildClassificationResult(
      "insufficient",
      `La descripcion todavia es corta. Intenta llegar al menos a ${MIN_DESCRIPTION_LENGTH} caracteres con mas contexto funcional.`,
      normalizedInput,
    );
  }

  if (normalizedInput.description.length > MAX_DESCRIPTION_LENGTH) {
    return buildClassificationResult(
      "insufficient",
      `La descripcion es demasiado extensa para este MVP. Resume tu idea a un maximo de ${MAX_DESCRIPTION_LENGTH} caracteres.`,
      normalizedInput,
    );
  }

  return buildClassificationResult(
    "valid",
    "Solicitud valida. Ya podemos generar un primer prototipo navegable.",
    normalizedInput,
  );
};

const buildClassificationResult = (
  status: RequestStatus,
  reason: string,
  normalizedInput: RequestClassificationResult["normalizedInput"],
): RequestClassificationResult => {
  if (!REQUEST_STATUSES.includes(status)) {
    throw new Error("Estado de solicitud invalido.");
  }

  return {
    status,
    reason,
    normalizedInput,
  };
};
