import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgRotateLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 18 19"
    {...props}
  >
    <path
      stroke="#76A441"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.35}
      d="M6.832 4.362A7.5 7.5 0 0 1 9 4.039a6.5 6.5 0 0 1 6.502 6.503A6.5 6.5 0 0 1 9 17.044a6.5 6.5 0 0 1-6.503-6.502c0-1.335.405-2.58 1.095-3.615M5.903 4.542l2.167-2.49M5.903 4.542 8.43 6.387"
    />
  </svg>
);
const Memo = memo(SvgRotateLeft);
export default Memo;
