import React, { useState } from "react";
import { Slider, SliderChangeEvent } from "primereact/slider";

export const RangeSlider = ({
  value,
  setValue,
  min,
  max,
  step,
}: {
  value: [number, number];
  setValue: React.Dispatch<React.SetStateAction<[number, number]>>;
  min?: number;
  max?: number;
  step?: number;
}) => {
  return (
    <div className="card flex justify-content-center">
      <Slider
        value={value}
        onChange={(e: SliderChangeEvent) =>
          setValue(e.value as [number, number])
        }
        className="w-14rem"
        range
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};
