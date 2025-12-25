import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { JSX } from "react";
import { ITableHeaderComponentProps } from "./type";

/**
 * A component that renders the table header.
 *
 * It renders a `<TableHeader>` element that contains table rows, each of which
 * contains table head cells. The table cells are rendered using the `header`
 * property of the column definition, which is passed to the `flexRender`
 * function from `@tanstack/react-table`.
 *
 * @param {ITableHeaderComponentProps} props The props object, which contains a
 * `table` property that is an instance of `Table` from `@tanstack/react-table`.
 *
 * @returns {JSX.Element} A JSX element representing the table header.
 */
const TableHeaderComponent = ({
  table,
}: ITableHeaderComponentProps): JSX.Element => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              className="font-semibold text-center text-white"
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default TableHeaderComponent;
