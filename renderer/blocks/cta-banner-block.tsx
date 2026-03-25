import type { PrototypeComponent } from "@/domain";

export const CtaBannerBlock = ({ component }: { component: PrototypeComponent }) => {
  const text = typeof component.props.text === "string" ? component.props.text : component.label;

  return (
    <section className="proto-block p-4 p-lg-5 bg-light">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
        <div>
          <div className="proto-kicker mb-2">CTA</div>
          <h3 className="h4 mb-1">{component.label}</h3>
          <p className="proto-muted mb-0">{text}</p>
        </div>
        <button className="btn btn-dark" type="button">
          Continue
        </button>
      </div>
    </section>
  );
};

