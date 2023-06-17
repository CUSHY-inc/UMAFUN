import { mgt_race_result } from "@/node_modules/.prisma/client/index";
import { twMerge } from "tailwind-merge";
import { ICondition, IResult, MAX, MIN } from "@/interfaces/analysis";
import axios from "axios";

export const WinRateCard = ({
  condition,
  results,
  targetRaceId,
  targetYear,
  targetRaceResult,
  className,
}: {
  condition: ICondition;
  results: IResult[] | undefined;
  targetRaceId: number | undefined;
  targetYear: [number, number] | undefined;
  targetRaceResult: IResult[] | undefined;
  className?: string;
}) => {
  console.log({ results, targetRaceResult });
  return <>aaa</>;
};
