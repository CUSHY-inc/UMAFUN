import { useState } from "react";
import { Condition } from "./Condition";
import { ICondition, IResult } from "@/interfaces/analysis";
import { Button } from "primereact/button";
import axios from "axios";
import { createWhere, createResult } from "@/utils/analysis";
import { ResultTable } from "@/components/analysis/Table";

export const Analysis = () => {
  const [condition, setCondition] = useState<ICondition>({
    raceName: undefined,
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
  const [result, setResult] = useState<IResult[]>();

  const handleClick = async () => {
    const where = await createWhere(condition);
    const res = await axios.post("/api/db/raceResults", where);
    console.log(res.data);
    const result = createResult(res.data);
    setResult(result);
    console.log({ result });
  };

  return (
    <>
      <div className="rounded-lg shadow mx-4 py-8 mb-8 bg-white">
        <Condition condition={condition} setCondition={setCondition} />
        <div className="card flex justify-content-center mt-8 mx-16">
          <Button label="検索" onClick={handleClick} />
        </div>
      </div>
      <div className="mx-4 mb-8">{result && <ResultTable data={result} />}</div>
    </>
  );
};
