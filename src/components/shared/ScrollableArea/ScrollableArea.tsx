import { ScrollArea } from "@base-ui/react";
import styles from "./ScrollableArea.module.scss";

type ScrollableAreaProps = {
  children: React.ReactNode;
};

export function ScrollableArea({ children }: ScrollableAreaProps) {
  return (
    <ScrollArea.Root className={styles.contentScrollArea}>
      <ScrollArea.Viewport className={styles.contentViewport}>
        <ScrollArea.Content className={styles.content}>
          {children}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={styles.scrollbar} orientation="vertical">
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
  );
}
