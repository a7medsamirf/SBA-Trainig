import { ReactNode } from "react";
import "./breadcrumb.scss";
import { Link } from "@/i18n/routing";
import { cn } from "@/utils";

interface BreadCrumbItem {
  title: string;
  url?: string;
}

interface Props {
  data: BreadCrumbItem[];
  disableLink?: boolean;
  actions?: ReactNode;
}

export const BreadCrumb: React.FC<Props> = ({
  data,
  disableLink = false,
  actions,
}) => {
  return (
    <section className="wrapper">
      <ul className="wrapper__list">
        {data.map((el, index) => {
          const isLast = index === data.length - 1;

          const Component = disableLink ? "div" : Link;

          return (
            <li
              key={index}
              className={cn("wrapper__item", isLast && "wrapper__item--last")}
            >
              {!isLast && el.url ? (
                <>
                  <Component
                    href={!disableLink ? el.url : "#"}
                    className="wrapper__link"
                  >
                    {el.title}
                  </Component>
                  <span className="rtl:rotate-90 ltr:-rotate-90 arrow-icon">
                    →
                  </span>
                </>
              ) : (
                <span className="wrapper__link-last">{el.title}</span>
              )}
            </li>
          );
        })}
      </ul>
      {actions && <div className="wrapper__actions">{actions}</div>}
    </section>
  );
};
