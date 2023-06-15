export interface ICondition {
  raceName: string;
  number: number[] | undefined;
  frame: number[] | undefined;
  popular: number[] | undefined;
  arrive: number[] | undefined;
  genderOld: number[] | undefined;
  lastRank: number[] | undefined;
  minWeight: number;
  maxWeight: number;
  minTime: number;
  maxTime: number;
  minLast: number;
  maxLast: number;
  minOdds: number;
  maxOdds: number;
  minHorseWeight: number;
  maxHorseWeight: number;
}
