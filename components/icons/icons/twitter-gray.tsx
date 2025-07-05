import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgTwitterGray = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path
      fill="#8C9EC5"
      d="M16 0C7.165 0 0 7.165 0 16s7.165 16 16 16 16-7.165 16-16S24.835 0 16 0m7.305 12.475q.011.237.01.475c0 4.852-3.693 10.448-10.448 10.449-2.074 0-4.004-.608-5.63-1.65q.432.05.877.05c1.72 0 3.304-.586 4.561-1.571a3.68 3.68 0 0 1-3.43-2.551 3.65 3.65 0 0 0 1.658-.063 3.67 3.67 0 0 1-2.946-3.6v-.047c.495.275 1.06.441 1.663.46a3.67 3.67 0 0 1-1.634-3.057c0-.673.182-1.304.497-1.846a10.43 10.43 0 0 0 7.57 3.837 3.673 3.673 0 0 1 6.258-3.35 7.4 7.4 0 0 0 2.332-.89 3.7 3.7 0 0 1-1.615 2.03 7.3 7.3 0 0 0 2.11-.578 7.5 7.5 0 0 1-1.833 1.902"
      opacity={0.8}
    />
  </svg>
);
const Memo = memo(SvgTwitterGray);
export default Memo;
