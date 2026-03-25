import type { RequestInput } from "../../domain";
import { normalizeRequestInput } from "../../domain";

export const captureRequest = (input: RequestInput) => {
  return normalizeRequestInput(input);
};


