import ProfileIcon from "../apps/AboutMe/assets/ProfileIcon";
import SettingsIcon from "../apps/Settings/assets/SettingsIcon";

export const iconMap = {
  ProfileIcon: ProfileIcon,
  SettingsIcon: SettingsIcon,
};
export type IconName = keyof typeof iconMap;

export const isValidIcon = (id: string): id is IconName => {
  return id in iconMap;
};
