import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgFacebookGray = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path
      fill="#8C9EC5"
      d="M32 16c0-8.837-7.163-16-16-16S0 7.163 0 16s7.163 16 16 16q.141.002.281-.006v-12.45h-3.437v-4.007h3.437v-2.95c0-3.418 2.088-5.28 5.138-5.28 1.462 0 2.718.105 3.081.155v3.576h-2.1c-1.656 0-1.981.787-1.981 1.943v2.55h3.968l-.518 4.007h-3.45V31.38C27.106 29.462 32 23.306 32 16"
      opacity={0.8}
    />
  </svg>
);
const Memo = memo(SvgFacebookGray);
export default Memo;
