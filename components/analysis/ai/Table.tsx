import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table } from "react-daisyui";
import { TbodyEx, TheadEx } from "@/boilerplate/components/Table";
import { IResult } from "@/interfaces/analysis";
import { ChartPanel, ResultChart } from "../Chart";

const createColumns = (data: IResult[]): ColumnDef<IResult>[] => [
  {
    accessorKey: "year",
    header: "開催年",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      return <td style={{ whiteSpace: "nowrap" }}>{value}</td>;
    },
  },
  {
    accessorKey: "arrive",
    header: () => {
      const labels = Array.from(
        new Set(data.map((result) => `${result.arrive}着`))
      ).sort((a, b) => parseInt(a) - parseInt(b));
      const count = labels.map(
        (value, index, self) =>
          data.filter((x) => `${x.arrive}着` === value).length
      );
      return (
        <ChartPanel label="着順">
          <ResultChart
            labels={labels}
            datasets={{ label: "着順", data: count }}
          />
        </ChartPanel>
      );
    },
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return <td style={{ whiteSpace: "nowrap" }}>{value}</td>;
    },
  },
  {
    accessorKey: "frame",
    header: () => {
      const labels = Array.from(
        new Set(data.map((result) => `${result.frame}枠`))
      ).sort((a, b) => parseInt(a) - parseInt(b));
      const count = labels.map(
        (value, index, self) =>
          data.filter((x) => `${x.frame}枠` === value).length
      );
      return (
        <ChartPanel label="枠">
          <ResultChart
            labels={labels}
            datasets={{ label: "枠", data: count }}
          />
        </ChartPanel>
      );
    },
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return <td style={{ whiteSpace: "nowrap" }}>{value}</td>;
    },
  },
  {
    accessorKey: "number",
    header: "馬番",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return <td style={{ whiteSpace: "nowrap" }}>{value}</td>;
    },
  },
  {
    accessorKey: "name",
    header: "馬名",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      return <td style={{ whiteSpace: "nowrap" }}>{value}</td>;
    },
  },
  {
    accessorKey: "genderOld",
    header: () => {
      const labels = Array.from(
        new Set(
          data
            .filter((result) => result.genderOld !== null)
            .map((result) => result.genderOld)
        )
      ).sort() as string[];
      const count = labels.map(
        (value) => data.filter((x) => x.genderOld === value).length
      );
      return (
        <ChartPanel label="性齢">
          <ResultChart
            labels={labels}
            datasets={{ label: "性齢", data: count }}
          />
        </ChartPanel>
      );
    },
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      return <td style={{ whiteSpace: "nowrap" }}>{value}</td>;
    },
  },
  {
    accessorKey: "weight",
    header: "斤量",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return <td style={{ whiteSpace: "nowrap" }}>{value}</td>;
    },
  },
  {
    accessorKey: "jockey",
    header: "騎手",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      return <td style={{ whiteSpace: "nowrap" }}>{value}</td>;
    },
  },
  {
    accessorKey: "time",
    header: "タイム",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return <td style={{ whiteSpace: "nowrap" }}>{value}</td>;
    },
  },
  {
    accessorKey: "margin",
    header: "着差",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      return <td style={{ whiteSpace: "nowrap" }}>{value}</td>;
    },
  },
  {
    accessorKey: "popular",
    header: () => {
      const labels = Array.from(
        new Set(data.map((result) => `${result.popular}`))
      ).sort((a, b) => parseInt(a) - parseInt(b));
      const count = labels.map(
        (value, index, self) =>
          data.filter((x) => `${x.popular}` === value).length
      );
      return (
        <ChartPanel label="人気">
          <ResultChart
            labels={labels}
            datasets={{ label: "人気", data: count }}
          />
        </ChartPanel>
      );
    },
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return <td style={{ whiteSpace: "nowrap" }}>{value}</td>;
    },
  },
  {
    accessorKey: "odds",
    header: () => {
      const oddsMap = new Map<string, number>();
      for (const result of data) {
        if (result.odds === null) continue;
        let key: string;
        if (result.odds < 5) {
          key = "1~5";
        } else if (result.odds < 10) {
          key = "5~10";
        } else {
          const lowerBound = Math.floor(result.odds / 10) * 10;
          const upperBound = lowerBound + 10;
          key = `${lowerBound}~${upperBound}`;
        }
        oddsMap.set(key, (oddsMap.get(key) || 0) + 1);
      }
      const labels = Array.from(oddsMap.keys())
        .filter((key) => oddsMap.get(key) !== 0)
        .sort((a, b) => {
          const aNumber = Number(a.split("~")[0]);
          const bNumber = Number(b.split("~")[0]);
          return aNumber - bNumber;
        });
      const count = labels.map((key) => oddsMap.get(key) || 0);
      return (
        <ChartPanel label="単勝オッズ">
          <ResultChart
            labels={labels}
            datasets={{ label: "単勝オッズ", data: count }}
          />
        </ChartPanel>
      );
    },
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return <td style={{ whiteSpace: "nowrap" }}>{value}</td>;
    },
  },
  {
    accessorKey: "last",
    header: "上り",
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return <td style={{ whiteSpace: "nowrap" }}>{value}</td>;
    },
  },
  {
    accessorKey: "lastRank",
    header: () => {
      const labels = Array.from(
        new Set(data.map((result) => `${result.lastRank}位`))
      ).sort((a, b) => parseInt(a) - parseInt(b));
      const count = labels.map(
        (value, index, self) =>
          data.filter((x) => `${x.lastRank}位` === value).length
      );
      return (
        <ChartPanel label="上り順">
          <ResultChart
            labels={labels}
            datasets={{ label: "上り順", data: count }}
          />
        </ChartPanel>
      );
    },
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return <td style={{ whiteSpace: "nowrap" }}>{value}</td>;
    },
  },
  {
    accessorKey: "passing",
    header: () => {
      const passingGroupMap = new Map<string, number>();
      for (const result of data) {
        const passing = result.passing;
        if (passing === null) continue;
        const lastCornerPosition = parseInt(passing.split("-").slice(-1)[0]);
        let group;
        if (lastCornerPosition >= 1 && lastCornerPosition <= 3) {
          group = "1~3";
        } else if (lastCornerPosition >= 4 && lastCornerPosition <= 6) {
          group = "4~6";
        } else if (lastCornerPosition >= 7 && lastCornerPosition <= 9) {
          group = "7~9";
        } else {
          group = "10~";
        }
        passingGroupMap.set(group, (passingGroupMap.get(group) || 0) + 1);
      }
      const labels = Array.from(passingGroupMap.keys()).sort(
        (a, b) => Number(a.split("~")[0]) - Number(b.split("~")[0])
      );
      const count = labels.map((key) => passingGroupMap.get(key) || 0);
      return (
        <ChartPanel label="通過">
          <ResultChart
            labels={labels}
            datasets={{ label: "通過", data: count }}
          />
        </ChartPanel>
      );
    },
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      return <td style={{ whiteSpace: "nowrap" }}>{value}</td>;
    },
  },
];

export const ResultTable = ({ data }: { data: IResult[] }) => {
  const columns = createColumns(data);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Table className="w-full">
      <TheadEx table={table} thClassName="normal-case" className="" />
      <TbodyEx<IResult>
        table={table}
        // pending={pending}
        // mobileRowRender={mobileRowRender}
        // emptyAlert={<EmptyAlert />}
      />
    </Table>
  );
};
