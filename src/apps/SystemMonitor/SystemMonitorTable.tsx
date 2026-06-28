import { flexRender, type RowData, type Table } from "@tanstack/react-table";
import { ScrollableArea } from "../../components/shared/ScrollableArea/ScrollableArea";
import styles from "./SystemMonitorTable.module.scss";
import { Button } from "@base-ui/react";

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
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    <br />
                    <Button
                      className={styles.sortButton}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {{
                        asc: "▲",
                        desc: "▼",
                      }[header.column.getIsSorted() as string] ?? "▼▲"}
                    </Button>
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
