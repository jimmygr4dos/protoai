import type { NormalizedRequestInput } from "../../domain";

export const buildRequestClassificationPrompt = (
  request: NormalizedRequestInput,
): string => {
  return [
    "You classify digital solution requests for a controlled prototype generator.",
    "Return valid JSON only.",
    "Do not return markdown, explanations, or code fences.",
    "Classify the request as one of: valid, insufficient, invalid.",
    "Use valid when the request clearly describes a digital solution need aligned with the selected solution type and there is enough information to infer an initial prototype.",
    "Use insufficient when the request points to a plausible digital need but lacks enough detail, clarity, or scope to prototype confidently.",
    "Use invalid when the request is not a digital product requirement, is unrelated to the selected type, or is outside the product scope.",
    "Consider whether the selected solution type matches the description.",
    "Do not propose features. Only classify and explain briefly.",
    "Return this exact schema:",
    '{"status":"valid | insufficient | invalid","reason":"string","normalizedInput":{"solutionType":"string","description":"string"}}',
    `Selected solution type: ${request.solutionType}`,
    `Request description: ${request.description}`,
  ].join("\n");
};
