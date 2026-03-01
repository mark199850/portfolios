import { useSelector } from 'react-redux'
import type { RootState } from '../../../core/context/OSStore.ts'
import type { IWindow } from '../../../core/interfaces/IWindow.ts'
import { WindowFrame } from '../WindowFrame/WindowFrame.tsx'
import { useEffect, useRef } from 'react'
import { WindowContent } from '../WindowContent/WindowContent.tsx'
import './WindowStack.scss'

type Coords = {
    x: number;
    y: number;
}

export function WindowStack() {
    const windowIds = useSelector((state: RootState) => state.window.allIds)

    const containerRef = useRef<HTMLDivElement>(null)
    const mouseCoords = useRef<Coords>({ x: 0, y: 0 });

    const getCoordinates = (e: MouseEvent | TouchEvent) => {
        if ('touches' in e) {
            return { x: e.touches[0]?.clientX ?? 0, y: e.touches[0]?.clientY ?? 0 }
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

    return (
        <div ref={containerRef} className='window-stack_container'>
            {windowIds.map((windowId: IWindow['id']) => {
                return (
                    <WindowFrame
                        key={windowId}
                        id={windowId}
                    >
                        <WindowContent windowId={windowId} />
                    </WindowFrame>
                )
            })}
        </div>
    )
}
