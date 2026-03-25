import type { PrototypeScreen } from "@/domain";
import { sortScreenComponents } from "@/domain";
import { renderPrototypeComponent } from "./render-prototype-component";

export const renderPrototypeScreen = (screen: PrototypeScreen) => {
  const orderedComponents = sortScreenComponents(screen.components);

  return (
    <div>
      {orderedComponents.map((component, index) => (
        <div key={`${screen.id}-${component.type}-${index}`}>
          {renderPrototypeComponent(component)}
        </div>
      ))}
    </div>
  );
};

