import { ICondition, IResult } from "@/interfaces/analysis";
import { initialCondition } from "@/utils/analysis";
import { atom } from "recoil";

export const compareTargetConditionState = atom<ICondition>({
  key: "compareTargetConditionState",
  default: initialCondition,
});
export const compareConditionState = atom<ICondition[]>({
  key: "compareConditionState",
  default: [{ ...initialCondition }],
});
export const compareTargetResultState = atom<{
  result: Map<string, IResult[]>;
}>({
  key: "compareTargetResultState",
  default: {
    result: new Map<string, IResult[]>(),
  },
});
export const compareOtherResultState = atom<{
  result: Map<string, IResult[]>;
}>({
  key: "compareOtherResultState",
  default: {
    result: new Map<string, IResult[]>(),
  },
});

export const aiConditionState = atom<ICondition>({
  key: "aiConditionState",
  default: initialCondition,
});
export const aiTargetResultState = atom<{
  result: Map<string, IResult[]>;
}>({
  key: "aiTargetResultState",
  default: {
    result: new Map<string, IResult[]>(),
  },
});
export const aiOtherResultState = atom<{
  result: Map<string, IResult[]>;
}>({
  key: "aiOtherResultState",
  default: {
    result: new Map<string, IResult[]>(),
  },
});

export const singleConditionState = atom<ICondition>({
  key: "singleConditionState",
  default: initialCondition,
});
export const singleResultState = atom<IResult[]>({
  key: "singleResultState",
  default: undefined,
});
