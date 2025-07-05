import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgSaudiRiyal = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 21"
    {...props}
  >
    <g fill={props.color || "#425A8B"} clipPath="url(#Saudi_Riyal_svg__a)">
      <path d="M11.834 18.65a7.4 7.4 0 0 0-.65 2.352l7.184-1.48a7.4 7.4 0 0 0 .65-2.352zM18.375 15.085c.339-.73.563-1.522.65-2.352l-5.597 1.154v-2.218l4.946-1.019c.34-.73.564-1.521.65-2.352l-5.596 1.153V1.475a7.8 7.8 0 0 0-2.238 1.82v6.617l-2.238.461V.39a7.8 7.8 0 0 0-2.238 1.82v8.624l-5.008 1.032a7.4 7.4 0 0 0-.65 2.351l5.658-1.165v2.793L.65 17.094A7.4 7.4 0 0 0 0 19.446l6.347-1.308c.517-.104.96-.4 1.25-.807l1.163-1.673c.121-.173.192-.382.192-.607v-2.46l2.238-.461v4.435z" />
    </g>
    <defs>
      <clipPath id="Saudi_Riyal_svg__a">
        <path fill="#fff" d="M0 .39h19.024V21H0z" />
      </clipPath>
    </defs>
  </svg>
);
const Memo = memo(SvgSaudiRiyal);
export default Memo;