import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { JSX } from "react";
import { ITableBodyComponentProps } from "./type";

/**
 * A component that renders the table body.
 *
 * The component renders a `<TableBody>` element that contains table rows, each of which
 * contains table cells. The table cells are rendered using the `flexRender` function
 * from `@tanstack/react-table`.
 *
 * If the table is empty, the component renders a message indicating that no products
 * were found.
 *
 * If the table is loading, the component renders a loading animation.
 *
 * @param {ITableBodyComponentProps} props - The props object, which contains a
 * `table` property that is an instance of `Table` from `@tanstack/react-table`,
 * and an `isShowLoading` property that is a boolean indicating whether the table
 * is loading.
 *
 * @returns {JSX.Element} A JSX element representing the table body.
 */
const TableBodyComponent = ({
  table,
  isShowLoading,
}: ITableBodyComponentProps): JSX.Element => {
  return (
    <TableBody>
      {table.getRowModel().rows.length > 0 ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            className="hover:bg-slate-700/50 transition-colors"
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                className="text-center"
                style={{ width: cell.column.getSize() }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            className="text-center py-12"
            colSpan={table.getVisibleLeafColumns().length}
          >
            {isShowLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-muted-foreground">
                  Loading products...
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <span className="text-lg text-muted-foreground">
                  No products found
                </span>
                <span className="text-sm text-muted-foreground">
                  Try adding a new product to get started
                </span>
              </div>
            )}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableBodyComponent;
