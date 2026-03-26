"use client";

import { useMemo, useState } from "react";
import type {
  ContactLeadInput,
  PrototypeDefinition,
  PrototypeGenerationResult,
  RequestClassificationResult,
  SolutionType,
} from "@/domain";
import { FlowSteps } from "@/components/layout/flow-steps";
import { RequestForm } from "@/components/request/request-form";
import { PrototypePreview } from "@/components/prototype/prototype-preview";
import { CustomizationPanel } from "@/components/customization/customization-panel";
import { ErrorState } from "@/components/feedback/error-state";
import { SuccessMessage } from "@/components/feedback/success-message";
import { GenerationStep } from "@/components/wizard/generation-step";
import { LeadCapturePanel } from "@/components/contact/lead-capture-panel";

interface GenerateResponse {
  classification: RequestClassificationResult;
  prototypeResult: PrototypeGenerationResult | null;
  validation: {
    isValid: boolean;
    errors: Array<{ field: string; message: string }>;
  } | null;
  error?: string;
}

type WizardStep = "brief" | "generate" | "preview" | "adjust" | "contact";

const SOLUTION_LABELS: Record<SolutionType, string> = {
  website: "Sitio web",
  landing_page: "Landing page",
  web_system: "Sistema web",
  dashboard: "Dashboard",
  operational_flow: "Flujo operativo",
  chatbot: "Chatbot",
};

const STATUS_LABELS: Record<string, string> = {
  valid: "Valido",
  insufficient: "Falta detalle",
  invalid: "Invalido",
};

const STEP_CONTENT: Record<WizardStep, { title: string; helper: string }> = {
  brief: {
    title: "Paso 1. Define tu requerimiento",
    helper: "Empieza con lo esencial para que ProtoAI pueda interpretar bien la idea.",
  },
  generate: {
    title: "Paso 2. Validacion y generacion",
    helper: "El sistema clasifica el brief y arma la primera propuesta navegable.",
  },
  preview: {
    title: "Paso 3. Revisa el resultado",
    helper: "Confirma si el prototipo ya representa la idea principal antes de seguir.",
  },
  adjust: {
    title: "Paso 4. Ajusta la propuesta",
    helper: "Aplica cambios visuales mientras observas el preview en tiempo real.",
  },
  contact: {
    title: "Paso 5. Cierra la solicitud",
    helper: "Deja tus datos para continuar con la siguiente conversacion del proyecto.",
  },
};

