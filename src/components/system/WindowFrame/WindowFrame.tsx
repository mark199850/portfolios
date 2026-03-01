import { memo, useState } from "react";
import type { IWindow } from "../../../core/interfaces/IWindow";
import "./WindowFrame.scss";
import { Rnd } from "react-rnd";
import { useSelector } from "react-redux";
import type { RootState } from "../../../core/context/OSStore.ts";

type WindowActions = {
    close: (id: IWindow['id']) => void;
    setWindowSizingMode: (id: IWindow['id'], sizingMode: IWindow['sizingMode']) => void;
    setWindowSize: (id: IWindow['id'], windowSize: IWindow['size']) => void;
    setWindowPosition: (id: IWindow['id'], windowPosition: IWindow['position']) => void;
    bringWindowToTop: (is: IWindow['id']) => void;
    minimizeWindow: (id: IWindow['id']) => void;

}
type WindowFrameProps = {
    id: IWindow['id'];
    children: React.ReactNode;
    windowActions: WindowActions;
}

const WindowFrame = memo(function WindowFrame({ children, id, windowActions }: WindowFrameProps) {
    const { close, setWindowSizingMode, setWindowSize, setWindowPosition, bringWindowToTop, minimizeWindow } = windowActions;

    const windowData = useSelector(
        (state: RootState) => state.window.byId[id]
    )

    const [isGrabbing, setIsGrabbing] = useState(false);

    return (<>
        {!windowData.isMinimized &&
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
                onMouseDown={() => { bringWindowToTop(windowData.id) }}
                onTouchStart={() => { bringWindowToTop(windowData.id) }}
                onResizeStart={() => { setIsGrabbing(true); bringWindowToTop(windowData.id) }}
                onResize={(_e, _dir, ref, _delta, position) => {
                    setWindowSize(windowData.id, { x: ref.offsetWidth, y: ref.offsetHeight });
                    setWindowPosition(windowData.id, { x: position.x, y: position.y });
                }}
                onResizeStop={() => setIsGrabbing(false)}
                onDragStart={() => { setIsGrabbing(true) }}
                onDrag={(_e, dir) => {
                    setWindowPosition(windowData.id, { x: dir.x, y: dir.y })
                }}
                onDragStop={() => setIsGrabbing(false)}
                style={{ zIndex: windowData.zIndex }}
                className={`rnd ${isGrabbing && "dragging"}`}
            >
                <div
                    className={`container ${windowData.sizingMode === "maximized" && "maximized"}  ${windowData.isClosing ? "closing" : "opening"}`}
                >
                    <div className="windowframe-title-bar">
                        <div className="windowframe-title-area">
                            <p className="windowframe-title">{windowData.title}</p>
                        </div>
                        <div className="windowframe-buttons">
                            <button
                                className={`minimize-button`}
                                onClick={() => minimizeWindow(windowData.id)}
                            >_</button>
                            <button
                                className={`maximize-button`}
                                onClick={() => setWindowSizingMode(windowData.id, windowData.sizingMode === "small" ? 'maximized' : 'small')}
                            >O</button>
                            <button className="close-button" onClick={(e) => { close(windowData.id); e.stopPropagation() }}>x</button>
                        </div>
                    </div>
                    <div className="window-content">
                        {children}
                    </div>
                </div>
            </Rnd>
        }
    </>
    )
})

export { WindowFrame }
