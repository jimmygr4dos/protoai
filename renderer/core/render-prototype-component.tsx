import type { PrototypeComponent } from "@/domain";
import {
  CardsBlock,
  ChatBlock,
  CtaBannerBlock,
  FooterBlock,
  FormBlock,
  HeroBlock,
  KanbanBlock,
  ListBlock,
  NavbarBlock,
  SidebarBlock,
  StatsBlock,
  StepsBlock,
  SummaryBlock,
  TableBlock,
  TabsBlock,
  UnsupportedBlock,
} from "@/renderer/blocks";

export const renderPrototypeComponent = (component: PrototypeComponent) => {
  switch (component.type) {
    case "navbar":
      return <NavbarBlock component={component} />;
    case "hero":
      return <HeroBlock component={component} />;
    case "feature_cards":
    case "service_cards":
    case "dashboard_panel":
    case "faq":
      return <CardsBlock component={component} />;
    case "stats_cards":
      return <StatsBlock component={component} />;
    case "list_group":
      return <ListBlock component={component} />;
    case "summary_card":
      return <SummaryBlock component={component} />;
    case "table":
      return <TableBlock component={component} />;
    case "steps":
    case "timeline":
      return <StepsBlock component={component} />;
    case "form":
      return <FormBlock component={component} />;
    case "tabs":
      return <TabsBlock component={component} />;
    case "chat_window":
    case "chat_bubbles":
      return <ChatBlock component={component} />;
    case "kanban_mock":
      return <KanbanBlock component={component} />;
    case "footer":
      return <FooterBlock component={component} />;
    case "sidebar":
      return <SidebarBlock component={component} />;
    case "cta_banner":
      return <CtaBannerBlock component={component} />;
    default:
      return <UnsupportedBlock component={component} />;
  }
};
