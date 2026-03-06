import { useSelector } from "react-redux";
import type { RootState } from "../../../core/context/OSStore";
import { TaskbarShortcut } from "./TaskbarShortcut";
import type { IWindow } from "../../../core/interfaces/IWindow";
import styles from "./Taskbar.module.scss";

export function Taskbar() {
  const windowIds = useSelector((state: RootState) => state.window.allIds);

  return (
    <div className={styles.container}>
      {windowIds.map((id: IWindow["id"]) => {
        return <TaskbarShortcut key={id} windowId={id} />;
      })}
    </div>
  );
}
