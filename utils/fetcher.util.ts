import { auth } from "@/auth";
import { getLocale } from "next-intl/server";

export const fetcher = async ({
  url,
  options,
  method = "GET",
  revalidate = 0,
}: {
  url: string;
  options?: any;
  method?: string;
  revalidate?: number;
}) => {
  const session: any = await auth();
  const lang = await getLocale();

  const headers = {
    ...(options?.headers || {}),
    Authorization: "Bearer " + session?.user?.api_token,
    "Accept-Language": lang,
  };

  if (session?.user?.api_token) {
    headers["Authorization"] = `Bearer ${session.user.api_token}`;
  }

  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`, {
    method,
    ...options,
    headers,
    ...(revalidate > 0 && { next: { revalidate } }),
  });
};
