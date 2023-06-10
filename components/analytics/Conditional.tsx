import useSWR from "swr";
import { fetcher } from "@/boilerplate/utils/api";

export const Conditional = () => {
  const { data, error } = useSWR(
    { url: "/api/db/raceIds", method: "GET" },
    fetcher
  );
  console.log({ data, error });
  return <div className="h-20 rounded-lg shadow mx-4"></div>;
};
