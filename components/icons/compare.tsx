import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";

interface SvgCompareProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

const SvgCompare = ({ width = 40, height = 40, ...props }:SvgCompareProps) => (
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
      d="M11 16.15v2.7C11 21.1 10.1 22 7.85 22h-2.7C2.9 22 2 21.1 2 18.85v-2.7C2 13.9 2.9 13 5.15 13h2.7c2.25 0 3.15.9 3.15 3.15M17.5 11a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9"
      opacity={0.4}
    />
    <path
      fill="#425A8B"
      d="M14.78 22a.752.752 0 0 1-.64-1.14l.97-1.62c.21-.36.67-.47 1.03-.26s.47.67.26 1.03l-.18.3a5.73 5.73 0 0 0 4.29-5.54c0-.41.34-.75.75-.75s.74.34.74.76c0 3.98-3.24 7.22-7.22 7.22M2.75 9.97c-.41 0-.75-.33-.75-.75C2 5.24 5.24 2 9.22 2c.28 0 .52.15.66.38.13.24.13.52-.01.76L8.9 4.75c-.22.36-.68.48-1.03.26a.75.75 0 0 1-.26-1.03l.18-.3C5.33 4.32 3.5 6.56 3.5 9.22c0 .42-.34.75-.75.75"
    />
  </svg>
);
const Memo = memo(SvgCompare);
export default Memo;
