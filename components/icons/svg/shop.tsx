import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgShop = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2em"
    height="2em"
    fill="none"
    viewBox="0 0 19 19"
    {...props}
  >
    <path
      stroke="#425A8B"
      strokeLinecap="round"
      strokeWidth={1.414}
      d="M3.263 2.473 16.99 3.824A1.18 1.18 0 0 1 18.048 5.1l-.245 2.802c-.046.53-.44.962-.963 1.057L5.557 11.008M.879.845l1.377.287c.456.094.813.448.912.903L5.78 14.056c.118.542.598.929 1.152.929H17.89"
    />
    <circle
      cx={5.716}
      cy={17.775}
      r={0.707}
      fill="#425A8B"
      stroke="#425A8B"
      strokeWidth={1.004}
    />
    <circle
      cx={14.646}
      cy={17.775}
      r={0.707}
      fill="#425A8B"
      stroke="#425A8B"
      strokeWidth={1.004}
    />
  </svg>
);
const Memo = memo(SvgShop);
export default Memo;
