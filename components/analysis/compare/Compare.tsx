import { Condition } from "./Condition";
import { ResultTable } from "./Table";
import { WinRate } from "../WinRate";
import { Card } from "@/components/common/Card";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { ICondition, IResult } from "@/interfaces/analysis";
import { useRef, useState } from "react";
import { createWhere, createResult, initialCondition } from "@/utils/analysis";
import axios from "axios";
import { raceIdState } from "@/states/race";
import { useRecoilValue } from "recoil";

export const Compare = () => {
  const [target, setTarget] = useState<ICondition>({
    ...initialCondition,
  });
  const [conditions, setConditions] = useState<ICondition[]>([
    {
      ...initialCondition,
    },
  ]);
  const [results, setResults] = useState<IResult[]>();
  const toast = useRef<Toast>(null);
  const raceIds = useRecoilValue(raceIdState);

  const handleClick = async () => {
    return;
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
    setResults(results);
  };

  console.log({ conditions });

  return (
    <>
      <Condition
        target={target}
        setTarget={setTarget}
        conditions={conditions}
        setConditions={setConditions}
      />
      {/* <div className="flex justify-center mt-8 w-full">
          <Toast ref={toast} />
          <div className="card w-48">
            <Button label="実行" onClick={handleClick} />
          </div>
        </div> */}
      {/* <div className="mb-8">
        {results && (
          <>
            <Card className="mt-8 mx-4 py-4 px-2">
              <WinRate results={results!} targetRaceId={results[0].raceId} />
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
      </div> */}
    </>
  );
};
