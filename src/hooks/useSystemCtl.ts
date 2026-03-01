import type { IPackage } from "../core/interfaces/IPackage";
import { hardDrive } from "../core/hardDrive";
import { useProcessManager } from "./useProcessManager";
import type { IProcess } from "../core/interfaces/IProcess";
import { useWindowManager } from "./useWindowManager";

export function useSystemCtl() {

    const [handleStartProcess, handleKillProcess] = useProcessManager();
    const { executeWindowAction } = useWindowManager();

    const startService = (packageId: IPackage["id"]) => {
        const packageToBeLaunched = hardDrive[packageId];
        if (!packageToBeLaunched) {
            throw new Error("Package not found")
        }

        const startedProcess = handleStartProcess(packageId)
        if (!packageToBeLaunched.isBackgroundService) {
            executeWindowAction({
                type: 'ADD_WINDOW',
                processId: startedProcess,
                icon: packageToBeLaunched.iconUrl,
                title: packageToBeLaunched.name
            })
        }
        return
    }

    const killService = (processId: IProcess["id"]) => {
        handleKillProcess(processId)
    }

    return {
        startService,
        killService
    }
}
