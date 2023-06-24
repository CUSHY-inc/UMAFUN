import { Select, MultiSelect } from "@/boilerplate/components/Select";
import { mgt_race_id } from "@prisma/client";
import clsx from "clsx";
import { RangeSlider } from "@/boilerplate/components/Slider";
import { InputNumber } from "primereact/inputnumber";
import { ICondition } from "@/interfaces/analysis";
import {
  yearMax,
  yearMin,
  numberMax,
  frameMax,
  popularMax,
  arriveMax,
  genderOldMin,
  genderOldMax,
  lastRankMax,
  weightMax,
  weightMin,
  timeMax,
  timeMin,
  lastMax,
  lastMin,
  oddsMax,
  oddsMin,
  horseWeightMax,
  horseWeightMin,
  MIN,
  MAX,
} from "@/utils/analysis";
import { useRecoilValue } from "recoil";
import { raceIdState } from "@/states/race";

export const Condition = ({
  condition,
  setCondition,
}: {
  condition: ICondition;
  setCondition: React.Dispatch<React.SetStateAction<ICondition>>;
}) => {
  const raceIds = useRecoilValue(raceIdState);
  const raceName = raceIds?.map((item: mgt_race_id) => item.race_name);
  const year = Array.from({ length: yearMax - yearMin + 1 }, (_, index) =>
    (yearMax - index).toString()
  );
  const number = [...Array(numberMax)].map((_, i) => (i + 1).toString());
  const frame = [...Array(frameMax)].map((_, i) => (i + 1).toString());
  const popular = [...Array(popularMax)].map((_, i) => (i + 1).toString());
  const arrive = [...Array(arriveMax)].map((_, i) => (i + 1).toString());
  const genderOld: string[] = [...Array(genderOldMax - genderOldMin + 1)]
    .map((_, i) => {
      const old = i + genderOldMin;
      return `牝${old}`;
    })
    .concat(
      [...Array(genderOldMax - genderOldMin + 1)].map((_, i) => {
        const old = i + genderOldMin;
        return `牡${old}`;
      })
    );
  const lastRank = [...Array(lastRankMax)].map((_, i) => (i + 1).toString());

  return (
    <>
      <div>
        <Select
          options={raceName as string[]}
          label="レース名を選択"
          selected={condition.raceName}
          onChange={(e) => {
            const raceName = e.value;
            const race = raceIds?.find(
              (r: mgt_race_id) => r.race_name === raceName
            );
            setCondition((prevState) => ({
              ...prevState,
              raceName: raceName,
              raceId: race?.race_id,
            }));
          }}
        />
      </div>
      <div className="mt-6 flex items-center gap-x-8">
        <div>
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
        <div>
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
      {/* <div className="divider mt-6 text-gray-700 text-sm" /> */}
      <div className={"mt-8 flex justify-around gap-x-4"}>
        <div>
          <div className={"w-36"}>
            <MultiSelect
              options={number}
              label="馬番"
              selected={condition.number}
              onChange={(e) => {
                setCondition((prevState) => ({
                  ...prevState,
                  number: e.value,
                }));
              }}
              flex={true}
            />
          </div>
          <div className={clsx("w-36", condition.frame ? "mt-8" : "mt-6")}>
            <MultiSelect
              options={frame}
              label="枠番"
              selected={condition.frame}
              onChange={(e) => {
                setCondition((prevState) => ({
                  ...prevState,
                  frame: e.value,
                }));
              }}
              flex={true}
            />
          </div>
          <div className={clsx("w-36", condition.popular ? "mt-8" : "mt-6")}>
            <MultiSelect
              options={popular}
              label="人気"
              selected={condition.popular}
              onChange={(e) => {
                setCondition((prevState) => ({
                  ...prevState,
                  popular: e.value,
                }));
              }}
              flex={true}
            />
          </div>
          <div className={clsx("w-36", condition.arrive ? "mt-8" : "mt-6")}>
            <MultiSelect
              options={arrive}
              label="着順"
              selected={condition.arrive}
              onChange={(e) => {
                setCondition((prevState) => ({
                  ...prevState,
                  arrive: e.value,
                }));
              }}
              flex={true}
            />
          </div>
          <div className={clsx("w-36", condition.genderOld ? "mt-8" : "mt-6")}>
            <MultiSelect
              options={genderOld}
              label="性齢"
              selected={condition.genderOld}
              onChange={(e) => {
                setCondition((prevState) => ({
                  ...prevState,
                  genderOld: e.value,
                }));
              }}
              flex={true}
            />
          </div>
          <div className={clsx("w-36", condition.lastRank ? "mt-8" : "mt-6")}>
            <MultiSelect
              options={lastRank}
              label="上り順"
              selected={condition.lastRank}
              onChange={(e) => {
                setCondition((prevState) => ({
                  ...prevState,
                  lastRank: e.value,
                }));
              }}
              flex={true}
            />
          </div>
        </div>
        <div>
          <div className="mb-2 flex justify-center">斤量(kg)</div>
          <RangeSlider
            value={condition.weight}
            onChange={(e) => {
              setCondition((prevState) => ({
                ...prevState,
                weight: e.value as [number, number],
              }));
            }}
            min={weightMin}
            max={weightMax}
            step={0.5}
          />
          <div className="mt-1 flex justify-between items-center gap-x-2">
            <InputNumber
              value={condition.weight ? condition.weight[MIN] : weightMin}
              min={weightMin}
              max={weightMax}
              onValueChange={(e) => {
                setCondition((prevState) => ({
                  ...prevState,
                  weight: [
                    e.value as number,
                    prevState.weight ? prevState.weight[MAX] : weightMax,
                  ],
                }));
              }}
              inputClassName="w-16 text-sm"
              inputStyle={{ border: "none" }}
              minFractionDigits={1}
            />
            <>~</>
            <InputNumber
              value={condition.weight ? condition.weight[MAX] : weightMax}
              min={weightMin}
              max={weightMax}
              onValueChange={(e) => {
                setCondition((prevState) => ({
                  ...prevState,
                  weight: [
                    prevState.weight ? prevState.weight[MIN] : weightMin,
                    e.value as number,
                  ],
                }));
              }}
              inputClassName="w-16 text-sm"
              inputStyle={{ border: "none" }}
              minFractionDigits={1}
            />
          </div>
          <div className="mt-4">
            <div className="mb-2 flex justify-center">タイム</div>
            <RangeSlider
              value={condition.time}
              onChange={(e) => {
                setCondition((prevState) => ({
                  ...prevState,
                  time: e.value as [number, number],
                }));
              }}
              min={timeMin}
              max={timeMax}
            />
            <div className="mt-1 flex justify-between items-center gap-x-2">
              <InputNumber
                value={condition.time ? condition.time[MIN] : timeMin}
                min={timeMin}
                max={timeMax}
                onValueChange={(e) => {
                  setCondition((prevState) => ({
                    ...prevState,
                    time: [
                      e.value as number,
                      prevState.time ? prevState.time[MAX] : timeMax,
                    ],
                  }));
                }}
                inputClassName="w-16 text-sm"
                inputStyle={{ border: "none" }}
              />
              <div>~</div>
              <InputNumber
                value={condition.time ? condition.time[MAX] : timeMax}
                min={timeMin}
                max={timeMax}
                onValueChange={(e) => {
                  setCondition((prevState) => ({
                    ...prevState,
                    time: [
                      prevState.time ? prevState.time[MIN] : timeMin,
                      e.value as number,
                    ],
                  }));
                }}
                inputClassName="w-16 text-sm"
                inputStyle={{ border: "none" }}
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex justify-center">上り(秒)</div>
            <RangeSlider
              value={condition.last}
              onChange={(e) => {
                setCondition((prevState) => ({
                  ...prevState,
                  last: e.value as [number, number],
                }));
              }}
              min={lastMin}
              max={lastMax}
              step={0.1}
            />
            <div className="mt-1 flex justify-between items-center gap-x-2">
              <InputNumber
                value={condition.last ? condition.last[MIN] : lastMin}
                min={lastMin}
                max={lastMax}
                onValueChange={(e) => {
                  setCondition((prevState) => ({
                    ...prevState,
                    last: [
                      e.value as number,
                      prevState.last ? prevState.last[MAX] : lastMax,
                    ],
                  }));
                }}
                inputClassName="w-16 text-sm"
                inputStyle={{ border: "none" }}
                minFractionDigits={1}
              />
              <div>~</div>
              <InputNumber
                value={condition.last ? condition.last[MAX] : lastMax}
                min={lastMin}
                max={lastMax}
                onValueChange={(e) => {
                  setCondition((prevState) => ({
                    ...prevState,
                    last: [
                      prevState.last ? prevState.last[MIN] : lastMin,
                      e.value as number,
                    ],
                  }));
                }}
                inputClassName="w-16 text-sm"
                inputStyle={{ border: "none" }}
                minFractionDigits={1}
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex justify-center">単勝(倍)</div>
            <RangeSlider
              value={condition.odds}
              onChange={(e) => {
                setCondition((prevState) => ({
                  ...prevState,
                  odds: e.value as [number, number],
                }));
              }}
              min={oddsMin}
              max={oddsMax}
            />
            <div className="mt-1 flex justify-between items-center gap-x-2">
              <InputNumber
                value={condition.odds ? condition.odds[MIN] : oddsMin}
                min={oddsMin}
                max={oddsMax}
                onValueChange={(e) => {
                  setCondition((prevState) => ({
                    ...prevState,
                    odds: [
                      e.value as number,
                      prevState.odds ? prevState.odds[MAX] : oddsMax,
                    ],
                  }));
                }}
                inputClassName="w-16 text-sm"
                inputStyle={{ border: "none" }}
              />
              <div>~</div>
              <InputNumber
                value={condition.odds ? condition.odds[MAX] : oddsMax}
                min={oddsMin}
                max={oddsMax}
                onValueChange={(e) => {
                  setCondition((prevState) => ({
                    ...prevState,
                    odds: [
                      prevState.odds ? prevState.odds[MIN] : oddsMin,
                      e.value as number,
                    ],
                  }));
                }}
                inputClassName="w-16 text-sm"
                inputStyle={{ border: "none" }}
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex justify-center">馬体重(kg)</div>
            <RangeSlider
              value={condition.horseWeight}
              onChange={(e) => {
                setCondition((prevState) => ({
                  ...prevState,
                  horseWeight: e.value as [number, number],
                }));
              }}
              min={horseWeightMin}
              max={horseWeightMax}
            />
            <div className="mt-1 flex justify-between items-center gap-x-2">
              <InputNumber
                value={
                  condition.horseWeight
                    ? condition.horseWeight[MIN]
                    : horseWeightMin
                }
                min={horseWeightMin}
                max={horseWeightMax}
                onValueChange={(e) => {
                  setCondition((prevState) => ({
                    ...prevState,
                    horseWeight: [
                      e.value as number,
                      prevState.horseWeight
                        ? prevState.horseWeight[MAX]
                        : horseWeightMax,
                    ],
                  }));
                }}
                inputClassName="w-16 text-sm"
                inputStyle={{ border: "none" }}
              />
              <div>~</div>
              <InputNumber
                value={
                  condition.horseWeight
                    ? condition.horseWeight[MAX]
                    : horseWeightMax
                }
                min={horseWeightMin}
                max={horseWeightMax}
                onValueChange={(e) => {
                  setCondition((prevState) => ({
                    ...prevState,
                    horseWeight: [
                      prevState.horseWeight
                        ? prevState.horseWeight[MIN]
                        : horseWeightMin,
                      e.value as number,
                    ],
                  }));
                }}
                inputClassName="w-16 text-sm"
                inputStyle={{ border: "none" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
