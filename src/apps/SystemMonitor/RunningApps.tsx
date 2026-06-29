import {
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
  type ExpandedState,
} from "@tanstack/react-table";
import type { IProcess } from "../../core/interfaces/IProcess";
import { useMemo, useState } from "react";
import styles from "./RunningApps.module.scss";
import { Button } from "@base-ui/react";
import { useSystemCtl } from "../../hooks/useSystemCtl";
import { SystemMonitorTable } from "./SystemMonitorTable";
import type { ProcessId } from "../../core/utils/pid";
import "@tanstack/react-table";
import { UptimeCell } from "./UptimeCell";

const columnHelper = createColumnHelper<IProcess>();
const COLUMNS = [
  columnHelper.accessor((row) => row.packageId, {
    id: "PackageID",
    header: "Package ID",
    cell: ({ cell, row }) => {
      return cell.getIsGrouped() ? (
        <div className={styles.expandableCell}>
          <Button
            onClick={(e) => {
              row.toggleExpanded();
              e.stopPropagation();
            }}
            className={styles.expandButton}
            style={{ cursor: "pointer" }}
          >
            {row.getIsExpanded() ? "▼" : "►"} {row.subRows.length}
          </Button>
          <span>{cell.getValue()}</span>
        </div>
      ) : (
        <div className={styles.expansionCell}>
          {`${cell.getValue()}: ${row.original.pid}`}
        </div>
      );
    },
  }),
  columnHelper.accessor((row) => row.startTimestamp, {
    id: "Uptime",
    header: "Uptime",
    invertSorting: true,
    cell: (cellContext) => (
      <UptimeCell startTimestamp={cellContext.row.original.startTimestamp} />
    ),
  }),
];

type RunningAppsProps = {
  processes: Record<ProcessId, IProcess>;
};

export function RunningApps({ processes }: RunningAppsProps) {
  "use no memo";

  const { stopService } = useSystemCtl();
  const [expanded, setExpanded] = useState<ExpandedState>(true);
  const foregroundProcesses = useMemo(
    () =>
      Object.values(processes).filter(
        (process) => process.isBackground === false,
      ),
    [processes],
  );

  const data: IProcess[] = foregroundProcesses;

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: COLUMNS,
    getRowId: (row) => String(row.pid),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      expanded: expanded,
    },
    onExpandedChange: setExpanded,
    initialState: {
      grouping: ["PackageID"],
      sorting: [
        {
          id: "Uptime",
          desc: false,
        },
      ],
    },
  });

  const handleKillProcess = () => {
    const validRows = table
      .getSelectedRowModel()
      .flatRows.filter((row) => !row.getIsGrouped() && row.original.pid);

    validRows.forEach((row) => {
      stopService(row.original.pid);
    });
  };

  return (
    <div className={styles.container}>
      <SystemMonitorTable table={table} />
      <Button onClick={handleKillProcess}>Kill selected</Button>
    </div>
  );
}
