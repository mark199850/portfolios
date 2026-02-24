import { memo, useState } from "react";
import type { IWindow } from "../../../core/interfaces/IWindow";
import "./WindowFrame.scss";
import { Rnd } from "react-rnd";
import { useSelector } from "react-redux";
import type { RootState } from "../../../core/context/OSStore.ts";

type WindowActions = {
    close: (id: IWindow['id']) => void;
    setWindowState: (id: IWindow['id'], windowState: IWindow['state']) => void
    setWindowSize: (id: IWindow['id'], windowSize: IWindow['size']) => void
    setWindowPosition: (id: IWindow['id'], windowPosition: IWindow['position']) => void
    bringWindowToTop: (is: IWindow['id']) => void

}
type WindowFrameProps = {
    id: IWindow['id'];
    children: React.ReactNode;
    windowActions: WindowActions;
}

const WindowFrame = memo(function WindowFrame({ children, id, windowActions }: WindowFrameProps) {
    const { close, setWindowState, setWindowSize, setWindowPosition, bringWindowToTop } = windowActions;

    const windowData = useSelector(
        (state: RootState) => state.window.byId[id]
    )

    const [isGrabbing, setIsGrabbing] = useState(false);

    return (
        <Rnd
            bounds="window"
            minHeight={200}
            minWidth={600}
            size={
                windowData.state == 'maximized'
                    ? { width: "100%", height: "100%" }
                    : { width: windowData.size.x, height: windowData.size.y }
            }
            position={
                windowData.state == 'maximized'
                    ? { x: 0, y: 0 }
                    : windowData.position
            }
            dragHandleClassName="windowframe-title"
            disableDragging={windowData.state == 'maximized'}
            enableResizing={windowData.state !== 'maximized'}
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
                className={`container ${windowData.state === "maximized" && "maximized"}  ${windowData.state === "closing" ? "closing" : "opening"}`}
            >
                <div className="windowframe-title-bar">
                    <div className="windowframe-title-area">
                        <p className="windowframe-title">{windowData.title}</p>
                    </div>
                    <div className="windowframe-buttons">
                        <button className={`minimize-button`}>_</button>
                        <button
                            className={`maximize-button`}
                            onClick={() => setWindowState(windowData.id, windowData.state === "small" ? 'maximized' : 'small')}
                        >O</button>
                        <button className="close-button" onClick={(e) => { close(windowData.id); e.stopPropagation() }}>x</button>
                    </div>
                </div>
                <div className="window-content">
                    {children}
                </div>
            </div>
        </Rnd>
    )
})

export { WindowFrame }
