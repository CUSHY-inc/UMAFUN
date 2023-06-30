import { GoThreeBars } from "react-icons/go";

export const GlobalHeader = () => {
  return (
    <div className="flex items-center h-20">
      <button>
        <GoThreeBars className="text-4xl ml-4" />
      </button>
      <span className="ml-4 text-2xl font-semibold text-sky-900">UMAFUN1</span>
    </div>
  );
};
