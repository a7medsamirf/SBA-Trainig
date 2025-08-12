import React from "react";
import { SearchInput } from "@/components/search-input/search-input.component";
import { useTranslations } from 'next-intl';
const BillsSearchComponents = () => {
  const t = useTranslations('trans.courses');
  
  return (
    <>
      <SearchInput placeholder={t('Search-invoices-placeholder')} />
    </>
  )
}

export default BillsSearchComponents;
