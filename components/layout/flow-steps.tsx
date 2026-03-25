interface FlowStepItem {
  id: string;
  title: string;
  description: string;
}

interface FlowStepsProps {
  activeStepId: string;
  completedStepIds: string[];
}

const FLOW_STEPS: FlowStepItem[] = [
  {
    id: "brief",
    title: "Paso 1: Describe tu idea",
    description: "Elige el tipo de solucion y explica brevemente lo que el cliente necesita ver.",
  },
  {
    id: "generate",
    title: "Paso 2: Genera el prototipo",
    description: "ProtoAI valida tu solicitud, la clasifica y arma una primera propuesta navegable.",
  },
  {
    id: "adjust",
    title: "Paso 3: Ajusta y revisa",
    description: "Cambia colores, revisa pantallas y usa el resultado para continuar con el alcance real.",
  },
];

export const FlowSteps = ({ activeStepId, completedStepIds }: FlowStepsProps) => {
  return (
    <div className="proto-flow-steps">
      {FLOW_STEPS.map((step, index) => {
        const isActive = step.id === activeStepId;
        const isDone = completedStepIds.includes(step.id);

        return (
          <div
            key={step.id}
            className={`proto-flow-step${isActive ? " is-active" : ""}${isDone ? " is-done" : ""}`}
          >
            <span className="proto-flow-index">{index + 1}</span>
            <div>
              <div className="fw-semibold">{step.title}</div>
              <div className="proto-muted small">{step.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
