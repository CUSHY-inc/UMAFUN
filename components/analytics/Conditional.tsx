import useSWR from "swr";
import { fetcher } from "@/boilerplate/utils/api";
import {
  ReactSelect,
  MultiselectDropdown,
  MaterialTailwindSelect,
  PrimereactMultiselect,
} from "@/boilerplate/components/CustomSelect";
import { mgt_race_id } from "@prisma/client";

export const Conditional = () => {
  const { data, error } = useSWR(
    { url: "/api/db/raceIds", method: "GET" },
    fetcher
  );
  const raceNames = data?.map((item: mgt_race_id) => item.race_name);
  const umabanMax = 25;
  const umaban = [...Array(umabanMax)].map((_, i) => (i + 1).toString());
  return (
    <div className="rounded shadow mx-4 py-8">
      {/* <ReactSelect
        options={raceNames}
        placeholder="レース名を選択"
        className="w-64 ml-4"
        defaultNum={0}
      /> */}
      {/* <form>
        <select name="select" multiple className="w-full">
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </form> */}
      <div className="mx-6">
        <MaterialTailwindSelect options={raceNames} label="レース名" />
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <div className="w-36">
          <MultiselectDropdown options={umaban} placeholder="馬番" />
        </div>
        <div className="w-36">
          <MultiselectDropdown options={umaban} placeholder="枠番" />
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <div className="w-36">
          <MultiselectDropdown options={umaban} placeholder="性齢" />
        </div>
        <div className="w-36">
          <MultiselectDropdown options={umaban} placeholder="人気" />
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <div className="w-36">
          <MultiselectDropdown options={umaban} placeholder="着順" />
        </div>
        <div className="w-36">
          <PrimereactMultiselect />
        </div>
      </div>
    </div>
  );
};
