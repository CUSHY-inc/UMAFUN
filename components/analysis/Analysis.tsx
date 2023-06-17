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
      <Card>
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
            <Card className="mt-8 py-4">
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
