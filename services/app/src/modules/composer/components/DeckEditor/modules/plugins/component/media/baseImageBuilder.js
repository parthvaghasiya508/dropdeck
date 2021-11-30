import { FROM_UPLOAD } from "./image/transforms/insertImage";

export const baseImageBuilder = (type) => (settings = {}) => {
  const { from = FROM_UPLOAD } = settings;
  return {
    type,
    settings: {
      from,
      ...settings,
    },
    children: [{ text: '' }]
  };
};
