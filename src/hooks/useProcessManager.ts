import { useDispatch, useStore } from "react-redux";
import type { AppDispatch, RootState } from "../core/context/OSStore";
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
  const store = useStore<RootState>();

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
              startTimestamp: store.getState().hardware.time,
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
    [dispatch, store],
  );

  return { executeProcessAction };
}
export { useProcessManager };
