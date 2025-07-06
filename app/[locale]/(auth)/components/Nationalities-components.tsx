"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { SelectInput } from "@/components/select-input/select-input.component";
import { Nationality } from "@/models/Register/nationalities.model";


interface NationalitiesComponentsProps {
  nationalities: Nationality[];
}

export const NationalitiesComponents = ({ nationalities }: NationalitiesComponentsProps) => {
  const { control } = useForm();
  
  const options = nationalities.map((item) => ({
    label: item.name,
    value: String(item.id),
  }));

  return (
            <>
                <div className="form-floating">
                    <SelectInput
                        name="nationality"
                        control={control}
                        placeholder=" " 
                        required
                        options={options}
                        label="" 
                    />
                        <label htmlFor="nationality">الجنسية</label>
                </div>

         </>
  );
};
