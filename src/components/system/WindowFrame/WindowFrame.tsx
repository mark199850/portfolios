import { memo, useState } from "react";
import type { IWindow } from "../../../core/interfaces/IWindow";
import "./WindowFrame.scss";
import { Rnd } from "react-rnd";
import { useSelector } from "react-redux";
import type { RootState } from "../../../core/context/OSStore.ts";
import { useWindowManager } from "../../../hooks/useWindowManager.ts";

type WindowFrameProps = {
    id: IWindow['id'];
    children: React.ReactNode;
}

export const WindowFrame = memo(function WindowFrame({ children, id }: WindowFrameProps) {
    const { executeWindowAction } = useWindowManager();

    const windowData = useSelector((state: RootState) => state.window.byId[id])

    const [isGrabbing, setIsGrabbing] = useState(false);

    if (!windowData) return null

    const handleBringWindowToTop = () => {
        executeWindowAction({ type: "BRING_WINDOW_TO_TOP", windowId: windowData.id });
    };

    const handleSetWindowPosition = (position: IWindow['position']) => {
        executeWindowAction({ type: 'SET_WINDOW_POSITION', windowId: windowData.id, position });
    };

    const handleSetWindowSize = (size: IWindow['size']) => {
        executeWindowAction({ type: 'SET_WINDOW_SIZE', windowId: windowData.id, size });
    }

    const handleMinimizeWindow = () => {
        executeWindowAction({ type: 'MINIMIZE_WINDOW', windowId: windowData.id, });
    }

    const handleToggleWindowSizingMode = () => {
        executeWindowAction({ type: 'SET_WINDOW_SIZING_MODE', windowId: windowData.id, sizingMode: windowData.sizingMode === "small" ? 'maximized' : 'small' });
    }

    const handleCloseWindow = () => {
        executeWindowAction({ type: 'CLOSE_WINDOW', windowId: windowData.id });
    }

    if (!windowData || windowData.isMinimized) return null;

    return (
        <Rnd
            bounds="parent"
            minHeight={200}
            minWidth={600}
            size={
                windowData.sizingMode == 'maximized'
                    ? { width: "100%", height: "100%" }
                    : { width: windowData.size.x, height: windowData.size.y }
            }
            position={
                windowData.sizingMode == 'maximized'
                    ? { x: 0, y: 0 }
                    : windowData.position
            }
            dragHandleClassName="windowframe-title"
            disableDragging={windowData.sizingMode == 'maximized'}
            enableResizing={windowData.sizingMode !== 'maximized'}
            onMouseDown={handleBringWindowToTop}
            onTouchStart={handleBringWindowToTop}
            onResizeStart={() => { setIsGrabbing(true); handleBringWindowToTop() }}
            onResize={(_e, _dir, ref, _delta, position) => {
                handleSetWindowSize({ x: ref.offsetWidth, y: ref.offsetHeight });
                handleSetWindowPosition({ x: position.x, y: position.y });
            }}
            onResizeStop={() => setIsGrabbing(false)}
            onDragStart={() => setIsGrabbing(true)}
            onDrag={(_e, dir) => handleSetWindowPosition({ x: dir.x, y: dir.y })}
            onDragStop={() => setIsGrabbing(false)}
            style={{ zIndex: windowData.zIndex }}
            className={`rnd ${isGrabbing && "dragging"}`}
        >
            <div
                className={`container ${windowData.sizingMode === "maximized" && "maximized"} ${windowData.isClosing ? "closing" : "opening"}`}
            >
                <div className="windowframe-title-bar">
                    <div className="windowframe-title-area">
                        <p className="windowframe-title">{windowData.title}</p>
                    </div>
                    <div className="windowframe-buttons">
                        <button
                            className={`minimize-button`}
                            onClick={handleMinimizeWindow}
                        >_</button>
                        <button
                            className={`maximize-button`}
                            onClick={handleToggleWindowSizingMode}
                        >O</button>
                        <button
                            className="close-button"
                            onClick={(e) => { handleCloseWindow(); e.stopPropagation() }}
                        >x</button>
                    </div>
                </div>
                <div className="window-content">
                    {children}
                </div>
            </div>
        </Rnd>
    )
})
