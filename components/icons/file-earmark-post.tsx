import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";

interface SvgFileEarmarkPostProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}
const SvgFileEarmarkPost = ({ width = 40, height = 40, ...props }: SvgFileEarmarkPostProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="currentColor"
    className="file-earmark-post_svg__bi file-earmark-post_svg__bi-file-earmark-post"
    {...props}
  >
    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
    <path d="M4 6.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5H7a.5.5 0 0 1 0 1H4.5a.5.5 0 0 1-.5-.5" />
  </svg>
);
const Memo = memo(SvgFileEarmarkPost);
export default Memo;
