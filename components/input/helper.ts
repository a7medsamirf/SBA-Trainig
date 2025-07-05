export const inputSvc = (
  name: string,
  value: string,
  onChange: (...event: any[]) => void,
  callback: ((name: string, value: any) => () => void) | undefined,
  service: string,
  options?: any
) => {
  const services = {
    removeText: () => {
      let newValue = value.replace(/\D/g, "");
      if (options?.maxDigits) {
        newValue = newValue.slice(0, options?.maxDigits);
      }
      callback && callback(name, newValue);
      onChange(newValue);
    },

    removeSpaces: () => {
      let newValue = value.trim();
      callback && callback(name, newValue);
      onChange(newValue);
    },

    formatNumber: () => {
      let rawValue = value.replace(/[^0-9.]/g, "");

      const [integerPart, ...decimalParts] = rawValue.split(".");
      const decimalPart = decimalParts.join("").slice(0, 2);

      const formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      const formattedValue =
        decimalParts.length > 0 ? `${formatted}.${decimalPart}` : formatted;

      callback && callback(name, formattedValue);
      onChange(formattedValue);
    },

    removeNumbers: () => {
      let newValue = value.replace(/\d/g, "");
      if (options?.maxDigits) {
        newValue = newValue.slice(0, options?.maxDigits);
      }
      callback && callback(name, newValue);
      onChange(newValue);
    },

    capitalize: () => {
      let newValue = value.toUpperCase();
      callback && callback(name, newValue);
      onChange(newValue);
    },

    default: () => {
      callback && callback(name, value);
      onChange(value);
    },
  };

  const handler =
    services[service as keyof typeof services] || services.default;
  handler();
};
