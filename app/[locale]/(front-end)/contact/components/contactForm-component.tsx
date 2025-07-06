"use client";
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactSchema, type ContactFormType } from '@/validation/ContactUsSchema';
import Input from '@/components/Form/Input/Input';
import { toast } from 'react-hot-toast';
import { useTranslations } from "next-intl";
import { sendContactMessageAction } from '@/server-actions/contact/post-contact.action';

const ContactFormComponent = () => {
  const t = useTranslations("trans.contactus");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormType>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormType> = async (data) => {
    setLoading(true);

    try {
      await sendContactMessageAction(data);
      toast.success("✅ تم إرسال رسالتك بنجاح!");
      reset();
    } catch (error) {
      console.error("Send Error:", error);
      toast.error("❌ حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="contact-form">
      <h3 className="color-brand-3 mt-60 mb-2"> {t("title")}</h3>
      <p className="font-sm color-gray-700 mb-30"> {t("description")}</p>
      <div className="row g-4">
        <div className="col-lg-6 col-md-6">
          <Input<ContactFormType>
            label="الأسم الاول"
            name="firstName"
            placeholder={t("firstName")}
            register={register}
            error={errors.firstName?.message}
          />
        </div>
        <div className="col-lg-6 col-md-6">
          <Input<ContactFormType>
            label="اسم العائلة"
            name="lastName"
            placeholder={t("lastName")}
            register={register}
            error={errors.lastName?.message}
          />
        </div>
        <div className="col-lg-12">
          <Input<ContactFormType>
            label="البريد إلكتروني"
            name="email"
            placeholder={t("email")}
            register={register}
            error={errors.email?.message}
            type="email"
          />
        </div>
        <div className="col-lg-12">
          <Input<ContactFormType>
            label="رقم التواصل"
            name="phone"
            placeholder={t("phone")}
            register={register}
            error={errors.phone?.message}
            type="tel"
          />
        </div>
        <div className="col-lg-12">
        <div className="form-floating mb-3">
              <Form.Control
                as="textarea"
                id="contactFormMessage"
                placeholder={t("message")}
                style={{ height: "150px" }} 
                {...register("message")}
              />
              <label htmlFor="contactFormMessage">رسالة</label>
            </div>
        {/*   <Form.Group className="mb-3" controlId="contactFormMessage">
            <Form.Label></Form.Label>
            <Form.Control
              as="textarea"
              placeholder={t("message")}
              rows={5}
              {...register("message")}
            />
          </Form.Group> */}
        </div>
        <div className="col-lg-12">
          <div className="form-group">
            <Button
              disabled={loading}
              variant="primary"
              type="submit"
              className="btn btn-buy btn-custom-primary w-auto"
            >
              {loading ? t("sending") : t("send")}
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default ContactFormComponent;