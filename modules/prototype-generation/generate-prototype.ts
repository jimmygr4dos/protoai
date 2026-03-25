import type { PrototypeGenerationResult } from "../../domain";
import type { AIProvider } from "../../ai";
import { buildPrototypePrompt } from "../../ai";
import type { NormalizedRequestInput } from "../../domain";

export interface PrototypeGenerator {
  provider: AIProvider;
}

export const generatePrototype = async (
  request: NormalizedRequestInput,
  generator: PrototypeGenerator,
): Promise<PrototypeGenerationResult> => {
  const prompt = buildPrototypePrompt(request);

  return generator.provider.generatePrototype({ request, prompt });
};


