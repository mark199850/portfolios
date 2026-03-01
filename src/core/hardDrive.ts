import { AboutMe } from "../apps/AboutMe/AboutMe";
import { Terminal } from "../apps/Terminal/TerminalApp";
import type { IPackage } from "./interfaces/IPackage";
import ProfileIcon from '../assets/profile.png'
import TerminalIcon from '../assets/terminal.png'

export const hardDrive: Record<string, IPackage> = {
    "about": {
        id: 'about',
        iconUrl: ProfileIcon,
        name: "About",
        isBackgroundService: false,
        component: AboutMe
    },
    "terminal": {
        id: 'terminal',
        iconUrl: TerminalIcon,
        name: "Terminal",
        isBackgroundService: false,
        component: Terminal
    }

}
