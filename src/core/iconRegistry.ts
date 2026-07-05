import ProfileIcon from "../apps/AboutMe/assets/ProfileIcon";
import SettingsIcon from "../apps/Settings/assets/SettingsIcon";
import SystemMonitorIcon from "../apps/SystemMonitor/assets/SystemMonitorIcon";

export const iconMap = {
  ProfileIcon: ProfileIcon,
  SettingsIcon: SettingsIcon,
  SystemMonitorIcon: SystemMonitorIcon,
};
export type IconName = keyof typeof iconMap;

export const isValidIcon = (id: string): id is IconName => {
  return Object.hasOwn(iconMap, id);
};
