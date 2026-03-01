import { useSelector } from 'react-redux';
import type { IWindow } from '../../../core/interfaces/IWindow'
import type { RootState } from '../../../core/context/OSStore';
import { hardDrive } from '../../../core/hardDrive';
import TaskbarShortcutButton from './TaskbarShortcutButton';
import { useWindowManager } from '../../../hooks/useWindowManager';
import { useCallback } from 'react';

type TaskbarShortcutProps = {
    windowId: IWindow['id'];
}

function TaskbarShortcutContainer({ windowId }: TaskbarShortcutProps) {

    const { handleMinimizeWindow, handleUnMinimizeWindow, handleBringWindowToTop } = useWindowManager()

    const selection = useSelector((state: RootState) => {
        const windowData = state.window.byId[windowId]
        if (!windowData) return null

        const processData = state.process.byId[windowData.processId]
        if (!processData) return null

        const isWindowFocused = state.window.focusedWindowId == windowId
        return { windowMinimizedState: windowData.isMinimized, packageId: processData.packageId, isWindowFocused }
    })


    const handleFocusOrMinimize = useCallback(() => {
        if (!selection) return;

        if (selection.windowMinimizedState) {
            handleUnMinimizeWindow(windowId);
            return
        }

        if (!selection.windowMinimizedState && !selection.isWindowFocused) {
            handleBringWindowToTop(windowId);
            return
        }

        handleMinimizeWindow(windowId);
    }, [selection, windowId, handleUnMinimizeWindow, handleMinimizeWindow, handleBringWindowToTop]);

    if (!selection) return null
    const { isWindowFocused, packageId } = selection;
    const icon = hardDrive[packageId].iconUrl

    return (
        <>
            {
                packageId ?
                    <TaskbarShortcutButton icon={icon} handleFocusOrMinimize={handleFocusOrMinimize} isWindowFocused={isWindowFocused} />
                    :
                    <div></div>
            }
        </>
    )
}

export default TaskbarShortcutContainer
