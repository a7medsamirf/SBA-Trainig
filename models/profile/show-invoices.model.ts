// موديل بيانات الدورات داخل الفاتورة
export interface Enrollment {
  id: number;
  uuid: string;
  course_name: string;
  course_price: string;
  course_price_after_discount: string;
  course_image: string | null;
  qr_code: string | null;
  certificate_url: string | null;
  can_attend_by_gps: string;
}

// موديل تفاصيل الفاتورة عند عرضها بشكل كامل
export interface ShowInvoiceResponseData {
  id: number;
  uuid: string;
  invoice_number: string;
  date: string;
  payment_method: string;
  payment_status: string;
  courses_price: string;
  vat: string;
  total_paid: string;
  invoice_url: string | null;
  enrollments_count: number;
  enrollments?: Enrollment[];
}

// موديل الفاتورة المختصر المستخدم في قائمة الفواتير
export interface InvoiceItemData {
  id: number;
  uuid: string;
  invoice_number: string;
  date: string;
  payment_method: string;
  payment_status: string;
  courses_price: string;
  vat: string;
  total_paid: string;
  invoice_url: string | null;
  enrollments_count: number;
}
