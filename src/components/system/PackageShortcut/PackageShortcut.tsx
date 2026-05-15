import { useSystemCtl } from "../../../hooks/useSystemCtl";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import styles from "./PackageShortcut.module.scss";
import React from "react";
type ProcessLauncherProps = {
  icon: string;
  packageId: string;
  packageName: string;
};

export const PackageShortcut = React.memo(function PackageShortcut({
  icon,
  packageId,
  packageName,
}: ProcessLauncherProps) {
  const { startService } = useSystemCtl();
  const isDummy = packageId.startsWith("dummy");

  const { ref: dragRef } = useDraggable({
    id: packageId,
    disabled: isDummy,
  });
  const { ref: dropRef } = useDroppable({ id: packageId });

  const setNodeRef = (node: HTMLButtonElement | HTMLDivElement | null) => {
    if (!isDummy) dragRef(node);
    dropRef(node);
  };

  if (isDummy) {
    return <div className={styles.placeholder} ref={setNodeRef}></div>;
  }

  return (
    <button ref={setNodeRef} onClick={() => startService(packageId)}>
      <img
        className={styles.iconImg}
        draggable="false"
        src={icon}
        width={40}
        height={40}
      />
      {packageName}
    </button>
  );
});
