import { fetcherClient } from "@/utils/fetch-client";
import { ShowInvoiceResponseData } from "@/models";

export const getShowInvoices = async (
  uuid: string
): Promise<ShowInvoiceResponseData | null> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const res = await fetcherClient({
      url: `invoices/${uuid}`,
      token,
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json?.data || null;

  } catch {
    return null;
  }
};