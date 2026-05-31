import { ScrollArea, Tabs } from "@base-ui/react";
import styles from "./TabbedView.module.scss";
import { useEffect, useRef, useState } from "react";
import { useWindowManager } from "../../../hooks/useWindowManager";

export type AppTabs = Record<string, React.ElementType>;

type TabbedViewProps<T extends AppTabs> = {
  tabs: T;
  defaultTab: keyof T;
};

export function TabbedView<T extends AppTabs>({
  tabs,
  defaultTab,
}: TabbedViewProps<T>) {
  const { themeState } = useWindowManager();

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isWindowSmall, setIsWindowSmall] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<keyof T>(defaultTab);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let frameId: number;
    const observer = new ResizeObserver((entries) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        for (const entry of entries) {
          const contentWidth = entry.contentBoxSize[0]?.inlineSize ?? 0;
          setIsWindowSmall(
            contentWidth > themeState.compactWidth ? false : true,
          );
        }
      });
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [themeState.compactWidth]);

  return (
    <Tabs.Root
      value={activeTab as string}
      ref={containerRef}
      defaultValue={defaultTab}
      onValueChange={(val) => {
        setActiveTab(val as keyof T);
        setIsCollapsed(true);
      }}
      className={`${styles.container} ${isWindowSmall ? styles.tabListTop : styles.tabListLeft}`}
      orientation="vertical"
    >
      <Tabs.List
        className={`${styles.tabList} ${isWindowSmall ? styles.compact : ""}`}
      >
        {Object.keys(tabs).map((tabName) => {
          return (
            <Tabs.Tab
              key={tabName}
              className={`${styles.tabButton} ${isWindowSmall ? styles.compact : ""} ${isCollapsed ? styles.collapsed : ""}`}
              value={tabName}
            >
              {tabName}
              {isWindowSmall && activeTab === tabName && (
                <span
                  className={styles.tabActionButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCollapsed(!isCollapsed);
                  }}
                >
                  ☰
                </span>
              )}
            </Tabs.Tab>
          );
        })}
        <Tabs.Indicator className={styles.indicator} />
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
