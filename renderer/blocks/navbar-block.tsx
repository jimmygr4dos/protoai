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

export const NavbarBlock = ({ component }: { component: PrototypeComponent }) => {
  const items = Array.isArray(component.props.items) ? component.props.items : [];

  return (
    <div className="proto-block p-3 p-lg-4 d-flex justify-content-between align-items-center gap-3 flex-wrap">
      <strong>{component.label}</strong>
      <div className="d-flex gap-3 small text-uppercase flex-wrap justify-content-end">
        {items.map((item, index) => (
          <span key={`${component.type}-${index}`}>{toDisplayString(item, `item-${index + 1}`)}</span>
        ))}
      </div>
    </div>
  );
};
