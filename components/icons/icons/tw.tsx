import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgTw = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M19.703 4.114a7.8 7.8 0 0 1-2.23.611 3.9 3.9 0 0 0 1.707-2.148 7.8 7.8 0 0 1-2.465.941A3.883 3.883 0 0 0 10.1 7.06 11.02 11.02 0 0 1 2.1 3.003 3.883 3.883 0 0 0 3.3 8.186a3.9 3.9 0 0 1-1.759-.485v.05a3.88 3.88 0 0 0 3.114 3.806 3.9 3.9 0 0 1-1.753.067A3.88 3.88 0 0 0 6.53 14.32a7.8 7.8 0 0 1-4.822 1.663q-.466 0-.927-.054a11 11 0 0 0 5.95 1.744c7.142 0 11.046-5.915 11.046-11.045q0-.251-.012-.502a7.9 7.9 0 0 0 1.936-2.008z"
    />
  </svg>
);
const Memo = memo(SvgTw);
export default Memo;
