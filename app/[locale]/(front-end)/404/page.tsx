import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("trans");

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="text-gray-600">{t("pageNotFound")}</p>
      </div>
    </div>
  );
}
