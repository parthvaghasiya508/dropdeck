import { VIDEO } from "../type";

export const buildVideoNode = (settings) => ({
  type: VIDEO,
  settings,
  children: [{ text: '' }]
});
