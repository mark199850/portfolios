import { addWindow, bringWindowToTop, removeWindow, updateWindow } from '../core/context/WindowSlice.ts'
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
            isFocused: true,
            size: { x: 400, y: 300 },
            state: "small",
            icon
        }));
    }, [dispatch])

    const handleCloseWindow = useCallback((id: IWindow['id']) => {
        dispatch(updateWindow({ id, state: "closing" }));
        setTimeout(() => {
            dispatch(removeWindow(id))
        }, 300)

    }, [dispatch])

    const handleBringWindowToTop = useCallback((windowId: IWindow['id']) => {
        dispatch(bringWindowToTop({ id: windowId }))
    }, [dispatch])

    const handleSetWindowState = useCallback((id: IWindow['id'], state: IWindow['state']) => {
        dispatch(updateWindow({ id, state }))
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
        handleSetWindowState,
        handleSetWindowSize,
        handleSetWindowPosition,
    }
}

export { useWindowManager }
