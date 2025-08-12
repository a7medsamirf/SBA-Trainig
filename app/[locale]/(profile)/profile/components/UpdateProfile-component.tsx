"use client";

import { AgeCategory, Gender, Nationality } from "@/models";
import ProfileFormComponent from "./ProfileForm-component";
import { useUpdateProfile } from "../hooks/update-profile.hook";
import { useState } from "react";
import { useTranslations } from "next-intl";

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
  user: initialUser, 
}: ProfileFormProps) {
  const [user, setUser] = useState(initialUser); 
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => setIsEdit((prev) => !prev);
  const handleCancel = () => setIsEdit(false);

  const t = useTranslations("trans.profile");
  
  const { 
    control, 
    handleSubmit, 
    isPending, 
    onSubmit, 
    errors,
    selectedFile,
    setSelectedFile,
    handleCancelEdit,
    reset,
  } = useUpdateProfile(user, handleCancel);


  const handleCancelClick = () => {
    handleCancelEdit(); 
    setIsEdit(false);
  };

  return (
    <>
      <div className="p-4 bg-white border-0 card-header custom-border-radius">
        <div className="profile-content-item-header d-flex align-items-center justify-content-between">
          <h4 className="fw-bold color-gray-900">{t("profile-title")}</h4>
          <div className="gap-2 d-flex align-items-center">
            {isEdit && (
              <button
                className="btn btn-danger"
                type="button"
                onClick={handleCancelClick}
                disabled={isPending}
              >
                {t("update.cancel")}
              </button>
            )}
            
            {isEdit && (
              <button
                form="update-profile"
                className="btn btn-primary"
                type="submit"
                disabled={isPending}
              >
                {isPending && (
                  <span
                    className="ms-2 spinner-border text-light spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                {t("update.save")}
              </button>
            )}

            {!isEdit && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleEdit}
                disabled={isPending}
              >
                {t("update.edit")}
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
            user={user}
            errors={errors}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </div>
      </div>
    </>
  );
}