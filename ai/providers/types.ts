import type { NormalizedRequestInput, RequestClassificationResult } from "../../domain";
import type { PrototypeGenerationResult } from "../../domain";

export interface ClassifyRequestParams {
  request: NormalizedRequestInput;
  prompt: string;
}

export interface GeneratePrototypeParams {
  request: NormalizedRequestInput;
  prompt: string;
}

export interface AIProvider {
  readonly name: string;
  classifyRequest(
    params: ClassifyRequestParams,
  ): Promise<RequestClassificationResult>;
  generatePrototype(
    params: GeneratePrototypeParams,
  ): Promise<PrototypeGenerationResult>;
}
