import {
  TabbedView,
  type AppTabs,
} from "../../shared/components/TabbedView/TabbedView";
import { Theme } from "./Theme";

const tabs = {
  Theme: <Theme />,
} satisfies AppTabs;

export function Settings() {
  return <TabbedView tabs={tabs} defaultTab="Theme"></TabbedView>;
}
