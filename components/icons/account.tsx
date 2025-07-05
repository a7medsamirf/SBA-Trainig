import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgAccount = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10"
      opacity={0.4}
    />
    <path
      fill="#425A8B"
      d="M12 14.5c-5.01 0-9.09 3.36-9.09 7.5 0 .28.22.5.5.5h17.18c.28 0 .5-.22.5-.5 0-4.14-4.08-7.5-9.09-7.5"
    />
  </svg>
);
const Memo = memo(SvgAccount);
export default Memo;
