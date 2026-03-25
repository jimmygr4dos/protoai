"use client";

import { useMemo, useState } from "react";
import type {
  ContactLeadInput,
  PrototypeDefinition,
  PrototypeGenerationResult,
  RequestClassificationResult,
  SolutionType,
} from "@/domain";
import { SOLUTION_TYPES } from "@/domain";
import { FlowSteps } from "@/components/layout/flow-steps";
import { RequestForm } from "@/components/request/request-form";
import { PrototypePreview } from "@/components/prototype/prototype-preview";
import { CustomizationPanel } from "@/components/customization/customization-panel";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";
import { SuccessMessage } from "@/components/feedback/success-message";

interface GenerateResponse {
  classification: RequestClassificationResult;
  prototypeResult: PrototypeGenerationResult | null;
  validation: {
    isValid: boolean;
    errors: Array<{ field: string; message: string }>;
  } | null;
  error?: string;
}

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

export const ProtoAIWorkspace = () => {
  const [solutionType, setSolutionType] = useState<SolutionType>("website");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [classification, setClassification] = useState<RequestClassificationResult | null>(null);
  const [prototype, setPrototype] = useState<PrototypeDefinition | null>(null);
  const [prototypeResult, setPrototypeResult] = useState<PrototypeGenerationResult | null>(null);

  const canCustomize = useMemo(() => Boolean(prototype), [prototype]);
  const activeStepId = prototype ? "adjust" : isLoading ? "generate" : "brief";
  const completedStepIds = useMemo(() => {
    const completed: string[] = [];

    if (description.trim().length > 0) {
      completed.push("brief");
    }

    if (prototype) {
      completed.push("generate");
    }

    return completed;
  }, [description, prototype]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setStatusMessage(null);

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

  return (
    <div className="d-flex flex-column gap-4">
      <section className="proto-panel p-4 p-lg-5 overflow-hidden">
        <div className="row g-4 align-items-end">
          <div className="col-lg-8 d-grid gap-3">
            <div className="proto-kicker">ProtoAI MVP</div>
            <h1 className="proto-hero-title m-0">Convierte una idea en un prototipo navegable.</h1>
            <p className="lead proto-muted mb-0">
              Completa un brief corto, genera una propuesta visual y usala para alinear alcance antes
              de pasar a desarrollo.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <span className="proto-chip">Flujo guiado</span>
              <span className="proto-chip">JSON estructurado</span>
              <span className="proto-chip">Preview controlado</span>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="proto-info-card d-grid gap-3">
              <div>
                <div className="proto-kicker mb-2">Alcance actual</div>
                <h2 className="h5 mb-1">MVP para validar rapidamente</h2>
                <p className="proto-muted mb-0">
                  Sirve para aterrizar ideas, mostrar algo tangible y preparar la siguiente etapa del proyecto.
                </p>
              </div>
              <div className="d-flex flex-wrap gap-2">
                {SOLUTION_TYPES.map((type) => (
                  <span key={type} className="badge rounded-pill proto-badge-soft px-3 py-2">
                    {SOLUTION_LABELS[type]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="proto-grid align-items-start">
        <div className="proto-sidebar">
          <FlowSteps activeStepId={activeStepId} completedStepIds={completedStepIds} />

          <RequestForm
            description={description}
            isLoading={isLoading}
            solutionType={solutionType}
            onDescriptionChange={setDescription}
            onGenerate={handleGenerate}
            onSolutionTypeChange={(value) => setSolutionType(value as SolutionType)}
          />

          <CustomizationPanel
            disabled={!canCustomize || isLoading}
            onApply={handleCustomize}
            onSubmit={handleSubmit}
          />

          {isLoading ? <LoadingState message="Estamos validando tu solicitud y armando el prototipo..." /> : null}
          {errorMessage ? <ErrorState message={errorMessage} /> : null}
          {statusMessage ? <SuccessMessage message={statusMessage} /> : null}
        </div>

        <PrototypePreview
          classification={classification}
          prototype={prototype}
          prototypeResult={prototypeResult}
          statusLabels={STATUS_LABELS}
          solutionLabels={SOLUTION_LABELS}
        />
      </section>
    </div>
  );
};
