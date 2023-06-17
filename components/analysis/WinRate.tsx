import { mgt_race_result } from "@/node_modules/.prisma/client/index";
import { twMerge } from "tailwind-merge";
import { ICondition, IResult, MAX, MIN } from "@/interfaces/analysis";
import axios from "axios";
import useSWR from "swr";
import { fetcher } from "@/boilerplate/utils/api";
import { mgt_race_info } from "@prisma/client";
import { useEffect, useState } from "react";

const fetchRecord = async (name: string, raceId: number, year: number) => {
  const record = await axios.post("/api/db/raceResults", {
    name: name,
    race_id: raceId,
    year: year,
  });
  return record;
};

type WinRecordType = {
  first: number;
  second: number;
  third: number;
  outside: number;
};
export const WinRate = ({
  condition,
  results,
  targetRaceId,
  // targetYear,
  targetRaceResult,
  className,
}: {
  condition: ICondition;
  results: IResult[];
  targetRaceId: number;
  // targetYear: [number, number] | undefined;
  targetRaceResult: IResult[];
  className?: string;
}) => {
  const { data: raceInfo, error } = useSWR(
    { url: "/api/db/raceInfo", method: "GET" },
    fetcher
  );
  const [winRate, setWinRate] = useState<WinRecordType | undefined>();

  useEffect(() => {
    const calcRate = async () => {
      if (results && raceInfo) {
        let winRate: WinRecordType = {
          first: 0,
          second: 0,
          third: 0,
          outside: 0,
        };
        let record;
        for (const result of results) {
          const source = raceInfo.filter((item: mgt_race_info) => {
            const year = new Date(item.date).getFullYear();
            return item.race_id === result.raceId && year === result.year;
          });
          const target = raceInfo.filter((item: mgt_race_info) => {
            const year = new Date(item.date).getFullYear();
            return item.race_id === targetRaceId && year === result.year;
          });
          // console.log({ source, target, result });
          if (source[0].date <= target[0].date) {
            record = await fetchRecord(
              result.name!,
              targetRaceId!,
              result.year!
            );
            // console.log({ record });
          } else {
            record = await fetchRecord(
              result.name!,
              targetRaceId!,
              result.year! + 1
            );
          }
          console.log({ record });
          if (record) {
            switch (record.data[0].arrive) {
              case 1: {
                console.log(1);
                winRate.first++;
                break;
              }
              case 2: {
                console.log(2);
                winRate.second++;
                break;
              }
              case 3: {
                console.log(3);
                winRate.third++;
                break;
              }
              default: {
                console.log("a");
                winRate.outside++;
                break;
              }
            }
          }
        }
        console.log({ winRate });
        setWinRate(winRate);
      } else {
        setWinRate(undefined);
      }
    };
    calcRate();
  }, [results, raceInfo]);
  // for (let year = targetYear![MIN]; year <= targetYear![MAX]; year++) {
  // }

  if (!raceInfo) {
    return;
  }

  // console.log({ raceInfo, results, targetRaceResult });
  return (
    <>
      <div className="flex justify-between mx-4">
        <div>着度指数</div>
        <div>
          {winRate && (
            <>
              {winRate.first}-{winRate.second}-{winRate.third}-{winRate.outside}
            </>
          )}
        </div>
      </div>
      <div className="flex justify-between mx-4 mt-4">
        <div>勝率</div>
        <div>
          {winRate && (
            <>
              {(
                (winRate.first /
                  (winRate.first +
                    winRate.second +
                    winRate.third +
                    winRate.outside)) *
                100
              ).toFixed(1)}
              %
            </>
          )}
        </div>
      </div>
      <div className="flex justify-between mx-4 mt-2">
        <div>連体率</div>
        <div>
          {winRate && (
            <>
              {(
                (winRate.second /
                  (winRate.first +
                    winRate.second +
                    winRate.third +
                    winRate.outside)) *
                100
              ).toFixed(1)}
              %
            </>
          )}
        </div>
      </div>
      <div className="flex justify-between mx-4 mt-2">
        <div>複勝率</div>
        <div>
          {winRate && (
            <>
              {(
                (winRate.third /
                  (winRate.first +
                    winRate.second +
                    winRate.third +
                    winRate.outside)) *
                100
              ).toFixed(1)}
              %
            </>
          )}
        </div>
      </div>
    </>
  );
};
