import type {
  GENERATION_STATE_MACHINE,
  PROTOTYPE_STATE_MACHINE,
  REQUEST_STATE_MACHINE,
  REQUEST_STATUSES,
  SOLUTION_TYPES,
} from "../constants/request";

export type RequestStatus = (typeof REQUEST_STATUSES)[number];
export type SolutionType = (typeof SOLUTION_TYPES)[number];
export type RequestState = (typeof REQUEST_STATE_MACHINE)[number];
export type GenerationState = (typeof GENERATION_STATE_MACHINE)[number];
export type PrototypeState = (typeof PROTOTYPE_STATE_MACHINE)[number];

export interface RequestInput {
  solutionType: string;
  description: string;
}

export interface NormalizedRequestInput {
  solutionType: string;
  description: string;
}

export interface RequestClassificationResult {
  status: RequestStatus;
  reason: string;
  normalizedInput: NormalizedRequestInput;
}

export interface ContactLeadInput {
  fullName: string;
  email: string;
  phone: string;
}
