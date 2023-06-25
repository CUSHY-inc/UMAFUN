import { Condition } from "./Condition";
import { Card } from "@/components/common/Card";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { IResult } from "@/interfaces/analysis";
import { useRef } from "react";
import { createWhere, createResult } from "@/utils/analysis";
import axios from "axios";
import { searchOtherResults } from "@/utils/analysis";
import { ResultTable } from "../Table";
import { raceIdState, raceInfoState } from "@/states/race";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  aiConditionState,
  aiOtherResultState,
  aiTargetResultState,
} from "@/states/analysis";

export const AI = () => {
  const [condition, setCondition] = useRecoilState(aiConditionState);
  const [targetResults, setTargetResults] = useRecoilState(aiTargetResultState);
  const [otherResults, setOtherResults] = useRecoilState(aiOtherResultState);
  const raceIds = useRecoilValue(raceIdState);
  const raceInfo = useRecoilValue(raceInfoState);
  const toast = useRef<Toast>(null);

  const handleClick = async () => {
    if (!condition.raceName) {
      toast.current!.show({
        severity: "warn",
        summary: "Warning",
        detail: "レース名を選択してください。",
        life: 3000,
      });
      return;
    }
    const where = createWhere(condition);
    const res = await axios.post("/api/db/raceResults", where);
    const results = createResult(res.data, raceIds!);
    if (results) {
      const raceNameResults: Map<string, IResult[]> = await searchOtherResults(
        results,
        raceIds!,
        raceInfo!
      );
      const target = raceNameResults.get(condition.raceName);
      const targetMap = new Map<string, IResult[]>();
      targetMap.set(condition.raceName, target!);
      setTargetResults({ result: targetMap });
      raceNameResults.delete(condition.raceName);
      setOtherResults({ result: raceNameResults });
    }
  };

  return (
    <>
      <Card className="mt-4 mx-4 mb-8 py-8 px-4">
        <Condition condition={condition} setCondition={setCondition} />
        <div className="flex justify-center mt-8 w-full">
          <Toast ref={toast} />
          <div className="card w-48">
            <Button label="実行" onClick={handleClick} />
          </div>
        </div>
      </Card>
      {targetResults.result &&
        Array.from(targetResults.result).map(([raceName, result]) => {
          return (
            <Card className="mt-4 mx-4 px-2 pt-2" key={raceName}>
              <div className="text-lg font-bold">{raceName}</div>
              <div className="overflow-auto">
                <ResultTable data={result} />
              </div>
            </Card>
          );
        })}
      {Array.from(otherResults.result).length > 0 && (
        <div className="divider mx-4 my-8">関連レース</div>
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
    </>
  );
};
