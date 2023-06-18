import { useState } from "react";
import { RaceTopic } from "./RaceTopic";
import clsx from "clsx";
import { Single } from "@/components/analysis/single/Single";
import { AI } from "@/components/analysis/ai/AI";
import { Tabs, TabType } from "./Tabs";

export const Analysis = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>("ai");
  return (
    <>
      <RaceTopic />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab == "ai" && <AI />}
      {selectedTab == "single" && <Single />}
    </>
  );
};
