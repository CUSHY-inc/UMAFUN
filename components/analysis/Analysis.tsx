import { useState } from "react";
import { RaceTopic } from "./RaceTopic";
import clsx from "clsx";
import { Single } from "@/components/analysis/single/Single";
import { AI } from "@/components/analysis/ai/AI";

export const Analysis = () => {
  const [selectedTab, setSelectedTab] = useState<"single" | "compare" | "ai">(
    "single"
  );
  return (
    <>
      <RaceTopic />
      <div className="tabs tabs-boxed mx-4 mt-6 gap-x-2 bg-white">
        <a
          className={clsx(
            "tab text-base",
            selectedTab == "single" && "text-black font-bold bg-gray-200"
          )}
          onClick={() => setSelectedTab("single")}
        >
          データ分析
        </a>
        <a
          className={clsx(
            "tab text-base",
            selectedTab == "compare" && "text-black font-bold bg-gray-200"
          )}
          onClick={() => setSelectedTab("compare")}
        >
          レース比較
        </a>
        <a
          className={clsx(
            "tab text-base",
            selectedTab == "ai" && "text-black font-bold bg-gray-200"
          )}
          onClick={() => setSelectedTab("ai")}
        >
          AI分析
        </a>
      </div>
      {selectedTab == "single" && <Single />}
      {selectedTab == "ai" && <AI />}
    </>
  );
};
