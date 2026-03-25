import type { PrototypeComponent } from "@/domain";

const toDisplayString = (value: unknown, fallback: string): string => {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const candidate = value as Record<string, unknown>;

    return String(
      candidate.label ??
        candidate.title ??
        candidate.name ??
        candidate.text ??
        candidate.value ??
        fallback,
    );
  }

  return fallback;
};

const asStringArray = (value: unknown): string[] => {
  return Array.isArray(value)
    ? value.map((item, index) => toDisplayString(item, `item-${index + 1}`))
    : [];
};

const asRecordArray = (value: unknown): Array<Record<string, unknown>> => {
  return Array.isArray(value)
    ? value.filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
    : [];
};

export const CardsBlock = ({ component }: { component: PrototypeComponent }) => {
  const cards = asRecordArray(component.props.items);

  return (
    <section className="proto-block p-4">
      <div className="proto-kicker mb-2">Seccion</div>
      <h3 className="h5 mb-3">{component.label}</h3>
      <div className="proto-card-grid">
        {cards.map((card, index) => (
          <article key={`${component.type}-${index}`} className="proto-mini-card p-3 d-grid gap-2">
            <strong>{String(card.title ?? card.label ?? `Bloque ${index + 1}`)}</strong>
            <span className="proto-muted small">
              {String(card.description ?? card.text ?? "Contenido del prototipo")}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
};

export const StatsBlock = ({ component }: { component: PrototypeComponent }) => {
  const stats = asRecordArray(component.props.items);

  return (
    <section className="proto-block p-4">
      <div className="proto-kicker mb-2">Indicadores</div>
      <h3 className="h5 mb-3">{component.label}</h3>
      <div className="proto-stat-grid">
        {stats.map((stat, index) => (
          <article key={`${component.type}-${index}`} className="proto-mini-card p-3">
            <div className="small proto-muted mb-1">{String(stat.label ?? `Metrica ${index + 1}`)}</div>
            <div className="h4 mb-0">{String(stat.value ?? "--")}</div>
          </article>
        ))}
      </div>
    </section>
  );
};

export const ListBlock = ({ component }: { component: PrototypeComponent }) => {
  const items = asStringArray(component.props.items);

  return (
    <section className="proto-block p-4">
      <div className="proto-kicker mb-2">Listado</div>
      <h3 className="h5 mb-3">{component.label}</h3>
      <div className="d-grid gap-2">
        {items.map((item, index) => (
          <div key={`${component.type}-${index}`} className="proto-mini-card p-3">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export const SummaryBlock = ({ component }: { component: PrototypeComponent }) => {
  const summary = typeof component.props.summary === "string" ? component.props.summary : component.label;
  const bullets = asStringArray(component.props.bullets);

  return (
    <section className="proto-block p-4 d-grid gap-3">
      <div>
        <div className="proto-kicker mb-2">Resumen</div>
        <h3 className="h5 mb-2">{component.label}</h3>
        <p className="proto-muted mb-0">{summary}</p>
      </div>
      {bullets.length > 0 ? (
        <div className="d-grid gap-2">
          {bullets.map((item, index) => (
            <div key={`${component.type}-${index}`} className="proto-chip">
              {item}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export const TableBlock = ({ component }: { component: PrototypeComponent }) => {
  const columns = asStringArray(component.props.columns);
  const rows = asRecordArray(component.props.rows);

  return (
    <section className="proto-block p-4">
      <div className="proto-kicker mb-2">Tabla</div>
      <h3 className="h5 mb-3">{component.label}</h3>
      <div className="proto-table-wrap">
        <table className="proto-fake-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={`${component.type}-column-${index}`}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${component.type}-${index}`}>
                {columns.map((column, columnIndex) => (
                  <td key={`${index}-${columnIndex}`}>{String(row[column] ?? "-")}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export const StepsBlock = ({ component }: { component: PrototypeComponent }) => {
  const items = asRecordArray(component.props.items);

  return (
    <section className="proto-block p-4">
      <div className="proto-kicker mb-2">Flujo</div>
      <h3 className="h5 mb-3">{component.label}</h3>
      <div className="d-grid gap-2">
        {items.map((item, index) => (
          <div key={`${component.type}-${index}`} className="proto-step-item p-3">
            <div className="small proto-muted mb-1">Paso {index + 1}</div>
            <strong>{String(item.title ?? item.label ?? `Etapa ${index + 1}`)}</strong>
            <div className="proto-muted small mt-1">
              {String(item.description ?? item.text ?? "Paso del prototipo")}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const FormBlock = ({ component }: { component: PrototypeComponent }) => {
  const fields = asStringArray(component.props.fields);

  return (
    <section className="proto-block p-4">
      <div className="proto-kicker mb-2">Formulario</div>
      <h3 className="h5 mb-3">{component.label}</h3>
      <div className="proto-form-grid">
        {fields.map((field, index) => (
          <div key={`${component.type}-${index}`} className="proto-form-field">
            <label className="small fw-semibold">{field}</label>
            <div className="proto-input-shell" />
          </div>
        ))}
      </div>
    </section>
  );
};

export const TabsBlock = ({ component }: { component: PrototypeComponent }) => {
  const tabs = asStringArray(component.props.items);

  return (
    <section className="proto-block p-4 d-grid gap-3">
      <div>
        <div className="proto-kicker mb-2">Pestanias</div>
        <h3 className="h5 mb-0">{component.label}</h3>
      </div>
      <div className="proto-screen-tabs">
        {tabs.map((tab, index) => (
          <span key={`${component.type}-${index}`} className={`proto-screen-tab${index === 0 ? " is-active" : ""}`}>
            {tab}
          </span>
        ))}
      </div>
    </section>
  );
};

export const ChatBlock = ({ component }: { component: PrototypeComponent }) => {
  const messages = asRecordArray(component.props.items);

  return (
    <section className="proto-block p-4">
      <div className="proto-kicker mb-2">Conversacion</div>
      <h3 className="h5 mb-3">{component.label}</h3>
      <div className="proto-chat-stack">
        {messages.map((message, index) => {
          const role = String(message.role ?? "assistant");
          return (
            <div key={`${component.type}-${index}`} className={`proto-bubble ${role === "user" ? "user" : "assistant"}`}>
              {String(message.text ?? message.message ?? "Mensaje")}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const KanbanBlock = ({ component }: { component: PrototypeComponent }) => {
  const columns = asRecordArray(component.props.columns);

  return (
    <section className="proto-block p-4">
      <div className="proto-kicker mb-2">Tablero</div>
      <h3 className="h5 mb-3">{component.label}</h3>
      <div className="proto-kanban">
        {columns.map((column, index) => {
          const items = asStringArray(column.items);
          return (
            <div key={`${component.type}-${index}`} className="proto-kanban-col d-grid gap-2">
              <strong>{String(column.title ?? column.label ?? `Columna ${index + 1}`)}</strong>
              {items.map((item, itemIndex) => (
                <div key={`${index}-${itemIndex}`} className="proto-mini-card p-2 small">
                  {item}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const FooterBlock = ({ component }: { component: PrototypeComponent }) => {
  return (
    <footer className="proto-block p-4 d-flex flex-column flex-md-row justify-content-between gap-2">
      <strong>{component.label}</strong>
      <span className="proto-muted small">Cierre visual del prototipo y siguiente paso sugerido</span>
    </footer>
  );
};

export const SidebarBlock = ({ component }: { component: PrototypeComponent }) => {
  const items = asStringArray(component.props.items);

  return (
    <section className="proto-block p-4">
      <div className="proto-kicker mb-2">Menu lateral</div>
      <h3 className="h5 mb-3">{component.label}</h3>
      <div className="d-grid gap-2">
        {items.map((item, index) => (
          <div key={`${component.type}-${index}`} className="proto-mini-card p-3 small fw-semibold">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};
