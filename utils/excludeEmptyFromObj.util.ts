// export default function excludeEmpty(obj: any) {
//   return Object.entries(obj)
//     .filter(
//       ([key, value]) => value !== null && value !== undefined && value !== ""
//     )
//     .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
// }
export default function excludeEmpty(obj: any) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object") {
      excludeEmpty(obj[key]); // Recurse into nested objects
    } else if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
      delete obj[key]; // Delete undefined, null, or empty string values
    }
  });
  return obj;
}
