"use client";

import { useState } from "react";
import type { ContactLeadInput } from "@/domain";

interface LeadCapturePanelProps {
  disabled: boolean;
  onBack: () => void;
  onSubmit: (lead: ContactLeadInput) => void;
}

export const LeadCapturePanel = ({ disabled, onBack, onSubmit }: LeadCapturePanelProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="proto-panel p-4 p-lg-5 d-grid gap-4">
      <div>
        <div className="proto-kicker mb-2">Paso 5</div>
        <h2 className="h4 mb-2">Deja tus datos para continuar</h2>
        <p className="proto-muted mb-0">
          Ya tienes una base visual. Ahora comparte tus datos para usar este prototipo como punto de partida de la siguiente etapa.
        </p>
      </div>

      <div className="proto-summary-box d-grid gap-3">
        <div>
          <div className="fw-semibold">Datos de contacto</div>
          <div className="proto-muted small">
            Esto nos permite contactarte y continuar la conversacion usando el prototipo generado.
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

      <div className="d-flex flex-column flex-sm-row gap-2 justify-content-between">
        <button className="btn btn-outline-dark" type="button" onClick={onBack}>
          Volver a ajustes
        </button>
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
          Finalizar y simular siguiente paso
        </button>
      </div>
    </div>
  );
};
