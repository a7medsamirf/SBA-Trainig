'use client';
import {  useLocale} from "next-intl"; 
import SvgEye from '@/components/icons/svg/eye'
import SvgEyeSlash from '@/components/icons/svg/eye-slash'
import { Link } from "@/i18n/routing";
import React, { useState } from 'react';
import Image from 'next/image';

export const LoginFormComponent = () => {
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showNafath, setShowNafath] = useState(false);
    const [nafathId, setNafathId] = useState('');
  
    const locale = useLocale();
  
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
    <>
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

            {!showNafath && (
            <div className="login-form">
            <div className='mb-30'>
            <h5 className="fw-bold mb-2">تسجيل الدخول</h5>
            <p className="text-muted mb-4">
              ادخل بيانات تسجيل الدخول الخاصة بك
            </p>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} >
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
                          {showPassword ?  <SvgEyeSlash color='#425A8B' width={30} /> : <SvgEye color='#425A8B' width={30} /> }
                        </span>
                      </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    تذكرني
                  </label>
                </div>
                <a href="#" className="text-success small">
                  نسيت كلمة السر؟
                </a>
              </div>
          <div className='mt-100'>
          <button
                type="submit"
                className="btn btn-primary w-100 mb-3"
                disabled={isLoading}
              >
                {isLoading ? "جاري الدخول..." : "تسجيل الدخول"}
              </button>
              <button
                type="button"
                className="btn btn-outline-primary w-100 mb-3"
                onClick={() => setShowNafath(true)}
              >
                تسجيل عن طريق نفاذ
              </button>
          </div>
              <div className="text-center">
                <span>ليس لديك حساب؟ </span>
                <Link href="/register" className="text-success fw-bold">
                  إنشاء حساب جديد
                </Link>
              </div>
            </form>
            </div>
            )}

            {showNafath && (
            <div className="login-Nafath">
           <div className='mb-30'>
            <h5 className="fw-bold mb-2"> تسجيل عن طريق نفاذ </h5>
            <p className="text-muted mb-4">
            ادخل رقم الهوية الخاص بك للدخول عن طريق نفاذ
            </p>
            </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit} >
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="nafathId"
                      placeholder="رقم الهوية"
                      value={nafathId}
                      onChange={(e) => setNafathId(e.target.value)}
                      required
                    />
                     <label htmlFor="nafathId">رقم الهوية</label>
                  </div>
                  <div className='mt-100'>
                    <button
                            type="submit"
                            className="btn btn-primary w-100 mb-3"
                        >
                            متابعة
                        </button>
           </div>
                  </form>
                </div>
                )}

          </div>
         {/* Guest login link at the bottom */}
         <div className="guest-login-bottom text-center">
        <Link href="/" className="text-muted">
        الدخول كزائر
        </Link>
        
        </div>
    </>
  )
}
