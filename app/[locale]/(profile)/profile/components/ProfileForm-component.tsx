"use client";
import { toast } from 'react-hot-toast';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Input } from "@/components/input/input.component"; 
import Form from "react-bootstrap/Form";
import { updateProfileApi } from "@/server-actions";
import { Gender, Nationality, AgeCategory } from "@/models";
import { SelectInput } from "@/components";

interface ProfileFormProps {
  nationalities: Nationality[];
  genders: Gender[];
  ageCategories: AgeCategory[];
}

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  english_name: string;
  national_id: string;
  nationality_id?: number;
  gender?: number;
  age_category_id?: number;
}

const ProfileFormComponent = ({ nationalities, genders, ageCategories }: ProfileFormProps) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      english_name: "",
      national_id: "",
    },
  });

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const user = session.user as any;
      reset({
        name: user.name || "",
        english_name: user.english_name || "",
        national_id: user.national_id || "",
        email: user.email || "",
        phone: user.phone || "",
        nationality_id: user.nationality?.id,
        gender: user.gender?.id,
        age_category_id: user.age_category?.id,
      });
      setLoading(false);
    }
  }, [session, status, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const res = await updateProfileApi(data);
  
      if (res?.succeeded || res?.status === 200) {
        toast.success("✅ تم تحديث البيانات بنجاح");
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center mb-4">
        <Image
          src="/images/trainers/trainer01.png"
          alt="Profile"
          width={90}
          height={90}
          className="rounded-circle border"
          style={{ objectFit: "cover" }}
        />
      </div>
      
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <Input
            label="البريد الإلكتروني"
            name="email"
            control={control}
            placeholder="البريد الإلكتروني"
            type="email"
            disabled
            rules={{ 
              required: "البريد الإلكتروني مطلوب",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "البريد الإلكتروني غير صحيح"
              }
            }}
          />
        </div>
        
        <div className="col-12 col-md-6">
          <Input
            label="رقم الجوال"
            name="phone"
            control={control}
            placeholder="رقم الجوال"
            type="tel"
            disabled
            rules={{ 
              required: "رقم الجوال مطلوب",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "رقم الجوال يجب أن يكون 10 أرقام"
              }
            }}
          />
        </div>
        
        <div className="col-12 col-md-6">
          <Input
            label="الاسم كامل بالعربية"
            name="name"
            control={control}
            placeholder="الاسم كامل بالعربية"
            disabled
            rules={{ 
              required: "الاسم مطلوب",
              minLength: {
                value: 2,
                message: "الاسم يجب أن يكون أكثر من حرفين"
              }
            }}
          />
        </div>
        
        <div className="col-12 col-md-6">
          <Input
            label="الاسم كامل بالإنجليزية"
            name="english_name"
            control={control}
            placeholder="الاسم كامل بالإنجليزية"
            disabled
            rules={{ 
              required: "الاسم مطلوب",
              minLength: {
                value: 2,
                message: "الاسم يجب أن يكون أكثر من حرفين"
              }
            }}
          />
        </div>
        
        <div className="col-12 col-md-6">
          <Input
            label="الهوية الوطنية"
            name="national_id"
            control={control}
            placeholder="الهوية الوطنية"
            disabled
            rules={{ 
              required: "الهوية الوطنية مطلوبة",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "الهوية الوطنية يجب أن تكون 10 أرقام"
              }
            }}
          />
        </div>

        <div className="col-12 col-md-6">
          <div className="form-floating">
            <SelectInput
              name="nationality_id"
              control={control}
              placeholder="اختر الجنسية"
              required
              disabled
              options={nationalities}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              label=""
              rules={{ required: "الجنسية مطلوبة" }}
            />
            <label htmlFor="nationality">الجنسية</label>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="form-floating">
            <SelectInput
              name="gender"
              control={control}
              placeholder="اختر الجنس"
              required
              disabled
              options={genders}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              label=""
              rules={{ required: "الجنس مطلوب" }}
            />
            <label htmlFor="gender">الجنس</label>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="form-floating">
            <SelectInput
              name="age_category_id"
              control={control}
              placeholder="اختر الفئة العمرية"
              required
              disabled
              options={ageCategories}
              getOptionLabel={(option: any) => option.name}
              getOptionValue={(option: any) => option.id}
              label=""
              rules={{ required: "الفئة العمرية مطلوبة" }}
            />
            <label htmlFor="age_category_id">الفئة العمرية</label>
          </div>
        </div>
      </div>

    </Form>
  );
};

export default ProfileFormComponent;


