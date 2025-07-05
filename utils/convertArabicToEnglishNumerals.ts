export const convertArabicToEnglishNumerals = (input: any) => {
  const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  // Convert Arabic numerals to English numerals
  for (let i = 0; i < arabicNumbers.length; i++) {
    const regex = new RegExp(arabicNumbers[i], "g");
    input = input.replace(regex, englishNumbers[i]);
  }

  // Remove any non-numeric characters except decimal point
  input = input.replace(/[^0-9.]/g, "");

  // Ensure only one decimal point is present
  const decimalIndex = input.indexOf(".");
  if (decimalIndex !== -1) {
    const beforeDecimal = input.substring(0, decimalIndex);
    const afterDecimal = input.substring(decimalIndex + 1);
    input = beforeDecimal + "." + afterDecimal.replace(".", "");
  }

  return input;
};
