import type { IPackage } from "../core/interfaces/IPackage";
import { hardDrive, isValidPackage } from "../core/hardDrive";
import { useProcessManager } from "./useProcessManager";
import type { IProcess } from "../core/interfaces/IProcess";
import { useWindowManager } from "./useWindowManager";
import { useCallback } from "react";
import type { IWindow } from "../core/interfaces/IWindow";
import { useStore } from "react-redux";
import type { RootState } from "../core/context/OSStore";

export function useSystemCtl() {
  const { executeProcessAction } = useProcessManager();
  const { executeWindowAction } = useWindowManager();

  const store = useStore<RootState>();
  const findWindow = useCallback(
    (pid: IProcess["pid"]) => {
      const state = store.getState();
      const foundWindow = Object.values(state.window.byId).filter(
        (window) => window.pid === pid,
      );
      return foundWindow[0]?.id ?? null;
    },
    [store],
  );

  const findProcess = useCallback(
    (packageId: IPackage["id"]) => {
      const state = store.getState();
      const foundProcess = Object.values(state.process.byId).filter(
        (process) => process.packageId === packageId,
      );
      return foundProcess[0]?.pid ?? null;
    },
    [store],
  );

  const startService = useCallback(
    (packageId: IPackage["id"]) => {
      if (!isValidPackage(packageId)) {
        console.error(`Attempted to open invalid package: ${packageId}`);
        return;
      }

      const targetPackage = hardDrive[packageId];

      if (!targetPackage) {
        console.error(`Package with id "${packageId}" not found`);
        return;
      }

      const foundProcess = findProcess(targetPackage.id);

      if (targetPackage.isSingleton && foundProcess) {
        if (targetPackage.isBackgroundService) return;
        const windowId = findWindow(foundProcess);

        if (!windowId) {
          console.warn(`${targetPackage.id} is running but window not found`);
          return;
        }
        executeWindowAction({
          type: "BRING_WINDOW_TO_TOP",
          windowId,
        });
        executeWindowAction({
          type: "UNMINIMIZE_WINDOW",
          windowId,
        });
        return;
      }

      const spawnedProcessId = executeProcessAction({
        type: "SPAWN_PROCESS",
        packageId,
        isBackground: targetPackage.isBackgroundService,
      });

      if (!spawnedProcessId) return;

      if (!targetPackage.isBackgroundService) {
        executeWindowAction({
          type: "ADD_WINDOW",
          processId: spawnedProcessId,
          iconName: targetPackage.iconName,
          title: targetPackage.name,
        });
      }
      return;
    },
    [executeWindowAction, executeProcessAction, findWindow, findProcess],
  );

  const stopService = useCallback(
    (pid: IProcess["pid"], windowId?: IWindow["id"]) => {
      if (windowId) executeWindowAction({ type: "CLOSE_WINDOW", windowId });
      executeProcessAction({ type: "KILL_PROCESS", pid });
    },
    [executeProcessAction, executeWindowAction],
  );

  return {
    startService,
    stopService,
  };
}
