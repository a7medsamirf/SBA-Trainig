"use client";

import { useState, useRef, useEffect, ClipboardEvent, memo } from "react";
import {
  Control,
  Controller,
  RegisterOptions,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { useTranslations } from "next-intl";
import "./input-otp.scss";
import { ErrorMessage } from "../index";
import { cn } from "@/utils";

interface Props {
  name: string;
  control: Control<any>;
  digitsLength: number;
  rules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  required?: boolean;
  setValue?: UseFormSetValue<any>;
  trigger?: UseFormTrigger<any>;
  className?: string;
  resetKey?: number;
}

export const InputOtp = memo(
  ({
    digitsLength = 6,
    control,
    name,
    required,
    rules,
    setValue,
    trigger,
    className,
    resetKey,
  }: Props) => {
    const t = useTranslations("trans");
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const [otp, setOtp] = useState<string[]>(new Array(digitsLength).fill(""));
    const [activeIndex, setActiveIndex] = useState(0);

    const handleChange = (index: number, value: string) => {
      if (!/^[0-9\u0660-\u0669]$/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setValue?.(name, newOtp.join(""));
      trigger?.(name);

      if (index < digitsLength - 1) {
        setActiveIndex(index + 1);
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace") {
        e.preventDefault();

        if (otp[index] === "") {
          if (index > 0) {
            setActiveIndex(index - 1);
          } else {
            inputsRef.current[index]?.focus();
          }
        }

        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        setValue?.(name, newOtp.join(""));
        trigger?.(name);
      } else if (e.key === "ArrowLeft" && index > 0) {
        setActiveIndex(index - 1);
      } else if (e.key === "ArrowRight" && index < digitsLength - 1) {
        if (otp[index]) {
          setActiveIndex(index + 1);
        }
      }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("Text")
        .replace(/\D/g, "")
        .slice(0, digitsLength)
        .split("");

      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        pastedData.forEach((char, i) => (newOtp[i] = char));
        setValue?.(name, newOtp.join(""));
        trigger?.(name);

        return newOtp;
      });

      setActiveIndex(Math.min(pastedData.length, digitsLength - 1));
    };

    const handleClick = (index: number) => {
      const firstEmptyIndex = otp.findIndex((val) => val === "");
      const active = firstEmptyIndex === -1 ? index : firstEmptyIndex;
      setActiveIndex(active);
      inputsRef.current?.[active]?.focus();
    };

    useEffect(() => {
      inputsRef.current?.[activeIndex]?.focus();
    }, [activeIndex]);

    useEffect(() => {
      setOtp(new Array(digitsLength).fill(""));
      setActiveIndex(0);
    }, [resetKey]);

    // useEffect(() => {
    //   setOtp(control?._defaultValues?.[name]?.split(""));
    //   setActiveIndex(control?._defaultValues?.[name]?.length);
    // }, []);

    return (
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{
          ...rules,
          minLength: {
            value: digitsLength,
            message: t("common.validation.otp_min_length", { digitsLength }),
          },
          validate: {
            ...(required
              ? {
                  required: (value: string | number) =>
                    value?.toString().trim() !== "" ||
                    t("common.validation.required"),
                }
              : {}),
            ...rules?.validate,
          },
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <div className={className}>
              <div
                className={cn("flex items-center justify-between gap-3")}
                dir="ltr"
              >
                {[...Array(digitsLength)].map((_, index) => (
                  <input
                    {...field}
                    key={index}
                    ref={(el) => {
                      inputsRef.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onClick={() => handleClick(index)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    // disabled={index > 0 && !otp[index - 1]}
                    className={cn("input-otp", error && "input-otp__error")}
                  />
                ))}
              </div>

              {error?.message ? <ErrorMessage message={error.message} /> : null}
            </div>
          );
        }}
      />
    );
  }
);
