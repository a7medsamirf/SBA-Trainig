'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CountrySelect } from 'react-country-state-city';
import "react-country-state-city/dist/react-country-state-city.css";


export default function RegisterForm() {
  const [formData, setFormData] = useState({
    national_id: '',
    full_name_ar: '',
    full_name_en: '',
    nationality: '',
    gender: '',
    age_category_id: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string[] } = {};

    if (!formData.national_id) newErrors.national_id = ['رقم الهوية مطلوب'];
    if (!formData.full_name_ar) newErrors.full_name_ar = ['الاسم بالعربية مطلوب'];
    if (!formData.full_name_en) newErrors.full_name_en = ['الاسم بالإنجليزية مطلوب'];
    if (!formData.nationality) newErrors.nationality = ['الجنسية مطلوبة'];
    if (!formData.gender) newErrors.gender = ['الجنس مطلوب'];
    if (!formData.age_category_id) newErrors.age_category_id = ['الفئة العمرية مطلوبة'];
    if (!formData.phone.match(/^\+?\d{9,15}$/)) newErrors.phone = ['رقم الهاتف غير صالح'];
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = ['البريد الإلكتروني غير صالح'];
    if (!formData.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/)) {
      newErrors.password = ['كلمة المرور يجب أن تحتوي على ٨ أحرف على الأقل، رقم، ورمز خاص'];
    }
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = ['تأكيد كلمة المرور لا يطابق كلمة المرور'];
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://144.24.221.37/api/v1/register-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          gender: parseInt(formData.gender),
          age_category_id: parseInt(formData.age_category_id),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || { general: [data.message || 'حدث خطأ'] });
      } else {
        router.push(`/verify-otp?phone=${encodeURIComponent(formData.phone)}`);
      }
    } catch (err: any) {
      setErrors({ general: ['فشل الاتصال بالخادم'] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">تسجيل طالب جديد</h2>
      <form onSubmit={handleSubmit} noValidate>
        {[
          { label: 'رقم الهوية/الإقامة', name: 'national_id', type: 'text' },
          { label: 'الاسم بالعربية', name: 'full_name_ar', type: 'text' },
          { label: 'الاسم بالإنجليزية', name: 'full_name_en', type: 'text' },
          { label: 'رقم الهاتف', name: 'phone', type: 'text' },
          { label: 'البريد الإلكتروني', name: 'email', type: 'email' },
          { label: 'كلمة المرور', name: 'password', type: 'password' },
          { label: 'تأكيد كلمة المرور', name: 'password_confirmation', type: 'password' },
        ].map(({ label, name, type }) => (
          <div className="mb-3" key={name}>
            <label className="form-label">{label}</label>
            <input
              type={type}
              className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
              name={name}
              value={(formData as any)[name]}
              onChange={handleChange}
            />
            {errors[name] && <div className="invalid-feedback">{errors[name][0]}</div>}
          </div>
        ))}

        <div className="mb-3">
          <label className="form-label">الجنسية</label>
          <CountrySelect
            placeHolder="اختر الدولة"
            onChange={(country: any) => {
              setFormData({ ...formData, nationality: country.name });
            }}
            className={`form-select ${errors.nationality ? 'is-invalid' : ''}`}
          />
          {errors.nationality && (
            <div className="invalid-feedback">{errors.nationality[0]}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">الجنس</label>
          <select
              className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
              name="gender"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="">اختر...</option>
              <option value="1">ذكر</option>
              <option value="2">أنثى</option>
            </select>
          {errors.gender && <div className="invalid-feedback">{errors.gender[0]}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">الفئة العمرية</label>
          <select
            className={`form-select ${errors.age_category_id ? 'is-invalid' : ''}`}
            name="age_category_id"
            value={formData.age_category_id}
            onChange={handleChange}
          >
            <option value="">اختر...</option>
            <option value="1">١٨-٢٥</option>
            <option value="2">٢٦-٣٥</option>
            <option value="3">٣٦-٤٥</option>
          </select>
          {errors.age_category_id && (
            <div className="invalid-feedback">{errors.age_category_id[0]}</div>
          )}
        </div>

        {errors.general && <div className="alert alert-danger">{errors.general[0]}</div>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'جارٍ التسجيل...' : 'إنشاء حساب'}
        </button>
      </form>
    </div>
  );
}
