"use client";
import { useState } from "react";
import Image from "next/image";
import "../register.scss";
import { Link } from "@/i18n/routing";
import SvgEye from "@/components/icons/svg/eye";
import SvgEyeSlash from "@/components/icons/svg/eye-slash";
import { Form } from "react-bootstrap";
import { Checkbox } from "@/components/checkbox/checkbox.component";
import { useTranslations } from "next-intl";
import { Gender, Nationality, AgeCategory, LanguageLevel, EducationDegree } from "@/models";
import { SelectInput } from "@/components";
import { useRegister } from "../hooks/use-register.hook";
import CompleteInformation from "./CompleteInformation";


interface RegisterFormProps {
  nationalities: Nationality[];
  genders: Gender[];
  agectegories: AgeCategory[];
  educationDegrees: EducationDegree[];
  languageLevels: LanguageLevel[];
}

const RegisterForm = ({
  nationalities,
  genders,
  agectegories,
  languageLevels,
  educationDegrees,
}: RegisterFormProps) => {
  const {
    watch,
    control,
    handleSubmit,
    register,
    showPassword,
    isPending,
    onSubmit,
    agreeTerms,
    agreePrivacy,
    setShowPassword,
    showPasswordConfirmation,
    setshowPasswordConfirmation,
    errors,
  } = useRegister();

  const selectedDialCode = watch("dial_code"); 
  const [step, setStep] = useState<1 | 2>(1);
  const [isFirstStepCompleted, setIsFirstStepCompleted] = useState(false);

  // معالج إرسال النموذج الأول
  const handleFirstStepSubmit = async (data: any) => {
    try {
      await onSubmit(data);
      setIsFirstStepCompleted(true);
      setStep(2);
    } catch (error) {
      // سيتم التعامل مع الخطأ في useRegister hook
    }
  };

  // معالج العودة للخطوة الأولى
  const handleBackToFirstStep = () => {
    setStep(1);
  };

  const t = useTranslations('trans');

  return (
    <div className="login-container">
      <div className="row g-0 min-vh-100">
        {/* Right: Form */}
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
          {step === 1 && (
            <div className="p-4 login-form-box w-100 p-md-5">
              <div className="mb-4 text-center">
                <Image
                  src={`/images/logo_ar.png`}
                  alt="logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "50%", height: "auto" }}
                  className="w-50"
                />
              </div>
              <div className="mb-30">
              <h5 className="mb-2 fw-bold">{t('auth.registerForm.create-account')}</h5>
                <p className="mb-4 text-muted">{t('auth.registerForm.enter-details')}</p>

              </div>
              <Form onSubmit={handleSubmit(handleFirstStepSubmit)} autoComplete="off">
                <div className="mb-3 form-floating">
                  <input
                    {...register("name", {
                      required: "الاسم مطلوب",
                      minLength: {
                        value: 3,
                        message: "يجب أن يكون الاسم 3 أحرف على الأقل",
                      },
                    })}
                    type="text"
                    className={`form-control ${
                      errors.name ? "border-danger" : ""
                    }`}
                    id="name"
                    placeholder={t('auth.registerForm.full-name-ar')}
                  />
                 <label>{t('auth.registerForm.full-name-ar')}</label>
                  {errors.name && (
                    <p className="my-2 text-danger">
                      {errors.name.message as string}
                    </p>
                  )}
                </div>
                <div className="mb-3 form-floating">
                  <input
                    {...register("english_name", {
                      required: "الاسم الانجليزي مطلوب",
                      minLength: {
                        value: 3,
                        message: "يجب أن يكون الاسم الانجليزي 3 أحرف على الأقل",
                      },
                    })}
                    type="text"
                    className={`form-control ${
                      errors.english_name ? "border-danger" : ""
                    }`}
                    id="english_name"
                    placeholder={t('auth.registerForm.full-name-en')}
                  />
                  <label>{t('auth.registerForm.full-name-en')}</label>
                  {errors.english_name && (
                    <p className="my-2 text-danger">
                      {errors.english_name.message as string}
                    </p>
                  )}
                </div>
                <div className="mb-3 form-floating">
                  <input
                    {...register("national_id", {
                      required: "رقم الهوية مطلوب",
                      minLength: {
                        value: 10,
                        message: "يجب أن يكون رقم الهوية 10 أرقام على الأقل",
                      },
                      maxLength: {
                        value: 15,
                        message: "يجب ألا يزيد رقم الهوية عن 15 رقم",
                      },
                      pattern: {
                        value: /^[1234][0-9]{9,14}$/,
                        message: "يجب أن يبدأ رقم الهوية بـ 1 أو 2 او 3 او 4 ويحتوي فقط على أرقام",

                      },
                    })}
                    type="number"
                    inputMode="numeric"
                    pattern="^[1234][0-9]{9,14}$"
                    className={`form-control ${
                      errors.national_id ? "border-danger" : ""
                    }`}
                    id="national_id"
                    placeholder={t('auth.registerForm.national-id')}
                  />
                 <label>{t('auth.registerForm.national-id')}</label>
                  {errors.national_id && (
                    <p className="my-2 text-danger">
                      {errors.national_id.message as string}
                    </p>
                  )}
                </div>

                <div className="mb-3 d-flex gap-2">
                  <div className="form-floating position-relative w-75">
                    <input
                      {...register("phone", {
                        required: "رقم الجوال مطلوب",
                        validate: (value) => {
                          if (selectedDialCode === "+966") {
                            // للرقم السعودي: يجب أن يكون 9 أرقام ويبدأ بـ 5
                            if (value.length !== 9) {
                              return "يجب أن يكون رقم الجوال 9 أرقام";
                            }
                            return /^5\d{8}$/.test(value) || "رقم سعودي غير صحيح: يجب أن يبدأ بـ 5 ويتكون من 9 أرقام";
                          }
                          // لباقي الدول: لا توجد قيود على الطول
                          return true;
                        },
                      })}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className={`form-control ${errors.phone ? "border-danger" : ""}`}
                      id="number"
                      placeholder={t('auth.registerForm.phone')}
                    />
                   <label>{t('auth.registerForm.phone')}</label>
                  </div>

                  <div className="w-25 nationalities-code">
                      <SelectInput
                        name="dial_code"
                        control={control}
                        placeholder={t('auth.registerForm.country-code')}
                        required
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

                  {errors.phone && (
                    <p className="my-2 text-danger">
                      {errors.phone.message as string}
                    </p>
                  )}
                </div>

                <div className="mb-3 form-floating">
                  <input
                    {...register("email", {
                      required: "البريد الإلكتروني مطلوب",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "يجب أن يكون البريد الإلكتروني صالح",
                      },
                    })}
                    type="email"
                    className={`form-control ${
                      errors.email ? "border-danger" : ""
                    }`}
                    id="email"
                    placeholder={t('auth.registerForm.email')}
                  />
                <label>{t('auth.registerForm.email')}</label>
                  {errors.email && (
                    <p className="my-2 text-danger">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <div className="form-floating">
                    <SelectInput
                      name="nationality_id"
                      control={control}
                      placeholder=" "
                      required
                      options={nationalities}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.id}
                      label=""
                    />
                       <label htmlFor="nationality">{t('auth.registerForm.nationality')}</label>
                  </div>
                  {/* <NationalitiesComponents nationalities={nationalities} /> */}
                </div>
                <div className="mb-3">
                  <>
                    <div className="form-floating">
                      <SelectInput
                        name="gender"
                        control={control}
                        placeholder=" "
                        required
                        options={genders}
                        getOptionLabel={(option: any) => option.name}
                        getOptionValue={(option: any) => option.id}
                        label=""
                      />
                 <label htmlFor="gender">{t('auth.registerForm.gender')}</label>
                    </div>
                  </>
                  {/* <GendersComponents genders={genders} /> */}
                </div>

                <div className="mb-3">
                  <div className="form-floating">
                    <SelectInput
                      name="age_category_id"
                      control={control}
                      placeholder=" "
                      required
                      options={agectegories}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.id}
                      label=""
                    />
                   <label htmlFor="age_category_id">{t('auth.registerForm.age-category')}</label>
                  </div>
                  {/* <AgeCategoriesComponents agectegories={agectegories} /> */}
                </div>

                <div className="mb-3">
                  <div className="form-floating position-relative">
                    <input
                      {...register("password", {
                        required: "كلمة السر مطلوبة",
                        minLength: {
                          value: 8,
                          message: "يجب أن يكون كلمة السر 8 أحرف على الأقل",
                        },
                        pattern: {
                          value: /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                          message:
                            "يجب أن تحتوي كلمة السر على رقم ورمز خاص على الأقل",
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${
                        errors.password ? "border-danger" : ""
                      }`}
                      id="password"
                      placeholder={t('auth.registerForm.password')}
                      autoComplete="new-password"
                    />
            <label>{t('auth.registerForm.password')}</label>
                    <span
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <SvgEyeSlash color="#425A8B" width={30} />
                      ) : (
                        <SvgEye color="#425A8B" width={30} />
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="my-2 text-danger">
                      {errors.password.message as string}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <div className="form-floating position-relative">
                    <input
                      {...register("password_confirmation", {
                        required: "تأكيد كلمة السر مطلوب",
                        minLength: {
                          value: 8,
                          message: "يجب أن يكون كلمة السر 8 أحرف على الأقل",
                        },
                        pattern: {
                          value: /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                          message:
                            "يجب أن تحتوي كلمة السر على رقم ورمز خاص على الأقل",
                        },
                      })}
                      type={showPasswordConfirmation ? "text" : "password"}
                      className={`form-control ${
                        errors.password_confirmation ? "border-danger" : ""
                      }`}
                      id="password"
                      placeholder={t('auth.registerForm.confirm-password')}
                      autoComplete="new-password"
                    />
                     <label>{t('auth.registerForm.confirm-password')}</label>
                    <span
                      className="toggle-password"
                      onClick={() =>
                        setshowPasswordConfirmation(!showPasswordConfirmation)
                      }
                    >
                      {showPasswordConfirmation ? (
                        <SvgEyeSlash color="#425A8B" width={30} />
                      ) : (
                        <SvgEye color="#425A8B" width={30} />
                      )}
                    </span>
                  </div>
                  {errors.password_confirmation && (
                    <p className="my-2 text-danger">
                      {errors.password_confirmation.message as string}
                    </p>
                  )}
                </div>

                <div className="gap-2 mb-3 d-flex flex-column align-items-end">
                  <div className="w-100 d-flex align-items-center justify-content-end">
                    <Checkbox
                      {...register("agreeTerms", {
                        required: "يجب أن توافق على الشروط والأحكام",
                      })}
                      id="agreeTerms"
                      label={
                        <span className="color-gray-900">
                          {t("auth.registerForm.agree-terms")}
                          <Link href="/terms" target="_blank" className="text-success fw-bold text-decoration-underline"> 
                          {t("auth.registerForm.terms-conditions")}
                          </Link>

                          {t("auth.registerForm.of-app")}
                        </span>
                      }
                    />
                  </div>
                  <div className="w-100 d-flex align-items-center justify-content-end">
                    <Checkbox
                      id="agreePrivacy"
                      {...register("agreePrivacy", {
                        required: "يجب أن توافق على سياسة إشعار الخصوصية",
                      })}
                      label={
                        <span className="color-gray-900">
                         {t("auth.registerForm.agree-terms")}
                          <Link href="/Privacy" target="_blank" className="text-success fw-bold text-decoration-underline"> 
                          {t("auth.registerForm.privacy-policy")}
                          </Link>{" "}

                          {t("auth.registerForm.of-app")}
                        </span>
                      }
                    />
                  </div>
                </div>
                <div className="mt-60">
                  <button
                    type="submit"
                    className="mb-3 btn btn-primary w-100"
                    disabled={isPending || !agreeTerms || !agreePrivacy}
                  >
                {isPending ? t("auth.registerForm.saving") : t("auth.registerForm.next-step")}
                    
                  </button>
                  <Link href="/" className="mb-3 btn btn-outline-primary w-100">
                  {t("auth.registerForm.guest-login")}
                  </Link>

                </div>

                <div className="text-center">
                  <span>  {t("auth.registerForm.have-account")} </span>
                  <Link href="/login" className="text-success fw-bold">
                  {t("auth.registerForm.login")}
                  </Link>
                </div>
              </Form>
            </div>
          )}
          {step === 2 && (
            <div className="p-4 login-form-box CompleteInformation w-100 p-md-5">
                     <div className="mb-4 text-center">
                        <Image
                          src={`/images/logo_ar.png`}
                          alt="logo"
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "50%", height: "auto" }}
                          className="w-50"
                        />
                      </div>
                      <div className="mb-30">
                        <h5 className="mb-2 fw-bold">  {t('auth.registerForm.complete-profile')}  </h5>
                        <p className="mb-4 text-muted">  {t('auth.registerForm.workshop-registration')} </p>
                      </div>

                      <CompleteInformation 
                          educationdegree={educationDegrees}
                          languagelevel={languageLevels}
                          onConfirm={handleBackToFirstStep} 
                          firstStepData={watch()}
                      />
              
              </div>      
                )}
        </div>
        {/* Left: Image & Text */}
        <div className="col-lg-6 d-none d-lg-block position-relative">
          <Image
            src="/images/login-bg.svg"
            alt="login"
            fill
            className="login-bg"
            style={{ objectFit: "cover" }}
            priority
          />
          <div className="top-0 text-center text-white login-overlay position-absolute start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center">
          <h2 className="fw-bold mb-3 w-75">   {t('loginSetting.title')} </h2>
          <p className="lead">{t('loginSetting.description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;