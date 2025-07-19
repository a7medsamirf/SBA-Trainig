import "./training.scss";
import TrainingPageClient from "./components/TrainingPageClient";
import { getCoursesFilter } from "@/shared-apis/Courses/get-courses-filter.api";
import { getCategoriesFilter } from "@/shared-apis/CategoriesFilter/get-categories-filter.api";
import { SearchParamProps } from "@/models";

export default async function TrainingPage({ searchParams }: SearchParamProps) {
  const page = ((await searchParams) as any)?.page;
  const date = ((await searchParams) as any)?.date;
  const category_id = ((await searchParams) as any)?.category_id;

  const coursesResponse = await getCoursesFilter({ page, date, category_id });
  const coursesData = coursesResponse?.data || [];

  const categories = await getCategoriesFilter(); // خلاص رجعت data جاهزة كلها

  // تقدر تفلترها لو عايز فقط اللي عنده كورسات
  // const filteredCategories = categories.filter((cat: any) => Number(cat.courses_count) > 0);

  return <TrainingPageClient courses={coursesData} categories={categories} />;
}
