import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgElectricity = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M10.5 16h3c2.5 0 4-1.8 4-4V6.91c0-1.05-.86-1.91-1.91-1.91H8.42c-1.05 0-1.91.86-1.91 1.91V12C6.5 14.2 8 16 10.5 16"
      opacity={0.4}
    />
    <path
      fill="#425A8B"
      d="M10.25 2v3h-1.5V2c0-.41.34-.75.75-.75s.75.34.75.75M15.25 2v3h-1.5V2c0-.41.34-.75.75-.75s.75.34.75.75M12.75 16v6c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-6z"
    />
  </svg>
);
const Memo = memo(SvgElectricity);
export default Memo;
