import * as React from "react";
import type { SVGProps } from "react";
import { memo } from "react";
const SvgArrow2Hover = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#425A8B"
      d="M1.898 8.035h11.675L10 12.327a.986.986 0 1 0 1.516 1.26l4.922-5.906q.05-.07.088-.148c0-.049 0-.078.07-.128a1 1 0 0 0 .068-.354 1 1 0 0 0-.069-.354c0-.05 0-.08-.069-.128a1 1 0 0 0-.088-.148L11.516.514A.985.985 0 0 0 10 1.774l3.573 4.293H1.898a.984.984 0 0 0 0 1.968"
    />
  </svg>
);
const Memo = memo(SvgArrow2Hover);
export default Memo;
