import type { PrototypeComponent } from "@/domain";

export const UnsupportedBlock = ({ component }: { component: PrototypeComponent }) => {
  return (
    <section className="proto-block p-4">
      <div className="proto-kicker mb-2">Unsupported block</div>
      <strong>{component.label}</strong>
      <p className="proto-muted mb-0">
        The renderer intentionally ignores unimplemented presentation details for component type
        {" "}
        <code>{component.type}</code>.
      </p>
    </section>
  );
};

