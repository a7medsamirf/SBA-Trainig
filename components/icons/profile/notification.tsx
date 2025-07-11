import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgNotification = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#425A8B"
      d="m19.34 14.49-1-1.66c-.21-.37-.4-1.07-.4-1.48V8.82c0-3.26-2.65-5.92-5.92-5.92S6.1 5.56 6.1 8.82v2.53c0 .41-.19 1.11-.4 1.47l-1.01 1.67c-.4.67-.49 1.41-.24 2.09.24.67.81 1.19 1.55 1.44 1.94.66 3.98.98 6.02.98s4.08-.32 6.02-.97c.7-.23 1.24-.76 1.5-1.45s.19-1.45-.2-2.09"
      opacity={0.4}
    />
    <path
      fill="#425A8B"
      d="M14.25 3.32c-.69-.27-1.44-.42-2.23-.42-.78 0-1.53.14-2.22.42.43-.81 1.28-1.32 2.22-1.32.95 0 1.79.51 2.23 1.32M14.83 20.01A3.01 3.01 0 0 1 12 22c-.79 0-1.57-.32-2.12-.89-.32-.3-.56-.7-.7-1.11.13.02.26.03.4.05.23.03.47.06.71.08.57.05 1.15.08 1.73.08.57 0 1.14-.03 1.7-.08.21-.02.42-.03.62-.06z"
    />
  </svg>
);
const Memo = memo(SvgNotification);
export default Memo;
