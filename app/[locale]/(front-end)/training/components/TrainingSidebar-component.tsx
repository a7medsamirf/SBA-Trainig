"use client";

import React from "react";
import { CategoryFilterItem } from "@/models";
import { useTranslations } from "next-intl";

interface TrainingSidebarComponentProps {
  categories: CategoryFilterItem[];
  onCategorySelect: (categoryName: string | null) => void;
}

const TrainingSidebarComponent = ({ categories, onCategorySelect }: TrainingSidebarComponentProps) => {
  const t = useTranslations("trans.training");

  // ترتيب الفئات: اللي فيهم كورسات الأول
  const [mainCategories, moreCategories, totalCoursesCount] = (() => {
    const sorted = [...categories].sort((a, b) => Number(b.courses_count) - Number(a.courses_count));
    const total = sorted.reduce((sum, cat) => sum + Number(cat.courses_count || 0), 0);
    return [sorted.slice(0, 5), sorted.slice(5), total];
  })();

  return (
    <div className="sidebar-border">
      <div className="sidebar-head">
        <h6 className="color-gray-900">{t("Training-paths")} </h6>
      </div>
      <div className="sidebar-content">
        <ul className="list-nav-arrow" id="sidebar-list">
          <li>
            <a
              href="#"
              data-category="all"
              onClick={e => {
                e.preventDefault();
                onCategorySelect(null);
              }}
            >
              {t("All-categories")} <span className="number">{totalCoursesCount}</span>
            </a>
          </li>

          {mainCategories.map((category) => (
            <li key={category.id}>
              <a
                href="#"
                data-category={category.id}
                onClick={e => {
                  e.preventDefault();
                  onCategorySelect(category.name);
                }}
              >
                {category.name} <span className="number">{category.courses_count}</span>
              </a>
            </li>
          ))}
        </ul>

        {moreCategories.length > 0 && (
          <div>
            <div className="collapse" id="moreMenu">
              <ul className="list-nav-arrow" id="more-list">
                {moreCategories.map((category) => (
                  <li key={category.id}>
                    <a
                      href="#"
                      data-category={category.id}
                      onClick={e => {
                        e.preventDefault();
                        onCategorySelect(category.name);
                      }}
                    >
                      {category.name} <span className="number">{category.courses_count}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <a className="link-see-more mt-5 fw-bold" data-bs-toggle="collapse" href="#moreMenu" role="button" aria-expanded="false" aria-controls="moreMenu">
            {t("More")}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingSidebarComponent;