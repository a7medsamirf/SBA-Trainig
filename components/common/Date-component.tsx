"use client";

type Props = {
  date: string;
  locale: string; // ar أو en
};

export default function DateDisplay({ date, locale }: Props) {
  const formattedDate = new Date(date).toLocaleDateString(locale, {
    weekday: locale === "ar" ? "long" : undefined,
    year: "numeric",
    month: "long",
    day: "numeric",
    numberingSystem: "latn", 
  });

  return <>{formattedDate}</>;
}
