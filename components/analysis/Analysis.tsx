import { useState } from "react";
import { Condition } from "./Condition";
import { ICondition } from "@/interfaces/condition";
import { Button } from "primereact/button";
import useSWR from "swr";
import { fetcher } from "@/boilerplate/utils/api";
import axios from "axios";
import { MIN, MAX } from "@/interfaces/condition";

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

  const handleClick = async () => {
    const res = await axios.post("/api/db/raceIds", {
      race_name: condition.raceName,
    });
    const raceId = res.data[0].race_id;
    const where = {
      race_id: raceId,
      year: { gte: undefined, lte: undefined },
      OR: [
        { number: { in: condition.number?.map(Number) } },
        { frame: { in: condition.frame?.map(Number) } },
        { popular: { in: condition.popular?.map(Number) } },
        { arrive: { in: condition.arrive?.map(Number) } },
        { gender_old: { in: condition.genderOld } },
        { last_rank: { in: condition.lastRank } },
        {
          weight: {
            gte: condition.weight ? condition.weight[MIN] : undefined,
            lte: condition.weight ? condition.weight[MAX] : undefined,
          },
        },
        {
          time: {
            gte: condition.time ? condition.time[MIN] : undefined,
            lte: condition.time ? condition.time[MAX] : undefined,
          },
        },
        {
          odds: {
            gte: condition.odds ? condition.odds[MIN] : undefined,
            lte: condition.odds ? condition.odds[MAX] : undefined,
          },
        },
      ],
    };
    const result = await axios.post("/api/db/raceResults", where);
    console.log(result.data);
  };

  return (
    <div className="rounded-lg shadow mx-4 py-8 mb-8 bg-white">
      <Condition condition={condition} setCondition={setCondition} />
      <div className="card flex justify-content-center mt-8 mx-16">
        <Button label="検索" onClick={handleClick} />
      </div>
    </div>
  );
};
