import type { PrototypeDefinition, SolutionType } from "@/domain";

interface PrototypeSummaryProps {
  prototype: PrototypeDefinition;
  solutionLabel: string;
  solutionType: SolutionType;
}

const getRecommendedNextStep = (solutionType: SolutionType): string => {
  switch (solutionType) {
    case "website":
    case "landing_page":
      return "Definir contenido final, estructura de conversion y lineamientos visuales de marca.";
    case "dashboard":
      return "Priorizar indicadores, fuentes de datos y reglas de visualizacion para el desarrollo real.";
    case "chatbot":
      return "Disenar intenciones, respuestas esperadas, casos borde y escalamiento a soporte humano.";
    case "web_system":
      return "Mapear modulos, roles y flujo principal antes de pasar al backlog funcional.";
    case "operational_flow":
      return "Validar actores, pasos criticos, excepciones y puntos de control del proceso.";
    default:
      return "Convertir este prototipo en un alcance funcional con prioridades, exclusiones y siguiente fase.";
  }
};

export const PrototypeSummary = ({ prototype, solutionLabel, solutionType }: PrototypeSummaryProps) => {
  const nextStep = getRecommendedNextStep(solutionType);

  return (
    <div className="proto-summary-box d-grid gap-3">
      <div>
        <div className="proto-kicker mb-2">Resumen de solicitud</div>
        <h3 className="h5 mb-2">Lo que esta propuesta ya aterriza</h3>
        <p className="proto-muted mb-0">{prototype.summary}</p>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="proto-mini-card p-3 h-100 d-grid gap-2">
            <div className="small proto-muted">Tipo de solucion</div>
            <strong>{solutionLabel}</strong>
            <div className="small proto-muted">{prototype.screens.length} pantallas estructuradas para esta primera version.</div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="proto-mini-card p-3 h-100 d-grid gap-2">
            <div className="small proto-muted">Siguiente paso recomendado</div>
            <strong>Pasar a definicion</strong>
            <div className="small proto-muted">{nextStep}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
