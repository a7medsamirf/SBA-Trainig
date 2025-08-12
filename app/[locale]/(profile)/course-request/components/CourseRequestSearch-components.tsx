import React from "react";
import { SearchInput } from "@/components/search-input/search-input.component";
import { useTranslations } from 'next-intl';
const CourseRequestSearchComponents = () => {
  const t = useTranslations('trans.courses');
  
  return (
    <>
      <SearchInput placeholder={t('search-placeholderV2')} />
    </>
  )
}

export default CourseRequestSearchComponents;




/* "use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchInput } from "@/components/search-input/search-input.component";

const CourseRequestSearchComponents = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <SearchInput
      placeholder="ابحث عن دورة تدريبية..."
      defaultValue={search}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default CourseRequestSearchComponents;
 */