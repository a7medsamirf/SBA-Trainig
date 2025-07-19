import { SearchParamProps } from "@/models";
import BillsClientPage from "./components/BillsClientPage";
import { getInvoices } from "@/shared-apis";

const CourseRequestPage = async ({ searchParams }: SearchParamProps) => {

  const search = ((await searchParams) as any)?.search || "";
  const invoices = await getInvoices({ keyword: search });


  return <BillsClientPage invoices={invoices} />;
};

export default CourseRequestPage;
