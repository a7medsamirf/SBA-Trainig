"use client";

import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SelectInput } from "@/components";
import { LanguageLevel, EducationDegree } from "@/models";
import { useCompleteProfile } from "./hooks/complete-profile.hook";
import { useTranslations } from "next-intl";

interface CompleteProfileModalProps {
  educationdegree: EducationDegree[];
  languagelevel: LanguageLevel[];
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  slug?: string;
}

const CompleteProfileModal = ({
  educationdegree,
  languagelevel,
  show,
  onHide,
  onConfirm,
  slug,
}: CompleteProfileModalProps) => {
  const {
    control,
    register,
    handleSubmit,
    completeProfileHandler,
    isPending,
    reset,
    isValid,
  } = useCompleteProfile(onHide, onConfirm, slug);

  const handleConfirm = handleSubmit(completeProfileHandler);

  const handleClose = () => {
    reset();
    onHide();
  };
  const t = useTranslations("trans");
  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">  {t('completeProfile.Complete-information')} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <div className="mb-1 fw-bold">    {t('auth.registerForm.complete-profile')} </div>
          <div className="text-muted" style={{ fontSize: "0.95rem" }}>
          {t('auth.registerForm.workshop-registration')}
          </div>
        </div>
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
              <label htmlFor="language_level">  {t("completeProfile.language-level")}</label>
            </div>
          </div>

          <div className="mb-3 form-floating">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder= {t("completeProfile.educational-experience")}
              {...register("educational_experience", { required: true })}
              style={{ textAlign: "right", height: "150px" }}
            />
            <label htmlFor="educational_experience">{t("completeProfile.educational-experience")} </label>
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
              <label htmlFor="educational_degree"> {t("completeProfile.educational-degree")}</label>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isPending}>
        {t("completeProfile.btn_Cancel")}
        </Button>
        <Button
          type="submit"
          variant="primary"
          onClick={handleConfirm}
          disabled={isPending || !isValid}
        >
         {isPending ? t("completeProfile.registering") : t("completeProfile.register")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompleteProfileModal;
