export interface IWindow {
    id: string;
    processId: number;
    title: string;
    position: { x: number, y: number };
    size: { x: number, y: number };
    isMinimized: boolean;
    isFocused: boolean;
    zIndex: number;
}
