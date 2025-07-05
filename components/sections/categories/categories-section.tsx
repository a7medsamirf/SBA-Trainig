"use client";
import './categories.scss';
import Image from "next/image";
import { HomeCategory } from "@/models";
import {  useTranslations } from "next-intl";
import { Link } from '@/i18n/routing';

interface CategoriesSectionProps {
  categories: HomeCategory[];
}
const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories }) => {
  const t = useTranslations("trans.home");

  return (
    <>
    <section className="section-box mt-50">
    <div className="container">
        <div className="pb-0 head-main text-center border-bottom-0">
            <h4 className="color-gray-900">  {t("requested-courses")}</h4>
        </div>
        <div className="mt-10">
        <div className="row">
          {categories.map((category) => (
            <div className="col-xl-2 col-lg-4 col-sm-6 mb-4" key={category.id}>
              <div className="card-course text-center p-3">
                <div className="card-icon image mb-3">
                  <span className="catIcon text-center p-3">
                    {category.image ? (
                      <Image width={100} height={100} src={category.image} alt={category.name} style={{ maxWidth: '35px', maxHeight: '35px', objectFit: 'contain' }} />
                    ) : (
                      <span style={{ fontSize: '2rem' }}>📁</span>
                    )}
                  </span> 
                </div>
                <div className="text-info">
                <Link
                    href={`/training?category=${category.id}`}
                    className="card-title-course font-sm color-gray-900 font-bold"
                    style={{ cursor: 'pointer' }}
                  >
                    {category.name}
                  </Link>

                
                  <p className="card-text-course font-xs color-gray-500">{category.courses_count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
    </div>
</section>
    </>
  )
}

export default CategoriesSection