export const parseJsonResponse = (rawResponse: string): unknown => {
  const trimmed = rawResponse.trim();

  if (!trimmed) {
    throw new Error("AI response is empty.");
  }

  const normalized = trimmed
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  return JSON.parse(normalized);
};


