import { LOGO } from "./type";
import { logoToUse } from "./configuration/logoConfigurationBuilder";

export const logoBuilder = (brandingData = {}, label) => {
  const logo = logoToUse(brandingData);
  const allColors = brandingData?.colors || {}; // only store the "featured" colours
  const { accent, light, dark } = allColors;
  return {
    type: LOGO,
    settings: {
      ...logo,
      description: label,
      label,
      colors: {
        accent,
        light,
        dark
      },
    },
    children: [{ text: '' }],
  };
};
