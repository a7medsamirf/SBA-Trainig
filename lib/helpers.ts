// ✅ lib/helpers.ts
import { getMessages } from "@/i18n/getMessages";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { auth } from "@/auth";

export async function resolveLocaleData(locale: string) {
  if (!routing.locales.includes(locale as any)) notFound();
  const messages = await getMessages(locale);
  const session = await auth();

  return {
    messages,
    session,
    userName: session?.user?.name || "مستخدم",
    userId: session?.user?.id || "",
  };
}
