export const REQUEST_STATUSES = ["valid", "insufficient", "invalid"] as const;

export const SOLUTION_TYPES = [
  "website",
  "landing_page",
  "web_system",
  "dashboard",
  "operational_flow",
  "chatbot",
] as const;

export const REQUEST_STATE_MACHINE = [
  "REQUEST_IDLE",
  "REQUEST_VALIDATING",
  "REQUEST_INVALID",
  "REQUEST_INSUFFICIENT",
  "REQUEST_VALID",
] as const;

export const GENERATION_STATE_MACHINE = [
  "GENERATION_PENDING",
  "GENERATION_RUNNING",
  "GENERATION_SUCCESS",
  "GENERATION_FAILED",
] as const;

export const PROTOTYPE_STATE_MACHINE = [
  "PROTOTYPE_READY",
  "PROTOTYPE_ADJUSTED",
  "PROTOTYPE_APPROVED",
  "PROTOTYPE_SUBMITTED",
] as const;


