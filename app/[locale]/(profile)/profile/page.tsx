"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";
import { Input } from "@/components/Form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./../profile.scss";

const defaultValues = {
  name: "أحمد عبدالله بن علي",
  email: "Ahmedabdallah12@gmail.com",
  phone: "+966214219401242",
};

const ProfilePage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
  });

  const onSubmit = (data: any) => {
    // Handle form submission (e.g., API call)
    alert("تم تحديث البيانات بنجاح!\n" + JSON.stringify(data, null, 2));
  };

  return (
    <>
      <div className="profile-content ">
        <div className="profile-content-inner">
          <div className="profile-content-item">
            <div className="profile-content-item-body">
              <div className="card border-0">
                <div className="card-body p-4 h-100">
                  <div className="profile-content-item-header">
                    <h4 className="fw-bold color-gray-900">
                      {" "}
                      تعديل الملف الشخصي{" "}
                    </h4>
                  </div>
                  <div>
                    <div className="text-center">
                      <Image
                        src="/images/trainers/trainer01.png"
                        alt="Profile"
                        width={90}
                        height={90}
                        className="rounded-circle border border-2"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row g-4">
                      <div className="col-12 col-md-6">
                          <Input
                            label="البريد الإلكتروني"
                            name="email"
                            placeholder="البريد الإلكتروني"
                            register={register}
                            error={errors.email?.message}
                          />
                        </div>
                        <div className="col-12 col-md-6">
                            <Input
                              label="الاسم بالكامل"
                              name="name"
                              placeholder="الاسم بالكامل"
                              register={register}
                              error={errors.name?.message as string}
                            />
                        </div>

                        <div className="col-12 col-md-6 offset-md-6">
                          <Input
                            label="رقم الجوال"
                            name="phone"
                            placeholder="رقم الجوال"
                            type="tel"
                            register={register}
                            error={errors.phone?.message as string}
                          />
                        </div>
                      </div>
                      <div className="d-flex mt-5">
                        <Button
                          type="submit"
                          variant="primary"
                          className="px-5 py-2 rounded-3"
                        >
                          تعديل البيانات
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage