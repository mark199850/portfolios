import { hardDrive } from "../../../core/hardDrive"
import type { IWindow } from "../../../core/interfaces/IWindow";
import { useSelector } from "react-redux";
import type { RootState } from "../../../core/context/OSStore";

type WindowCOntentProps = {
    windowId: IWindow['id']
}

function WindowContent({ windowId }: WindowCOntentProps) {

    const packageId = useSelector((state: RootState) => {
        const windowData = state.window.byId[windowId]
        if (!windowData) return null

        const processData = state.process.byId[windowData.processId]
        if (!processData) return null

        return processData.packageId
    })

    if (!packageId) return null

    const PackageComponent = hardDrive[packageId].component

    if (!PackageComponent) return null
    return (
        <div>
            {PackageComponent ? <PackageComponent /> : <p>Loading...</p>}
        </div>
    )
}

export { WindowContent }
