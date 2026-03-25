import type { PrototypeComponent } from "@/domain";

export const HeroBlock = ({ component }: { component: PrototypeComponent }) => {
  const title = typeof component.props.title === "string" ? component.props.title : component.label;
  const description =
    typeof component.props.description === "string"
      ? component.props.description
      : "Prototype hero section";

  return (
    <section className="proto-block p-4 p-lg-5">
      <div className="proto-kicker mb-2">Hero</div>
      <h2 className="display-6 mb-3">{title}</h2>
      <p className="lead proto-muted mb-0">{description}</p>
    </section>
  );
};

