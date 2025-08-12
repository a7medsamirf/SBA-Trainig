"use client";

import React from "react";
import { Form } from "react-bootstrap";
import { SelectInput } from "@/components";
import { LanguageLevel, EducationDegree } from "@/models";
import { useUpdateQualifications } from "../hooks/update-qualifications.hook";
import { useTranslations } from "next-intl";

interface QualificationsFormProps {
  languageLevels: LanguageLevel[];
  educationDegrees: EducationDegree[];
  user: any;
}

const QualificationsFormComponent = ({
  languageLevels,
  educationDegrees,
  user,
}: QualificationsFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    onSubmit,
    handleCancel,
    isEdit,
    setIsEdit,
    isSubmitting,
    errors,
  } = useUpdateQualifications(user);
  
  const t = useTranslations("trans.profile");

  return (
    <>
      <div className="p-4 bg-white border-0 card-header custom-border-radius">
        <div className="profile-content-item-header d-flex align-items-center justify-content-between">
          <h4 className="fw-bold color-gray-900">{t("qualifications-title")}</h4>
          <div className="gap-2 d-flex align-items-center">
            {isEdit ? (
              <>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleCancel}
                >
                  {t("update.cancel")}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  form="qualifications-form"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                  )}
                  {t("update.save")}
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => setIsEdit(true)}
              >
                {t("update.edit")}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 card-body">
        <Form id="qualifications-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <SelectInput
                  name="language_level"
                  control={control}
                  placeholder={t("form.fields.language-level.placeholder")}
                  required
                  disabled={!isEdit}
                  options={languageLevels}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.id}
                  label=""
                  rules={{ required: t("form.fields.language-level.required") }}
                />
                <label htmlFor="language_level">{t("form.fields.language-level.label")}</label>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-floating">
                <SelectInput
                  name="educational_degree"
                  control={control}
                  placeholder={t("form.fields.education-degree.placeholder")}
                  required
                  disabled={!isEdit}
                  options={educationDegrees}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.id}
                  label=""
                  rules={{ required: t("form.fields.education-degree.required") }}
                />
                <label htmlFor="educational_degree">{t("form.fields.education-degree.label")}</label>
              </div>
            </div>

            <div className="col-12">
              <div className="form-floating">
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder={t("form.fields.educational-experience.placeholder")}
                  {...register("educational_experience", {
                    required: t("form.fields.educational-experience.required"),
                    minLength: {
                      value: 10,
                      message: t("form.fields.educational-experience.min-length"),
                    },
                  })}
                  disabled={!isEdit}
                />
                <label htmlFor="educational_experience">{t("form.fields.educational-experience.label")}</label>
                {errors.educational_experience && (
                  <div className="mt-1 text-danger small">
                    {errors.educational_experience.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default QualificationsFormComponent;
