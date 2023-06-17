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
  results,
  targetRaceId,
}: {
  results: IResult[];
  targetRaceId: number;
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
          if (source[0].date <= target[0].date) {
            record = await fetchRecord(
              result.name!,
              targetRaceId!,
              result.year!
            );
          } else {
            record = await fetchRecord(
              result.name!,
              targetRaceId!,
              result.year! + 1
            );
          }
          if (record) {
            switch (record.data[0].arrive) {
              case 1: {
                winRate.first++;
                break;
              }
              case 2: {
                winRate.second++;
                break;
              }
              case 3: {
                winRate.third++;
                break;
              }
              default: {
                winRate.outside++;
                break;
              }
            }
          }
        }
        setWinRate(winRate);
      } else {
        setWinRate(undefined);
      }
    };
    calcRate();
  }, [results, raceInfo]);

  if (!raceInfo) {
    return;
  }

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
