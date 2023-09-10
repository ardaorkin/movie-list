import { Table } from "antd";
import { ColumnGroupType, ColumnType } from "antd/es/table";
import { MovieSummary } from "../types";

export interface IMoviesTableProps {
  data: MovieSummary[];
  columns: (ColumnType<MovieSummary> | ColumnGroupType<MovieSummary>)[];
}

export function MoviesTable({ data, columns }: IMoviesTableProps) {
  return (
    <Table<MovieSummary>
      className="movie-table"
      bordered
      pagination={{ pageSize: 10 }}
      dataSource={data}
      columns={columns}
    />
  );
}
