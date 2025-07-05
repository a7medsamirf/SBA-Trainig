export const flattenObject = (obj: any, parentKey = "") => {
  let result: { [key: string]: any } = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let newKey = parentKey ? `${parentKey}.${key}` : key;

      if (Array.isArray(obj[key])) {
        const containsObjects = obj[key].some(
          (item: any) => typeof item === "object" && item !== null
        );

        if (containsObjects) {
          // Flatten each item in the array with indexed notation
          obj[key].forEach((item: any, index: number) => {
            if (typeof item === "object" && item !== null) {
              Object.assign(result, flattenObject(item, `${newKey}.${index}`));
            } else {
              result[`${newKey}.${index}`] = item;
            }
          });
        } else {
          // Keep arrays of primitives as-is
          result[newKey] = obj[key];
        }
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        // Recursively flatten nested objects
        Object.assign(result, flattenObject(obj[key], newKey));
      } else {
        // Assign primitive values directly
        result[newKey] = obj[key];
      }
    }
  }

  return result;
};
