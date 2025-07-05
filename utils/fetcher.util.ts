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
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${url}` as string, {

    method,
    ...options,
    headers: {
      ...options?.headers,
      Authorization: "Bearer " + session?.user?.token,
      "Accept-Language": lang,
    },
  // ✅ تفعيل revalidate لو مطلوب
     ...(revalidate > 0 && {
      next: { revalidate },
    }),
  });
};
