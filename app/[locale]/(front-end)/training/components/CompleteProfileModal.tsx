"use client";

import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SelectInput } from "@/components";
import { LanguageLevel, EducationDegree } from "@/models";
import { useCompleteProfile } from "./hooks/complete-profile.hook";

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
  } = useCompleteProfile(onHide,onConfirm, slug);

  const handleConfirm = handleSubmit(completeProfileHandler);

  const handleClose = () => {
    reset();
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">أكمل بياناتك</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 text-end">
          <div className="mb-1 fw-bold">برجاء إكمال بيانات ملفك الشخصي</div>
          <div className="text-muted" style={{ fontSize: "0.95rem" }}>
            للتسجيل في ورشة العمل الرجاء إدخال هذه البيانات
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
              <label htmlFor="language_level">مستوى اللغة الإنجليزية</label>
            </div>
          </div>

          <div className="mb-3 form-floating">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="الخبرات العلمية"
              {...register("educational_experience", { required: true })}
              style={{ textAlign: "right" }}
            />
            <label htmlFor="educational_experience">الخبرات العلمية</label>
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
              <label htmlFor="educational_degree">الدرجة العلمية</label>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isPending}>
          إلغاء
        </Button>
        <Button
          type="submit"
          variant="primary"
          onClick={handleConfirm}
          disabled={isPending || !isValid}
        >
          {isPending ? "... جارٍ التأكيد" : "تأكيد"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompleteProfileModal;
