import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";

interface SvgGameProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

const SvgGame = ({ width = 40, height = 40, ...props }: SvgGameProps) => (
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
      d="M10.13 15.01 9.1 13.98l.99-.99c.29-.29.29-.77 0-1.06a.755.755 0 0 0-1.06 0l-.99.99-.96-.96a.754.754 0 0 0-1.06 0c-.29.29-.29.77 0 1.06l.96.96-.99.99c-.29.29-.29.77 0 1.06.15.15.34.22.53.22s.38-.07.53-.22l.99-.99 1.03 1.03c.15.15.34.22.53.22s.38-.07.53-.22c.29-.29.29-.77 0-1.06M13.54 15c-.55 0-1.01-.45-1.01-1s.44-1 .99-1h.02c.55 0 1 .45 1 1s-.44 1-1 1M17.48 15c-.55 0-1.01-.45-1.01-1s.44-1 .99-1h.02c.55 0 1 .45 1 1s-.44 1-1 1M15.5 16.97c-.55 0-1-.44-1-.99v-.02c0-.55.45-1 1-1s1 .45 1 1-.44 1.01-1 1.01M15.5 13.03c-.55 0-1-.44-1-.99v-.02c0-.55.45-1 1-1s1 .45 1 1-.44 1.01-1 1.01"
    />
    <path
      fill="#425A8B"
      d="M22 11.07v5.58C22 19.6 19.6 22 16.65 22h-9.3C4.4 22 2 19.6 2 16.65v-5.58c0-2.95 2.4-5.35 5.35-5.35h9.3c2.95 0 5.35 2.4 5.35 5.35"
      opacity={0.4}
    />
    <path
      fill="#425A8B"
      d="m13.64 2.71-.01.94A1.64 1.64 0 0 1 12 5.26c-.15 0-.24.1-.24.23s.1.23.23.23h-1.61c-.01-.07-.02-.15-.02-.23 0-.9.73-1.63 1.62-1.63.15 0 .25-.1.25-.23l.01-.94c.01-.38.32-.69.7-.69h.01c.39 0 .69.32.69.71"
    />
  </svg>
);
const Memo = memo(SvgGame);
export default Memo;
