import type { PrototypeDefinition } from "../../domain";
import type { ContactLeadInput } from "../../domain";

export interface PrototypeSubmissionReceipt {
  status: "submitted";
  message: string;
  submittedAt: string;
  prototypeName: string;
  lead: ContactLeadInput;
}

const isValidEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const isValidPhone = (value: string): boolean => {
  const normalized = value.replace(/\s+/g, "");
  return /^\+?[0-9]{7,15}$/.test(normalized);
};

export const submitPrototype = (
  prototype: PrototypeDefinition,
  lead: ContactLeadInput,
): PrototypeSubmissionReceipt => {
  if (!lead.fullName.trim()) {
    throw new Error("Debes ingresar tu nombre o razon social.");
  }

  if (!isValidEmail(lead.email.trim())) {
    throw new Error("Debes ingresar un correo valido.");
  }

  if (!isValidPhone(lead.phone.trim())) {
    throw new Error("Debes ingresar un telefono valido.");
  }

  return {
    status: "submitted",
    message: "Listo. Registramos tus datos y se simulo el siguiente paso del proyecto.",
    submittedAt: new Date().toISOString(),
    prototypeName: prototype.name,
    lead: {
      fullName: lead.fullName.trim(),
      email: lead.email.trim(),
      phone: lead.phone.trim(),
    },
  };
};
