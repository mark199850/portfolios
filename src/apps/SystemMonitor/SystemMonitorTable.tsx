import { flexRender, type RowData, type Table } from "@tanstack/react-table";
import { ScrollableArea } from "../../components/shared/ScrollableArea/ScrollableArea";
import styles from "./SystemMonitorTable.module.scss";

type TableProperties<T extends RowData> = {
  table: Table<T>;
};

export function SystemMonitorTable<T extends RowData>({
  table,
}: TableProperties<T>) {
  return (
    <div className={styles.tableWrapper}>
      <ScrollableArea>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    <div>
                      {{
                        asc: "▲",
                        desc: "▼",
                      }[header.column.getIsSorted() as string] ?? "▼▲"}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={row.getIsSelected() ? styles.selected : ""}
                onClick={row.getToggleSelectedHandler()}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollableArea>
    </div>
  );
}
