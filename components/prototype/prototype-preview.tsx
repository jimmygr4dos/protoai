import type {
  PrototypeDefinition,
  PrototypeGenerationResult,
  RequestClassificationResult,
  SolutionType,
} from "@/domain";
import { PrototypeCanvas } from "@/components/prototype/prototype-canvas";
import { PrototypeSummary } from "@/components/prototype/prototype-summary";

interface PrototypePreviewProps {
  classification: RequestClassificationResult | null;
  prototype: PrototypeDefinition | null;
  prototypeResult: PrototypeGenerationResult | null;
  statusLabels: Record<string, string>;
  solutionLabels: Record<SolutionType, string>;
}

export const PrototypePreview = ({
  classification,
  prototype,
  prototypeResult,
  statusLabels,
  solutionLabels,
}: PrototypePreviewProps) => {
  const solutionType = prototypeResult?.solution_type as SolutionType | undefined;
  const totalComponents = prototype?.screens.reduce((total, screen) => total + screen.components.length, 0) ?? 0;
  const solutionLabel = solutionType ? solutionLabels[solutionType] : "No definido";

  return (
    <div className="proto-panel proto-preview p-4 p-lg-5 d-flex flex-column gap-4">
      <div className="proto-preview-topline">
        <div className="proto-preview-header">
          <div className="proto-kicker">Resultado</div>
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <span className="badge text-bg-dark rounded-pill px-3 py-2">
              {statusLabels[classification?.status ?? ""] ?? "Pendiente"}
            </span>
            <span className="badge text-bg-light rounded-pill px-3 py-2 border">
              {solutionType ? solutionLabel : "Aun sin brief"}
            </span>
            <span className="badge rounded-pill proto-badge-soft px-3 py-2">
              {prototype?.screens.length ?? 0} pantallas
            </span>
          </div>
          <p className="proto-muted mb-0">
            {classification?.reason ??
              "Aqui veras el prototipo apenas termine la validacion y la generacion de la propuesta."}
          </p>
        </div>

        {prototype ? (
          <div className="proto-preview-stats">
            <div className="proto-preview-stat">
              <div className="small proto-muted">Nombre de propuesta</div>
              <strong>{prototype.name}</strong>
            </div>
            <div className="proto-preview-stat">
              <div className="small proto-muted">Pantallas</div>
              <strong>{prototype.screens.length}</strong>
            </div>
            <div className="proto-preview-stat">
              <div className="small proto-muted">Componentes</div>
              <strong>{totalComponents}</strong>
            </div>
            <div className="proto-preview-stat">
              <div className="small proto-muted">Navegacion</div>
              <strong>{prototype.navigation_type === "multi_view" ? "Multipantalla" : "Una sola vista"}</strong>
            </div>
          </div>
        ) : null}
      </div>

      <div className="proto-preview-canvas p-3 p-lg-4">
        {prototype ? (
          <PrototypeCanvas prototype={prototype} />
        ) : (
          <div className="h-100 d-flex flex-column justify-content-center align-items-center text-center px-4">
            <h3 className="h4 mb-3">Todavia no hay prototipo</h3>
            <p className="proto-muted mb-0">
              Completa el paso 1 y genera el prototipo para revisar pantallas, estructura y enfoque inicial.
            </p>
          </div>
        )}
      </div>

      {prototype && solutionType ? (
        <PrototypeSummary prototype={prototype} solutionLabel={solutionLabel} solutionType={solutionType} />
      ) : null}
    </div>
  );
};
