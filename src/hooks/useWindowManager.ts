import { addWindow, bringWindowToTop, minimizeWindow, removeWindow, unMinimizeWindow, updateWindow } from '../core/context/WindowSlice.ts'
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../core/context/OSStore";
import type { IWindow } from "../core/interfaces/IWindow.ts";
import type { IProcess } from '../core/interfaces/IProcess.ts';
import type { IPackage } from '../core/interfaces/IPackage.ts';

function useWindowManager() {

    const dispatch = useDispatch<AppDispatch>()

    const handleAddWindow = useCallback((processId: IProcess["id"], title: IPackage['name'], icon: IPackage['iconUrl']) => {
        dispatch(addWindow({
            title,
            processId,
            id: crypto.randomUUID(),
            position: { x: 100, y: 100 },
            zIndex: 0,
            size: { x: 400, y: 300 },
            icon,
            isClosing: false,
            isMinimized: false,
            sizingMode: 'small',
        }));
    }, [dispatch])

    const handleCloseWindow = useCallback((id: IWindow['id']) => {
        dispatch(updateWindow({ id, isClosing: true }));
        setTimeout(() => {
            dispatch(removeWindow(id))
        }, 300)

    }, [dispatch])

    const handleBringWindowToTop = useCallback((id: IWindow['id']) => {
        dispatch(bringWindowToTop({ id }))
    }, [dispatch])

    const handleMinimizeWindow = useCallback((id: IWindow['id']) => {
        dispatch(minimizeWindow(id))
    }, [dispatch])

    const handleUnMinimizeWindow = useCallback((id: IWindow['id']) => {
        dispatch(unMinimizeWindow(id))
    }, [dispatch])

    const handleSetWindowSizingMode = useCallback((id: IWindow['id'], sizingMode: IWindow['sizingMode']) => {
        dispatch(updateWindow({ id, sizingMode }))
    }, [dispatch])

    const handleSetWindowSize = useCallback((id: IWindow['id'], size: IWindow['size']) => {
        dispatch(updateWindow({ id, size }));
    }, [dispatch])

    const handleSetWindowPosition = useCallback((id: IWindow['id'], position: IWindow['position']) => {
        dispatch(updateWindow({ id, position }));
    }, [dispatch])


    return {
        handleAddWindow,
        handleCloseWindow,
        handleBringWindowToTop,
        handleMinimizeWindow,
        handleUnMinimizeWindow,
        handleSetWindowSizingMode,
        handleSetWindowSize,
        handleSetWindowPosition,
    }
}

export { useWindowManager }
