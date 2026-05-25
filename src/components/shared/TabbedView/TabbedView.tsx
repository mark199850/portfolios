import { ScrollArea, Tabs } from "@base-ui/react";
import styles from "./TabbedView.module.scss";

export type AppTabs = Record<string, React.ElementType>;

type TabbedViewProps<T extends AppTabs> = {
  tabs: T;
  defaultTab: keyof T;
};

export function TabbedView<T extends AppTabs>({
  tabs,
  defaultTab,
}: TabbedViewProps<T>) {
  return (
    <Tabs.Root defaultValue={defaultTab} className={styles.container}>
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
