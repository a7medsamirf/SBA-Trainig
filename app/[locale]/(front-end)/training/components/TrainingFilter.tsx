"use client";

import { ReactDatePicker, SelectInput } from "@/components";
import { SearchInput } from "@/components/search-input/search-input.component";
import { usePathname, useRouter } from "@/i18n/routing";
import { CategoryFilterItem } from "@/models";
import { createQueryString } from "@/utils/create-query-string.util";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function TrainingFilter({
  categories,
}: {
  categories: CategoryFilterItem[];
}) {
  const { control } = useForm();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const date = searchParams.get("date");

  const category = searchParams.get("category_id");

  const [startDate, setStartDate] = useState<Date | null>(
    date ? new Date(date) : null
  );

  const onCategoryChange = (value: any) => {
    const prevQueries = Object.fromEntries(searchParams.entries());

    const query = createQueryString({
      ...prevQueries,
      category_id: value,
    });
    router.replace(`${pathname}?${query}`, { scroll: false });
  };

  const onStartDateChange = (value: any) => {
    const prevQueries = Object.fromEntries(searchParams.entries());

    setStartDate(value);

    const formattedDate = value.toISOString().split("T")[0];


    const query = createQueryString({
      ...prevQueries,
      date: formattedDate,
    });
    router.replace(`${pathname}?${query}`, { scroll: false });
  };

  return (
    <div
      className="row"
      style={{ gap: "12px", justifyContent: "space-between" }}
    >
      <SearchInput
        placeholder="ابحث عن دورة تدريبية, موضوع, معلم."
        className="mb-3 col-12 col-md-6 col-lg-3"
      />

      <SelectInput
        name="category_id"
        control={control}
        placeholder="التصنيف"
        required
        options={categories}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        label=""
        defaultValue={category}
        onChange={onCategoryChange}
        className="mb-3 col-12 col-md-6 col-lg-3 !max-w-[197px]"
        isClearable
      />
      <SelectInput
        name="category_id"
        control={control}
        placeholder="التصنيف"
        required
        options={categories}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        label=""
        defaultValue={category}
        className="mb-3 col-12 col-md-6 col-lg-3 !max-w-[197px]"
        isClearable
      />

      <ReactDatePicker
        placeholder="التاريخ"
        className="mb-3 col-12 col-md-6 col-lg-3 !max-w-[197px]"
        onChange={onStartDateChange}
        selected={startDate}
        dateFormat="YYYY-MM-DD"
      />
    </div>
  );
}
