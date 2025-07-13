import { SearchParamProps } from "@/models";
import BillsClientPage from "./components/BillsClientPage";
import { getInvoices } from "@/shared-apis";

const BillsPage = async ({ searchParams }: SearchParamProps) => {
  const search = ((await searchParams) as any)?.search || "";
  const invoices = await getInvoices({ keyword: search });

  console.log("🚀 ~ BillsPage ~ invoices:", invoices)
  return <BillsClientPage invoices={invoices} />;
};

export default BillsPage;
