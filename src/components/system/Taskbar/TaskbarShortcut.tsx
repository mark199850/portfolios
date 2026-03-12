import { useSelector } from "react-redux";
import type { IWindow } from "../../../core/interfaces/IWindow";
import type { RootState } from "../../../core/context/OSStore";
import { hardDrive } from "../../../core/hardDrive";
import { useWindowManager } from "../../../hooks/useWindowManager";
import { useCallback, memo } from "react";
import styles from "./TaskbarShortcut.module.scss";

type TaskbarShortcutProps = {
  windowId: IWindow["id"];
};

export const TaskbarShortcut = memo(function TaskbarShortcut({
  windowId,
}: TaskbarShortcutProps) {
  const { executeWindowAction } = useWindowManager();

  const isMinimized = useSelector(
    (state: RootState) => state.window.byId[windowId]?.isMinimized,
  );
  const processId = useSelector(
    (state: RootState) => state.window.byId[windowId]?.processId,
  );

  const packageId = useSelector((state: RootState) =>
    processId ? state.process.byId[processId]?.packageId : null,
  );
  const isWindowFocused = useSelector(
    (state: RootState) => state.window.focusedWindowId === windowId,
  );

  const handleFocusOrMinimize = useCallback(() => {
    if (isMinimized === undefined) return;

    if (isMinimized) {
      executeWindowAction({ type: "UNMINIMIZE_WINDOW", windowId });
      return;
    }

    if (!isMinimized && !isWindowFocused) {
      executeWindowAction({ type: "BRING_WINDOW_TO_TOP", windowId });
      return;
    }

    executeWindowAction({ type: "MINIMIZE_WINDOW", windowId });
  }, [windowId, isMinimized, isWindowFocused, executeWindowAction]);

  if (!packageId) return null;

  const icon = hardDrive[packageId]?.iconUrl;

  return (
    <button
      className={`${styles.button} ${isWindowFocused ? styles.selected : ""}`}
      onClick={handleFocusOrMinimize}
    >
      <img className={styles.icon} src={icon} alt="" />
    </button>
  );
});
