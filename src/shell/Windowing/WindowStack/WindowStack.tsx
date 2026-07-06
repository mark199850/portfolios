import { useSelector } from "react-redux";
import type { RootState } from "../../../kernel/context/OSStore.ts";
import { WindowFrame } from "../WindowFrame/WindowFrame.tsx";
import { useRef } from "react";
import { WindowContent } from "../WindowContent/WindowContent.tsx";
import styles from "./WindowStack.module.scss";
import type { OSWindow } from "../../../kernel/types/OSWindow.ts";

export function WindowStack() {
  const windowIds = useSelector((state: RootState) => state.window.allIds);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={styles.container}>
      {windowIds.map((windowId: OSWindow["id"]) => {
        return (
          <WindowFrame key={windowId} id={windowId}>
            <WindowContent windowId={windowId} />
          </WindowFrame>
        );
      })}
    </div>
  );
}
