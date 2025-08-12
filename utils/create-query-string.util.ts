export const createQueryString = (params: any) => {
  if (!params || typeof params !== "object") {
    return "";
  }
  
  
  const queryString = Object.keys(params)
    .filter((key) => {
      if (params[key] != null && params[key] !== "") {
        return true;
      }
      return false;
    })
    .map((key) => {
      const value = params[key];
      if (value instanceof Array) {
        const arrayQueryString = `${key}=${value
          .map((v) => encodeURIComponent(v))
          .join(",")}`;
        return arrayQueryString;
      }
      return key + "=" + encodeURIComponent(value);
    })
    .join("&");

  return queryString;
};
