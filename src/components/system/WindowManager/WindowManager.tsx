import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../../core/context/OSStore.ts'
import type { IWindow } from '../../../core/interfaces/IWindow.ts'
import { WindowFrame } from '../WindowFrame/WindowFrame.tsx'
import { useCallback, useEffect, useRef } from 'react'
import { addWindow, bringWindowToTop, removeWindow, setWindowPosition, setWindowSize, setWindowState } from '../../../core/context/WindowSlice.ts'
type Coords = {
    x: number;
    y: number;
}
const dummyAppWindow: IWindow = {
    id: 0,
    processId: 1001,
    isFocused: true,
    size: { x: 300, y: 300 },
    title: 'DummyApp',
    zIndex: 100,
    state: 'small',
    position: { x: 20, y: 30 },
}

function WindowManager() {
    const dispatch = useDispatch<AppDispatch>()
    const windowIds = useSelector((state: RootState) => state.window.allIds)

    const nextWindowId = useRef<number>(0);
    const highestZIndex = useRef<number>(0);
    const containerRef = useRef<HTMLDivElement>(null)
    const mouseCoords = useRef<Coords>({ x: 0, y: 0 });

    const getCoordinates = (e: MouseEvent | TouchEvent) => {
        if ('touches' in e) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY }
        }
        return { x: e.clientX, y: e.clientY }
    }

    useEffect(() => {
        if (window.navigator.userAgent.indexOf('Android') == -1
            &&
            window.navigator.userAgent.indexOf('iOS') == -1
        ) {
            const handleWindowMouseMove = (e: MouseEvent) => {
                const coords = getCoordinates(e)
                mouseCoords.current = {
                    x: coords.x,
                    y: coords.y,
                };
            };
            window.addEventListener('mousemove', handleWindowMouseMove);

            return () => {
                window.removeEventListener(
                    'mousemove',
                    handleWindowMouseMove,
                );
            };
        }
    }, []);

    const handleAddWindow = useCallback(() => {
        dispatch(addWindow({ ...dummyAppWindow, id: nextWindowId.current }));
        nextWindowId.current = nextWindowId.current + 1
    }, [dispatch, nextWindowId])

    const handleClose = useCallback((id: IWindow['id']) => {
        dispatch(setWindowState({ id, state: "closing" }));
        setTimeout(() => {
            dispatch(removeWindow(id))
        }, 300)

    }, [dispatch])

    const handleSetWindowState = useCallback((windowId: IWindow['id'], windowState: IWindow['state']) => {
        dispatch(setWindowState({ id: windowId, state: windowState }));
    }, [dispatch])

    const handleSetWindowSize = useCallback((windowId: IWindow['id'], size: IWindow['size']) => {
        dispatch(setWindowSize({ id: windowId, size: size }));
    }, [dispatch])

    const handleSetWindowPosition = useCallback((windowId: IWindow['id'], position: IWindow['position']) => {
        dispatch(setWindowPosition({ id: windowId, position: position }));
    }, [dispatch])

    const handleBringWindowToTop = useCallback((windowId: IWindow['id']) => {
        highestZIndex.current = highestZIndex.current + 1;
        dispatch(bringWindowToTop({ id: windowId, zIndex: highestZIndex.current }))
    }, [dispatch])

    const windowActions = {
        close: handleClose,
        setWindowState: handleSetWindowState,
        setWindowSize: handleSetWindowSize,
        setWindowPosition: handleSetWindowPosition,
        bringWindowToTop: handleBringWindowToTop
    }
    return (
        <div ref={containerRef} style={{ position: "relative", width: "100vw", height: "100vh" }}>
            <button onClick={handleAddWindow}>Add window</button>
            {windowIds.map((windowId: IWindow['id']) => {
                return (
                    <WindowFrame
                        key={windowId}
                        id={windowId}
                        windowActions={windowActions}
                    >
                        {windowId}
                    </WindowFrame>
                )
            })}
        </div>
    )

}

export default WindowManager
