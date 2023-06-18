import { Card } from "@/components/common/Card";
import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import plugin from "tailwindcss";
import { plugins } from "chart.js";
import { Legend } from "chart.js/dist";

export const RaceTopic = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["勝率", "着外"],
      datasets: [
        {
          data: [230, 50],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--gray-100"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--gray-100"),
          ],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
      cutout: "60%",
    };
    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="border border-gray pb-4 px-8">
      <div className="mt-2 text-xl font-bold">有馬記念</div>
      <div className="mt-1 text-normal">12/24(日) 中山11R 芝2500m</div>
      <div className="mt-4 flex justify-between gap-x-10">
        <Card className="w-full flex flex-col items-center py-2">
          <div className="font-bold">1番人気</div>
          <div className="text-sm">複勝率75%</div>
          <div className="card flex justify-content-center mx-4">
            <Chart
              type="doughnut"
              data={chartData}
              options={chartOptions}
              className="w-20"
            />
          </div>
        </Card>
        <Card className="w-full flex flex-col items-center py-2">
          <div className="font-bold">宝塚記念1着</div>
          <div className="text-sm">[3-0-0-0]</div>
          <div className="w-full h-full flex justify-center items-center gap-x-2">
            <div className="text-blue-600 text-3xl">★</div>
            <div className="text-blue-600 text-3xl">★</div>
            <div className="text-blue-600 text-3xl">★</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
