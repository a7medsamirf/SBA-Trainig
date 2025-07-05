"use client"; 
import Link from 'next/link'
import {  useTranslations } from "next-intl"; 
import { Course } from "@/models";
import {  useLocale} from "next-intl"; 
import { slugify } from "@/utils/slugify"; // 👈 استدعاء الدالة
interface TrainingListComponentProps {
  courses: Course[]; // مصفوفة مباشرة من الكورسات
}

const TrainingListComponent: React.FC<TrainingListComponentProps> = ({ courses }) => {
  const locale = useLocale();
  const t = useTranslations("trans.footer");

  return (
    <>
      <h4 className="mb-30 color-gray-1000">{t("training")}</h4>

      <ul className="menu-footer">
        {courses.slice(0, 6).map((course) => {
          const slug = slugify(course.name);
          return (
            <li key={course.id}>
              <Link href={`${locale === "en" ? "en" : "ar"}/training/${course.id}-${slug}`}>
                {course.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default TrainingListComponent

