import { Condition } from "./Condition";
import { ResultTable } from "../Table";
import { WinRate } from "../WinRate";
import { Card } from "@/components/common/Card";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { createWhere, createResult } from "@/utils/analysis";
import axios from "axios";
import { raceIdState, recentRaceState } from "@/states/race";
import { useRecoilState, useRecoilValue } from "recoil";
import { singleConditionState, singleResultState } from "@/states/analysis";
import clsx from "clsx";

export const Single = () => {
  const recentRace = useRecoilValue(recentRaceState);
  const [condition, setCondition] = useRecoilState(singleConditionState);
  const [results, setResults] = useRecoilState(singleResultState);
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);
  const raceIds = useRecoilValue(raceIdState);
  useEffect(() => {
    setCondition((prevState) => ({
      ...prevState,
      raceId: recentRace.raceId,
      raceName: recentRace.raceName,
    }));
  }, [recentRace, setCondition]);

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
    setLoading(true);
    try {
      const where = createWhere(condition);
      const res = await axios.post("/api/db/raceResults", where);
      const results = createResult(res.data, raceIds!);
      setResults(results);
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

  return (
    <>
      <Card className="mt-4 mx-4 py-8 px-4">
        <Condition condition={condition} setCondition={setCondition} />
        <div className="flex justify-center mt-8 w-full">
          <Toast ref={toast} />
          <div className="card w-48">
            <Button
              label="実行"
              onClick={handleClick}
              className={clsx(loading && "animate-bounce")}
            />
          </div>
        </div>
      </Card>
      <div className="mb-8">
        {results && (
          <>
            <Card className="mt-8 mx-4 py-4 px-2">
              <WinRate results={results!} />
            </Card>
            <Card className="mt-4 mx-4 px-2 pt-2">
              <div className="text-lg font-bold my-1 ml-1">
                {results[0].raceName}
              </div>
              <div className="overflow-auto">
                <ResultTable data={results} />
              </div>
            </Card>
          </>
        )}
      </div>
    </>
  );
};
