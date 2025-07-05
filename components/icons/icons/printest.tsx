import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgPrintest = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M10.001 18.333A8.333 8.333 0 1 0 1.668 10a8.33 8.33 0 0 0 4.798 7.548l1.909-8.971a.833.833 0 0 1 1.63.346c-.229 1.077-.429 1.494-.42 1.994.015.783.228 1.201.435 1.418.21.22.515.34.912.333.406-.008.865-.15 1.272-.407.79-.497 1.13-1.348 1.13-2.26a3.333 3.333 0 1 0-6.39 1.332.833.833 0 0 1-1.526.667 5 5 0 1 1 9.167 0c-.307.707-.867 1.278-1.494 1.673-.629.395-1.38.649-2.129.662-.682.013-1.393-.177-1.966-.673l-.945 4.443c.625.15 1.279.23 1.95.23z"
    />
  </svg>
);
const Memo = memo(SvgPrintest);
export default Memo;
