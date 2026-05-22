import { type ElementType } from "react";
import styles from "./AboutMe.module.scss";
import { Profile } from "./Profile";
import { Experience } from "./Experience";
import { Education } from "./Education";
import { Projects } from "./Projects";
import { ScrollArea, Tabs } from "@base-ui/react";

const tabs: Record<string, ElementType> = {
  Profile: Profile,
  Experience: Experience,
  Education: Education,
  Projects: Projects,
};

function AboutMe() {
  return (
    <Tabs.Root defaultValue="Profile" className={styles.container}>
      <Tabs.List className={styles.sidePanel}>
        {Object.keys(tabs).map((tabName) => {
          return (
            <Tabs.Tab
              key={tabName}
              className={styles.tabButton}
              value={tabName}
            >
              {tabName}
            </Tabs.Tab>
          );
        })}
      </Tabs.List>
      {Object.entries(tabs).map(([tabName, Component]) => (
        <Tabs.Panel key={tabName} value={tabName} className={styles.tabPanel}>
          <ScrollArea.Root className={styles.contentScrollArea}>
            <ScrollArea.Viewport className={styles.contentViewport}>
              <ScrollArea.Content className={styles.content}>
                <Component />
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className={styles.scrollbar}
              orientation="vertical"
            >
              <ScrollArea.Thumb className={styles.thumb} />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar
              className={styles.scrollbar}
              orientation="horizontal"
            >
              <ScrollArea.Thumb className={styles.thumb} />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea.Root>
        </Tabs.Panel>
      ))}
    </Tabs.Root>
  );
}

export { AboutMe };
