import { useDispatch, useStore } from "react-redux";
import type { AppDispatch, RootState } from "../../kernel/context/OSStore";
import { useCallback } from "react";
import { killProcess, spawnProcess } from "../../kernel/context/processSlice";
import type { PackageMeta } from "../../kernel/types/PackageMeta";
import type { OSProcess } from "../../kernel/types/OSProcess";
import { createPid } from "../../kernel/utils/pid";

type ProcessActionMap =
  | {
      type: "SPAWN_PROCESS";
      packageId: PackageMeta["id"];
      isBackground: OSProcess["isBackground"];
    }
  | { type: "KILL_PROCESS"; pid: OSProcess["pid"] };

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
