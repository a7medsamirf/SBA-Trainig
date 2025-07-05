"use client";

import { CSSProperties, useMemo, useState } from "react";
import styles from "./slider.module.scss";
import { useLocale } from "next-intl";
import { cn, getColor } from "@/utils";

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  steps?: number[]; // New prop for specific steps
  value?: number;
  setValue?: (value: number) => void;
  defaultValue?: number;
  sliderStyle?: CSSProperties;
  sliderClassName?: string;
  disabled?: boolean;
}

export const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  steps = [],
  value: controlledValue,
  defaultValue,
  setValue,
  sliderStyle,
  sliderClassName,
  disabled = false,
}: SliderProps) => {
  const lang = useLocale();
  const isRTL = lang === "ar";

  // Determine the effective min, max, and snapping behavior
  const effectiveMin = steps.length > 0 ? Math.min(...steps) : min;
  const effectiveMax = steps.length > 0 ? Math.max(...steps) : max;

  const [internalValue, setInternalValue] = useState<number>(
    controlledValue ?? defaultValue ?? min ?? steps[0]
  );
  const value = controlledValue ?? internalValue;

  // Calculate the effective step for arrow key navigation
  const effectiveStep = useMemo(() => {
    if (steps.length > 0) {
      // For custom steps, use a small step value and handle snapping in onChange
      return 1;
    }
    return step; // For regular range, use the provided step
  }, [steps, step]);

  // Handle change with snapping to steps if provided, otherwise use regular range
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    let newValue: number;

    if (steps.length > 0) {
      // Snap to the closest step from the steps array
      newValue = steps.reduce((prev, curr) =>
        Math.abs(curr - inputValue) < Math.abs(prev - inputValue) ? curr : prev
      );
    } else {
      // Use the step value to snap within the min/max range
      newValue = Math.round(inputValue / step) * step;
      newValue = Math.max(effectiveMin, Math.min(effectiveMax, newValue));
    }

    if (setValue) {
      setValue(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  // Handle arrow key navigation with RTL support
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let newValue = value;

    if (steps.length > 0) {
      const currentIndex = steps.indexOf(value);
      if (isRTL) {
        // RTL: ArrowLeft increases, ArrowRight decreases
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          newValue = steps[Math.min(currentIndex + 1, steps.length - 1)];
        } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          newValue = steps[Math.max(currentIndex - 1, 0)];
        }
      } else {
        // LTR: ArrowRight increases, ArrowLeft decreases
        if (e.key === "ArrowRight" || e.key === "ArrowUp") {
          newValue = steps[Math.min(currentIndex + 1, steps.length - 1)];
        } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
          newValue = steps[Math.max(currentIndex - 1, 0)];
        }
      }
    } else {
      if (isRTL) {
        // RTL: ArrowLeft increases, ArrowRight decreases
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          newValue = Math.min(effectiveMax, value + step);
        } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          newValue = Math.max(effectiveMin, value - step);
        }
      } else {
        // LTR: ArrowRight increases, ArrowLeft decreases
        if (e.key === "ArrowRight" || e.key === "ArrowUp") {
          newValue = Math.min(effectiveMax, value + step);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
          newValue = Math.max(effectiveMin, value - step);
        }
      }
    }

    if (newValue !== value) {
      if (setValue) {
        setValue(newValue);
      } else {
        setInternalValue(newValue);
      }
    }
  };

  const progressWidth = useMemo(() => {
    const rangeMin = steps.length > 0 ? Math.min(...steps) : min;
    const rangeMax = steps.length > 0 ? Math.max(...steps) : max;
    return ((value - rangeMin) / (rangeMax - rangeMin)) * 100;
  }, [value, steps, min, max]);

  return (
    <div className={styles.sliderContainer}>
      <input
        type="range"
        min={effectiveMin}
        max={effectiveMax}
        step={effectiveStep} // Use calculated step for native arrow key behavior
        value={value}
        disabled={disabled}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // Add keydown handler for arrow keys
        className={cn(styles.slider, sliderClassName)}
        style={{
          ...sliderStyle,
          borderRadius: "15px",

          background: `linear-gradient(to ${
            lang === "ar" ? "left" : "right"
          }, ${getColor("primary")} ${progressWidth}%, ${getColor(
            "color-light-soft"
          )} ${progressWidth}%)`,
        }}
      />
    </div>
  );
};
