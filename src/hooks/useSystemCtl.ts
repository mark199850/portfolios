import type { IPackage } from "../core/interfaces/IPackage";
import { hardDrive, isValidPackage } from "../core/hardDrive";
import { useProcessManager } from "./useProcessManager";
import type { IProcess } from "../core/interfaces/IProcess";
import { useWindowManager } from "./useWindowManager";
import { useCallback } from "react";
import type { IWindow } from "../core/interfaces/IWindow";

export function useSystemCtl() {
  const { executeProcessAction } = useProcessManager();
  const { executeWindowAction } = useWindowManager();

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
    [executeWindowAction, executeProcessAction],
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
