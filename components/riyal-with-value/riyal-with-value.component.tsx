import { memo, ReactNode } from "react";

export const RiyalWithValue = memo(
  ({
    value,
    additionalUnit,
    logoWidth = 12,
    logoHeight = 12,
    color = "black",
  }: {
    value: string | number | ReactNode;
    logoWidth?: number;
    logoHeight?: number;
    color?: string;
    additionalUnit?: string | ReactNode;
  }) => {
    return (
      <div className="flex items-center gap-1 ltr:justify-end" dir="rtl">
        <div>{value}</div>
        <span className="text-gray-500">🇸🇦</span>
        {additionalUnit && <p>{additionalUnit}</p>}
      </div>
    );
  }
);
