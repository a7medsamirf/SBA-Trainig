"use client";

import { RadioInput } from "@/components";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Control, useWatch } from "react-hook-form";

export const PasswordValidation = ({
  passwordName = "password",
  control,
}: {
  control: Control<any>;
  passwordName?: string;
}) => {
  const t = useTranslations("trans");
  const password = useWatch({ control, name: passwordName });

  const [requirements, setRequirements] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
    length: false,
  });

  useEffect(() => {
    const uppercase = password && /[A-Z]/.test(password);
    const lowercase = password && /[a-z]/.test(password);
    const number = password && /\d/.test(password);
    const length = password && password.length >= 8;
    const symbol = password && /[$%#*&@]/.test(password);

    setRequirements({
      uppercase,
      lowercase,
      number,
      length,
      symbol,
    });
  }, [password]);

  return (
    <>
      <RadioInput
        showEmpty
        label={t("common.validation.password.length")}
        id="length"
        notClickable
        checked={requirements.length}
      />
      <RadioInput
        showEmpty
        label={t("common.validation.password.number")}
        id="number"
        notClickable
        checked={requirements.number}
      />
      <RadioInput
        showEmpty
        label={t("common.validation.password.uppercase")}
        id="uppercase"
        notClickable
        checked={requirements.uppercase}
      />
      <RadioInput
        showEmpty
        label={t("common.validation.password.symbol")}
        id="symbol"
        notClickable
        checked={requirements.symbol}
      />
      <RadioInput
        showEmpty
        label={t("common.validation.password.lowercase")}
        id="lowercase"
        notClickable
        checked={requirements.lowercase}
      />
    </>
  );
};
