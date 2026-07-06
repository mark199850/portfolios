import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type RowData,
} from "@tanstack/react-table";
import type { OSProcess } from "../../kernel/types/OSProcess";
import { memo, useMemo } from "react";
import styles from "./Services.module.scss";
import { Button } from "@base-ui/react";
import { useSystemCtl } from "../../system/hooks/useSystemCtl";
import { SystemMonitorTable } from "./SystemMonitorTable";
import type { ProcessId } from "../../kernel/utils/pid";
import type { ServicePackageMeta } from "../../kernel/types/PackageMeta";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    // Note: TData extends unknown is used here purely to consume the
    // generic parameter and prevent strict ESLint unused-var warnings.
    activeProcessMap: TData extends unknown ? Record<string, ProcessId> : never;
  }
}

const columnHelper = createColumnHelper<ServicePackageMeta>();

const COLUMNS = [
  columnHelper.accessor((row) => row.id, {
    id: "PackageID",
    header: "Package ID",
  }),
  columnHelper.accessor((row) => row.id, {
    id: "serviceState",
    header: "State",
    cell: (cell) => {
      const activeProcessMap = cell.table.options.meta?.activeProcessMap;
      const isRunning = Boolean(activeProcessMap?.[cell.row.original.id]);

      return <span>{isRunning ? "Running" : "Stopped"}</span>;
    },
  }),
];

type ServicesProps = {
  processes: Record<ProcessId, OSProcess>;
  services: ServicePackageMeta[];
};

export const Services = memo(function Services({
  processes,
  services,
}: ServicesProps) {
  "use no memo";

  const { stopService, startService } = useSystemCtl();

  const activeProcessMap = useMemo(() => {
    const map: Record<string, ProcessId> = {};
    Object.values(processes).forEach((process) => {
      map[process.packageId] = process.pid;
    });
    return map;
  }, [processes]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: services,
    columns: COLUMNS,
    getRowId: (row) => String(row.id),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: "PackageID",
          desc: false,
        },
      ],
    },
    meta: {
      activeProcessMap,
    },
  });

  const handleSwitchProcessState = () => {
    table.getSelectedRowModel().flatRows.forEach((row) => {
      const packageId = row.original.id;
      const runningPid = activeProcessMap[packageId];

      if (runningPid) {
        stopService(runningPid);
      } else {
        startService(packageId);
      }
    });
  };

  return (
    <div className={styles.container}>
      <SystemMonitorTable table={table} />
      <Button onClick={handleSwitchProcessState}>Stop/Start</Button>
    </div>
  );
});
