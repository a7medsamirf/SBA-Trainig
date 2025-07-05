
import { z } from "zod"; 

const ContactSchema = z.object({
  firstName: z.string().min(1, { message: "الاسم الأول مطلوب" }),
  lastName: z.string().min(1, { message: "اسم العائلة مطلوب" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  phone: z.string().min(1, { message: "رقم التواصل مطلوب" }),
  message: z.string().min(1, { message: "الرسالة مطلوبة" }),
});


type ContactFormType = z.infer<typeof ContactSchema>;


export { ContactSchema, type  ContactFormType };
