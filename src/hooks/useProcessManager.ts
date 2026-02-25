import { useDispatch } from "react-redux"
import type { AppDispatch } from "../core/context/OSStore"
import { useCallback } from "react"
import { killProcess, spawnProcess } from "../core/context/ProcessSlice"
import type { IPackage } from "../core/interfaces/IPackage"
import type { IProcess } from "../core/interfaces/IProcess"

function useProcessManager() {

    const dispatch = useDispatch<AppDispatch>()

    const handleStartProcess = useCallback((packageId: IPackage['id']) => {
        const processId = crypto.randomUUID();
        dispatch(spawnProcess({ packageId, processId }))
        return processId;
    }, [dispatch])

    const handleKillProcess = useCallback((processId: IProcess['id']) => {
        dispatch(killProcess(processId))
    }, [dispatch])

    return [
        handleStartProcess,
        handleKillProcess
    ] as const
}

export { useProcessManager }
