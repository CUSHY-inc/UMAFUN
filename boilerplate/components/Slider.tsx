import React, { useState } from "react";
import { Slider, SliderChangeEvent } from "primereact/slider";

export const RangeSlider = ({
  value,
  onChange,
  min,
  max,
  step,
  className,
}: {
  value: [number, number] | undefined;
  onChange: (event: SliderChangeEvent) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}) => {
  return (
    <div className="card flex justify-content-center">
      <Slider
        value={value}
        onChange={onChange}
        className={className}
        range
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};
