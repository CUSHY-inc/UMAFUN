import React, { useState, useEffect, useRef, ReactNode } from "react";
import { Chart } from "primereact/chart";
import { OverlayPanel } from "primereact/overlaypanel";

export const ResultChart = ({
  labels,
  datasets,
}: {
  labels: string[];
  datasets: { label: string; data: number[] };
}) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: labels,
      datasets: [
        {
          label: datasets.label,
          backgroundColor: documentStyle.getPropertyValue("--blue-500"),
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          data: datasets.data,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
    setChartData(data);
    setChartOptions(options);
  }, []);
  return (
    <div className="card">
      <Chart type="bar" data={chartData} options={chartOptions} />
    </div>
  );
};

export const ChartPanel = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const op = useRef<any>(null);
  return (
    <div className="card flex justify-content-center">
      <div className="bg-white" onClick={(e) => op.current.toggle(e)}>
        {label}
      </div>
      <OverlayPanel ref={op}>{children}</OverlayPanel>
    </div>
  );
};
