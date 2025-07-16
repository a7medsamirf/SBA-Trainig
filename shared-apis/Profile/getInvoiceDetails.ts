"use server";

import { fetcher } from "@/utils";
import { ShowInvoiceResponseData } from "@/models";

export const getInvoiceDetails = async (uuid: string): Promise<ShowInvoiceResponseData | null> => {
  try {
    const res = await fetcher({
      url: `invoices/${uuid}`,
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json?.data || null;
  } catch {
    return null;
  }
};
