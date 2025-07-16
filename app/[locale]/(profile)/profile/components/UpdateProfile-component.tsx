"use client";

import { AgeCategory, Gender, Nationality } from "@/models";
import ProfileFormComponent from "./ProfileForm-component";
import { useUpdateProfile } from "../hooks/update-profile.hook";
import { useState } from "react";

interface ProfileFormProps {
  nationalities: Nationality[];
  genders: Gender[];
  ageCategories: AgeCategory[];
  user: any;
}

export default function UpdateProfile({
  nationalities,
  genders,
  ageCategories,
  user,
}: ProfileFormProps) {
  const { control, handleSubmit, isPending, onSubmit } = useUpdateProfile(user);

  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => setIsEdit((prev) => !prev);

  return (
    <>
      <div className="p-4 bg-white border-0 card-header custom-border-radius">
        <div className="profile-content-item-header d-flex align-items-center justify-content-between">
          <h4 className="fw-bold color-gray-900">الملف الشخصي </h4>
          <div className="gap-2 d-flex align-items-center">
            {isEdit && (
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={handleEdit}
              >
                الغاء
              </button>
            )}
            {isEdit && (
              <button
                form="update-profile"
                className="btn btn-primary"
                type="submit"
              >
                {isPending && (
                  <span
                    className="ms-2 spinner-border text-light spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                حفظ البيانات
              </button>
            )}

            {!isEdit && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleEdit}
              >
                تعديل البيانات
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 card-body">
        <div className="profile-content-item">
          <ProfileFormComponent
            nationalities={nationalities}
            ageCategories={ageCategories}
            handleSubmit={handleSubmit}
            isPending={isPending}
            onSubmit={onSubmit}
            genders={genders}
            control={control}
            isEdit={isEdit}
          />
        </div>
      </div>
    </>
  );
}
