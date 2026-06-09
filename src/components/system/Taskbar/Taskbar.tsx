import { useSelector } from "react-redux";
import type { RootState } from "../../../core/context/OSStore";
import { TaskbarShortcut } from "./TaskbarShortcut";
import type { IWindow } from "../../../core/interfaces/IWindow";
import styles from "./Taskbar.module.scss";
import { TaskbarWidgetArea } from "./TaskbarWidgetArea";

export function Taskbar() {
  const windowIds = useSelector((state: RootState) => state.window.allIds);

  return (
    <div className={styles.container}>
      <div className={styles.shortcutArea}>
        {windowIds.map((id: IWindow["id"]) => {
          return <TaskbarShortcut key={id} windowId={id} />;
        })}
      </div>
      <div className={styles.widgetArea}>
        <TaskbarWidgetArea />
      </div>
    </div>
  );
}
