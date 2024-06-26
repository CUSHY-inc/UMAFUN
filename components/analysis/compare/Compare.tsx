import { Condition } from "./Condition";
import { ResultTable } from "../Table";
import { WinRate } from "../WinRate";
import { Card } from "@/components/common/Card";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { IResult } from "@/interfaces/analysis";
import { useEffect, useRef, useState } from "react";
import {
  createWhere,
  createResult,
  initialCondition,
  searchTargetResult,
} from "@/utils/analysis";
import axios from "axios";
import { raceIdState, raceInfoState, recentRaceState } from "@/states/race";
import { useRecoilValue } from "recoil";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Button as AddButton } from "react-daisyui";
import { useRecoilState } from "recoil";
import {
  compareConditionState,
  compareOtherResultState,
  compareTargetConditionState,
  compareTargetResultState,
} from "@/states/analysis";
import clsx from "clsx";

const MAX_CONDITIONS = 10;
export const Compare = () => {
  const recentRace = useRecoilValue(recentRaceState);
  const [target, setTarget] = useRecoilState(compareTargetConditionState);
  const [conditions, setConditions] = useRecoilState(compareConditionState);
  const [targetResult, setTargetResult] = useRecoilState(
    compareTargetResultState
  );
  const [otherResults, setOtherResults] = useRecoilState(
    compareOtherResultState
  );
  const [loading, setLoading] = useState(false);
  const raceIds = useRecoilValue(raceIdState);
  const raceInfo = useRecoilValue(raceInfoState);
  const toast = useRef<Toast>(null);
  useEffect(() => {
    setTarget((prevState) => ({
      ...prevState,
      raceId: recentRace.raceId,
      raceName: recentRace.raceName,
    }));
  }, [recentRace, setTarget]);

  const handleExe = async () => {
    if (!target.raceName) {
      toast.current!.show({
        severity: "warn",
        summary: "Warning",
        detail: "レース名を選択してください。",
        life: 3000,
      });
      return;
    }
    const wheres: any = [];
    conditions.map((condition, index) => {
      if (!condition.raceId) {
        return;
      }
      wheres.push(createWhere(condition));
    });
    if (wheres.length == 0) {
      toast.current!.show({
        severity: "warn",
        summary: "Warning",
        detail: "条件のレース名を選択してください。",
        life: 3000,
      });
      return;
    }
    setLoading(true);
    try {
      const where = {
        OR: wheres.map((item: any) => ({
          AND: [item],
        })),
      };
      const res = await axios.post("/api/db/raceResults", where);
      const results = createResult(res.data, raceIds!);
      const targetResult = await searchTargetResult(
        target.raceId!,
        target.year!,
        results,
        raceIds!,
        raceInfo!
      );
      const otherResults = new Map<string, IResult[]>();
      for (const result of results) {
        const raceName = result.raceName;
        if (!raceName) {
          continue;
        }
        if (!otherResults.has(raceName)) {
          otherResults.set(raceName, []);
        }
        otherResults.get(raceName)?.push(result);
      }
      otherResults.delete(target.raceName);
      setTargetResult({ result: targetResult });
      setOtherResults({ result: otherResults });
      toast.current!.show({
        severity: "success",
        summary: "分析完了",
        detail: "レース結果を表示します。",
        life: 3000,
      });
    } catch (error) {
      toast.current!.show({
        severity: "error",
        summary: "通信エラー",
        detail: "通信エラーが発生しました",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  const addCondition = () => {
    const update = [...conditions];
    update.push({
      ...initialCondition,
    });
    setConditions(update);
  };

  return (
    <>
      <Condition
        target={target}
        setTarget={setTarget}
        conditions={conditions}
        setConditions={setConditions}
      />
      {conditions.length < MAX_CONDITIONS && (
        <div className="my-4 w-full flex justify-center">
          <AddButton onClick={addCondition} className="bg-white">
            <AiOutlinePlusCircle className="text-3xl text-gray-500" />
          </AddButton>
        </div>
      )}
      <div className="flex justify-center my-4 w-full">
        <Toast ref={toast} />
        <div className="card w-48">
          <Button
            label="実行"
            onClick={handleExe}
            className={clsx(loading && "animate-bounce")}
          />
        </div>
      </div>
      {targetResult.result &&
        Array.from(targetResult.result).map(([raceName, result]) => {
          return (
            <>
              <Card className="mt-8 mx-4 py-4 px-2">
                <WinRate results={result} />
              </Card>
              <Card className="mt-4 mx-4 px-2 pt-2" key={raceName}>
                <div className="text-lg font-bold">{raceName}</div>
                <div className="overflow-auto">
                  <ResultTable data={result} />
                </div>
              </Card>
            </>
          );
        })}
      {Array.from(otherResults.result).length > 0 && (
        <div className="divider mx-4 my-8">条件レース</div>
      )}
      {otherResults.result &&
        Array.from(otherResults.result).map(([raceName, result]) => {
          return (
            <Card className="mt-4 mx-4 px-2 pt-2" key={raceName}>
              <div className="text-lg font-bold">{raceName}</div>
              <div className="overflow-auto">
                <ResultTable data={result} />
              </div>
            </Card>
          );
        })}
      <div className="mt-8" />
    </>
  );
};
