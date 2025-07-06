'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import '../register.scss';
import { Link } from "@/i18n/routing";
import SvgEye from '@/components/icons/svg/eye'
import SvgEyeSlash from '@/components/icons/svg/eye-slash'
import { Form, Button } from 'react-bootstrap';
import { Checkbox } from '@/components/checkbox/checkbox.component';

import { NationalitiesComponents } from '../../components/Nationalities-components';
import { GendersComponents } from '../../components/Genders-components';

import { Gender , Nationality , AgeCategory } from '@/models';
import { AgeCategoriesComponents } from '../../components/AgeCategories-components';

interface RegisterFormProps {
  nationalities: Nationality[];
  genders: Gender[];
  agectegories: AgeCategory[];
}

const RegisterForm = ({ nationalities, genders , agectegories }: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [full_name_ar, setName] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Redirect or handle login
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="row g-0 min-vh-100">
        {/* Right: Form */}
        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
          <div className="login-form-box w-100 p-4 p-md-5">
            <div className="text-center mb-4">
             
              
              <Image
                src={`/images/logo_ar.png`}
                alt="logo"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '50%', height: 'auto' }}
                className="w-50"
              />
            </div>
            <div className='mb-30'>
              <h5 className="fw-bold mb-2"> انشاء حساب جديد </h5>
              <p className="text-muted mb-4">
                سجل بيانات التسجيل الخاصة بك
              </p>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="full_name_ar"
                  placeholder="  الاسم كامل بالعربية "
                  value={full_name_ar}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label>  الاسم كامل بالعربية</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="full_name_en"
                  placeholder="الاسم كامل بالانجليزية "
                  required
                />
                <label>    الاسم كامل بالانجليزية</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="number"
                  placeholder="   الهوية الوطنية "
                  value={number}
                  required
                />
                <label>   الهوية الوطنية </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="number"
                  placeholder="  رقم الجوال "
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
                <label>  رقم الجوال </label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="البريد الإلكتروني "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>البريد الإلكتروني</label>
              </div>

              <div className="mb-3">
              <NationalitiesComponents nationalities={nationalities} />
              </div>
              <div className="mb-3">
              <GendersComponents genders={genders} />
              </div>

              <div className="mb-3">
              <AgeCategoriesComponents agectegories={agectegories} />
              </div>

              <div className="form-floating mb-3 position-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  placeholder="كلمة السر"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <label> كلمة السر</label>
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <SvgEyeSlash color='#425A8B' width={30} /> : <SvgEye color='#425A8B' width={30} />}
                </span>
              </div>

              <div className="form-floating mb-3 position-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  placeholder=" تأكيد كلمة السر"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <label>  تأكيد كلمة السر</label>
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <SvgEyeSlash color='#425A8B' width={30} /> : <SvgEye color='#425A8B' width={30} />}
                </span>
              </div>

              <div className="d-flex flex-column gap-2 align-items-end mb-3">
                <div className="w-100 d-flex align-items-center justify-content-end">
                  <Checkbox
                    id="agreeTerms"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(!agreeTerms)}
                    label={<span className='color-gray-900'>أوافق على <a href="#" className="text-success fw-bold text-decoration-underline">الشروط والأحكام</a> الخاصة بالتطبيق</span>}
                  />
                </div>
                <div className="w-100 d-flex align-items-center justify-content-end">
                  <Checkbox
                    id="agreePrivacy"
                    checked={agreePrivacy}
                    onChange={() => setAgreePrivacy(!agreePrivacy)}
                    label={<span className='color-gray-900'>أوافق على <a href="#" className="text-success fw-bold text-decoration-underline">سياسة إشعار الخصوصية</a> الخاصة بالتطبيق</span>}
                  />
                </div>
              </div>
              <div className='mt-60'>
                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={isLoading || !agreeTerms || !agreePrivacy}
                >
                  {isLoading ? "جاري الدخول..." : " تسجيل"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary w-100 mb-3"
                >
                  الدخول كزائر
                </button>
              </div>

              <div className="text-center">
                <span>        لديك بالفعل حساب؟ </span>
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
          <div className="login-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white text-center">
            <h2 className="fw-bold mb-3">اكتشف عالم الإعلام والبث</h2>
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