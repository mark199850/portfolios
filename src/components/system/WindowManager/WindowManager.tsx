import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../../core/context/OSStore.ts'
import type { IWindow } from '../../../core/interfaces/IWindow.ts'
import { WindowFrame } from '../WindowFrame/WindowFrame.tsx'
import { useCallback, useEffect, useState, useRef } from 'react'
import { addWindow, removeWindow, setWindowCoords } from '../../../core/context/WindowSlice.ts'
type Coords = {
    x: number;
    y: number;
}
const dummyAppWindow: IWindow = {
    id: 0,
    processId: 1001,
    isFocused: true,
    size: { x: 200, y: 200 },
    title: 'DummyApp',
    zIndex: 100,
    isMinimized: false,
    position: { x: 200, y: 300 },

}

function WindowManager() {
    const dispatch = useDispatch<AppDispatch>()
    const windows = useSelector((state: RootState) => state.window)

    const mouseCoords = useRef<Coords>({ x: 0, y: 0 });
    const grabCoords = useRef<Coords>({ x: 0, y: 0 });

    const [highestWindowId, setHighestWindowId] = useState<number>(0)

    useEffect(() => {
        const handleWindowMouseMove = (ev: globalThis.MouseEvent) => {
            mouseCoords.current = {
                x: ev.clientX,
                y: ev.clientY,
            };
        };
        window.addEventListener('mousemove', handleWindowMouseMove);

        return () => {
            window.removeEventListener(
                'mousemove',
                handleWindowMouseMove,
            );
        };
    }, []);

    const handleDrag = useCallback(
        (windowId: IWindow['id']) => {
            dispatch(setWindowCoords(
                {
                    id: windowId,
                    position: {
                        x: mouseCoords.current.x - grabCoords.current.x,
                        y: mouseCoords.current.y - grabCoords.current.y,

                    }
                }
            ))
        },
        [dispatch, grabCoords])

    const handleAddWindow = useCallback(() => {
        dispatch(addWindow({ window: dummyAppWindow, highestId: highestWindowId }));
        setHighestWindowId(highestWindowId + 1)
    }, [dispatch, highestWindowId])

    const handleSetGrabCoords = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const windowX = e.currentTarget.getBoundingClientRect().left
        const windowY = e.currentTarget.getBoundingClientRect().top

        const relativeMousePosX = mouseCoords.current.x - windowX
        const relativeMousePosY = mouseCoords.current.y - windowY

        grabCoords.current = { x: relativeMousePosX, y: relativeMousePosY };
    }, [])

    const handleClose = useCallback((id: IWindow['id']) => {
        dispatch(removeWindow(id))
    }, [dispatch])

    return (
        <div>

            <button onClick={handleAddWindow}>Add window</button>
            {windows.map((window: IWindow) => {
                return (
                    <WindowFrame
                        windowData={window}
                        handleDrag={handleDrag}
                        handleSetGrabCoords={handleSetGrabCoords}
                        handleClose={handleClose}
                    >
                        Child
                    </WindowFrame>
                )
            })}
        </div>
    )

}

export default WindowManager
