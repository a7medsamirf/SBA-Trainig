import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgMonitor = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M21.97 6.41v6.5H2v-6.5C2 3.98 3.98 2 6.41 2h11.15c2.43 0 4.41 1.98 4.41 4.41"
      opacity={0.4}
    />
    <path
      fill="#425A8B"
      d="M2 12.92v.2a4.41 4.41 0 0 0 4.41 4.41h3.84c.55 0 1 .45 1 1v.97c0 .55-.45 1-1 1H7.83a.749.749 0 1 0 0 1.5h8.35c.41 0 .75-.34.75-.75s-.34-.75-.75-.75h-2.42c-.55 0-1-.45-1-1v-.97c0-.55.45-1 1-1h3.81a4.41 4.41 0 0 0 4.41-4.41v-.2z"
    />
  </svg>
);
const Memo = memo(SvgMonitor);
export default Memo;
