import { ICondition, IResult, MAX, MIN } from "@/interfaces/analysis";
import axios from "axios";
import useSWR from "swr";
import { fetcher } from "@/boilerplate/utils/api";
import { mgt_race_info, mgt_race_result } from "@prisma/client";
import { useEffect, useState } from "react";

const fetchRecord = (
  name: string,
  raceId: number,
  year: number,
  targetResult: mgt_race_result[]
) => {
  const record = targetResult.filter(
    (result) =>
      result.name === name && result.race_id === raceId && result.year === year
  );
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
  const [winRate, setWinRate] = useState<WinRecordType | undefined>();
  const { data: raceInfo, error: raceInfoError } = useSWR(
    { url: "/api/db/raceInfo", method: "GET" },
    fetcher
  );
  const { data: targetRace, error: targetRaceError } = useSWR(
    {
      url: "/api/db/raceResults",
      method: "POST",
      body: {
        race_id: targetRaceId,
      },
    },
    fetcher
  );

  useEffect(() => {
    const calcRate = () => {
      if (results && raceInfo && targetRace) {
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
            record = fetchRecord(
              result.name!,
              targetRaceId!,
              result.year!,
              targetRace
            );
          } else {
            record = fetchRecord(
              result.name!,
              targetRaceId!,
              result.year! + 1,
              targetRace
            );
          }
          if (record) {
            switch (record[0].arrive) {
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
  }, [results, raceInfo, targetRace]);

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
