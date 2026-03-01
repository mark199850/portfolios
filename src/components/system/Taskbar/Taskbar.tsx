import { useSelector } from "react-redux"
import type { RootState } from "../../../core/context/OSStore"
import { TaskbarShortcut } from "./TaskbarShortcut"
import type { IWindow } from "../../../core/interfaces/IWindow"
import "./Taskbar.scss"

export function Taskbar() {

    const windowIds = useSelector((state: RootState) => state.window.allIds)

    return (
        <div className="taskbar-container">
            {windowIds.map((id: IWindow['id']) => {
                return <TaskbarShortcut key={id} windowId={id} />
            })}
        </div>
    )
}
