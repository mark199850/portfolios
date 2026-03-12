import {
  addWindow,
  bringWindowToTop,
  markWindowAsClosing,
  minimizeWindow,
  removeWindow,
  setWindowPosition,
  setWindowSize,
  setWindowSizingMode,
  unMinimizeWindow,
} from "../core/context/WindowSlice.ts";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../core/context/OSStore";
import type { IWindow } from "../core/interfaces/IWindow.ts";
import type { IProcess } from "../core/interfaces/IProcess.ts";
import type { IPackage } from "../core/interfaces/IPackage.ts";

type WindowActionMap =
  | {
      type: "ADD_WINDOW";
      processId: IProcess["id"];
      title: IPackage["name"];
      icon: IPackage["iconUrl"];
    }
  | { type: "BRING_WINDOW_TO_TOP"; windowId: IWindow["id"] }
  | { type: "CLOSE_WINDOW"; windowId: IWindow["id"] }
  | { type: "MINIMIZE_WINDOW"; windowId: IWindow["id"] }
  | { type: "UNMINIMIZE_WINDOW"; windowId: IWindow["id"] }
  | { type: "SET_WINDOW_SIZE"; windowId: IWindow["id"]; size: IWindow["size"] }
  | {
      type: "SET_WINDOW_SIZING_MODE";
      windowId: IWindow["id"];
      sizingMode: IWindow["sizingMode"];
    }
  | {
      type: "SET_WINDOW_POSITION";
      windowId: IWindow["id"];
      position: IWindow["position"];
    };

function useWindowManager() {
  const dispatch = useDispatch<AppDispatch>();

  const executeWindowAction = useCallback(
    (action: WindowActionMap) => {
      switch (action.type) {
        case "ADD_WINDOW": {
          const { processId, title, icon } = action;
          dispatch(
            addWindow({
              title,
              processId,
              id: crypto.randomUUID(),
              position: { x: 100, y: 10 },
              zIndex: 0,
              size: { x: "60%", y: "60%" },
              icon,
              isClosing: false,
              isMinimized: false,
              sizingMode: "small",
            }),
          );
          break;
        }
        case "CLOSE_WINDOW": {
          const { windowId } = action;
          dispatch(markWindowAsClosing({ id: windowId, isClosing: true }));
          setTimeout(() => {
            dispatch(removeWindow(windowId));
          }, 150);
          break;
        }
        case "BRING_WINDOW_TO_TOP": {
          const { windowId } = action;
          dispatch(bringWindowToTop(windowId));
          break;
        }
        case "MINIMIZE_WINDOW": {
          const { windowId } = action;
          dispatch(minimizeWindow(windowId));
          break;
        }
        case "UNMINIMIZE_WINDOW": {
          const { windowId } = action;
          dispatch(unMinimizeWindow(windowId));
          break;
        }
        case "SET_WINDOW_SIZE": {
          const { windowId, size } = action;
          dispatch(setWindowSize({ id: windowId, size }));
          break;
        }
        case "SET_WINDOW_SIZING_MODE": {
          const { windowId, sizingMode } = action;
          dispatch(setWindowSizingMode({ id: windowId, sizingMode }));
          break;
        }
        case "SET_WINDOW_POSITION": {
          const { windowId, position } = action;
          dispatch(setWindowPosition({ id: windowId, position }));
          break;
        }
      }
      return;
    },
    [dispatch],
  );

  return { executeWindowAction };
}

export { useWindowManager };
