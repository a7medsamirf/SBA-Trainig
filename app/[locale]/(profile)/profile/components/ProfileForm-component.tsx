"use client";
import "../../profile.scss";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import Image from "next/image";
import { Input } from "@/components/input/input.component";
import { Gender, Nationality, AgeCategory } from "@/models";
import { SelectInput } from "@/components";
import ChangePasswordModal from "./ChangePassword-modal";
import ChangeEmailModal from "./ChangeEmail-modal";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { useWatch } from "react-hook-form";
import { EnterOtpModal } from "./Otp-Modal";

interface ProfileFormProps {
  nationalities: Nationality[];
  genders: Gender[];
  ageCategories: AgeCategory[];
  control: Control<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: (data: any) => Promise<void>;
  isPending: boolean;
  isEdit: boolean;
  user: any;
  errors: FieldErrors<any>;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
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
  user,
  errors,
  selectedFile,
  setSelectedFile,
}: ProfileFormProps) => {


  const selectedDialCode = useWatch({
    control,
    name: "dial_code",
  });

  const t = useTranslations("trans.profile");
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleShowChangePasswordModal = () => setShowChangePasswordModal(true);
  const handleHideChangePasswordModal = () => setShowChangePasswordModal(false);

  const handleShowChangeEmailModal = () => setShowChangeEmailModal(true);
  const handleHideChangeEmailModal = () => setShowChangeEmailModal(false);
  
  const handleSendOtp = (data: { email: string }) => {
    setNewEmail(data.email);
    handleHideChangeEmailModal();
    setShowOtpModal(true);
  };
  
  const handleHideOtpModal = () => setShowOtpModal(false);
  
  const handleConfirmOtp = (data: { otpCode: string }) => {
    // سيتم التعامل مع هذا في هوك useConfirmOtp
  };
  
  const handleEmailChangeSuccess = () => {
    setShowOtpModal(false);
    // تحديث البيانات بعد تغيير البريد الإلكتروني
    // يمكن إضافة إعادة تحميل البيانات هنا إذا لزم الأمر
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error(t("form.profile-image.errors.invalid-type"));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t("form.profile-image.errors.large-size"));
        return;
      }
      
      setSelectedFile(file);
      
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      toast.success(t("form.profile-image.errors.success"));
    }
  };

  // تحديد الصورة المعروضة
  const currentImage = imagePreview || user?.avatar || "/images/trainers/trainer01.png";

  // تنظيف الذاكرة عند تغيير الصورة
  const resetImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isPending) {
    return (
      <div className="py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t("form.loading")}</span>
        </div>
        <p className="mt-2">{t("form.loading-data")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="update-profile">
      {/* قسم الصورة الشخصية */}
      <div className="mb-4 position-relative">
        <div className="img-box position-relative">
          <div>
            <Image
              src={currentImage}
              alt="Profile"
              width={100}
              height={100}
              priority
              className="profile-Image rounded-circle"
            />
          </div>
          <div>
            {/* زر تغيير الصورة - يظهر فقط في وضع التعديل */}
            {isEdit && (
              <>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="d-none"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn change-btn btn-outline-primary"
                  title={t("form.profile-image.change")}
                >
                  {t("form.profile-image.change")}
                </button>
              </>
            )}
          </div>
        </div>

        {isEdit && imagePreview && (
          <div className="mt-2">
            <button
              type="button"
              onClick={resetImage}
              className="btn btn-sm btn-outline-danger"
              style={{ fontSize: "12px" }}
            >
              {t("form.profile-image.cancel-change")}
            </button>
          </div>
        )}

        {isEdit && (
          <small className="text-muted d-block mt-2">
            {t("form.profile-image.accepted-formats")}
          </small>
        )}
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <Input
            label={t("form.fields.email.label")}
            name="email"
            control={control}
            placeholder={t("form.fields.email.placeholder")}
            type="email"
            disabled
            /* disabled={!isEdit} */
            rules={{
              required: t("form.fields.email.required"),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t("form.fields.email.invalid"),
              },
            }}
          />
        </div>

        <div className="col-12 col-md-6 d-flex gap-2">
          <div className="w-75">
            <Input
              label={t("form.fields.phone.label")}
              name="phone"
              control={control}
              placeholder={t("form.fields.phone.placeholder")}
              type="tel"
              disabled={!isEdit}
              rules={{
                required: t("form.fields.phone.required"),
                validate: (value: string) => {
                  if (selectedDialCode === "+966") {
                    // للرقم السعودي: يجب أن يكون 9 أرقام ويبدأ بـ 5
                    if (value.length !== 9) {
                      return "يجب أن يكون رقم الجوال 9 أرقام";
                    }
                    return (
                      /^5\d{8}$/.test(value) ||
                      "رقم سعودي غير صحيح: يجب أن يبدأ بـ 5 ويتكون من 9 أرقام"
                    );
                  }
                  // لباقي الدول: لا توجد قيود على الطول
                  return true;
                },
              }}
            />
          </div>
          <div className="w-25">
            <SelectInput
              name="dial_code"
              control={control}
              placeholder={t("form.fields.dial-code.placeholder")}
              disabled={!isEdit}
              options={nationalities}
              getOptionValue={(option: any) => `+${option.code}`}
              getOptionLabel={(option: any) => option.name}
              formatOptionLabel={(option: any, { context }) =>
                context === "value"
                  ? `${option.code} +`
                  : `${option.name} (${option.code} +)`
              }
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <Input
            label={t("form.fields.name.label")}
            name="name"
            control={control}
            placeholder={t("form.fields.name.placeholder")}
            disabled={!isEdit}
            rules={{
              required: t("form.fields.name.required"),
              minLength: {
                value: 2,
                message: t("form.fields.name.min-length"),
              },
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <Input
            label={t("form.fields.english-name.label")}
            name="english_name"
            control={control}
            placeholder={t("form.fields.english-name.placeholder")}
            disabled={!isEdit}
            rules={{
              required: t("form.fields.english-name.required"),
              minLength: {
                value: 2,
                message: t("form.fields.english-name.min-length"),
              },
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <Input
            label={t("form.fields.national-id.label")}
            name="national_id"
            control={control}
            placeholder={t("form.fields.national-id.placeholder")}
            disabled={!isEdit}
            rules={{
              required: t("form.fields.national-id.required"),
              pattern: {
                value: /^[1234][0-9]{9,14}$/,
                message: t("form.fields.national-id.invalid"),
              },
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <div className="form-floating">
            <SelectInput
              name="nationality_id"
              control={control}
              placeholder={t("form.fields.nationality.placeholder")}
              required
              disabled={!isEdit}
              options={nationalities}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              label=""
              rules={{ required: t("form.fields.nationality.required") }}
            />
            <label htmlFor="nationality">
              {t("form.fields.nationality.label")}
            </label>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="form-floating">
            <SelectInput
              name="gender"
              control={control}
              placeholder={t("form.fields.gender.placeholder")}
              required
              disabled={!isEdit}
              options={genders}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              label=""
              rules={{ required: t("form.fields.gender.required") }}
            />
            <label htmlFor="gender">{t("form.fields.gender.label")}</label>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="form-floating">
            <SelectInput
              name="age_category_id"
              control={control}
              placeholder={t("form.fields.age-category.placeholder")}
              required
              disabled={!isEdit}
              options={ageCategories}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              label=""
              rules={{ required: t("form.fields.age-category.required") }}
            />
            <label htmlFor="age_category_id">
              {t("form.fields.age-category.label")}
            </label>
          </div>
        </div>

        <div className="col-12 col-md-6 d-flex gap-3">
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={handleShowChangePasswordModal}
          >
            {t("form.fields.change-password.button")}
          </button>

     {/*      <button
            className="btn btn-outline-primary"
            type="button"
            onClick={handleShowChangeEmailModal}
          >
            تغير البريد الالكتروني
          </button> */}
        </div>
      </div>

      <ChangePasswordModal
        show={showChangePasswordModal}
        onHide={handleHideChangePasswordModal}
        user={user}
      />

{/*      <ChangeEmailModal
        show={showChangeEmailModal}
        onHide={handleHideChangeEmailModal}
        onSendOtp={handleSendOtp}
        isSendingOtp={false}
        errors={{}}
      /> */}

  {/*     <EnterOtpModal
        show={showOtpModal}
        onHide={handleHideOtpModal}
      /> */}
    </form>
  );
};

export default ProfileFormComponent;