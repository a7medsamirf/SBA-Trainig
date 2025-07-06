"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { SelectInput } from "@/components/select-input/select-input.component";
import { Gender } from "@/models/Register/genders.model";

interface GendersComponentsProps {
  genders: Gender[];
}

export const GendersComponents = ({ genders }: GendersComponentsProps) => {
  const { control } = useForm();
  
  const options = genders.map((item) => ({
    label: item.name,
    value: String(item.id),
  }));

  return (
    <>
      <div className="form-floating">
        <SelectInput
          name="gender"
          control={control}
          placeholder=" " 
          required
          options={options}
          label=""
        />
        <label htmlFor="gender">الجنس</label>
      </div>
    </>
  );
};
