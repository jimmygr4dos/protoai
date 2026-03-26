"use client";

import {
  MAX_DESCRIPTION_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  SOLUTION_TYPES,
  type SolutionType,
} from "@/domain";

interface RequestFormProps {
  solutionType: SolutionType;
  description: string;
  isLoading: boolean;
  onSolutionTypeChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onGenerate: () => void;
}

const SOLUTION_LABELS: Record<SolutionType, string> = {
  website: "Sitio web",
  landing_page: "Landing page",
  web_system: "Sistema web",
  dashboard: "Dashboard",
  operational_flow: "Flujo operativo",
  chatbot: "Chatbot",
};

const getCounterTone = (length: number): string => {
  if (length === 0) {
    return "proto-counter is-empty";
  }

  if (length < MIN_DESCRIPTION_LENGTH) {
    return "proto-counter is-low";
  }

  if (length <= MAX_DESCRIPTION_LENGTH) {
    return "proto-counter is-good";
  }

  return "proto-counter is-high";
};

export const RequestForm = ({
  solutionType,
  description,
  isLoading,
  onSolutionTypeChange,
  onDescriptionChange,
  onGenerate,
}: RequestFormProps) => {
  const descriptionLength = description.length;
  const counterTone = getCounterTone(descriptionLength);
  const isOverLimit = descriptionLength > MAX_DESCRIPTION_LENGTH;
  const isGenerateDisabled =
    isLoading || descriptionLength < MIN_DESCRIPTION_LENGTH || descriptionLength > MAX_DESCRIPTION_LENGTH;

  return (
    <div className="proto-panel p-4 d-grid gap-3">
      <div>
        <div className="proto-kicker mb-2">Paso 1</div>
        <h2 className="h4 mb-2">Cuentanos que necesitas prototipar</h2>
        <p className="proto-muted mb-0">
          Escribe como si se lo explicaras a un equipo digital: quien lo usara, que vera y para que servira.
        </p>
      </div>

      <div>
        <label htmlFor="solutionType" className="form-label fw-semibold">
          Tipo de solucion
        </label>
        <select
          id="solutionType"
          className="form-select"
          disabled={isLoading}
          value={solutionType}
          onChange={(event) => onSolutionTypeChange(event.target.value)}
        >
          {SOLUTION_TYPES.map((type) => (
            <option key={type} value={type}>
              {SOLUTION_LABELS[type]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="d-flex justify-content-between gap-3 align-items-end mb-2">
          <label htmlFor="description" className="form-label fw-semibold mb-0">
            Describe tu requerimiento
          </label>
          <span className={counterTone}>{descriptionLength} / {MAX_DESCRIPTION_LENGTH}</span>
        </div>
        <textarea
          id="description"
          className={`form-control${isOverLimit ? " is-invalid" : ""}`}
          disabled={isLoading}
          maxLength={MAX_DESCRIPTION_LENGTH}
          rows={8}
          placeholder="Ejemplo: Necesito un dashboard para jefes de operaciones que les permita revisar pedidos, alertas, tiempos de entrega y KPIs diarios desde celular y desktop. Debe mostrar un resumen, detalle de pedidos y alertas prioritarias."
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
        />
        <div className="form-text d-flex flex-column gap-1">
          <span>Minimo recomendado: {MIN_DESCRIPTION_LENGTH} caracteres. Maximo sugerido: {MAX_DESCRIPTION_LENGTH}.</span>
          <span>Incluye usuario principal, objetivo, secciones o acciones clave y que deberia verse primero.</span>
        </div>
      </div>

      <div className="d-grid gap-2">
        <button
          className="btn btn-lg btn-dark d-inline-flex align-items-center justify-content-center gap-2"
          disabled={isGenerateDisabled}
          onClick={onGenerate}
          type="button"
        >
          {isLoading ? <span className="spinner-border spinner-border-sm" aria-hidden="true" /> : null}
          <span>{isLoading ? "Generando prototipo..." : "Paso 2: Generar prototipo"}</span>
        </button>

        {isLoading ? (
          <div className="proto-inline-status">
            Estamos validando tu solicitud y generando la propuesta. Esto puede tardar unos segundos.
          </div>
        ) : null}
      </div>
    </div>
  );
};
