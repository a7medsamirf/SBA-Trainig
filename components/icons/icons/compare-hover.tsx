import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgCompareHover = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="#27B3D2"
      d="M8.25 12.113v2.024c0 1.688-.675 2.363-2.362 2.363H3.863c-1.688 0-2.363-.675-2.363-2.363v-2.024c0-1.688.675-2.363 2.363-2.363h2.025c1.687 0 2.362.675 2.362 2.363M13.125 8.25a3.375 3.375 0 1 0 0-6.75 3.375 3.375 0 0 0 0 6.75"
      opacity={0.4}
    />
    <path
      fill="#27B3D2"
      d="M11.085 16.5a.564.564 0 0 1-.48-.855l.728-1.215a.56.56 0 0 1 .772-.195c.27.158.353.503.195.773l-.135.225a4.296 4.296 0 0 0 3.218-4.155c0-.308.255-.563.562-.563s.555.255.555.57a5.42 5.42 0 0 1-5.415 5.415M2.063 7.478a.56.56 0 0 1-.563-.563A5.42 5.42 0 0 1 6.915 1.5c.21 0 .39.113.495.285.098.18.098.39-.008.57l-.727 1.208a.56.56 0 0 1-.772.194.56.56 0 0 1-.195-.772l.135-.225a4.305 4.305 0 0 0-3.218 4.155.56.56 0 0 1-.562.563"
    />
  </svg>
);
const Memo = memo(SvgCompareHover);
export default Memo;
