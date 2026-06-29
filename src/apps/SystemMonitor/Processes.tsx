import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { IProcess } from "../../core/interfaces/IProcess";
import { useMemo } from "react";
import styles from "./Processes.module.scss";
import { Button } from "@base-ui/react";
import { useSystemCtl } from "../../hooks/useSystemCtl";
import { SystemMonitorTable } from "./SystemMonitorTable";
import type { ProcessId } from "../../core/utils/pid";
import { UptimeCell } from "./UptimeCell";

const columnHelper = createColumnHelper<IProcess>();
const COLUMNS = [
  columnHelper.accessor((row) => row.pid, {
    id: "ProcessID",
    header: "Process ID",
  }),
  columnHelper.accessor((row) => row.packageId, {
    id: "PackageID",
    header: "Package ID",
  }),
  columnHelper.accessor((row) => row.isBackground, {
    id: "Background",
    header: "Background",
    cell: (cellContext) => {
      return (
        <span>
          {cellContext.row.original.isBackground ? "Background" : "Foreground"}
        </span>
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

type ProcessesProps = {
  processes: Record<ProcessId, IProcess>;
};

export function Processes({ processes }: ProcessesProps) {
  "use no memo";

  const { stopService } = useSystemCtl();

  const data: IProcess[] = useMemo(() => Object.values(processes), [processes]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: COLUMNS,
    getRowId: (row) => String(row.pid),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: "Uptime",
          desc: false,
        },
      ],
    },
  });

  const handleKillProcess = () => {
    table
      .getSelectedRowModel()
      .flatRows.forEach((row) => stopService(row.original.pid));
  };

  return (
    <div className={styles.container}>
      <SystemMonitorTable table={table} />
      <Button onClick={handleKillProcess}>Kill selected</Button>
    </div>
  );
}
