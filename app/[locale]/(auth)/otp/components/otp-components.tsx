'use client';

import '../otp.scss';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';

export const OtpComponents = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const phone = searchParams.get('phone');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const value = e.target.value.replace(/\D/, '');
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[idx] = value;
      setOtp(newOtp);
      if (value && idx < 3) {
        const next = document.getElementById(`otp-input-${idx + 1}`);
        if (next) (next as HTMLInputElement).focus();
      }
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSubmit = async () => {
    const finalOtp = otp.join('');
    if (finalOtp.length !== 4) {
      setError('برجاء إدخال رمز OTP كامل');
      return;
    }
    if (!phone) {
      setError('رقم الهاتف غير موجود');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://144.24.221.37/api/v1/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          otp: finalOtp,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.status !== 200) {
        setError(data.message || 'فشل التحقق من الكود');
      } else {
        // ✅ نجح التحقق – حوّله للداشبورد أو أي صفحة تانية
        router.push('/dashboard');
      }
    } catch (err) {
      setError('حدث خطأ أثناء التحقق من الكود');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-bg min-vh-100">
      <div className="otp-card card p-5 border-0 text-center">
        <h5 className="fw-bold mb-4">تأكيد رقم الجوال</h5>
        <div className="d-flex justify-content-center align-items-center mb-2">
          <Image
            src={`/images/pass.svg`}
            alt="logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '35%', height: 'auto' }}
            className="mb-4"
          />
        </div>
        <p className="mb-4 text-muted small">
          أدخل رمز التأكيد OTP المكون من 4 أرقام الذي تم إرساله إلى
          <strong className="fw-bold"> {phone || 'رقم غير معروف'}</strong>
        </p>
        <div className="mb-4">
          <Link href="" className="text-success fw-bold small text-decoration-underline">تغيير رقم الجوال</Link>
        </div>

        <form className="d-flex justify-content-center gap-2 mb-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-input-${idx}`}
              type="text"
              className="form-control text-center otp-input"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(e, idx)}
              style={{ width: 48, height: 48, fontSize: 24 }}
              dir="ltr"
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          ))}
        </form>

        {error && <div className="alert alert-danger py-1 small">{error}</div>}

        <div className="mb-3 text-success small">
          {timer > 0 ? (
            <>يمكنك إعادة إرسال الكود خلال <span>{formatTime(timer)}</span></>
          ) : (
            <Link href="" className="fw-bold text-success" onClick={e => { e.preventDefault(); setTimer(60); }}>
              إعادة إرسال
            </Link>
          )}
        </div>

        <button className="btn btn-buy btn-custom-primary btn btn-primary" type="button" onClick={handleSubmit} disabled={loading}>
          {loading ? 'جارٍ التحقق...' : 'تأكيد'}
        </button>
      </div>
    </div>
  );
};
