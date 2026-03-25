import type { RequestInput } from "../../domain";
import { classifyRequest } from "../../domain";

export const validateRequest = (input: RequestInput) => {
  return classifyRequest(input);
};


