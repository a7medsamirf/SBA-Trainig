"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from 'react-hot-toast';
import Form from "react-bootstrap/Form";
import { SelectInput } from "@/components";
import { LanguageLevel, EducationDegree } from "@/models";
import { updateQualificationsApi } from "@/server-actions";

interface QualificationsFormProps {
  languageLevels: LanguageLevel[];
  educationDegrees: EducationDegree[];
}

interface QualificationsFormData {
  language_level?: number;
  educational_experience?: string;
  educational_degree?: number;
}

const QualificationsFormComponent = ({ languageLevels, educationDegrees }: QualificationsFormProps) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEdit, setIsEdit] = useState(false); 

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<QualificationsFormData>({
    defaultValues: {
      language_level: undefined,
      educational_experience: "",
      educational_degree: undefined,
    },
  });

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const user = session.user as any;
      reset({
        language_level: user.language_level?.id,
        educational_experience: user.educational_experience || "",
        educational_degree: user.educational_degree?.id,
      });
      setLoading(false);
    }
  }, [session, status, reset]);

  const onSubmit = async (data: QualificationsFormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await updateQualificationsApi(data);

      if (res?.succeeded || res?.status === 200) {
        toast.success("✅ تم تحديث المؤهلات العلمية بنجاح");
        setIsEdit(false); // ✅ إغلاق وضع التعديل بعد الحفظ
      } else {
        toast.error(`❌ ${res?.message || "حاول مرة أخرى"}`);
      }
    } catch (error) {
      toast.error("❌ حدث خطأ أثناء الاتصال بالسيرفر");
      console.error("Update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">جاري التحميل...</span>
        </div>
        <p className="mt-2">جاري تحميل البيانات...</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 bg-white border-0 card-header custom-border-radius">
        <div className="profile-content-item-header d-flex align-items-center justify-content-between">
          <h4 className="fw-bold color-gray-900">مؤهلاتي العلمية</h4>
          <div className="gap-2 d-flex align-items-center">
            {isEdit ? (
              <>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    // إرجاع القيم الأصلية وإلغاء التعديل
                    const user = session?.user as any;
                    reset({
                      language_level: user.language_level?.id,
                      educational_experience: user.educational_experience || "",
                      educational_degree: user.educational_degree?.id,
                    });
                    setIsEdit(false);
                  }}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  form="qualifications-form"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                  )}
                  حفظ البيانات
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => setIsEdit(true)}
              >
                تعديل البيانات
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
                  placeholder="اختر مستوى اللغة الإنجليزية"
                  required
                  disabled={!isEdit} 
                  options={languageLevels}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.id}
                  label=""
                  rules={{ required: "مستوى اللغة الإنجليزية مطلوب" }}
                />
                <label htmlFor="language_level">مستوى اللغة الإنجليزية</label>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-floating">
                <SelectInput
                  name="educational_degree"
                  control={control}
                  placeholder="اختر الدرجة العلمية"
                  required
                  disabled={!isEdit}
                  options={educationDegrees}
                  getOptionLabel={(option: any) => option.name}
                  getOptionValue={(option: any) => option.id}
                  label=""
                  rules={{ required: "الدرجة العلمية مطلوبة" }}
                />
                <label htmlFor="educational_degree">الدرجة العلمية</label>
              </div>
            </div>

            <div className="col-12">
              <div className="form-floating">
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="الخبرات العلمية"
                  {...register("educational_experience", {
                    required: "الخبرات العلمية مطلوبة",
                    minLength: {
                      value: 10,
                      message: "الخبرات العلمية يجب أن تكون أكثر من 10 أحرف"
                    }
                  })}
                  style={{ textAlign: "right" }}
                  disabled={!isEdit}
                />
                <label htmlFor="educational_experience">الخبرات العلمية</label>
                {errors.educational_experience && (
                  <div className="text-danger mt-1 small">
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
