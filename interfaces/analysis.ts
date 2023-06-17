import { MultiSelectType } from "@/boilerplate/components/Select";

export const MIN = 0;
export const MAX = 1;
export interface ICondition {
  raceName: string | undefined;
  year: [number, number] | undefined;
  number: MultiSelectType | undefined;
  frame: MultiSelectType | undefined;
  popular: MultiSelectType | undefined;
  arrive: MultiSelectType | undefined;
  genderOld: MultiSelectType | undefined;
  lastRank: MultiSelectType | undefined;
  weight: [number, number] | undefined;
  time: [number, number] | undefined;
  last: [number, number] | undefined;
  odds: [number, number] | undefined;
  horseWeight: [number, number] | undefined;
}

export interface IResult {
  year: number | null;
  arrive: number | null;
  frame: number | null;
  number: number | null;
  name: string | null;
  genderOld: string | null;
  weight: string | null;
  jockey: string | null;
  time: number | null;
  margin: string | null;
  popular: number | null;
  odds: number | null;
  last: number | null;
  lastRank: number | null;
  passing: string | null;
}