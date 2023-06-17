import { ICondition, MAX, MIN } from "@/interfaces/condition";
import axios from "axios";

export const createWhere = async (condition: ICondition) => {
  const res = await axios.post("/api/db/raceIds", {
    race_name: condition.raceName,
  });
  const raceId = res.data[0].race_id;
  const where = {
    race_id: raceId,
    year: {
      gte: condition.year ? condition.year[MIN] : undefined,
      lte: condition.year ? condition.year[MAX] : undefined,
    },
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
  return where;
};
