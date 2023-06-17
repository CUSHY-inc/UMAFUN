import { Condition } from "@/components/analysis/Condition";
import { ICondition, MAX, MIN, IResult } from "@/interfaces/analysis";
import axios from "axios";
import { mgt_race_result } from "@/node_modules/.prisma/client/index";

export const createWhere = (condition: ICondition) => {
  const where = {
    race_id: condition.raceId,
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

export const createResult = (data: mgt_race_result[]) => {
  const result: IResult[] = data.map((val) => {
    return {
      raceId: val.race_id,
      year: val.year,
      arrive: val.arrive,
      frame: val.frame,
      number: val.number,
      name: val.name,
      genderOld: val.gender_old,
      weight: val.horse_weight,
      jockey: val.jockey,
      time: val.time,
      margin: val.margin,
      popular: val.popular,
      odds: val.odds,
      last: val.last,
      lastRank: val.last_rank,
      passing: val.passing,
    };
  });
  return result;
};
