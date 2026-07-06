import { useSystemCtl } from "../../../system/hooks/useSystemCtl";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import styles from "./PackageShortcut.module.scss";
import React, { type ComponentType, type SVGProps } from "react";
import { Button } from "@base-ui/react";
type ProcessLauncherProps = {
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  packageId: string;
  packageName: string;
};

export const PackageShortcut = React.memo(function PackageShortcut({
  Icon,
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
    <Button ref={setNodeRef} onClick={() => startService(packageId)}>
      {Icon ? <Icon className={styles.iconImg}></Icon> : <></>}
      {packageName}
    </Button>
  );
});
