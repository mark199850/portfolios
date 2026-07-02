import type { DragEndEvent } from "@dnd-kit/react";
import { useEffect, useRef, useState } from "react";
import type { IApplicationPackage } from "../../../core/interfaces/IPackage";
import { hardDrive } from "../../../core/hardDrive";

const dummyPackage: IApplicationPackage = {
  type: "application",
  id: "about",
  name: "About",
  isSingleton: false,
  component: () => null,
  iconName: "ProfileIcon",
};

const foregroundPackages = Object.values(hardDrive).filter(
  (pkg) => pkg.type === "application",
);

function useDraggableGrid() {
  const [icons, setIcons] = useState<Array<IApplicationPackage>>(
    () => foregroundPackages,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const baseIcons = foregroundPackages;
    let dummyIconsCache: IApplicationPackage[] = [];
    let frameId: number;
    const resizeObserver = new ResizeObserver((entries) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        for (const entry of entries) {
          const width = entry.contentBoxSize[0]?.inlineSize ?? 0;
          const height = entry.contentBoxSize[0]?.blockSize ?? 0;
          const cellSize = 100;
          const gapSize = 10;

          const horizontalCellsCount = Math.floor(
            (width + gapSize) / (cellSize + gapSize),
          );
          const verticalCellsCount = Math.floor(
            (height + gapSize) / (cellSize + gapSize),
          );

          if (
            dummyIconsCache.length ==
            verticalCellsCount * horizontalCellsCount - baseIcons.length
          ) {
            return;
          }

          const dummyIcons: IApplicationPackage[] = [];
          for (
            let i = 0;
            i < verticalCellsCount * horizontalCellsCount - baseIcons.length;
            i++
          ) {
            dummyIcons.push({
              ...dummyPackage,
              id: `dummy-${i}`,
            });
          }
          setIcons([...baseIcons, ...dummyIcons]);
          dummyIconsCache = dummyIcons;
        }
      });
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleDragEnd: DragEndEvent = (event) => {
    if (event.canceled) return;

    const sourceId = event.operation.source?.id;
    const targetId = event.operation.target?.id;

    if (!targetId || sourceId === targetId) return;

    setIcons((prevIcons) => {
      const sourceIndex = prevIcons.findIndex((pkg) => pkg.id === sourceId);
      const targetIndex = prevIcons.findIndex((pkg) => pkg.id === targetId);

      const newIcons = [...prevIcons];

      const sourceItem = newIcons[sourceIndex];
      const targetItem = newIcons[targetIndex];

      if (sourceItem && targetItem) {
        newIcons[sourceIndex] = targetItem;
        newIcons[targetIndex] = sourceItem;
      }
      return newIcons;
    });
  };

  return { containerRef, icons, handleDragEnd };
}

export { useDraggableGrid };
