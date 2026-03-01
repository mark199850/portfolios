import { useSystemCtl } from "../../../hooks/useSystemCtl";

type ProcessLauncherProps = {
    icon: string;
    packageId: string;
}

export function PackageShortcut({ icon, packageId }: ProcessLauncherProps) {
    const { startService } = useSystemCtl()

    return (
        <button onClick={() => startService(packageId)}>
            <img src={icon} width={20} height={20} />
            Launch {packageId}
        </button>
    )
}
