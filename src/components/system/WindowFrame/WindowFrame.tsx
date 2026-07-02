import { memo, useState } from "react";
import type { IWindow } from "../../../core/interfaces/IWindow";
import styles from "./WindowFrame.module.scss";
import { Rnd } from "react-rnd";
import { useSelector } from "react-redux";
import type { RootState } from "../../../core/context/OSStore.ts";
import { useWindowManager } from "../../../hooks/useWindowManager.ts";
import { Button } from "@base-ui/react";
import { useSystemCtl } from "../../../hooks/useSystemCtl.ts";

type WindowFrameProps = {
  id: IWindow["id"];
  children: React.ReactNode;
};

export const WindowFrame = memo(function WindowFrame({
  children,
  id,
}: WindowFrameProps) {
  const { executeWindowAction } = useWindowManager();
  const { stopService } = useSystemCtl();

  const windowData = useSelector((state: RootState) => state.window.byId[id]);

  const [isGrabbing, setIsGrabbing] = useState(false);

  if (!windowData) return null;

  const handleBringWindowToTop = () => {
    executeWindowAction({
      type: "BRING_WINDOW_TO_TOP",
      windowId: windowData.id,
    });
  };

  const handleSetWindowPosition = (position: IWindow["position"]) => {
    executeWindowAction({
      type: "SET_WINDOW_POSITION",
      windowId: windowData.id,
      position,
    });
  };

  const handleSetWindowSize = (size: IWindow["size"]) => {
    executeWindowAction({
      type: "SET_WINDOW_SIZE",
      windowId: windowData.id,
      size,
    });
  };

  const handleMinimizeWindow = () => {
    executeWindowAction({ type: "MINIMIZE_WINDOW", windowId: windowData.id });
  };

  const handleToggleWindowSizingMode = () => {
    executeWindowAction({
      type: "SET_WINDOW_SIZING_MODE",
      windowId: windowData.id,
      sizingMode: windowData.sizingMode === "small" ? "maximized" : "small",
    });
  };

  const handleCloseWindow = () => {
    stopService(windowData.pid);
  };

  if (!windowData || windowData.isMinimized) return null;

  return (
    <Rnd
      bounds="parent"
      minHeight={250}
      minWidth={60}
      size={
        windowData.sizingMode == "maximized"
          ? { width: "100%", height: "100%" }
          : { width: windowData.size.x, height: windowData.size.y }
      }
      position={
        windowData.sizingMode == "maximized"
          ? { x: 0, y: 0 }
          : windowData.position
      }
      resizeHandleClasses={{
        top: styles.handleTop,
        right: styles.handleRight,
        bottom: styles.handleBottom,
        left: styles.handleLeft,
        topRight: styles.handleTopRight,
        bottomRight: styles.handleBottomRight,
        bottomLeft: styles.handleBottomLeft,
        topLeft: styles.handleTopLeft,
      }}
      dragHandleClassName={styles.titleArea}
      disableDragging={windowData.sizingMode == "maximized"}
      enableResizing={windowData.sizingMode !== "maximized"}
      onMouseDown={handleBringWindowToTop}
      onTouchStart={handleBringWindowToTop}
      onResizeStart={() => {
        setIsGrabbing(true);
        handleBringWindowToTop();
      }}
      onResize={(_e, _dir, ref, _delta, position) => {
        handleSetWindowSize({ x: ref.offsetWidth, y: ref.offsetHeight });
        handleSetWindowPosition({ x: position.x, y: position.y });
      }}
      onResizeStop={() => setIsGrabbing(false)}
      onDragStart={() => setIsGrabbing(true)}
      onDrag={(_e, dir) => handleSetWindowPosition({ x: dir.x, y: dir.y })}
      onDragStop={() => setIsGrabbing(false)}
      style={{ zIndex: windowData.zIndex }}
      className={`${styles.rnd} ${isGrabbing ? styles.dragging : ""}`}
    >
      <div
        className={`${styles.container} ${windowData.sizingMode === "maximized" ? styles.maximized : ""} ${windowData.isClosing ? styles.closing : styles.opening}`}
      >
        <div className={styles.titleBar}>
          <div className={styles.titleArea}>
            <p className={styles.title}>{windowData.title}</p>
          </div>
          <div className={styles.buttons}>
            <Button
              className={styles.minimizeButton}
              onClick={handleMinimizeWindow}
            >
              _
            </Button>
            <Button
              className={styles.maximizeButton}
              onClick={handleToggleWindowSizingMode}
            >
              o
            </Button>
            <Button
              className={styles.closeButton}
              onClick={(e) => {
                handleCloseWindow();
                e.stopPropagation();
              }}
            >
              x
            </Button>
          </div>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </Rnd>
  );
});
