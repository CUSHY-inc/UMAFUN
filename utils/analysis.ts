import { ICondition, IResult } from "@/interfaces/analysis";
import { mgt_race_result } from "@/node_modules/.prisma/client/index";
import { mgt_race_id, mgt_race_info } from "@prisma/client";
import axios from "axios";

export const yearMax = 2022;
export const yearMin = 2011;
export const numberMax = 24;
export const frameMax = 8;
export const popularMax = 24;
export const arriveMax = 24;
export const genderOldMin = 2;
export const genderOldMax = 9;
export const lastRankMax = 24;
export const weightMax = 60;
export const weightMin = 50;
export const timeMax = 240;
export const timeMin = 60;
export const lastMax = 48;
export const lastMin = 30;
export const oddsMax = 200;
export const oddsMin = 1;
export const horseWeightMax = 580;
export const horseWeightMin = 380;
export const MIN = 0;
export const MAX = 1;

export const createWhere = (condition: ICondition) => {
  const where: any = {};
  if (condition.raceId !== undefined) {
    where.race_id = condition.raceId;
  }
  if (condition.year) {
    where.year = {
      gte: condition.year[MIN],
      lte: condition.year[MAX],
    };
  }
  where.OR = [];
  condition.number &&
    where.OR.push({ number: { in: condition.number.map(Number) } });
  condition.frame &&
    where.OR.push({ frame: { in: condition.frame.map(Number) } });
  condition.popular &&
    where.OR.push({ popular: { in: condition.popular.map(Number) } });
  condition.arrive &&
    where.OR.push({ arrive: { in: condition.arrive.map(Number) } });
  condition.genderOld &&
    where.OR.push({ gender_old: { in: condition.genderOld } });
  condition.lastRank &&
    where.OR.push({ last_rank: { in: condition.lastRank.map(Number) } });
  if (condition.weight) {
    where.OR.push({
      weight: {
        gte: condition.weight[MIN],
        lte: condition.weight[MAX],
      },
    });
  }
  if (condition.time) {
    where.OR.push({
      time: {
        gte: condition.time[MIN],
        lte: condition.time[MAX],
      },
    });
  }
  if (condition.odds) {
    where.OR.push({
      odds: {
        gte: condition.odds[MIN],
        lte: condition.odds[MAX],
      },
    });
  }
  if (where.OR.length === 0) {
    delete where.OR;
  }
  return where;
};

export const createResult = (
  data: mgt_race_result[],
  raceIds: mgt_race_id[]
) => {
  const result: IResult[] = data.map((val) => {
    return {
      raceId: val.race_id,
      raceName: raceIds
        .filter((record: mgt_race_id) => {
          return record.race_id === val.race_id;
        })
        .map((record: mgt_race_id) => record.race_name)[0],
      year: val.year,
      arrive: val.arrive,
      frame: val.frame,
      number: val.number,
      name: val.name,
      genderOld: val.gender_old,
      weight: val.weight,
      jockey: val.jockey,
      time: val.time,
      margin: val.margin,
      popular: val.popular,
      odds: val.odds,
      last: val.last,
      lastRank: val.last_rank,
      passing: val.passing,
      horseWeight: val.horse_weight,
    };
  });
  return result;
};

export const searchOtherResults = async (
  srcResult: IResult[],
  raceIds: mgt_race_id[],
  raceInfo: mgt_race_info[]
) => {
  const targetRaceId = srcResult[0].raceId;
  const yearResults = new Map<number, IResult[]>();
  const raceNameResults = new Map<string, IResult[]>();
  const years = Array.from(
    new Set(
      srcResult
        .map((result) => result.year)
        .filter((year): year is number => year !== null)
    )
  );
  years.sort((a, b) => b - a);
  for (const year of years) {
    const targetRaceDate = raceInfo
      .filter((record: mgt_race_info) => {
        return (
          record.race_id == targetRaceId &&
          new Date(record.date).getFullYear() == year
        );
      })
      .map((record: mgt_race_info) => record.date)[0];
    const raceId = raceInfo
      .filter((record: mgt_race_info) => {
        const recordYear = new Date(record.date).getFullYear();
        return recordYear === year && record.date <= targetRaceDate;
      })
      .map((record: mgt_race_info) => record.race_id);
    const names = srcResult
      .filter((result: IResult) => {
        return result.year == year;
      })
      .map((result: IResult) => result.name);
    const where = {
      OR: [
        {
          race_id: {
            in: raceId,
          },
          name: {
            in: names,
          },
          year: year,
        },
        {
          race_id: {
            not: {
              in: raceId,
            },
          },
          name: {
            in: names,
          },
          year: year - 1,
        },
      ],
    };
    const res = await axios.post("/api/db/raceResults", where);
    const results = createResult(res.data, raceIds);
    yearResults.set(year, results);
  }
  yearResults.forEach((results, year) => {
    results.forEach((result) => {
      if (raceNameResults.has(result.raceName!)) {
        raceNameResults.get(result.raceName!)!.push(result);
      } else {
        raceNameResults.set(result.raceName!, [result]);
      }
    });
  });
  return raceNameResults;
};
