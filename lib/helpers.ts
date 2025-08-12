// ✅ lib/helpers.ts
import { getMessages } from "@/i18n/getMessages";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getCurrentUser } from "@/shared-apis";

export async function resolveLocaleData(locale: string) {
  if (!routing.locales.includes(locale as any)) notFound();
  const messages = await getMessages(locale);
  const session = await auth();
  const user = await getCurrentUser();

  return {
    messages,
    session,
    userName: user?.name || "مستخدم",
    userId: user?.id || "",
  };
}
