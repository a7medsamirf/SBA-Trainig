import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgProfile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M12 2C9.38 2 7.25 4.13 7.25 6.75c0 2.57 2.01 4.65 4.63 4.74.08-.01.16-.01.22 0h.07a4.74 4.74 0 0 0 4.58-4.74C16.75 4.13 14.62 2 12 2"
      opacity={0.4}
    />
    <path
      fill="#425A8B"
      d="M17.08 14.15c-2.79-1.86-7.34-1.86-10.15 0-1.27.85-1.97 2-1.97 3.23s.7 2.37 1.96 3.21C8.32 21.53 10.16 22 12 22s3.68-.47 5.08-1.41c1.26-.85 1.96-1.99 1.96-3.23-.01-1.23-.7-2.37-1.96-3.21"
    />
  </svg>
);
const Memo = memo(SvgProfile);
export default Memo;
