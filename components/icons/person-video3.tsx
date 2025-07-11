import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";

interface SvgPersonVideo3Props extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}
const SvgPersonVideo3 = ({ width = 40, height = 40, ...props }: SvgPersonVideo3Props) => (

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="currentColor"
    className="person-video3_svg__bi person-video3_svg__bi-person-video3"
    {...props}
  >
    <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2" />
    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783Q16 12.312 16 12V4a2 2 0 0 0-2-2z" />
  </svg>
);
const Memo = memo(SvgPersonVideo3);
export default Memo;
