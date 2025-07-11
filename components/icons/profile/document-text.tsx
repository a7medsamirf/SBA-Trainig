import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgDocumentText = (props: SVGProps<SVGSVGElement>) => (
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
      d="M13.333 18.958H6.667c-3.042 0-4.792-1.75-4.792-4.791V5.833c0-3.041 1.75-4.791 4.792-4.791h6.666c3.042 0 4.792 1.75 4.792 4.791v8.334c0 3.041-1.75 4.791-4.792 4.791M6.667 2.292c-2.384 0-3.542 1.158-3.542 3.541v8.334c0 2.383 1.158 3.541 3.542 3.541h6.666c2.384 0 3.542-1.158 3.542-3.541V5.833c0-2.383-1.158-3.541-3.542-3.541z"
    />
    <path
      fill="#425A8B"
      d="M15.417 7.708H13.75a2.29 2.29 0 0 1-2.292-2.291V3.75a.63.63 0 0 1 .625-.625.63.63 0 0 1 .625.625v1.667c0 .575.467 1.041 1.042 1.041h1.667a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625M10 11.459H6.667a.63.63 0 0 1-.625-.625.63.63 0 0 1 .625-.625H10a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625M13.333 14.792H6.667a.63.63 0 0 1-.625-.626.63.63 0 0 1 .625-.625h6.666a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625"
    />
  </svg>
);
const Memo = memo(SvgDocumentText);
export default Memo;
