import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgLinkedinGray = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path
      fill="#8C9EC5"
      d="M16 0C7.165 0 0 7.165 0 16s7.165 16 16 16 16-7.165 16-16S24.835 0 16 0m-4.65 24.188H7.455V12.464h3.897zM9.403 10.863h-.025c-1.308 0-2.153-.9-2.153-2.025 0-1.15.871-2.025 2.204-2.025s2.153.875 2.179 2.025c0 1.125-.846 2.025-2.205 2.025m16 13.325h-3.897v-6.272c0-1.576-.564-2.651-1.974-2.651-1.076 0-1.717.725-2 1.425-.102.25-.127.6-.127.95v6.547h-3.897s.051-10.623 0-11.723h3.897v1.66c.517-.799 1.444-1.935 3.511-1.935 2.564 0 4.486 1.675 4.486 5.276z"
      opacity={0.8}
    />
  </svg>
);
const Memo = memo(SvgLinkedinGray);
export default Memo;
