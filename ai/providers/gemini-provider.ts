import { GoogleGenAI } from "@google/genai";
import type { AIProvider, ClassifyRequestParams, GeneratePrototypeParams } from "./types";
import { parseJsonResponse } from "../parsers";
import { validatePrototypeGenerationResult } from "../validators";
import type { PrototypeGenerationResult, RequestClassificationResult } from "../../domain";
import {
  REQUEST_STATUSES,
  classifyRequest,
  repairPrototypeGenerationResult,
} from "../../domain";

export interface GeminiProviderOptions {
  apiKey: string;
  model: string;
}

export class GeminiAIProvider implements AIProvider {
  public readonly name = "gemini";

  private readonly client: GoogleGenAI;

  public constructor(private readonly options: GeminiProviderOptions) {
    this.client = new GoogleGenAI({ apiKey: options.apiKey });
  }

  public async classifyRequest(
    params: ClassifyRequestParams,
  ): Promise<RequestClassificationResult> {
    if (!this.options.apiKey) {
      throw new Error("Gemini API key is required.");
    }

    const response = await this.client.models.generateContent({
      model: this.options.model,
      contents: params.prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsedResponse = parseJsonResponse(response.text ?? "");

    if (!isRequestClassificationResult(parsedResponse)) {
      return classifyRequest({
        solutionType: params.request.solutionType,
        description: params.request.description,
      });
    }

    return parsedResponse;
  }

  public async generatePrototype(
    params: GeneratePrototypeParams,
  ): Promise<PrototypeGenerationResult> {
    if (!this.options.apiKey) {
      throw new Error("Gemini API key is required.");
    }

    if (!params.prompt) {
      throw new Error("Generation prompt is required.");
    }

    const response = await this.client.models.generateContent({
      model: this.options.model,
      contents: params.prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsedResponse = parseJsonResponse(response.text ?? "");
    const repairedResponse = repairPrototypeGenerationResult(parsedResponse);
    const validation = validatePrototypeGenerationResult(repairedResponse);

    if (!validation.isValid) {
      const details = validation.errors
        .map((error) => `${error.field}: ${error.message}`)
        .join("; ");

      throw new Error(`Gemini returned an invalid prototype payload. ${details}`);
    }

    return repairedResponse as PrototypeGenerationResult;
  }
}

const isRequestClassificationResult = (
  value: unknown,
): value is RequestClassificationResult => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    REQUEST_STATUSES.includes(candidate.status as never) &&
    typeof candidate.reason === "string" &&
    typeof candidate.normalizedInput === "object" &&
    candidate.normalizedInput !== null &&
    !Array.isArray(candidate.normalizedInput)
  );
};
