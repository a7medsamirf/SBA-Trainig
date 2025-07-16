import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgArrowright = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 21"
    {...props}
  >
    <path
      stroke="#202020"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m7.459 3.9 5.433 5.433a1.655 1.655 0 0 1 0 2.334L7.459 17.1"
    />
  </svg>
);
const Memo = memo(SvgArrowright);
export default Memo;
