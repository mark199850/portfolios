import { addWindow, bringWindowToTop, removeWindow, updateWindow } from '../core/context/WindowSlice.ts'
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../core/context/OSStore";
import type { IWindow } from "../core/interfaces/IWindow.ts";

function useWindowManager() {

    const dispatch = useDispatch<AppDispatch>()

    const handleAddWindow = useCallback((window: IWindow) => {
        dispatch(addWindow({ ...window, id: crypto.randomUUID() }));
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


    return [
        handleAddWindow,
        handleCloseWindow,
        handleBringWindowToTop,
        handleSetWindowState,
        handleSetWindowSize,
        handleSetWindowPosition,
    ] as const
}

export { useWindowManager }
