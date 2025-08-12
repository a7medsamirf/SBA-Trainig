import React from 'react'
import { SearchInput } from '@/components/search-input/search-input.component';
import { useTranslations } from 'next-intl';

const CoursesSearchComponents = () => {
  const t = useTranslations('trans.courses');
  
  return (
    <>
      <SearchInput placeholder={t('search-placeholder')} />
    </>
  )
}

export default CoursesSearchComponents
