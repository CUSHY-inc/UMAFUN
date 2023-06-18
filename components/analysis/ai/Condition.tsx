import useSWR from "swr";
import { fetcher } from "@/boilerplate/utils/api";
import { Select } from "@/boilerplate/components/Select";
import { mgt_race_id } from "@prisma/client";
import { ICondition } from "@/interfaces/analysis";
import { useEffect, useState } from "react";
import { yearMax, yearMin, arriveMax, MIN, MAX } from "@/utils/analysis";

export const Condition = ({
  condition,
  setCondition,
}: {
  condition: ICondition;
  setCondition: React.Dispatch<React.SetStateAction<ICondition>>;
}) => {
  const { data, error } = useSWR(
    { url: "/api/db/raceIds", method: "GET" },
    fetcher
  );
  const raceName = data?.map((item: mgt_race_id) => item.race_name);
  const year = Array.from({ length: yearMax - yearMin + 1 }, (_, index) =>
    (yearMax - index).toString()
  );
  const arrive = [...Array(arriveMax)].map((_, i) => (i + 1).toString() + "着");
  const [arriveArray, setArriveArray] = useState<string[]>(["1着", "3着"]);

  useEffect(() => {
    const min = parseInt(arriveArray[MIN].replace("着", ""), 10);
    const max = parseInt(arriveArray[MAX].replace("着", ""), 10);
    let arr: string[] = [];
    for (let i = min; i <= max; i++) {
      arr.push(i.toString());
    }
    setCondition((prevState) => ({
      ...prevState,
      arrive: arr,
    }));
  }, [arriveArray, setCondition]);

  return (
    <>
      <div>
        <Select
          options={raceName}
          label="レース名を選択"
          selected={condition.raceName}
          onChange={(e) => {
            const raceName = e.value;
            const race = data.find(
              (r: mgt_race_id) => r.race_name === raceName
            );
            setCondition((prevState) => ({
              ...prevState,
              raceName: raceName,
              raceId: race.race_id,
            }));
          }}
          // filter={true}
        />
      </div>
      <div className="mt-6 flex items-center gap-x-8">
        <div className="w-28">
          <Select
            options={arrive}
            selected={arriveArray[MIN]}
            onChange={(e) => {
              setArriveArray(() => [e.value, arriveArray[MAX]]);
            }}
          />
        </div>
        <>~</>
        <div className="w-28">
          <Select
            options={arrive}
            selected={arriveArray[MAX]}
            onChange={(e) => {
              setArriveArray(() => [arriveArray[MIN], e.value]);
            }}
          />
        </div>
      </div>
      <div className="mt-6 flex items-center gap-x-8">
        <div className="w-28">
          <Select
            options={year}
            selected={
              condition.year
                ? condition.year[MIN].toString()
                : yearMin.toString()
            }
            onChange={(e) => {
              setCondition((prevState) => ({
                ...prevState,
                year: [
                  Number(e.value),
                  prevState.year ? prevState.year[MAX] : yearMax,
                ],
              }));
            }}
          />
        </div>
        <>~</>
        <div className="w-28">
          <Select
            options={year}
            selected={
              condition.year
                ? condition.year[MAX].toString()
                : yearMax.toString()
            }
            onChange={(e) => {
              setCondition((prevState) => ({
                ...prevState,
                year: [
                  prevState.year ? prevState.year[MIN] : yearMin,
                  Number(e.value),
                ],
              }));
            }}
          />
        </div>
      </div>
    </>
  );
};
