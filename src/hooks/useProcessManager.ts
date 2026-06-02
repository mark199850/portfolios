import { useDispatch } from "react-redux";
import type { AppDispatch } from "../core/context/OSStore";
import { useCallback } from "react";
import { killProcess, spawnProcess } from "../core/context/ProcessSlice";
import type { IPackage } from "../core/interfaces/IPackage";
import type { IProcess } from "../core/interfaces/IProcess";
import { createPid } from "../core/utils/pid";

type ProcessActionMap =
  | {
      type: "SPAWN_PROCESS";
      packageId: IPackage["id"];
      isBackground: IProcess["isBackground"];
    }
  | { type: "KILL_PROCESS"; pid: IProcess["pid"] };

function useProcessManager() {
  const dispatch = useDispatch<AppDispatch>();

  const executeProcessAction = useCallback(
    (action: ProcessActionMap) => {
      switch (action.type) {
        case "SPAWN_PROCESS": {
          const pid = createPid();
          dispatch(
            spawnProcess({
              packageId: action.packageId,
              pid,
              isBackground: action.isBackground,
            }),
          );
          return pid;
        }
        case "KILL_PROCESS": {
          dispatch(killProcess(action.pid));
          return;
        }
      }
    },
    [dispatch],
  );

  return { executeProcessAction };
}
export { useProcessManager };
