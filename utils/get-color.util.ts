type ColorKey =
  | "random"
  | "primary"
  | "color-primary"
  | "secondary"
  | "color-secondary"
  | "third"
  | "color-third"
  | "white"
  | "color-gray-light"
  | "orange"
  | "red"
  | "green"
  | "alert-green"
  | "alert-orange"
  | "alert-red"
  | "alert-blue"
  | "color-brown-warm"
  | "color-medium-gray"
  | "color-light-soft"
  | "color-gray"
  | "color-gray-100"
  | "color-gray-200"
  | "color-gray-300"
  | "color-gray-400"
  | "color-gray-500"
  | "color-gray-600"
  | "color-deep-green"
  | "color-gray-dark"
  | "bg-disabled"
  | "color-gray-medium"
  | "color-icon-success"
  | "color-tawny-brown"
  | "color-bronze-gold"
  | "color-display"
  | "color-amber-orange"
  | "color-golden-yellow"
  | "color-success-light"
  | "color-soft-sky"
  | "color-soft-cream"
  | "color-forest-green"
  | "color-primary-blue"
  | "color-text-info"
  | "color-success"
  | "color-main-text"
  | "color-black"
  | "color-warning-light"
  | "color-warning"
  | "color-nafath"
  | "color-light-blue-gray"
  | "color-muted-blue"
  | "color-light-gray";

export const getColor = (key: ColorKey, opacity?: string) => {
  const randomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const randomChoice = (obj: Record<string, string>) => {
    const keys = Object.keys(obj);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return obj[randomKey];
  };

  const colorMap: Record<Exclude<ColorKey, "random">, string> = {
    primary: "#293c7c",
    "color-primary": "#1b1b1b",
    secondary: "#c5a377",
    "color-secondary": "#333333",
    third: "#febb26",
    "color-third": "#a5a5a5",
    white: "#ffffff",
    "color-gray-light": "#d2d6db",
    orange: "rgba(244, 199, 36, 1)",
    red: "rgba(195, 7, 52, 1)",
    green: "rgba(7, 195, 123, 1)",
    "alert-green": "#07c37b",
    "alert-orange": "#f4c724",
    "alert-red": "#c30734",
    "alert-blue": "#2a73ff",
    "color-brown-warm": "#946931",
    "color-medium-gray": "#8F8F8F",
    "color-gray": "1d1f1f",
    "color-gray-100": "#eeeeee",
    "color-gray-200": "#d6d6d6",
    "color-gray-300": "#a5a5a5",
    "color-gray-400": "#666666",
    "color-gray-500": "#444444",
    "color-gray-600": "#333333",
    "color-light-gray": "#f8f8f8",
    "color-deep-green": "#1b8354",
    "color-gray-dark": "#1a1a1a",
    "bg-disabled": "#e5e7eb",
    "color-gray-medium": "#666666",
    "color-icon-success": "#067647",
    "color-tawny-brown": "#9c733d",
    "color-bronze-gold": "#b78b35",
    "color-display": "#1F2A37",
    "color-amber-orange": "#cc7914",
    "color-golden-yellow": "#d8ae17",
    "color-success-light": "#ecfdf3",
    "color-soft-sky": "#c7daff",
    "color-soft-cream": "#fffbee",
    "color-forest-green": "#085d3a",
    "color-primary-blue": "#1f59c8",
    "color-text-info": "#1849a9",
    "color-light-soft": "#f3f5f8",
    "color-success": "#085d3a",
    "color-main-text": "#0b1126",
    "color-nafath": " #36958f",
    "color-warning-light": "#fffaeb",
    "color-warning": "#93370d",
    "color-black": "#000000",
    "color-light-blue-gray": "#dadff2",
    "color-muted-blue": "#6c737f",
  };

  const random = randomChoice(colorMap);

  if (key === "random") return random;

  const color = colorMap[key] || "#000000"; // Default to black if key is not found

  if (!opacity) return color; // If no opacity is provided, return the color as is

  // Convert HEX to RGBA if necessary
  const hexToRgba = (hex: string, alpha: string) => {
    const hexCode = hex.replace("#", "");
    const r = parseInt(hexCode.substring(0, 2), 16);
    const g = parseInt(hexCode.substring(2, 4), 16);
    const b = parseInt(hexCode.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // If color is already in RGBA, just replace the alpha value
  if (color.startsWith("rgba")) {
    return color.replace(
      /rgba\((\d+), (\d+), (\d+), ([\d.]+)\)/,
      `rgba($1, $2, $3, ${opacity})`
    );
  }

  // Convert HEX to RGBA with the given opacity
  return hexToRgba(color, opacity);
};

// export const getColor = (key: ColorKey, opacity?: string) => {
//   switch (key) {
//     case "primary":
//       return "#293c7c";
//     case "color-primary":
//       return "#1b1b1b";
//     case "secondary":
//       return "#c5a377";
//     case "color-secondary":
//       return "#333333";
//     case "third":
//     case "third":
//       return "#febb26";
//     case "color-third":
//       return "#a5a5a5";
//     case "white":
//       return "#ffffff";
//     case "color-gray-light":
//       return "#d2d6db";
//     case "orange":
//       return "rgba(244, 199, 36, 8)";
//     case "red":
//       return "rgba(195, 7, 52, 8)";
//     case "green":
//       return "rgba(7, 195, 123, 8)";
//     case "alert-green":
//       return "#07c37b";
//     case "alert-orange":
//       return "#f4c724";
//     case "alert-red":
//       return "#c30734";
//     case "alert-blue":
//       return "#2a73ff";
//     case "color-brown-warm":
//       return "#946931";
//     case "color-gray-200":
//       return "#d6d6d6";
//     case "color-gray-300":
//       return "#a5a5a5";
//     case "color-gray-400":
//       return "#666666";
//     case "color-deep-green":
//       return "#1b8354";
//     case "color-gray-dark":
//       return "#1a1a1a";
//     case "bg-disabled":
//       return "#e5e7eb";
//     case "color-gray-medium":
//       return "#666666";
//     case "color-icon-success":
//       return "#067647";
//     case "color-tawny-brown":
//       return "#9c733d";
//     case "color-bronze-gold":
//       return "#b78b35";
//     case "color-display":
//       return "#1F2A37";
//     default:
//       return "#000000";
//   }
// };
