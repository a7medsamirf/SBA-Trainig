"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import TrainingSidebarComponent from "./TrainingSidebar-component";
import TrainingCard from "./TrainingCard";
import UpsCard from "@/components/sections/ups/components/upsCard-component";
import { NewsletterSection } from "@/components/sections/newsletter/newsletter-section";
import { CategoryFilterItem, Course } from "@/models";
import TrainingFilter from "./TrainingFilter";

interface TrainingPageClientProps {
  courses: Course[];
  categories: CategoryFilterItem[];
}

const TrainingPageClient: React.FC<TrainingPageClientProps> = ({
  courses,
  categories,
}) => {
  const t = useTranslations("trans.training");
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // عند تحميل الصفحة نقرأ الـ category من الـ URL
  useEffect(() => {
    if (initialCategory) {
      const categoryName =
        categories.find((cat) => String(cat.id) === initialCategory)?.name ||
        null;
      setSelectedCategory(categoryName);
    }
  }, [initialCategory, categories]);

  const filteredCourses = selectedCategory
    ? courses.filter((course) => course.category_name === selectedCategory)
    : courses;

  return (
    <>
      <section className="section-box">
        <div className="container">
          <h2 className="mt-4">
            {t("Training")} /{" "}
            {selectedCategory ? selectedCategory : t("All-categories")}
          </h2>
          <div className="row align-items-center">
            <div className="col-lg-12 mb-30">
              <p className="mt-20 font-md color-brand-3">
                {filteredCourses.length}{" "}
                <span className="font-md color-gray-500"> {t("Courses")} </span>
              </p>
            </div>
          </div>

          <div className="pt-0 border-bottom mb-30"></div>

          <div className="row mt-30">
            <div className="col-lg-3 col-md-6">
              <TrainingSidebarComponent
                categories={categories}
                onCategorySelect={setSelectedCategory}
              />
            </div>
            <div className="col-lg-9 col-md-6">
              <TrainingFilter categories={categories} />
              <div className="mt-3 list-style-brand-2 list-products-4">
                <TrainingCard courses={filteredCourses} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-60 section-box mt-50">
        <div className="container">
          <div className="row">
            <UpsCard className="my-3 UpsCard-border my-md-0" />
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
};

export default TrainingPageClient;
