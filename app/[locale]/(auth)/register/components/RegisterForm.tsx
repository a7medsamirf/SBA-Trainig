"use client";

import Image from "next/image";
import "../register.scss";
import { Link } from "@/i18n/routing";
import SvgEye from "@/components/icons/svg/eye";
import SvgEyeSlash from "@/components/icons/svg/eye-slash";
import { Form } from "react-bootstrap";
import { Checkbox } from "@/components/checkbox/checkbox.component";

import { Gender, Nationality, AgeCategory } from "@/models";
import { SelectInput } from "@/components";
import { useRegister } from "../hooks/use-register.hook";

interface RegisterFormProps {
  nationalities: Nationality[];
  genders: Gender[];
  agectegories: AgeCategory[];
}

const RegisterForm = ({ nationalities,  genders, agectegories,}: RegisterFormProps) => {
  const {
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
    setshowPasswordConfirmation
  } = useRegister();

  return (
    <div className="login-container">
      <div className="row g-0 min-vh-100">
        {/* Right: Form */}
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
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
              <h5 className="mb-2 fw-bold"> انشاء حساب جديد </h5>
              <p className="mb-4 text-muted">سجل بيانات التسجيل الخاصة بك</p>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 form-floating">
                <input
                  {...register("name")}
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="الاسم كامل بالعربية "
                  required
                />
                <label> الاسم كامل بالعربية</label>
              </div>
              <div className="mb-3 form-floating">
                <input
                  {...register("english_name")}
                  type="text"
                  className="form-control"
                  id="english_name"
                  placeholder="الاسم كامل بالانجليزية "
                  required
                />
                <label> الاسم كامل بالانجليزية</label>
              </div>
              <div className="mb-3 form-floating">
                <input
                  {...register("national_id")}
                  type="number"
                  className="form-control"
                  id="number"
                  placeholder="   الهوية الوطنية "
                  required
                />
                <label> الهوية الوطنية </label>
              </div>

              <div className="mb-3 form-floating">
                <input
                  {...register("phone")}
                  type="number"
                  className="form-control"
                  id="number"
                  placeholder="  رقم الجوال "
                  required
                />
                <label> رقم الجوال </label>
              </div>

              <div className="mb-3 form-floating">
                <input
                  {...register("email")}
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="البريد الإلكتروني "
                  required
                />
                <label>البريد الإلكتروني</label>
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
                    <label htmlFor="nationality">الجنسية</label>
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
                    <label htmlFor="gender">الجنس</label>
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
                  <label htmlFor="age_category_id">الفئة العمرية</label>
                </div>
                {/* <AgeCategoriesComponents agectegories={agectegories} /> */}
              </div>

              <div className="mb-3 form-floating position-relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="كلمة السر"
                  required
                />
                <label> كلمة السر</label>
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

              <div className="mb-3 form-floating position-relative">
                <input
                  {...register("password_confirmation")}
                  type={showPasswordConfirmation ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder=" تأكيد كلمة السر"
                  required
                />
                <label> تأكيد كلمة السر</label>
                <span
                  className="toggle-password"
                  onClick={() => setshowPasswordConfirmation(!showPasswordConfirmation)}
                >
                  {showPasswordConfirmation ? (
                    <SvgEyeSlash color="#425A8B" width={30} />
                  ) : (
                    <SvgEye color="#425A8B" width={30} />
                  )}
                </span>
              </div>

              <div className="gap-2 mb-3 d-flex flex-column align-items-end">
                <div className="w-100 d-flex align-items-center justify-content-end">
                  <Checkbox
                    {...register("agreeTerms")}
                    id="agreeTerms"
                    label={
                      <span className="color-gray-900">
                        أوافق على{" "}
                        <a
                          href="#"
                          className="text-success fw-bold text-decoration-underline"
                        >
                          الشروط والأحكام
                        </a>{" "}
                        الخاصة بالتطبيق
                      </span>
                    }
                  />
                </div>
                <div className="w-100 d-flex align-items-center justify-content-end">
                  <Checkbox
                    id="agreePrivacy"
                    {...register("agreePrivacy")}
                    label={
                      <span className="color-gray-900">
                        أوافق على{" "}
                        <a
                          href="#"
                          className="text-success fw-bold text-decoration-underline"
                        >
                          سياسة إشعار الخصوصية
                        </a>{" "}
                        الخاصة بالتطبيق
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
                  {isPending ? "جاري الدخول..." : " تسجيل"}
                </button>
                <button
                  type="button"
                  className="mb-3 btn btn-outline-primary w-100"
                >
                  الدخول كزائر
                </button>
              </div>

              <div className="text-center">
                <span> لديك بالفعل حساب؟ </span>
                <Link href="/login" className="text-success fw-bold">
                  تسجيل الدخول
                </Link>
              </div>
            </Form>
          </div>
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
            <h2 className="mb-3 fw-bold">اكتشف عالم الإعلام والبث</h2>
            <p className="lead">
              استعد لاكتساب مهارات احترافية في مجالات الإذاعة والتلفزيون، مع
              تدريبات معتمدة من أفضل الخبراء.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
