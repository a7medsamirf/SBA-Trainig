import dayjs from "dayjs";
import ar from "dayjs/locale/ar";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localeData from "dayjs/plugin/localeData";
import { useLocale } from "next-intl";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localeData);

export const dateFormat = (
  date: string | Date = new Date(),
  format: string = "DD MMM YYYY",
  locale?: string
) => {
  if (locale) {
    if (locale === "ar") {
      dayjs.locale(ar);
    } else {
      dayjs.locale(locale);
    }
  } else {
    const lang = useLocale();

    if (lang === "ar") {
      dayjs.locale(ar);
    } else {
      dayjs.locale(lang);
    }
  }

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return dayjs(date).tz(userTimezone).format(format);
};

export const convertToTimeStamp = (date: Date) => {
  const dateInUTC = dayjs(date).format("DD MMMM YYYY HH:mm:ss [UTC]");
  return new Date(dateInUTC).getTime();
};

export const formatTimeAgo = (date: string, t: any) => {
  const now = new Date();
  const createdDate = new Date(date);
  const diffInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    // return `${t("notifications.since")} ${diffInSeconds} ${t(
    //   "notifications.seconds"
    // )}`;
    return t("notifications.now");
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);

    if (minutes === 1) {
      return `${t("notifications.since")} ${t("notifications.minute")}`;
    }

    return `${t("notifications.since")} ${minutes} ${t(
      "notifications.minutes"
    )}`;

    // if (diffInSeconds < 3600) {
    //   return t("notifications.now");
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${t("notifications.since")} ${hours} ${t("notifications.hours")}`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    if (days === 1) {
      return t("notifications.yesterday");
    }
    return `${t("notifications.since")} ${days} ${t("notifications.days")}`;
  }
};
