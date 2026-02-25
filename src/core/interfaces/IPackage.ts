export interface IPackage {
    id: string;
    name: string;
    iconUrl: string;
    isBackgroundService: boolean;
    component: React.FC;
}
