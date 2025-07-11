import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgClound = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M19.2 14.78c-.86.79-2 1.23-3.17 1.22H6.37c-4.07-.29-4.08-6.2 0-6.49h.04c-2.79-7.76 9-10.85 10.35-2.71 3.77.48 5.3 5.49 2.44 7.98"
      opacity={0.4}
    />
    <path
      fill="#425A8B"
      d="M18.75 21c0 .41-.34.75-.75.75h-4c-.05 0-.09 0-.14-.02-.29.74-1.02 1.27-1.86 1.27s-1.57-.53-1.86-1.27c-.05.02-.09.02-.14.02H6c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4c.05 0 .09 0 .14.02.2-.52.61-.93 1.13-1.13-.02-.05-.02-.09-.02-.14v-3h1.5v3c0 .05 0 .09-.02.14.52.2.93.61 1.13 1.13.05-.02.09-.02.14-.02h4c.41 0 .75.34.75.75"
    />
  </svg>
);
const Memo = memo(SvgClound);
export default Memo;
