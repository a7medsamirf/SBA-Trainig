export const formatNumber = (
  number: number,
  locale = "en-US",
  options = {}
) => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
    ...options,
  }).format(number);
};
