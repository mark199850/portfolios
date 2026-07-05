import { useSelector } from "react-redux";
import type { IWindow } from "../../../core/interfaces/IWindow";
import type { RootState } from "../../../core/context/OSStore";
import { hardDriveMeta, isValidPackage } from "../../../core/hardDriveMeta";
import { useWindowManager } from "../../../hooks/useWindowManager";
import { useCallback, memo } from "react";
import styles from "./TaskbarShortcut.module.scss";
import { Button } from "@base-ui/react";
import { iconMap } from "../../../core/iconRegistry";

type TaskbarShortcutProps = {
  windowId: IWindow["id"];
};

type PackageMeta = (typeof hardDriveMeta)[keyof typeof hardDriveMeta];

function hasIcon(
  pkg: PackageMeta,
): pkg is PackageMeta & { iconName: keyof typeof iconMap } {
  return Object.hasOwn(pkg, "iconName");
}

export const TaskbarShortcut = memo(function TaskbarShortcut({
  windowId,
}: TaskbarShortcutProps) {
  const { executeWindowAction } = useWindowManager();

  const isMinimized = useSelector(
    (state: RootState) => state.window.byId[windowId]?.isMinimized,
  );
  const processId = useSelector(
    (state: RootState) => state.window.byId[windowId]?.pid,
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

  if (!packageId || !isValidPackage(packageId)) return null;

  const pkg = hardDriveMeta[packageId];

  const IconComponent =
    hasIcon(pkg) && pkg.iconName ? iconMap[pkg.iconName] : undefined;

  return (
    <Button
      className={`${styles.button} ${isWindowFocused ? styles.selected : ""}`}
      onClick={handleFocusOrMinimize}
    >
      {IconComponent ? <IconComponent className={styles.icon} /> : <></>}
    </Button>
  );
});
