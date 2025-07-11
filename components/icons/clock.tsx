import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";

interface SvgClockProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

const SvgClock = ({ width = 40, height = 40, ...props }: SvgClockProps) => (

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M5.5 12a6.5 6.5 0 1 1 13 0c0 2.08-.98 3.94-2.5 5.13h-.01c-1.1.86-2.48 1.37-3.99 1.37-1.49 0-2.86-.5-3.96-1.35h-.01A6.49 6.49 0 0 1 5.5 12"
      opacity={0.4}
    />
    <path
      fill="#425A8B"
      d="M8.03 17.15h.01c1.1.85 2.47 1.35 3.96 1.35 1.51 0 2.89-.51 3.99-1.37H16l-.51 2.47C15 21.5 13.9 22 12.55 22h-1.09c-1.35 0-2.46-.5-2.94-2.41zM8.03 6.85h.01C9.14 6 10.51 5.5 12 5.5c1.51 0 2.89.51 3.99 1.37H16l-.51-2.47C15 2.5 13.9 2 12.55 2h-1.09C10.11 2 9 2.5 8.52 4.41zM13.4 14.6c-.19 0-.38-.07-.53-.22l-1.4-1.4a.75.75 0 0 1-.22-.53V9.66c0-.41.34-.75.75-.75s.75.34.75.75v2.48l1.18 1.18c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22"
    />
  </svg>
);
const Memo = memo(SvgClock);
export default Memo;
