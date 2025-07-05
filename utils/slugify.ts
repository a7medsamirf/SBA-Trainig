export const slugify = (text: string): string => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\u064B-\u0652]/g, "") // إزالة التشكيل العربي
      .replace(/\s+/g, "-")            // استبدال المسافات بـ -
      .replace(/[^\w\-ء-ي]/g, "")      // إزالة الرموز الغريبة
      .replace(/\-\-+/g, "-");         // إزالة التكرار في -
  };