import { PackageShortcut } from "../PackageShortcut/PackageShortcut";
import WindowStack from "../WindowStack/WindowStack";
import './DesktopCanvas.scss'
import aboutIcon from "../../../assets/profile.png"
import terminalIcon from "../../../assets/terminal.png"

function DesktopCanvas() {
    return (
        <div className="desktop-canvas_container">
            <PackageShortcut icon={aboutIcon} packageId='about' />
            <PackageShortcut icon={terminalIcon} packageId='terminal' />
            <WindowStack />
        </div>
    )
}

export { DesktopCanvas }
