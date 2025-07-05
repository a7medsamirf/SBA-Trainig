import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgChecked = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <rect width={20} height={20} fill="#425A8B" rx={4} />
    <path
      fill="#fff"
      d="M15.725 6.232a.9.9 0 0 0-.278-.172.92.92 0 0 0-.934.172L8.15 12.07 5.48 9.613a.9.9 0 0 0-.287-.17.94.94 0 0 0-.667.011.9.9 0 0 0-.28.178.8.8 0 0 0-.184.263.74.74 0 0 0 .011.612.8.8 0 0 0 .194.256l3.28 3.005q.12.111.277.172a.92.92 0 0 0 .657 0 .9.9 0 0 0 .278-.171l6.967-6.387a.8.8 0 0 0 .203-.261.73.73 0 0 0 0-.628.8.8 0 0 0-.203-.261"
    />
  </svg>
);
const Memo = memo(SvgChecked);
export default Memo;
