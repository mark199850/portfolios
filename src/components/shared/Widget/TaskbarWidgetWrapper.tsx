import { Popover } from "@base-ui/react/popover";
import styles from "./TaskbarWidgetWrapper.module.scss";

type TaskbarWidgetWrapperProps = {
  Display: React.ElementType;
  FloatingPopup: React.ElementType;
};

export default function TaskbarWidgetWrapper({
  Display,
  FloatingPopup,
}: TaskbarWidgetWrapperProps) {
  return (
    <Popover.Root>
      <Popover.Trigger className={styles.trigger}>
        <Display />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8} className={styles.positioner}>
          <Popover.Popup className={styles.popup}>
            <FloatingPopup />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
