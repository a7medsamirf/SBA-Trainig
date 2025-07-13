import { createQueryString, fetcher } from "@/utils";

export const getInvoices = async (props: { keyword?: string }) => {
  try {
    const query = createQueryString(props);
    const res = await fetcher({
      url: `invoices?${query}`,
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    return null;
  }
};
