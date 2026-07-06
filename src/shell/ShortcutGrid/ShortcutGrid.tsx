import { PackageShortcut } from "./PackageShortcut/PackageShortcut";
import styles from "./ShortcutGrid.module.scss";
import { DragDropProvider } from "@dnd-kit/react";
import { useDraggableGrid } from "./useDraggableGrid";
import { iconMap } from "../../system/iconRegistry";

export function ShortcutGrid() {
  const { handleDragEnd, containerRef, icons } = useDraggableGrid();

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className={styles.container} ref={containerRef}>
        {icons.map((pkg) => {
          return (
            <PackageShortcut
              key={pkg.id}
              Icon={pkg.iconName ? iconMap[pkg.iconName] : undefined}
              packageId={pkg.id}
              packageName={pkg.name}
            />
          );
        })}
      </div>
    </DragDropProvider>
  );
}
