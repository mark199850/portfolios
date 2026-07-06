import { WindowStack } from "../Windowing/WindowStack/WindowStack";
import styles from "./DesktopCanvas.module.scss";
import { Taskbar } from "../Taskbar";
import { ShortcutGrid } from "../ShortcutGrid/ShortcutGrid";

export function DesktopCanvas() {
  return (
    <div className={styles.container}>
      <ShortcutGrid />
      <WindowStack />
      <Taskbar />
    </div>
  );
}
