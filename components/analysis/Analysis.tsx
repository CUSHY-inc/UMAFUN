import { useState } from "react";
import { Condition } from "./Condition";
import { ICondition, IResult } from "@/interfaces/analysis";
import { Button } from "primereact/button";
import axios from "axios";
import { createWhere, createResult } from "@/utils/analysis";
import { ResultTable } from "@/components/analysis/Table";
import { WinRateCard } from "./WinRateCard";
import { Card } from "@/components/common/Card";

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

  const handleClick = async () => {
    // let res;
    // res = await axios.post("/api/db/raceIds", {
    //   race_name: condition.raceName,
    // });
    // const raceId = res.data[0].race_id;
    // setCondition((prevState) => ({
    //   ...prevState,
    //   raceId: raceId,
    // }));
    const where = await createWhere(condition);
    const res = await axios.post("/api/db/raceResults", where);
    // console.log(res.data);
    const results = createResult(res.data);
    setResults(results);
    // console.log({ results });
  };

  console.log({ condition });

  return (
    <>
      <Card>
        <Condition condition={condition} setCondition={setCondition} />
        <div className="card flex justify-content-center mt-8 mx-16">
          <Button label="検索" onClick={handleClick} />
        </div>
      </Card>
      <Card className="mt-8">
        <WinRateCard
          condition={condition}
          results={results}
          targetRaceId={condition.raceId}
          targetYear={condition.year}
          targetRaceResult={results}
        />
      </Card>
      <div className="mx-4 mb-8">
        {results && (
          <div className="mt-8">
            <div className="mb-2 ml-2 text-sm">[{condition.raceName}]</div>
            <div className="overflow-auto">
              <ResultTable data={results} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
