import type { ElementType } from "react";

export interface IPackage {
    id: string;
    name: string;
    iconUrl: string;
    isBackgroundService: boolean;
    component: ElementType;
}
