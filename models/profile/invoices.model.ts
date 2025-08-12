export type InvoiceItem = {
  id: number;
  course_id: number;
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

export type InvoicesApiResponse = {
  status: number;
  message: string;
  data: InvoiceItem[];
}
