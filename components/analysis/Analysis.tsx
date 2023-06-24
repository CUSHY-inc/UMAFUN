import { useEffect, useState } from "react";
import { RaceTopic } from "./RaceTopic";
import { Single } from "@/components/analysis/single/Single";
import { AI } from "@/components/analysis/ai/AI";
import { Tabs, TabType } from "./Tabs";
import useSWR from "swr";
import { fetcher } from "@/boilerplate/utils/api";
import { useSetRecoilState } from "recoil";
import { raceIdState, raceInfoState } from "@/states/race";

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
  useEffect(() => {
    setRaceIds(raceIdsData);
    setRaceInfo(raceInfoData);
  }, [raceIdsData, raceInfoData]);

  return (
    <>
      <RaceTopic />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab == "ai" && <AI />}
      {selectedTab == "single" && <Single />}
    </>
  );
};
