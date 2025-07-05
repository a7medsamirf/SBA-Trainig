import "./training.scss";
import TrainingPageClient from './components/TrainingPageClient';
import { getCoursesFilter } from "@/shared-apis/Courses/get-courses-filter.api";
import { getCategoriesFilter } from "@/shared-apis/CategoriesFilter/get-categories-filter.api";

export default async function TrainingPage() {
  const coursesResponse = await getCoursesFilter();
  const coursesData = coursesResponse?.data || [];

  const categories = await getCategoriesFilter(); // خلاص رجعت data جاهزة كلها

  // تقدر تفلترها لو عايز فقط اللي عنده كورسات
  // const filteredCategories = categories.filter((cat: any) => Number(cat.courses_count) > 0);

  return (
    <TrainingPageClient courses={coursesData} categories={categories} />
  );
}
