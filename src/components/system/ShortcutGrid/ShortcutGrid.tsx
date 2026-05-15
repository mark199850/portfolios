import { PackageShortcut } from "../PackageShortcut/PackageShortcut";
import styles from "./ShortcutGrid.module.scss";
import { DragDropProvider } from "@dnd-kit/react";
import { useDraggableGrid } from "./useDraggableGrid";

export function ShortcutGrid() {
  const { handleDragEnd, containerRef, icons } = useDraggableGrid();

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className={styles.container} ref={containerRef}>
        {icons.map((pkg) => {
          return (
            <PackageShortcut
              key={pkg.id}
              icon={pkg.iconUrl}
              packageId={pkg.id}
              packageName={pkg.name}
            />
          );
        })}
      </div>
    </DragDropProvider>
  );
}
