import type { PrototypeDefinition, PrototypeGenerationResult, RequestClassificationResult, SolutionType } from "@/domain";
import { PrototypeCanvas } from "@/components/prototype/prototype-canvas";

interface PrototypePreviewProps {
  classification: RequestClassificationResult | null;
  prototype: PrototypeDefinition | null;
  prototypeResult: PrototypeGenerationResult | null;
  statusLabels: Record<string, string>;
  solutionLabels: Record<SolutionType, string>;
}

export const PrototypePreview = ({
  prototype,
}: PrototypePreviewProps) => {
  return (
    <div className="proto-panel proto-preview p-4 p-lg-5 d-flex flex-column gap-4">
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
    </div>
  );
};
