import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgFb = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M17.188 2.188H2.813a.624.624 0 0 0-.626.624v14.376c0 .345.28.625.626.625h14.374c.346 0 .625-.28.625-.625V2.813a.624.624 0 0 0-.625-.626Zm-1.805 4.56h-1.248c-.979 0-1.168.465-1.168 1.148v1.506h2.336l-.305 2.358h-2.031v6.053H10.53v-6.051H8.494v-2.36h2.037V7.664c0-2.018 1.233-3.117 3.034-3.117.863 0 1.603.064 1.82.094v2.107z"
    />
  </svg>
);
const Memo = memo(SvgFb);
export default Memo;
