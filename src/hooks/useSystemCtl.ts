import type { IPackage } from "../core/interfaces/IPackage";
import { hardDrive } from "../core/hardDrive";
import { useProcessManager } from "./useProcessManager";
import type { IProcess } from "../core/interfaces/IProcess";
import { useWindowManager } from "./useWindowManager";

function useSystemCtl() {

    const [handleStartProcess, handleKillProcess] = useProcessManager();
    const { handleAddWindow } = useWindowManager();

    const startService = (packageId: IPackage["id"]) => {
        const packageToBeLaunched = hardDrive[packageId];
        if (!packageToBeLaunched) {
            throw new Error("Package not found")
        }

        const startedProcess = handleStartProcess(packageId)
        if (!packageToBeLaunched.isBackgroundService) {

            handleAddWindow(startedProcess, packageToBeLaunched.name, packageToBeLaunched.iconUrl)
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

export { useSystemCtl }

