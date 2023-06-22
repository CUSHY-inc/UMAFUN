import { Condition } from "./Condition";
import { Card } from "@/components/common/Card";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { ICondition, IResult } from "@/interfaces/analysis";
import { useRef, useState } from "react";
import { createWhere, createResult } from "@/utils/analysis";
import axios from "axios";
import { searchOtherResults } from "@/utils/analysis";
import { ResultTable } from "./Table";
import { ChartPanel, ResultChart } from "../Chart";

export const AI = () => {
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
  const toast = useRef<Toast>(null);
  const [results, setResults] = useState<Map<string, IResult[]>>();

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
    const results = await createResult(res.data);
    if (results) {
      const raceNameResults = await searchOtherResults(results, "raceName");
      setResults(raceNameResults as Map<string, IResult[]>);
      // const entriesArray = Array.from(raceNameResults.entries());
      // const jsonString = JSON.stringify(entriesArray);
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
      {results &&
        Array.from(results).map(([raceName, result]) => {
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
