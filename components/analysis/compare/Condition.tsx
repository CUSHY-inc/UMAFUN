import { Select, MultiSelect } from "@/boilerplate/components/Select";
import { mgt_race_id } from "@prisma/client";
import clsx from "clsx";
import { RangeSlider } from "@/boilerplate/components/Slider";
import { InputNumber } from "primereact/inputnumber";
import { ICondition } from "@/interfaces/analysis";
import { initialCondition } from "@/utils/analysis";
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
import { Card } from "@/components/common/Card";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Button } from "react-daisyui";
import { Badge } from "primereact/badge";

export const Condition = ({
  target,
  setTarget,
  conditions,
  setConditions,
}: {
  target: ICondition;
  setTarget: React.Dispatch<React.SetStateAction<ICondition>>;
  conditions: ICondition[];
  setConditions: React.Dispatch<React.SetStateAction<ICondition[]>>;
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

  const deleteCondition = (index: number) => {
    const update = [...conditions];
    update.splice(index, 1);
    setConditions(update);
  };

  return (
    <>
      <Card className="mt-4 mx-4 py-8 px-4">
        <div>
          <Select
            options={raceName as string[]}
            label="レース名を選択"
            selected={target.raceName}
            onChange={(e) => {
              const raceName = e.value;
              const race = raceIds?.find(
                (r: mgt_race_id) => r.race_name === raceName
              );
              setTarget((prevState) => ({
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
                target.year ? target.year[MIN].toString() : yearMin.toString()
              }
              onChange={(e) => {
                setTarget((prevState) => ({
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
                target.year ? target.year[MAX].toString() : yearMax.toString()
              }
              onChange={(e) => {
                setTarget((prevState) => ({
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
      </Card>
      {conditions.map((condition, index) => {
        return (
          <>
            <Card className="my-4 mx-4 pt-6 pb-8 px-4">
              <div className="mb-4 flex justify-between">
                <Badge value={`条件${index + 1}`} severity="info" />
                {conditions.length > 1 && (
                  <Button onClick={() => deleteCondition(index)}>
                    <Badge value={"削除"} severity="warning" />
                  </Button>
                )}
              </div>
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
                    const update = [...conditions];
                    update[index] = {
                      ...update[index],
                      raceName: raceName,
                      raceId: race?.race_id,
                    };
                    setConditions(update);
                  }}
                />
              </div>
              <div className={"mt-8 flex justify-around gap-x-4"}>
                <div>
                  <div className={"w-36"}>
                    <MultiSelect
                      options={number}
                      label="馬番"
                      selected={condition.number}
                      onChange={(e) => {
                        const update = [...conditions];
                        update[index] = {
                          ...update[index],
                          number: e.value,
                        };
                        setConditions(update);
                      }}
                      flex={true}
                    />
                  </div>
                  <div
                    className={clsx("w-36", condition.frame ? "mt-8" : "mt-6")}
                  >
                    <MultiSelect
                      options={frame}
                      label="枠番"
                      selected={condition.frame}
                      onChange={(e) => {
                        const update = [...conditions];
                        update[index] = {
                          ...update[index],
                          frame: e.value,
                        };
                        setConditions(update);
                      }}
                      flex={true}
                    />
                  </div>
                  <div
                    className={clsx(
                      "w-36",
                      condition.popular ? "mt-8" : "mt-6"
                    )}
                  >
                    <MultiSelect
                      options={popular}
                      label="人気"
                      selected={condition.popular}
                      onChange={(e) => {
                        const update = [...conditions];
                        update[index] = {
                          ...update[index],
                          popular: e.value,
                        };
                        setConditions(update);
                      }}
                      flex={true}
                    />
                  </div>
                  <div
                    className={clsx("w-36", condition.arrive ? "mt-8" : "mt-6")}
                  >
                    <MultiSelect
                      options={arrive}
                      label="着順"
                      selected={condition.arrive}
                      onChange={(e) => {
                        const update = [...conditions];
                        update[index] = {
                          ...update[index],
                          arrive: e.value,
                        };
                        setConditions(update);
                      }}
                      flex={true}
                    />
                  </div>
                  <div
                    className={clsx(
                      "w-36",
                      condition.genderOld ? "mt-8" : "mt-6"
                    )}
                  >
                    <MultiSelect
                      options={genderOld}
                      label="性齢"
                      selected={condition.genderOld}
                      onChange={(e) => {
                        const update = [...conditions];
                        update[index] = {
                          ...update[index],
                          genderOld: e.value,
                        };
                        setConditions(update);
                      }}
                      flex={true}
                    />
                  </div>
                  <div
                    className={clsx(
                      "w-36",
                      condition.lastRank ? "mt-8" : "mt-6"
                    )}
                  >
                    <MultiSelect
                      options={lastRank}
                      label="上り順"
                      selected={condition.lastRank}
                      onChange={(e) => {
                        const update = [...conditions];
                        update[index] = {
                          ...update[index],
                          lastRank: e.value,
                        };
                        setConditions(update);
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
                      const update = [...conditions];
                      update[index] = {
                        ...update[index],
                        weight: e.value as [number, number],
                      };
                      setConditions(update);
                    }}
                    min={weightMin}
                    max={weightMax}
                    step={0.5}
                  />
                  <div className="mt-1 flex justify-between items-center gap-x-2">
                    <InputNumber
                      value={
                        condition.weight ? condition.weight[MIN] : weightMin
                      }
                      min={weightMin}
                      max={weightMax}
                      onValueChange={(e) => {
                        const update = [...conditions];
                        update[index] = {
                          ...update[index],
                          weight: [
                            e.value as number,
                            update[index].weight
                              ? update[index].weight![MAX]
                              : weightMax,
                          ],
                        };
                        setConditions(update);
                      }}
                      inputClassName="w-16 text-sm"
                      inputStyle={{ border: "none" }}
                      minFractionDigits={1}
                    />
                    <>~</>
                    <InputNumber
                      value={
                        condition.weight ? condition.weight[MAX] : weightMax
                      }
                      min={weightMin}
                      max={weightMax}
                      onValueChange={(e) => {
                        const update = [...conditions];
                        update[index] = {
                          ...update[index],
                          weight: [
                            update[index].weight
                              ? update[index].weight![MIN]
                              : weightMin,
                            e.value as number,
                          ],
                        };
                        setConditions(update);
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
                        const update = [...conditions];
                        update[index] = {
                          ...update[index],
                          time: e.value as [number, number],
                        };
                        setConditions(update);
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
                          const update = [...conditions];
                          update[index] = {
                            ...update[index],
                            time: [
                              e.value as number,
                              update[index].time
                                ? update[index].time![MAX]
                                : timeMax,
                            ],
                          };
                          setConditions(update);
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
                          const update = [...conditions];
                          update[index] = {
                            ...update[index],
                            time: [
                              update[index].time
                                ? update[index].time![MIN]
                                : timeMin,
                              e.value as number,
                            ],
                          };
                          setConditions(update);
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
                        const update = [...conditions];
                        update[index] = {
                          ...update[index],
                          last: e.value as [number, number],
                        };
                        setConditions(update);
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
                          const update = [...conditions];
                          update[index] = {
                            ...update[index],
                            last: [
                              e.value as number,
                              update[index].last
                                ? update[index].last![MAX]
                                : lastMax,
                            ],
                          };
                          setConditions(update);
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
                          const update = [...conditions];
                          update[index] = {
                            ...update[index],
                            last: [
                              update[index].last
                                ? update[index].last![MIN]
                                : lastMin,
                              e.value as number,
                            ],
                          };
                          setConditions(update);
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
                        const update = [...conditions];
                        update[index] = {
                          ...update[index],
                          odds: e.value as [number, number],
                        };
                        setConditions(update);
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
                          const update = [...conditions];
                          update[index] = {
                            ...update[index],
                            odds: [
                              e.value as number,
                              update[index].odds
                                ? update[index].odds![MAX]
                                : oddsMax,
                            ],
                          };
                          setConditions(update);
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
                          const update = [...conditions];
                          update[index] = {
                            ...update[index],
                            odds: [
                              update[index].odds
                                ? update[index].odds![MIN]
                                : oddsMin,
                              e.value as number,
                            ],
                          };
                          setConditions(update);
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
                        const update = [...conditions];
                        update[index] = {
                          ...update[index],
                          horseWeight: e.value as [number, number],
                        };
                        setConditions(update);
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
                          const update = [...conditions];
                          update[index] = {
                            ...update[index],
                            horseWeight: [
                              e.value as number,
                              update[index].horseWeight
                                ? update[index].horseWeight![MAX]
                                : horseWeightMax,
                            ],
                          };
                          setConditions(update);
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
                          const update = [...conditions];
                          update[index] = {
                            ...update[index],
                            horseWeight: [
                              e.value as number,
                              update[index].horseWeight
                                ? update[index].horseWeight![MIN]
                                : horseWeightMin,
                            ],
                          };
                          setConditions(update);
                        }}
                        inputClassName="w-16 text-sm"
                        inputStyle={{ border: "none" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            {/* {index === conditions.length - 1 &&
              conditions.length < MAX_CONDITIONS && (
                <div className="my-4 w-full flex justify-center">
                  <Button onClick={addCondition}>
                    <AiOutlinePlusCircle className="text-3xl text-gray-500" />
                  </Button>
                </div>
              )} */}
          </>
        );
      })}
    </>
  );
};
