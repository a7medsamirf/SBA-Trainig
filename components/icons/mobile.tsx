import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgMobile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M16.24 2H7.76C5 2 4 3 4 5.81v12.38C4 21 5 22 7.76 22h8.47C19 22 20 21 20 18.19V5.81C20 3 19 2 16.24 2"
      opacity={0.4}
    />
    <path
      fill="#425A8B"
      d="M14 6.25h-4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4c.41 0 .75.34.75.75s-.34.75-.75.75M12 19.3a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5"
    />
  </svg>
);
const Memo = memo(SvgMobile);
export default Memo;
