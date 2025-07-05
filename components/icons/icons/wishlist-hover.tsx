import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgWishlistHover = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="#F53658"
      d="M16.5 6.518c0 .892-.142 1.717-.39 2.482H1.89a8 8 0 0 1-.39-2.482c0-2.318 1.868-4.193 4.17-4.193 1.358 0 2.573.66 3.33 1.673a4.16 4.16 0 0 1 3.33-1.673c2.303 0 4.17 1.875 4.17 4.193"
    />
    <path
      fill="#F53658"
      d="M16.11 9c-1.185 3.75-4.838 5.993-6.645 6.608-.255.09-.675.09-.93 0C6.727 14.992 3.075 12.75 1.89 9z"
      opacity={0.4}
    />
  </svg>
);
const Memo = memo(SvgWishlistHover);
export default Memo;
