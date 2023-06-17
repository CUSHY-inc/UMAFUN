import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "react-daisyui";
import { TbodyEx, TheadEx } from "@/boilerplate/components/Table";
import { IResult } from "@/interfaces/analysis";

const columns: ColumnDef<IResult>[] = [
  {
    accessorKey: "year",
    header: "開催年",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "arrive",
    header: "着順",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "frame",
    header: "枠",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "number",
    header: "馬番",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "name",
    header: "馬名",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "genderOld",
    header: "性齢",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "weight",
    header: "斤量",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "jockey",
    header: "騎手",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "time",
    header: "タイム",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "margin",
    header: "着差",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "popular",
    header: "人気",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "odds",
    header: "単勝オッズ",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "last",
    header: "上り",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "lastRank",
    header: "上り順",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "passing",
    header: "通過",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      return <td>{value}</td>;
    },
  },
];

export const ResultTable = ({ data }: { data: IResult[] }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Table className="w-full">
      <TheadEx
        table={table}
        thClassName="normal-case"
        className="bg-gray-200"
      />
      <TbodyEx<IResult>
        table={table}
        // pending={pending}
        // mobileRowRender={mobileRowRender}
        // emptyAlert={<EmptyAlert />}
      />
    </Table>
  );
};
