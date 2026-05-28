import type { IPackage } from "../core/interfaces/IPackage";
import { hardDrive, isValidPackage } from "../core/hardDrive";
import { useProcessManager } from "./useProcessManager";
import type { IProcess } from "../core/interfaces/IProcess";
import { useWindowManager } from "./useWindowManager";

export function useSystemCtl() {
  const { executeProcessAction } = useProcessManager();
  const { executeWindowAction } = useWindowManager();

  const startService = (packageId: IPackage["id"]) => {
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
  };

  const killService = (processId: IProcess["id"]) => {
    executeProcessAction({ type: "KILL_PROCESS", processId });
  };

  return {
    startService,
    killService,
  };
}
