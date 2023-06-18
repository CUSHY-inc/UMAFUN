import { useRef, useState } from "react";
import { Condition } from "./Condition";
import { ICondition, IResult } from "@/interfaces/analysis";
import { Button } from "primereact/button";
import axios from "axios";
import { createWhere, createResult } from "@/utils/analysis";
import { ResultTable } from "@/components/analysis/Table";
import { WinRate } from "./WinRate";
import { Card } from "@/components/common/Card";
import { Toast } from "primereact/toast";
import { RaceTopic } from "./RaceTopic";

export const Analysis = () => {
  const [condition, setCondition] = useState<ICondition>({
    raceName: undefined,
    raceId: undefined,
    year: undefined,
    number: undefined,
    frame: undefined,
    popular: undefined,
    arrive: undefined,
    genderOld: undefined,
    lastRank: undefined,
    weight: undefined,
    time: undefined,
    last: undefined,
    odds: undefined,
    horseWeight: undefined,
  });
  const [results, setResults] = useState<IResult[]>();
  const [targetRaceId, setTargetRaceId] = useState<number>();
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
    const results = createResult(res.data);
    setResults(results);
    setTargetRaceId(condition.raceId);
  };

  return (
    <>
      {/* <div className="border border-gray pb-4 px-8">
        <div className="mt-2 text-xl font-bold">有馬記念</div>
        <div className="mt-1 text-normal">12/24(日) 中山11R 芝2500m</div>
        <div className="mt-4 flex justify-between gap-x-10">
          <Card className="w-full flex flex-col justify-center items-center py-2">
            <div className="font-bold">1番人気</div>
            <div className="text-sm">複勝率75%</div>
          </Card>
          <Card className="w-full">aaa</Card>
        </div>
      </div> */}
      <RaceTopic />
      <Card className="mt-8 mx-4 py-8 px-4">
        <Condition condition={condition} setCondition={setCondition} />
        <div className="flex justify-center mt-8 w-full">
          <Toast ref={toast} />
          <div className="card w-48">
            <Button label="検索" onClick={handleClick} />
          </div>
        </div>
      </Card>
      <div className="mb-8">
        {results && (
          <>
            <Card className="mt-8 mx-4 py-4 px-2">
              <WinRate results={results!} targetRaceId={targetRaceId!} />
            </Card>
            <div className="mt-8 mx-4">
              <div className="mb-2 ml-2 text-sm">[{condition.raceName}]</div>
              <div className="overflow-auto">
                <ResultTable data={results} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
