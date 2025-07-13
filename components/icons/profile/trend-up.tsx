import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgTrendUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#76A441"
      d="M3.5 11.251c-.19 0-.38-.07-.53-.22a.754.754 0 0 1 0-1.06l3.2-3.2a.74.74 0 0 1 1.15.11l1.09 1.64 3.55-3.55c.29-.29.77-.29 1.06 0s.29.77 0 1.06l-4.2 4.2a.74.74 0 0 1-1.15-.11l-1.09-1.64-2.55 2.55c-.15.15-.34.22-.53.22"
    />
    <path
      fill="#76A441"
      d="M12.5 8.25c-.41 0-.75-.34-.75-.75V6.25H10.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2c.41 0 .75.34.75.75v2c0 .41-.34.75-.75.75"
    />
  </svg>
);
const Memo = memo(SvgTrendUp);
export default Memo;
