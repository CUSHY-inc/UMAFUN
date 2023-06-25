import {
  mgt_race_id,
  mgt_race_info,
} from "@/node_modules/.prisma/client/index";
import { atom } from "recoil";

export const raceIdState = atom<mgt_race_id[] | undefined>({
  key: "raceIdState",
  default: undefined,
});

export const raceInfoState = atom<mgt_race_info[] | undefined>({
  key: "raceInfoState",
  default: undefined,
});

export const recentRaceState = atom({
  key: "recentRaceState",
  default: {
    raceId: undefined,
    raceName: undefined,
  },
});
