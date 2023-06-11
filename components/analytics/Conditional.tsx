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

const numberMax = 24;
const frameMax = 8;
const popularMax = 24;
const arriveMax = 24;
const genderOldMin = 2;
const genderOldMax = 9;
const lastRankMax = 24;

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

  return (
    <div className="rounded-lg shadow mx-4 py-8 bg-white">
      <div className="mx-4">
        <Select
          options={raceName}
          label="レース名を選択"
          selected={selectedRaceName}
          setSelected={setSelectedRaceName}
        />
      </div>
      <div
        className={clsx(
          "flex justify-between mx-4",
          selectedNumber || selectedFrame ? "mt-8" : "mt-6"
        )}
      >
        <div className="w-36">
          <MultiSelect
            options={number}
            label="馬番"
            selected={selectedNumber}
            setSelected={setSelectedNumber}
          />
        </div>
        <div className="w-36">
          <MultiSelect
            options={frame}
            label="枠番"
            selected={selectedFrame}
            setSelected={setSelectedFrame}
          />
        </div>
      </div>
      <div
        className={clsx(
          "flex justify-between mx-4",
          selectedPopular || selectedArrive ? "mt-8" : "mt-6"
        )}
      >
        <div className="w-36">
          <MultiSelect
            options={popular}
            label="人気"
            selected={selectedPopular}
            setSelected={setSelectedPopular}
          />
        </div>
        <div className="w-36">
          <MultiSelect
            options={arrive}
            label="着順"
            selected={selectedArrive}
            setSelected={setSelectedArrive}
          />
        </div>
      </div>
      <div
        className={clsx(
          "flex justify-between mx-4",
          selectedGenderOld || selectedLastRank ? "mt-8" : "mt-6"
        )}
      >
        <div className="w-36">
          <MultiSelect
            options={genderOld}
            label="性齢"
            selected={selectedGenderOld}
            setSelected={setSelectedGenderOld}
          />
        </div>
        <div className="w-36">
          <MultiSelect
            options={lastRank}
            label="上り順"
            selected={selectedLastRank}
            setSelected={setSelectedLastRank}
          />
        </div>
      </div>
    </div>
  );
};
