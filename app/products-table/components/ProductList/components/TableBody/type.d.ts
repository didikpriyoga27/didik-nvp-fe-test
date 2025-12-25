import { Table } from "@tanstack/react-table";

export interface ITableBodyComponentProps {
  table: Table<Product>;
  isShowLoading: boolean;
}
