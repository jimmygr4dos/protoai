"use client";

import { useMemo, useState } from "react";
import type { PrototypeDefinition } from "@/domain";
import { renderPrototypeScreen } from "@/renderer/core/render-prototype-screen";

type PreviewMode = "mobile" | "desktop";

const PREVIEW_MODE_CONTENT: Record<PreviewMode, { title: string; description: string }> = {
  mobile: {
    title: "Vista mobile prioritaria",
    description: "Mostramos primero la experiencia en celular para que el cliente revise la propuesta principal de forma rapida.",
  },
  desktop: {
    title: "Vista desktop de referencia",
    description: "Usa esta vista para revisar jerarquia, amplitud de contenido y lectura en pantallas mas grandes.",
  },
};

export const PrototypeCanvas = ({ prototype }: { prototype: PrototypeDefinition }) => {
  const [activeScreenId, setActiveScreenId] = useState(prototype.screens[0]?.id ?? "");
  const [previewMode, setPreviewMode] = useState<PreviewMode>("mobile");

  const activeScreen = useMemo(() => {
    return prototype.screens.find((screen) => screen.id === activeScreenId) ?? prototype.screens[0];
  }, [activeScreenId, prototype.screens]);

  const modeContent = PREVIEW_MODE_CONTENT[previewMode];
  const theme = prototype.mock_data.theme;
  const previewStyle =
    theme && typeof theme === "object"
      ? {
          ["--proto-primary" as string]: String((theme as Record<string, unknown>).primaryColor ?? "#0f766e"),
          ["--proto-secondary" as string]: String((theme as Record<string, unknown>).secondaryColor ?? "#f97316"),
        }
      : undefined;

  return (
    <div className="d-flex flex-column gap-3" style={previewStyle}>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div className="proto-device-controls">
          <div className="proto-device-toggle" role="tablist" aria-label="Cambiar vista de dispositivo">
            <button
              aria-pressed={previewMode === "mobile"}
              className={`proto-device-button${previewMode === "mobile" ? " is-active" : ""}`}
              type="button"
              onClick={() => setPreviewMode("mobile")}
            >
              Mobile
            </button>
            <button
              aria-pressed={previewMode === "desktop"}
              className={`proto-device-button${previewMode === "desktop" ? " is-active" : ""}`}
              type="button"
              onClick={() => setPreviewMode("desktop")}
            >
              Desktop
            </button>
          </div>
          <div className="proto-device-caption">
            <strong>{modeContent.title}</strong>
            <span>{modeContent.description}</span>
          </div>
        </div>
      </div>

      {prototype.screens.length > 1 ? (
        <div className="proto-screen-tabs">
          {prototype.screens.map((screen, index) => (
            <button
              key={screen.id}
              className={`proto-screen-tab${screen.id === activeScreen?.id ? " is-active" : ""}`}
              type="button"
              onClick={() => setActiveScreenId(screen.id)}
            >
              {index + 1}. {screen.name}
            </button>
          ))}
        </div>
      ) : null}

      <div className={`proto-device-stage is-${previewMode}`}>
        <div className={`proto-device-frame is-${previewMode}`}>
          <div className={`proto-device-shell is-${previewMode}`}>
            <div className={`proto-device-chrome is-${previewMode}`}>
              {previewMode === "mobile" ? (
                <>
                  <div className="proto-phone-speaker" />
                  <div className="proto-phone-camera" />
                </>
              ) : (
                <>
                  <span className="proto-desktop-dot is-red" />
                  <span className="proto-desktop-dot is-amber" />
                  <span className="proto-desktop-dot is-green" />
                </>
              )}
            </div>
            <div className={`proto-device-viewport is-${previewMode}`}>
              <div className="proto-screen-surface">
                {activeScreen ? renderPrototypeScreen(activeScreen) : null}
              </div>
            </div>
          </div>
          {previewMode === "desktop" ? <div className="proto-desktop-base" /> : null}
        </div>
      </div>
    </div>
  );
};
