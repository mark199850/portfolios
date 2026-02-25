import { AboutMe } from "../apps/AboutMe/AboutMe";
import { Terminal } from "../apps/Terminal/TerminalApp";
import type { IPackage } from "./interfaces/IPackage";

export const hardDrive: Record<string, IPackage> = {
    "about": {
        id: 'about',
        iconUrl: '../assets/profile.png',
        name: "About",
        isBackgroundService: false,
        component: AboutMe
    },
    "terminal": {
        id: 'terminal',
        iconUrl: '../assets/profile.png',
        name: "Terminal",
        isBackgroundService: false,
        component: Terminal
    }

}
