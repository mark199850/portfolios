import { useSelector } from "react-redux";
import type { RootState } from "../../kernel/context/OSStore";
import { TaskbarShortcut } from "./TaskbarShortcut";
import styles from "./Taskbar.module.scss";
import { TaskbarWidgetArea } from "./TaskbarWidgetArea";
import type { OSWindow } from "../../kernel/types/OSWindow";

export function Taskbar() {
  const windowIds = useSelector((state: RootState) => state.window.allIds);

  return (
    <div className={styles.container}>
      <div className={styles.shortcutArea}>
        {windowIds.map((id: OSWindow["id"]) => {
          return <TaskbarShortcut key={id} windowId={id} />;
        })}
      </div>
      <div className={styles.widgetArea}>
        <TaskbarWidgetArea />
      </div>
    </div>
  );
}
