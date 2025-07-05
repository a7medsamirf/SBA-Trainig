import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgDocumentText2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M17.5 5.833v8.334c0 2.5-1.25 4.166-4.167 4.166H6.667c-2.917 0-4.167-1.666-4.167-4.166V5.833c0-2.5 1.25-4.166 4.167-4.166h6.666c2.917 0 4.167 1.666 4.167 4.166"
      opacity={0.4}
    />
    <path
      fill="#425A8B"
      d="M15.417 7.708H13.75a2.29 2.29 0 0 1-2.292-2.291V3.75a.63.63 0 0 1 .625-.625.63.63 0 0 1 .625.625v1.667c0 .575.467 1.041 1.042 1.041h1.667a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625M10 11.459H6.667a.63.63 0 0 1-.625-.625.63.63 0 0 1 .625-.625H10a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625M13.333 14.792H6.667a.63.63 0 0 1-.625-.626.63.63 0 0 1 .625-.625h6.666a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625"
    />
  </svg>
);
const Memo = memo(SvgDocumentText2);
export default Memo;
