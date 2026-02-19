import { useState } from "react";
import type { IWindow } from "../../../core/interfaces/IWindow";
import "./WindowFrame.scss";

type WindowFrameProps = {
    children: React.ReactNode;
    windowData: IWindow;
    handleDrag: (id: IWindow['id']) => void;
    handleSetGrabCoords: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    handleClose: (id: IWindow['id']) => void;
}
//TODO: "Stop Propagation in React": Crucial. When you click the "Close" button, you don't want that click to bubble up and trigger a "Focus Window" event on the frame. Look up e.stopPropagation().


function WindowFrame({ children, windowData, handleDrag, handleSetGrabCoords, handleClose }: WindowFrameProps) {


    const [isDragging, setIsDragging] = useState(false);

    return (
        <div
            onMouseDown={(e) => { setIsDragging(true); handleSetGrabCoords(e) }}
            onMouseMove={() => isDragging && handleDrag(windowData.id)}
            onMouseUp={() => setIsDragging(false)}
            className="container"
            style={{ left: windowData.position.x, top: windowData.position.y }}
        >
            <div className="title-bar">
                {windowData.title}
                <button>_</button>
                <button onClick={() => handleClose(windowData.id)}>x</button>
            </div>
            {children}
        </div>
    )
}

export { WindowFrame }
