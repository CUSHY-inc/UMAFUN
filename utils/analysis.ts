import { ICondition, MAX, MIN, IResult } from "@/interfaces/analysis";
import { mgt_race_result } from "@/node_modules/.prisma/client/index";
import { mgt_race_info } from "@prisma/client";
import axios from "axios";

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
    where.OR.push({ last_rank: { in: condition.lastRank } });
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

export const searchOtherResults = async (results: IResult[]) => {
  const res = await axios.get("/api/db/raceInfo");
  const raceInfo = res.data;
  // console.log({ raceInfo });
  // for (const result of results) {
  //   console.log({ result });
  // }
  // console.log({ results });
  // const years = results
  //   .map((result) => result.year)
  //   .filter((year): year is number => year !== null);
  // const minYear = Math.min(...years);
  // const maxYear = Math.max(...years);
  // console.log(years, minYear, maxYear);
  // for (let year = minYear; year <= maxYear; year++){
  // }
  const targetRaceId = results[0].raceId;
  const years = Array.from(
    new Set(
      results
        .map((result) => result.year)
        .filter((year): year is number => year !== null)
    )
  );
  years.sort((a, b) => b - a);
  console.log({ years });
  for (const year of years) {
    const targetRaceDate = raceInfo
      .filter((record: mgt_race_info) => {
        return (
          record.race_id == targetRaceId &&
          new Date(record.date).getFullYear() == year
        );
      })
      .map((record: mgt_race_info) => record.date)[0];
    const raceIds = raceInfo
      .filter((record: mgt_race_info) => {
        const recordYear = new Date(record.date).getFullYear();
        return recordYear === year && record.date <= targetRaceDate;
      })
      .map((record: mgt_race_info) => record.race_id);
    const names = results
      .filter((result: IResult) => {
        return result.year == year;
      })
      .map((result: IResult) => result.name);
    console.log({ raceIds, names });
  }
  // console.log({ raceInfo, results });
};
