import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgArrowLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M9.62 12.547a.5.5 0 0 0 .353-.147l4.047-4.047a.503.503 0 0 0 0-.706L9.973 3.6a.503.503 0 0 0-.706 0 .503.503 0 0 0 0 .707L12.96 8l-3.693 3.693a.503.503 0 0 0 0 .707c.093.1.226.147.353.147"
    />
    <path
      fill="#425A8B"
      d="M2.333 8.5h11.22c.274 0 .5-.227.5-.5s-.226-.5-.5-.5H2.333c-.273 0-.5.227-.5.5s.227.5.5.5"
    />
  </svg>
);
const Memo = memo(SvgArrowLeft);
export default Memo;
