import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

// Redirect from `/` to `/ar` (or whichever default locale you prefer)
export default async function RootPage() {
  const lang = await getLocale();
  redirect(`/${lang}`);
}
