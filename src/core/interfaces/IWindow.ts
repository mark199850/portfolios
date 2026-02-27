import type { IPackage } from "./IPackage";
import type { IProcess } from "./IProcess";

export interface IWindow {
    id: string;
    processId: IProcess['id'];
    title: IPackage['name'];
    icon: IPackage['iconUrl']
    position: { x: number, y: number };
    size: { x: number, y: number };
    sizingMode: 'small' | 'maximized';
    isMinimized: boolean;
    isClosing: boolean;
    zIndex: number;
}
