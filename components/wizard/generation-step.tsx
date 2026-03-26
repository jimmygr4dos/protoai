import type { RequestClassificationResult } from "@/domain";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";

interface GenerationStepProps {
  isLoading: boolean;
  classification: RequestClassificationResult | null;
  errorMessage: string | null;
  onBack: () => void;
  onContinue: () => void;
}

export const GenerationStep = ({
  isLoading,
  classification,
  errorMessage,
  onBack,
  onContinue,
}: GenerationStepProps) => {
  const canContinue = classification?.status === "valid" && !errorMessage;

  return (
    <div className="proto-panel p-4 p-lg-5 d-grid gap-4">
      <div>
        <div className="proto-kicker mb-2">Paso 2</div>
        <h2 className="h4 mb-2">Validando y generando el prototipo</h2>
        <p className="proto-muted mb-0">
          En este paso ProtoAI revisa si el requerimiento es claro, valida que este dentro del alcance del MVP y arma la propuesta inicial.
        </p>
      </div>

      {isLoading ? (
        <LoadingState message="Estamos validando tu solicitud y armando el prototipo. Esto puede tardar unos segundos." />
      ) : null}

      {classification ? (
        <div className="proto-summary-box d-grid gap-3">
          <div>
            <div className="fw-semibold">Resultado de la validacion</div>
            <div className="proto-muted small">Estado detectado por el sistema antes de mostrar el prototipo.</div>
          </div>
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <span className="badge text-bg-dark rounded-pill px-3 py-2">{classification.status}</span>
          </div>
          <p className="proto-muted mb-0">{classification.reason}</p>
        </div>
      ) : null}

      {errorMessage ? <ErrorState message={errorMessage} /> : null}

      {!isLoading && !classification && !errorMessage ? (
        <div className="proto-mini-card p-3">
          <div className="proto-muted small mb-0">Aun no hay resultado disponible para este paso.</div>
        </div>
      ) : null}

      <div className="d-flex flex-column flex-sm-row gap-2 justify-content-between">
        <button className="btn btn-outline-dark" disabled type="button" onClick={onBack}>
          Volver al brief
        </button>
        {canContinue ? (
          <button className="btn btn-dark" type="button" onClick={onContinue}>
            Paso 3: Ver resultado
          </button>
        ) : null}
      </div>
    </div>
  );
};
