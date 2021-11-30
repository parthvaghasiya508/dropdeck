import { IMAGE } from "../type";

export const newImage = ({
  from,
  url,
  name,
  description,
  label,
  swatch
}) => (
  {
    type: IMAGE,
    settings: {
      from,
      url,
      description,
      label,
      name,
      swatch
    },
    children: [{ text: '' }],
  }
);
