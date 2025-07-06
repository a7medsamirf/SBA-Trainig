"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { SelectInput } from "@/components/select-input/select-input.component";
import { AgeCategory } from "@/models/Register/age-categories.model";

interface AgeCategoriesComponentsProps {
    agectegories: AgeCategory[];
}

export const AgeCategoriesComponents = ({ agectegories }: AgeCategoriesComponentsProps) => {
  const { control } = useForm();
  
  const options = agectegories.map((item) => ({
    label: item.name,
    value: String(item.id),
  }));

  return (
    <>
      <div className="form-floating">
        <SelectInput
          name="agectegories"
          control={control}
          placeholder=" " 
          required
          options={options}
          label=""
        />
        <label htmlFor="agectegories">الفئة العمرية</label>
      </div>
    </>
  );
};
