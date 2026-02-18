import type { IApp } from "./IApp";
import type { IProcess } from "./IProcess";
import type { IWindow } from "./IWindow";

export interface SystemState {
    apps: Record<string, IApp>;
    processes: Record<string, IProcess>;
    windows: Record<string, IWindow>;

    activeWindowId: string | null;
    nextPid: number;
}