export const ProtoAIWorkspace = () => {
  const [solutionType, setSolutionType] = useState<SolutionType>("website");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [classification, setClassification] = useState<RequestClassificationResult | null>(null);
  const [prototype, setPrototype] = useState<PrototypeDefinition | null>(null);
  const [prototypeResult, setPrototypeResult] = useState<PrototypeGenerationResult | null>(null);
  const [currentStep, setCurrentStep] = useState<WizardStep>("brief");

  const canCustomize = useMemo(() => Boolean(prototype), [prototype]);
  const shouldShowPreview = currentStep === "preview" || currentStep === "adjust" || currentStep === "contact";
  const currentStepContent = STEP_CONTENT[currentStep];
  const completedStepIds = useMemo(() => {
    const completed: string[] = [];

    if (description.trim().length > 0) {
      completed.push("brief");
    }

    if (classification) {
      completed.push("generate");
    }

    if (prototype) {
      completed.push("preview", "adjust");
    }

    if (statusMessage?.toLowerCase().includes("solicitud") || statusMessage?.toLowerCase().includes("registro")) {
      completed.push("contact");
    }

    return completed;
  }, [classification, description, prototype, statusMessage]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setStatusMessage(null);
    setClassification(null);
    setPrototype(null);
    setPrototypeResult(null);
    setCurrentStep("generate");

    try {
      const response = await fetch("/api/generate-prototype", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ solutionType, description }),
      });

      const data = (await response.json()) as GenerateResponse;
      setClassification(data.classification);
      setPrototypeResult(data.prototypeResult);

      if (!response.ok) {
        setPrototype(null);
        setErrorMessage(data.error ?? data.classification.reason);
        return;
      }

      if (!data.prototypeResult?.prototype || !data.validation?.isValid) {
        setPrototype(null);
        setErrorMessage("No se pudo interpretar correctamente la respuesta de IA. Intenta generar el prototipo nuevamente.");
        return;
      }

      setPrototype(data.prototypeResult.prototype);
      setCurrentStep("preview");
      setStatusMessage("Tu prototipo ya esta listo para revisarlo y ajustarlo.");
    } catch {
      setPrototype(null);
      setErrorMessage("No se pudo generar el prototipo. Intentalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomize = async (primaryColor: string, secondaryColor: string) => {
    if (!prototype) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      const response = await fetch("/api/apply-customization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prototype,
          changes: { primaryColor, secondaryColor },
        }),
      });

      const data = (await response.json()) as { prototype: PrototypeDefinition };

      if (!response.ok) {
        setErrorMessage("No se pudieron aplicar los cambios visuales.");
        return;
      }

      setPrototype(data.prototype);
      setStatusMessage("Se actualizaron los colores del preview.");
    } catch {
      setErrorMessage("La personalizacion fallo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (lead: ContactLeadInput) => {
    if (!prototype) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/submit-prototype", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prototype, lead }),
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setErrorMessage(data.error ?? "No se pudo simular el envio del prototipo.");
        return;
      }

      setStatusMessage(data.message ?? "Se registro tu solicitud correctamente.");
    } catch {
      setErrorMessage("La simulacion de envio fallo.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "brief":
        return (
          <RequestForm
            description={description}
            isLoading={isLoading}
            solutionType={solutionType}
            onDescriptionChange={setDescription}
            onGenerate={handleGenerate}
            onSolutionTypeChange={(value) => setSolutionType(value as SolutionType)}
          />
        );
      case "generate":
        return (
          <GenerationStep
            classification={classification}
            errorMessage={errorMessage}
            isLoading={isLoading}
            onBack={() => setCurrentStep("brief")}
            onContinue={() => setCurrentStep("preview")}
          />
        );
      case "preview":
        return (
          <div className="proto-panel p-4 p-lg-5 d-grid gap-4">
            <div className="proto-mini-card p-3 d-grid gap-2">
              <div className="fw-semibold">Que revisar en este paso</div>
              <div className="proto-muted small">
                Evalua pantallas, estructura y enfoque general. Si la propuesta va bien, continua con los ajustes visuales.
              </div>
            </div>

            <div className="d-flex flex-column flex-sm-row gap-2 justify-content-end">
              <button className="btn btn-outline-dark" type="button" onClick={() => setCurrentStep("generate")}>
                Ver validacion
              </button>
              <button className="btn btn-dark" disabled={!prototype} type="button" onClick={() => setCurrentStep("adjust")}>
                Ir a ajustes
              </button>
            </div>
          </div>
        );
      case "adjust":
        return (
          <CustomizationPanel
            disabled={!canCustomize || isLoading}
            onApply={handleCustomize}
            onBack={() => setCurrentStep("preview")}
            onContinue={() => setCurrentStep("contact")}
          />
        );
      case "contact":
        return (
          <LeadCapturePanel
            disabled={!prototype || isLoading}
            onBack={() => setCurrentStep("adjust")}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="d-flex flex-column gap-3">
      <section className="proto-toolbar">
        <div>
          <div className="proto-toolbar-brand">ProtoAI</div>
          <div className="proto-toolbar-helper">Genera un prototipo guiado en pocos pasos.</div>
        </div>
        <div className="proto-toolbar-step">
          <div className="proto-kicker mb-1">Paso actual</div>
          <div className="fw-semibold">{currentStepContent.title}</div>
          <div className="proto-muted small">{currentStepContent.helper}</div>
        </div>
      </section>

      <FlowSteps activeStepId={currentStep} completedStepIds={completedStepIds} />

      {errorMessage && currentStep !== "generate" ? <ErrorState message={errorMessage} /> : null}
      {statusMessage ? <SuccessMessage message={statusMessage} /> : null}

      <section className={`proto-wizard-stage${shouldShowPreview ? " has-preview" : ""}`}>
        <div className="proto-wizard-main">{renderCurrentStep()}</div>

        {shouldShowPreview ? (
          <div className="proto-wizard-preview">
            <PrototypePreview
              classification={classification}
              prototype={prototype}
              prototypeResult={prototypeResult}
              statusLabels={STATUS_LABELS}
              solutionLabels={SOLUTION_LABELS}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
};
