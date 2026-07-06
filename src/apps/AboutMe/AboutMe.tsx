import { Profile } from "./Profile";
import { Experience } from "./Experience";
import { Education } from "./Education";
import { Projects } from "./Projects";
import {
  TabbedView,
  type AppTabs,
} from "../../shared/components/TabbedView/TabbedView";

const tabs = {
  Profile: <Profile />,
  Experience: <Experience />,
  Education: <Education />,
  Projects: <Projects />,
} satisfies AppTabs;

function AboutMe() {
  return <TabbedView tabs={tabs} defaultTab="Profile"></TabbedView>;
}

export { AboutMe };
