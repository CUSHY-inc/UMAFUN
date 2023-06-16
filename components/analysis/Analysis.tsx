import { useState } from "react";
import { Condition } from "./Condition";
import { ICondition } from "@/interfaces/condition";
import { Button } from "primereact/button";

export const Analysis = () => {
  const [condition, setCondition] = useState<ICondition>({
    raceName: undefined,
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

  return (
    <div className="rounded-lg shadow mx-4 py-8 mb-8 bg-white">
      <Condition condition={condition} setCondition={setCondition} />
      <div className="card flex justify-content-center mt-8 mx-16">
        <Button label="検索" />
      </div>
    </div>
  );
};
