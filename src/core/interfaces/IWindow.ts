export interface IWindow {
    id: number;
    processId: number;
    title: string;
    position: { x: number, y: number };
    size: { x: number, y: number };
    isMinimized: boolean;
    isFocused: boolean;
    zIndex: number;
}
