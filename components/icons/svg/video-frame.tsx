import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgVideoFrame = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 18 19"
    {...props}
  >
    <path
      fill="#425A8B"
      d="m8.265 11.119 2.901-1.864a.56.56 0 0 0 .27-.49.57.57 0 0 0-.269-.493L8.265 6.408a.55.55 0 0 0-.598-.027.54.54 0 0 0-.31.514v3.737q0 .354.31.516a.55.55 0 0 0 .598-.029m-4.959 3.135q-.532 0-.906-.374a1.23 1.23 0 0 1-.374-.905V4.54q0-.532.374-.905.373-.374.905-.374h11.39q.531 0 .905.374.373.373.373.905v8.435q0 .532-.373.905a1.24 1.24 0 0 1-.907.374h-3.16v.843a.62.62 0 0 1-.186.455.62.62 0 0 1-.451.187H7.108a.62.62 0 0 1-.456-.187.62.62 0 0 1-.186-.455v-.843zm0-1.05h11.387a.22.22 0 0 0 .16-.072.22.22 0 0 0 .071-.158V4.54a.22.22 0 0 0-.072-.158.22.22 0 0 0-.159-.073H3.306a.22.22 0 0 0-.158.073.22.22 0 0 0-.072.158v8.433q0 .086.072.158a.22.22 0 0 0 .158.072"
    />
  </svg>
);
const Memo = memo(SvgVideoFrame);
export default Memo;
