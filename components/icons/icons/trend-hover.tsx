import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgTrendHover = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="#5BC694"
      d="M9 2.752v12.495l-.6.683c-.833.945-1.515.69-1.515-.57v-5.4H4.567c-1.05 0-1.342-.645-.645-1.433z"
    />
    <path
      fill="#5BC694"
      d="M14.078 9.473 9 15.248V2.753l.6-.683c.832-.945 1.515-.69 1.515.57v5.4h2.317c1.05 0 1.343.645.646 1.433"
      opacity={0.4}
    />
  </svg>
);
const Memo = memo(SvgTrendHover);
export default Memo;
