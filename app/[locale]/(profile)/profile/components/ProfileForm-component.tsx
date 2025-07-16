"use client";

import { Control, UseFormHandleSubmit } from "react-hook-form";
import Image from "next/image";
import { Input } from "@/components/input/input.component";
import Form from "react-bootstrap/Form";
import { Gender, Nationality, AgeCategory } from "@/models";
import { SelectInput } from "@/components";

interface ProfileFormProps {
  nationalities: Nationality[];
  genders: Gender[];
  ageCategories: AgeCategory[];
  control: Control<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (data: any) => Promise<void>;
  isPending: boolean;
  isEdit: boolean;
}

const ProfileFormComponent = ({
  nationalities,
  genders,
  ageCategories,
  control,
  handleSubmit,
  onSubmit,
  isPending,
  isEdit,
}: ProfileFormProps) => {
  if (isPending) {
    return (
      <div className="py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">جاري التحميل...</span>
        </div>
        <p className="mt-2">جاري تحميل البيانات...</p>
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} id="update-profile">
      <div className="mb-4 text-center">
        <Image
          src="/images/trainers/trainer01.png"
          alt="Profile"
          width={90}
          height={90}
          className="border rounded-circle"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <Input
            label="البريد الإلكتروني"
            name="email"
            control={control}
            placeholder="البريد الإلكتروني"
            type="email"
            disabled={!isEdit}
            rules={{
              required: "البريد الإلكتروني مطلوب",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "البريد الإلكتروني غير صحيح",
              },
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <Input
            label="رقم الجوال"
            name="phone"
            control={control}
            placeholder="رقم الجوال"
            type="tel"
            disabled={!isEdit}
            rules={{
              required: "رقم الجوال مطلوب",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "رقم الجوال يجب أن يكون 10 أرقام",
              },
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <Input
            label="الاسم كامل بالعربية"
            name="name"
            control={control}
            placeholder="الاسم كامل بالعربية"
            disabled={!isEdit}
            rules={{
              required: "الاسم مطلوب",
              minLength: {
                value: 2,
                message: "الاسم يجب أن يكون أكثر من حرفين",
              },
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <Input
            label="الاسم كامل بالإنجليزية"
            name="english_name"
            control={control}
            placeholder="الاسم كامل بالإنجليزية"
            disabled={!isEdit}
            rules={{
              required: "الاسم مطلوب",
              minLength: {
                value: 2,
                message: "الاسم يجب أن يكون أكثر من حرفين",
              },
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <Input
            label="الهوية الوطنية"
            name="national_id"
            control={control}
            placeholder="الهوية الوطنية"
            disabled={!isEdit}
            rules={{
              required: "الهوية الوطنية مطلوبة",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "الهوية الوطنية يجب أن تكون 10 أرقام",
              },
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <div className="form-floating">
            <SelectInput
              name="nationality_id"
              control={control}
              placeholder="اختر الجنسية"
              required
              disabled={!isEdit}
              options={nationalities}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              label=""
              rules={{ required: "الجنسية مطلوبة" }}
            />
            <label htmlFor="nationality">الجنسية</label>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="form-floating">
            <SelectInput
              name="gender"
              control={control}
              placeholder="اختر الجنس"
              required
              disabled={!isEdit}
              options={genders}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              label=""
              rules={{ required: "الجنس مطلوب" }}
            />
            <label htmlFor="gender">الجنس</label>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="form-floating">
            <SelectInput
              name="age_category_id"
              control={control}
              placeholder="اختر الفئة العمرية"
              required
              disabled={!isEdit}
              options={ageCategories}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              label=""
              rules={{ required: "الفئة العمرية مطلوبة" }}
            />
            <label htmlFor="age_category_id">الفئة العمرية</label>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default ProfileFormComponent;
