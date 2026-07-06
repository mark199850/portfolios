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
} from "../../shell/Windowing/windowSlice.ts";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../kernel/context/OSStore.ts";
import type { OSWindow } from "../../kernel/types/OSWindow.ts";
import type { OSProcess } from "../../kernel/types/OSProcess.ts";
import type { ApplicationPackageMeta } from "../../kernel/types/PackageMeta.ts";
import {
  saveAccentColor,
  saveBlurAmount,
  saveBorderRadius,
  saveBorderWidth as saveBorderThickness,
  saveCompactWidth,
  saveElementGap,
  saveSecondaryColor,
  saveTertiaryColor,
} from "../../shell/Theme/themeSlice.ts";
import { ExtractNumber } from "../../kernel/utils/parsers.ts";
import type { RgbaColor } from "react-colorful";

type WindowActionMap =
  | {
      type: "ADD_WINDOW";
      processId: OSProcess["pid"];
      title: ApplicationPackageMeta["name"];
      iconName: ApplicationPackageMeta["iconName"];
    }
  | { type: "BRING_WINDOW_TO_TOP"; windowId: OSWindow["id"] }
  | { type: "CLOSE_WINDOW"; windowId: OSWindow["id"] }
  | { type: "MINIMIZE_WINDOW"; windowId: OSWindow["id"] }
  | { type: "UNMINIMIZE_WINDOW"; windowId: OSWindow["id"] }
  | { type: "SET_WINDOW_SIZE"; windowId: OSWindow["id"]; size: OSWindow["size"] }
  | {
      type: "SET_WINDOW_SIZING_MODE";
      windowId: OSWindow["id"];
      sizingMode: OSWindow["sizingMode"];
    }
  | {
      type: "SET_WINDOW_POSITION";
      windowId: OSWindow["id"];
      position: OSWindow["position"];
    };

export type ThemeActionMap =
  | {
      type:
        | "SET_BORDER_RADIUS"
        | "SET_ELEMENT_GAP"
        | "SET_WINDOW_BORDER_THICKNESS"
        | "SET_BLUR_AMOUNT"
        | "SET_COMPACT_WIDTH";
      value: number;
    }
  | {
      type: "SET_SECONDARY_COLOR" | "SET_ACCENT_COLOR" | "SET_TERTIARY_COLOR";
      value: RgbaColor;
    };

function getContrastTextColor(r: number, g: number, b: number) {
  const brightness = r * 0.299 + g * 0.587 + b * 0.114;
  return brightness > 128 ? "#000000" : "#ffffff";
}

function useWindowManager() {
  const dispatch = useDispatch<AppDispatch>();

  const savedAccentColor = useSelector(
    (state: RootState) => state.theme.accentColor,
  );

  const savedSecondaryColor = useSelector(
    (state: RootState) => state.theme.secondaryColor,
  );

  const savedTertiaryColor = useSelector(
    (state: RootState) => state.theme.tertiaryColor,
  );

  const savedBorderRadius = useSelector(
    (state: RootState) => state.theme.borderRadius,
  );

  const savedElementGap = useSelector(
    (state: RootState) => state.theme.elementGap,
  );

  const savedWindowBorderThickness = useSelector(
    (state: RootState) => state.theme.windowBorderThickness,
  );

  const savedBlurAmount = useSelector(
    (state: RootState) => state.theme.blurAmount,
  );

  const savedCompactWidth = useSelector(
    (state: RootState) => state.theme.compactWidth,
  );

  const themeState = {
    accentColor: savedAccentColor,
    secondaryColor: savedSecondaryColor,
    tertiaryColor: savedTertiaryColor,
    borderRadius: ExtractNumber(savedBorderRadius),
    elementGap: ExtractNumber(savedElementGap),
    windowBorderThickness: ExtractNumber(savedWindowBorderThickness),
    blurAmount: ExtractNumber(savedBlurAmount),
    compactWidth: ExtractNumber(savedCompactWidth),
  };
  const executeWindowAction = useCallback(
    (action: WindowActionMap) => {
      switch (action.type) {
        case "ADD_WINDOW": {
          const { processId, title, iconName } = action;
          dispatch(
            addWindow({
              title,
              pid: processId,
              id: crypto.randomUUID(),
              position: { x: 100, y: 10 },
              zIndex: 0,
              size: { x: "60%", y: "60%" },
              iconName,
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

  const executeThemeAction = useCallback(
    (action: ThemeActionMap) => {
      switch (action.type) {
        case "SET_ACCENT_COLOR":
          dispatch(saveAccentColor({ color: action.value }));
          break;
        case "SET_SECONDARY_COLOR":
          dispatch(saveSecondaryColor({ color: action.value }));
          break;
        case "SET_TERTIARY_COLOR":
          dispatch(saveTertiaryColor({ color: action.value }));
          break;
        case "SET_BORDER_RADIUS":
          dispatch(saveBorderRadius({ borderRadius: action.value.toString() }));
          break;
        case "SET_ELEMENT_GAP":
          dispatch(saveElementGap({ elementGap: action.value.toString() }));
          break;
        case "SET_WINDOW_BORDER_THICKNESS":
          dispatch(
            saveBorderThickness({
              windowBorderThickness: action.value.toString(),
            }),
          );
          break;
        case "SET_BLUR_AMOUNT":
          dispatch(
            saveBlurAmount({
              blurAmount: action.value.toString(),
            }),
          );
          break;
        case "SET_COMPACT_WIDTH":
          dispatch(
            saveCompactWidth({
              compactWidth: action.value.toString(),
            }),
          );
          break;
      }
    },
    [dispatch],
  );

  const previewTheme = useCallback((action: ThemeActionMap) => {
    const root = document.documentElement;
    switch (action.type) {
      case "SET_ACCENT_COLOR":
        {
          const { r, g, b, a } = action.value;
          const fontColor = getContrastTextColor(r, g, b);
          root.style.setProperty("--accent-color", `rgba(${r},${g},${b},${a})`);
          root.style.setProperty("--text-color-accent-bg", fontColor);
        }
        break;
      case "SET_SECONDARY_COLOR": {
        const { r, g, b, a } = action.value;
        const fontColor = getContrastTextColor(r, g, b);
        root.style.setProperty("--text-color", fontColor);
        root.style.setProperty(
          "--secondary-color",
          `rgba(${r},${g},${b},${a})`,
        );
        break;
      }
      case "SET_TERTIARY_COLOR":
        {
          const { r, g, b, a } = action.value;
          const fontColor = getContrastTextColor(r, g, b);
          root.style.setProperty("--text-color-tertiary-bg", fontColor);
          root.style.setProperty(
            "--tertiary-color",
            `rgba(${r},${g},${b},${a})`,
          );
        }
        break;
      case "SET_BORDER_RADIUS":
        root.style.setProperty("--border-radius", `${action.value}px`);
        break;
      case "SET_ELEMENT_GAP":
        root.style.setProperty("--element-gap", `${action.value}px`);
        break;
      case "SET_WINDOW_BORDER_THICKNESS":
        root.style.setProperty("--window-border-width", `${action.value}px`);
        break;
      case "SET_BLUR_AMOUNT":
        root.style.setProperty("--blur-amount", `${action.value}px`);
        break;
      case "SET_COMPACT_WIDTH":
        root.style.setProperty("--compact-width", `${action.value}px`);
        break;
    }
  }, []);
  return {
    themeState,
    previewTheme,
    executeThemeAction,
    executeWindowAction,
  };
}

export { useWindowManager };
