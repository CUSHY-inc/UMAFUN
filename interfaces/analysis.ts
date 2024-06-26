export interface ICondition {
  raceName: string | undefined;
  raceId: number | undefined;
  year: [number, number] | undefined;
  number: string[] | undefined;
  frame: string[] | undefined;
  popular: string[] | undefined;
  arrive: string[] | undefined;
  genderOld: string[] | undefined;
  lastRank: string[] | undefined;
  weight: [number, number] | undefined;
  time: [number, number] | undefined;
  last: [number, number] | undefined;
  odds: [number, number] | undefined;
  horseWeight: [number, number] | undefined;
}

export interface IResult {
  raceId: number;
  raceName: string | undefined;
  year: number | null;
  arrive: number | null;
  frame: number | null;
  number: number | null;
  name: string | null;
  genderOld: string | null;
  weight: number | null;
  jockey: string | null;
  time: number | null;
  margin: string | null;
  popular: number | null;
  odds: number | null;
  last: number | null;
  lastRank: number | null;
  passing: string | null;
  horseWeight: string | null;
}
