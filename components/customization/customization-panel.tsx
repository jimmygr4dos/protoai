"use client";

import { useState } from "react";

interface CustomizationPanelProps {
  disabled: boolean;
  onApply: (primaryColor: string, secondaryColor: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const CustomizationPanel = ({ disabled, onApply, onBack, onContinue }: CustomizationPanelProps) => {
  const [primaryColor, setPrimaryColor] = useState("#0f766e");
  const [secondaryColor, setSecondaryColor] = useState("#f97316");

  return (
    <div className="proto-panel p-4 p-lg-5 d-grid gap-4">
      <div>
        <div className="proto-kicker mb-2">Paso 4</div>
        <h2 className="h4 mb-2">Ajusta el estilo de la propuesta</h2>
        <p className="proto-muted mb-0">
          Usa el preview para validar como se ve el prototipo mientras aplicas cambios visuales basicos.
        </p>
      </div>

      <div className="row g-3">
        <div className="col-6">
          <label htmlFor="primaryColor" className="form-label fw-semibold">
            Color principal
          </label>
          <input
            id="primaryColor"
            className="form-control form-control-color w-100"
            disabled={disabled}
            type="color"
            value={primaryColor}
            onChange={(event) => setPrimaryColor(event.target.value)}
          />
        </div>
        <div className="col-6">
          <label htmlFor="secondaryColor" className="form-label fw-semibold">
            Color secundario
          </label>
          <input
            id="secondaryColor"
            className="form-control form-control-color w-100"
            disabled={disabled}
            type="color"
            value={secondaryColor}
            onChange={(event) => setSecondaryColor(event.target.value)}
          />
        </div>
      </div>

      <div className="proto-mini-card p-3 d-grid gap-2">
        <div className="fw-semibold">Que validar en este paso</div>
        <div className="proto-muted small">
          Revisa si la jerarquia visual, el color principal y el color de apoyo ayudan a entender mejor la propuesta.
        </div>
      </div>

      <div className="d-flex flex-column flex-sm-row gap-2 justify-content-between">
        <button className="btn btn-outline-dark" type="button" onClick={onBack}>
          Volver al resultado
        </button>
        <div className="d-flex flex-column flex-sm-row gap-2">
          <button className="btn btn-outline-dark" disabled={disabled} type="button" onClick={() => onApply(primaryColor, secondaryColor)}>
            Aplicar estilo al preview
          </button>
          <button className="btn btn-dark" disabled={disabled} type="button" onClick={onContinue}>
            Paso 5: Continuar
          </button>
        </div>
      </div>
    </div>
  );
};
