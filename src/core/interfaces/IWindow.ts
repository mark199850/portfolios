export interface IWindow {
    id: string;
    processId: number;
    title: string;
    position: { x: number, y: number };
    size: { x: number, y: number };
    state: 'minimized' | 'maximized' | 'small' | 'closing';
    isFocused: boolean;
    zIndex: number;
}
