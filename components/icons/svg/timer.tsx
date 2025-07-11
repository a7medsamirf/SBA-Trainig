import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgTimer = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#76A441"
      d="M10.16 15.167H5.84c-1.26 0-2.18-.527-2.533-1.434-.367-.946-.027-2.12.853-2.913L7.254 8 4.16 5.18c-.88-.793-1.22-1.967-.853-2.913C3.66 1.353 4.58.833 5.84.833h4.32c1.26 0 2.18.527 2.534 1.434.366.946.026 2.12-.854 2.913L8.747 8l3.1 2.82c.873.793 1.22 1.967.853 2.913-.36.907-1.28 1.434-2.54 1.434M8 8.673l-3.166 2.88c-.56.514-.807 1.26-.594 1.814.2.513.767.8 1.6.8h4.32c.833 0 1.4-.28 1.6-.8.213-.554-.027-1.3-.593-1.814zm-2.16-6.84c-.833 0-1.4.28-1.6.8-.213.554.027 1.3.594 1.814L8 7.327l3.167-2.88c.56-.514.806-1.26.593-1.814-.2-.513-.767-.8-1.6-.8z"
    />
  </svg>
);
const Memo = memo(SvgTimer);
export default Memo;
