interface FlowStepItem {
  id: string;
  title: string;
}

interface FlowStepsProps {
  activeStepId: string;
  completedStepIds: string[];
}

const FLOW_STEPS: FlowStepItem[] = [
  { id: "brief", title: "Brief" },
  { id: "generate", title: "Generacion" },
  { id: "preview", title: "Resultado" },
  { id: "adjust", title: "Ajustes" },
  { id: "contact", title: "Cierre" },
];

export const FlowSteps = ({ activeStepId, completedStepIds }: FlowStepsProps) => {
  return (
    <div className="proto-step-strip" aria-label="Flujo del prototipo">
      {FLOW_STEPS.map((step, index) => {
        const isActive = step.id === activeStepId;
        const isDone = completedStepIds.includes(step.id);

        return (
          <div
            key={step.id}
            className={`proto-step-pill${isActive ? " is-active" : ""}${isDone ? " is-done" : ""}`}
          >
            <span className="proto-step-pill-index">{index + 1}</span>
            <span className="proto-step-pill-label">{step.title}</span>
          </div>
        );
      })}
    </div>
  );
};
