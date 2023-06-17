import {
  ColumnDef,
  Row,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "react-daisyui";
import { TbodyEx, TheadEx } from "@/boilerplate/components/Table";
import { ICondition } from "@/interfaces/condition";

type TableData = {
  year: number;
  arrive: number | undefined;
  frame: number;
  number: number;
  name: string;
  genderOld: string;
  weight: number;
  jockey: string;
  time: number | undefined;
  margin: string | undefined;
  popular: number;
  odds: number;
  last: number | undefined;
  lastRank: number | undefined;
  passing: string | undefined;
};

const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: "year",
    header: "開催年",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "arrive",
    header: "着順",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | undefined>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "frame",
    header: "枠",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "number",
    header: "馬番",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "name",
    header: "馬名",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "genderOld",
    header: "性齢",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "weight",
    header: "斤量",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "jockey",
    header: "騎手",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "time",
    header: "タイム",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | undefined>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "margin",
    header: "着差",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "popular",
    header: "人気",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "odds",
    header: "単勝オッズ",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "last",
    header: "上り",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | undefined>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "lastRank",
    header: "上り順",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | undefined>();
      return <td>{value}</td>;
    },
  },
  {
    accessorKey: "passing",
    header: "通過",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return <td>{value}</td>;
    },
  },
];

export const ResultTable = ({ data }: { data: TableData[] }) => {
  // const data: TableData[] = [
  //   {
  //     a: "a_1",
  //     b: "b_1",
  //   },
  //   {
  //     a: "a_2",
  //     b: "b_2",
  //   },
  // ];
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
      <TbodyEx<TableData>
        table={table}
        // pending={pending}
        // mobileRowRender={mobileRowRender}
        // emptyAlert={<EmptyAlert />}
      />
    </Table>
  );
};
