"use client";

import { useState } from "react";
import type { ContactLeadInput } from "@/domain";

interface CustomizationPanelProps {
  disabled: boolean;
  onApply: (primaryColor: string, secondaryColor: string) => void;
  onSubmit: (lead: ContactLeadInput) => void;
}

export const CustomizationPanel = ({ disabled, onApply, onSubmit }: CustomizationPanelProps) => {
  const [primaryColor, setPrimaryColor] = useState("#0f766e");
  const [secondaryColor, setSecondaryColor] = useState("#f97316");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="proto-panel p-4 d-grid gap-3">
      <div>
        <div className="proto-kicker mb-2">Paso 3</div>
        <h2 className="h5 mb-2">Ajusta y deja tus datos para continuar</h2>
        <p className="proto-muted mb-0">
          Primero revisa el preview. Cuando te sirva como base, deja tus datos para pasar al siguiente paso.
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

      <button
        className="btn btn-outline-dark"
        disabled={disabled}
        type="button"
        onClick={() => onApply(primaryColor, secondaryColor)}
      >
        Aplicar estilo al preview
      </button>

      <div className="proto-summary-box d-grid gap-3">
        <div>
          <div className="fw-semibold">Datos para continuar con tu solicitud</div>
          <div className="proto-muted small">
            Esto nos sirve para contactarte y usar el prototipo como base de la siguiente conversacion.
          </div>
        </div>

        <div>
          <label htmlFor="fullName" className="form-label fw-semibold">
            Nombre o razon social
          </label>
          <input
            id="fullName"
            className="form-control"
            disabled={disabled}
            placeholder="Ejemplo: Juan Perez / Comercial Andina SAC"
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email" className="form-label fw-semibold">
            Correo electronico
          </label>
          <input
            id="email"
            className="form-control"
            disabled={disabled}
            placeholder="Ejemplo: juan@empresa.com"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="phone" className="form-label fw-semibold">
            Telefono
          </label>
          <input
            id="phone"
            className="form-control"
            disabled={disabled}
            placeholder="Ejemplo: +51 999 888 777"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
      </div>

      <button
        className="btn btn-warning"
        disabled={disabled}
        type="button"
        onClick={() =>
          onSubmit({
            fullName,
            email,
            phone,
          })
        }
      >
        Simular siguiente paso
      </button>
    </div>
  );
};
