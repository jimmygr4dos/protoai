import type { RequestInput } from "../../domain";
import type { AIProvider } from "../../ai";
import { buildRequestClassificationPrompt } from "../../ai";
import { classifyRequest, normalizeRequestInput } from "../../domain";

export const classifyUserRequest = async (
  input: RequestInput,
  provider?: AIProvider,
) => {
  const localClassification = classifyRequest(input);

  if (localClassification.status !== "valid") {
    return localClassification;
  }

  if (!provider) {
    return localClassification;
  }

  const normalizedRequest = normalizeRequestInput(input);
  const prompt = buildRequestClassificationPrompt(normalizedRequest);

  return provider.classifyRequest({
    request: normalizedRequest,
    prompt,
  });
};
