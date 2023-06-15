import useSWR from "swr";
import { fetcher } from "@/boilerplate/utils/api";
import {
  Select,
  MultiSelect,
  MultiSelectType,
} from "@/boilerplate/components/Select";
import { mgt_race_id } from "@prisma/client";
import { useState } from "react";
import clsx from "clsx";
import { RangeSlider } from "@/boilerplate/components/Slider";
import { InputNumber } from "primereact/inputnumber";

const numberMax = 24;
const frameMax = 8;
const popularMax = 24;
const arriveMax = 24;
const genderOldMin = 2;
const genderOldMax = 9;
const lastRankMax = 24;
const weightMax = 60;
const weightMin = 50;
const timeMax = 240;
const timeMin = 60;
const lastMax = 48;
const lastMin = 30;
const oddsMax = 200;
const oddsMin = 1;
const horseWeightMax = 580;
const horseWeightMin = 380;

export const Conditional = () => {
  const { data, error } = useSWR(
    { url: "/api/db/raceIds", method: "GET" },
    fetcher
  );
  const raceName = data?.map((item: mgt_race_id) => item.race_name);
  const [selectedRaceName, setSelectedRaceName] = useState<string | null>(null);
  const number = [...Array(numberMax)].map((_, i) => (i + 1).toString());
  const [selectedNumber, setSelectedNumber] = useState<MultiSelectType | null>(
    null
  );
  const frame = [...Array(frameMax)].map((_, i) => (i + 1).toString());
  const [selectedFrame, setSelectedFrame] = useState<MultiSelectType | null>(
    null
  );
  const popular = [...Array(popularMax)].map((_, i) => (i + 1).toString());
  const [selectedPopular, setSelectedPopular] =
    useState<MultiSelectType | null>(null);
  const arrive = [...Array(arriveMax)].map((_, i) => (i + 1).toString());
  const [selectedArrive, setSelectedArrive] = useState<MultiSelectType | null>(
    null
  );
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
  const [selectedGenderOld, setSelectedGenderOld] =
    useState<MultiSelectType | null>(null);
  const lastRank = [...Array(lastRankMax)].map((_, i) => (i + 1).toString());
  const [selectedLastRank, setSelectedLastRank] =
    useState<MultiSelectType | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<[number, number]>([
    weightMin,
    weightMax,
  ]);
  const [selectedTime, setSelectedTime] = useState<[number, number]>([
    timeMin,
    timeMax,
  ]);
  const [selectedLast, setSelectedLast] = useState<[number, number]>([
    lastMin,
    lastMax,
  ]);
  const [selectedOdds, setSelectedOdds] = useState<[number, number]>([
    oddsMin,
    oddsMax,
  ]);
  const [selectedHorseWeight, setSelectedHorseWeight] = useState<
    [number, number]
  >([horseWeightMin, horseWeightMax]);

  return (
    <div className="rounded-lg shadow mx-4 py-8 mb-8 bg-white">
      <div className="mx-4">
        <Select
          options={raceName}
          label="レース名を選択"
          selected={selectedRaceName}
          setSelected={setSelectedRaceName}
          filter={true}
        />
      </div>
      <div className={"mx-4 mt-8 flex justify-between"}>
        <div>
          <div className={"w-36"}>
            <MultiSelect
              options={number}
              label="馬番"
              selected={selectedNumber}
              setSelected={setSelectedNumber}
              flex={true}
            />
          </div>
          <div className={clsx("w-36", selectedFrame ? "mt-8" : "mt-6")}>
            <MultiSelect
              options={frame}
              label="枠番"
              selected={selectedFrame}
              setSelected={setSelectedFrame}
              flex={true}
            />
          </div>
          <div className={clsx("w-36", selectedPopular ? "mt-8" : "mt-6")}>
            <MultiSelect
              options={popular}
              label="人気"
              selected={selectedPopular}
              setSelected={setSelectedPopular}
              flex={true}
            />
          </div>
          <div className={clsx("w-36", selectedArrive ? "mt-8" : "mt-6")}>
            <MultiSelect
              options={arrive}
              label="着順"
              selected={selectedArrive}
              setSelected={setSelectedArrive}
              flex={true}
            />
          </div>
          <div className={clsx("w-36", selectedGenderOld ? "mt-8" : "mt-6")}>
            <MultiSelect
              options={genderOld}
              label="性齢"
              selected={selectedGenderOld}
              setSelected={setSelectedGenderOld}
              flex={true}
            />
          </div>
          <div className={clsx("w-36", selectedLastRank ? "mt-8" : "mt-6")}>
            <MultiSelect
              options={lastRank}
              label="上り順"
              selected={selectedLastRank}
              setSelected={setSelectedLastRank}
              flex={true}
            />
          </div>
        </div>
        <div>
          <div className="">
            <div className="mb-2 flex justify-center">斤量</div>
            <RangeSlider
              value={selectedWeight}
              setValue={setSelectedWeight}
              min={weightMin}
              max={weightMax}
              step={0.5}
            />
            <div className="mt-1 flex justify-between items-center gap-x-2">
              <InputNumber
                value={selectedWeight[0]}
                min={weightMin}
                max={weightMax}
                onValueChange={(e) => {
                  setSelectedWeight([e.value as number, selectedWeight[1]]);
                }}
                inputClassName="w-16 text-sm"
                inputStyle={{ border: "none" }}
                minFractionDigits={1}
              />
              <div>~</div>
              <InputNumber
                value={selectedWeight[1]}
                min={weightMin}
                max={weightMax}
                onValueChange={(e) => {
                  setSelectedWeight([selectedWeight[0], e.value as number]);
                }}
                inputClassName="w-16 text-sm"
                inputStyle={{ border: "none" }}
                minFractionDigits={1}
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex justify-center">タイム</div>
            <RangeSlider
              value={selectedTime}
              setValue={setSelectedTime}
              min={timeMin}
              max={timeMax}
            />
            <div className="mt-1 flex justify-between items-center gap-x-2">
              <InputNumber
                value={selectedTime[0]}
                min={timeMin}
                max={timeMax}
                onValueChange={(e) => {
                  setSelectedTime([e.value as number, selectedTime[1]]);
                }}
                inputClassName="w-16 text-sm"
                inputStyle={{ border: "none" }}
              />
              <div>~</div>
              <InputNumber
                value={selectedTime[1]}
                min={timeMin}
                max={timeMax}
                onValueChange={(e) => {
                  setSelectedTime([selectedTime[0], e.value as number]);
                }}
                inputClassName="w-16 text-sm"
                inputStyle={{ border: "none" }}
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex justify-center">上り(秒)</div>
            <RangeSlider
              value={selectedLast}
              setValue={setSelectedLast}
              min={lastMin}
              max={lastMax}
              step={0.1}
            />
            <div className="mt-1 flex justify-between items-center gap-x-2">
              <InputNumber
                value={selectedLast[0]}
                min={lastMin}
                max={lastMax}
                onValueChange={(e) => {
                  setSelectedLast([e.value as number, selectedLast[1]]);
                }}
                inputClassName="w-16 text-sm"
                inputStyle={{ border: "none" }}
                minFractionDigits={1}
              />
              <div>~</div>
              <InputNumber
                value={selectedLast[1]}
                min={lastMin}
                max={lastMax}
                onValueChange={(e) => {
                  setSelectedLast([selectedLast[0], e.value as number]);
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
              value={selectedOdds}
              setValue={setSelectedOdds}
              min={oddsMin}
              max={oddsMax}
            />
            <div className="mt-1 flex justify-between items-center gap-x-2">
              <InputNumber
                value={selectedOdds[0]}
                min={oddsMin}
                max={oddsMax}
                onValueChange={(e) => {
                  setSelectedOdds([e.value as number, selectedOdds[1]]);
                }}
                inputClassName="w-16 text-sm"
                inputStyle={{ border: "none" }}
              />
              <div>~</div>
              <InputNumber
                value={selectedOdds[1]}
                min={oddsMin}
                max={oddsMax}
                onValueChange={(e) => {
                  setSelectedOdds([selectedOdds[0], e.value as number]);
                }}
                inputClassName="w-16 text-sm"
                inputStyle={{ border: "none" }}
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex justify-center">馬体重(kg)</div>
            <RangeSlider
              value={selectedHorseWeight}
              setValue={setSelectedHorseWeight}
              min={horseWeightMin}
              max={horseWeightMax}
            />
            <div className="mt-1 flex justify-between items-center gap-x-2">
              <InputNumber
                value={selectedHorseWeight[0]}
                min={horseWeightMin}
                max={horseWeightMax}
                onValueChange={(e) => {
                  setSelectedHorseWeight([
                    e.value as number,
                    selectedHorseWeight[1],
                  ]);
                }}
                inputClassName="w-16 text-sm"
                inputStyle={{ border: "none" }}
              />
              <div>~</div>
              <InputNumber
                value={selectedHorseWeight[1]}
                min={horseWeightMin}
                max={horseWeightMax}
                onValueChange={(e) => {
                  setSelectedHorseWeight([
                    selectedHorseWeight[0],
                    e.value as number,
                  ]);
                }}
                inputClassName="w-16 text-sm"
                inputStyle={{ border: "none" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
