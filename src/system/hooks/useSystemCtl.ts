import type { PackageMeta } from "../../kernel/types/PackageMeta";
import { hardDriveMeta, isValidPackage } from "../hardDriveMeta";
import { useProcessManager } from "./useProcessManager";
import type { OSProcess } from "../../kernel/types/OSProcess";
import { useWindowManager } from "./useWindowManager";
import { useCallback } from "react";
import { useStore } from "react-redux";
import type { RootState } from "../../kernel/context/OSStore";

export function useSystemCtl() {
  const { executeProcessAction } = useProcessManager();
  const { executeWindowAction } = useWindowManager();

  const store = useStore<RootState>();
  const findWindow = useCallback(
    (pid: OSProcess["pid"]) => {
      const state = store.getState();
      const foundWindows = Object.values(state.window.byId).filter(
        (window) => window.pid === pid,
      );

      return foundWindows.length > 0
        ? foundWindows.map((window) => window.id)
        : null;
    },
    [store],
  );

  const findProcess = useCallback(
    (packageId: PackageMeta["id"]) => {
      const state = store.getState();
      const foundProcess = Object.values(state.process.byId).filter(
        (process) => process.packageId === packageId,
      );
      return foundProcess[0]?.pid ?? null;
    },
    [store],
  );

  const startService = useCallback(
    (packageId: PackageMeta["id"]) => {
      if (!isValidPackage(packageId)) {
        console.error(`Attempted to open invalid package: ${packageId}`);
        return;
      }

      const targetPackage = hardDriveMeta[packageId];

      if (!targetPackage) {
        console.error(`Package with id "${packageId}" not found`);
        return;
      }

      const foundProcess = findProcess(targetPackage.id);

      if (
        targetPackage.type === "application" &&
        targetPackage.isSingleton &&
        foundProcess
      ) {
        const windowIds = findWindow(foundProcess);

        if (!windowIds) {
          console.warn(`${targetPackage.id} is running but window not found`);
          return;
        }
        windowIds.forEach((windowId) => {
          executeWindowAction({
            type: "BRING_WINDOW_TO_TOP",
            windowId,
          });
          executeWindowAction({
            type: "UNMINIMIZE_WINDOW",
            windowId,
          });
        });
        return;
      }

      const spawnedProcessId = executeProcessAction({
        type: "SPAWN_PROCESS",
        packageId,
        isBackground: targetPackage.type !== "application",
      });

      if (!spawnedProcessId) return;

      if (targetPackage.type === "application") {
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
    (pid: OSProcess["pid"]) => {
      if (!store.getState().process.byId[pid]) {
        console.error(`Attempted to kill non-existent process: ${pid}`);
        return;
      }

      const windowIds = findWindow(pid);
      if (windowIds) {
        windowIds.forEach((windowId) => {
          executeWindowAction({ type: "CLOSE_WINDOW", windowId });
        });
      }

      executeProcessAction({ type: "KILL_PROCESS", pid });
    },
    [executeProcessAction, executeWindowAction, findWindow, store],
  );

  return {
    startService,
    stopService,
  };
}
