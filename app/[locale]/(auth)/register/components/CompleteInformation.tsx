"use client";

import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SelectInput } from "@/components";
import { LanguageLevel, EducationDegree } from "@/models";
import { useCompleteProfile } from "../hooks/complete-informatio.hook";
import { useRouter , Link } from "@/i18n/routing";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

interface CompleteInformationProps {
  educationdegree: EducationDegree[];
  languagelevel: LanguageLevel[];
  onConfirm: () => void;
  slug?: string;
  firstStepData?: any;
}

const CompleteInformation = ({
  educationdegree,
  languagelevel,
  onConfirm,
  slug,
  firstStepData,
}: CompleteInformationProps) => {
  const router = useRouter();
  
  const {
    control,
    register,
    handleSubmit,
    completeProfileHandler,
    isPending,
    reset,
    isValid,
    handleSkip, //  استقبال handleSkip
  } = useCompleteProfile(undefined, onConfirm, slug, firstStepData);

  const handleConfirm = handleSubmit(completeProfileHandler);

  //  تعديل handleSkip ليقوم بحفظ البيانات أولاً
  const handleSkipClick = () => {
    // 👈 حفظ البيانات مع قيم افتراضية
    handleSkip();
  };
  const t = useTranslations("trans.completeProfile");
  return (
    <>
      <Form onSubmit={handleConfirm}>
        <div className="mb-3">
          <div className="form-floating">
            <SelectInput
              name="language_level"
              control={control}
              placeholder=" "
              required
              options={languagelevel}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              label=""
            />
             <label htmlFor="language_level">{t("language-level")}</label>
          </div>
        </div>

        <div className="mb-3 form-floating">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder={t("educational-experience")}
            {...register("educational_experience", { required: true })}
            style={{ textAlign: "right", height: "150px" }}
          />
        <label htmlFor="educational_experience">{t("educational-experience")}</label>
        </div>

        <div className="mb-3">
          <div className="form-floating">
            <SelectInput
              name="educational_degree"
              control={control}
              placeholder=" "
              required
              options={educationdegree}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              label=""
            />
           <label htmlFor="educational_degree">{t("educational-degree")}</label>
          </div>
        </div>

        <div className="d-flex justify-content-between gap-2 mb-50 mt-50">
          <div>
            <Button
              className="px-5"
              type="button"
              variant="secondary"
              onClick={onConfirm}
              disabled={isPending}
            >
                   {t("back")}
            </Button>
          </div>
          <div className="d-flex gap-2">
            <Button
              className="px-5"
              type="button"
              variant="outline-primary"
              onClick={handleSkipClick} //  استخدام handleSkipClick
              disabled={isPending}
            >
                 {t("skip")}
            </Button>
            <Button
              className="px-5"
              type="submit"
              variant="primary"
              onClick={handleConfirm}
              disabled={isPending || !isValid}
            >
              {isPending ? t("registering") : t("register")}
            </Button>
          </div>
        </div>
        <div className="text-center">
        <span>{t("already-have-account")}</span>
          <Link href="/login" className="text-success fw-bold">
          {t("log-in")}
          </Link>
        </div>
      </Form>
    </>
  );
};

export default CompleteInformation;