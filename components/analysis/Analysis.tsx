import { useEffect, useState } from "react";
import { RaceTopic } from "./RaceTopic";
import { Single } from "@/components/analysis/single/Single";
import { AI } from "@/components/analysis/ai/AI";
import { Tabs, TabType } from "./Tabs";
import useSWR from "swr";
import { fetcher } from "@/boilerplate/utils/api";
import { useSetRecoilState } from "recoil";
import { raceIdState, raceInfoState, recentRaceState } from "@/states/race";
import { Compare } from "./compare/Compare";
import { mgt_race_id } from "@prisma/client";

export const Analysis = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>("ai");
  const setRaceIds = useSetRecoilState(raceIdState);
  const { data: raceIdsData, error: raceIdsError } = useSWR(
    { url: "/api/db/raceIds", method: "GET" },
    fetcher
  );
  const setRaceInfo = useSetRecoilState(raceInfoState);
  const { data: raceInfoData, error: raceInfoError } = useSWR(
    { url: "/api/db/raceInfo", method: "GET" },
    fetcher
  );
  const setRecentRace = useSetRecoilState(recentRaceState);
  useEffect(() => {
    setRaceIds(raceIdsData);
    setRaceInfo(raceInfoData);
    if (raceIdsData && raceInfoData) {
      const today = new Date();
      let recentNum: number | undefined = undefined;
      let recentRaceId: string | number | undefined = undefined;
      raceInfoData.map((race: any, index: any) => {
        const raceDate = new Date(race.date);
        const diff = Math.floor(
          (raceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diff < -1) {
          return;
        }
        if (!recentNum || recentNum > diff) {
          recentNum = diff;
          recentRaceId = race.race_id;
        }
      });
      const recentRaceName = raceIdsData
        .filter((race: mgt_race_id) => {
          return race.race_id == recentRaceId;
        })
        .map((race: mgt_race_id) => race.race_name)[0];
      setRecentRace({
        raceId: recentRaceId,
        raceName: recentRaceName,
      });
    }
  }, [raceIdsData, raceInfoData]);

  return (
    <>
      <RaceTopic />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab == "ai" && <AI />}
      {selectedTab == "compare" && <Compare />}
      {selectedTab == "single" && <Single />}
    </>
  );
};
