import { useDispatch } from "react-redux"
import type { AppDispatch } from "../core/context/OSStore"
import { useCallback } from "react"
import { killProcess, spawnProcess } from "../core/context/ProcessSlice"
import type { IPackage } from "../core/interfaces/IPackage"
import type { IProcess } from "../core/interfaces/IProcess"

type ProcessActionMap =
    | { type: 'SPAWN_PROCESS', packageId: IPackage['id'] }
    | { type: 'KILL_PROCESS', processId: IProcess['id'] }

function useProcessManager() {

    const dispatch = useDispatch<AppDispatch>()

    const executeProcessAction = useCallback((action: ProcessActionMap) => {
        switch (action.type) {
            case 'SPAWN_PROCESS': {
                const processId = crypto.randomUUID();
                dispatch(spawnProcess({ packageId: action.packageId, processId }))
                return processId;
            };
            case 'KILL_PROCESS': {
                dispatch(killProcess(action.processId))
                return;
            };
        }
    }, [dispatch])

    return { executeProcessAction }
}
export { useProcessManager }
