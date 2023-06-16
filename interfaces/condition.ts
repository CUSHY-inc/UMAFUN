import { MultiSelectType } from "@/boilerplate/components/Select";

export interface ICondition {
  raceName: string | undefined;
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
