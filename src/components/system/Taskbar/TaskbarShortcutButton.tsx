import { memo } from "react";
import type { IPackage } from "../../../core/interfaces/IPackage"
import './TaskbarShortcutButton.scss'

type TaskbarShortcutButtonProps = {
    icon: IPackage['iconUrl'];
    handleFocusOrMinimize: () => void
    isWindowFocused: boolean;
}

export const TaskbarShortcutButton = memo(function TaskbarShortcutButton({ icon, handleFocusOrMinimize, isWindowFocused }: TaskbarShortcutButtonProps) {

    return (
        <div className={`taskbar-shortcut-button ${isWindowFocused && 'selected'}`}>
            <img className="taskbar-shortcut-button-icon" src={icon} onClick={() => { handleFocusOrMinimize() }} />
        </div>
    )
})
