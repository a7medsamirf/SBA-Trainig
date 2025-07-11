import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgBluetooth = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M16.19 2H7.82C4.18 2 2.01 4.17 2.01 7.81v8.37c0 3.64 2.17 5.81 5.81 5.81h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2"
      opacity={0.4}
    />
    <path
      fill="#425A8B"
      d="M12.71 19.03c-.23 0-.41-.06-.51-.11-.23-.11-.77-.47-.77-1.45v-3.42l-2.92 2.68c-.3.28-.78.26-1.06-.05a.746.746 0 0 1 .05-1.06l3.93-3.6v-.08L7.5 8.38a.746.746 0 0 1-.05-1.06c.28-.3.76-.33 1.06-.05l2.92 2.68V6.53c0-.98.54-1.34.77-1.45s.85-.29 1.6.34l2.42 2.02c.33.27.52.67.53 1.08s-.16.81-.48 1.1l-2.61 2.39 2.61 2.39c.31.29.49.69.48 1.1s-.2.8-.53 1.08L13.8 18.6c-.42.34-.8.43-1.09.43m.22-5.73v4.06l2.33-1.95zm0-6.66v4l2.33-2.14z"
    />
  </svg>
);
const Memo = memo(SvgBluetooth);
export default Memo;
