import { GROUP } from "./type";
import { paragraphBuilder } from "../../../paragraph/paragraphBuilder";

export const groupBuilder = (...children) => {
  if (!children || children.length === 0) {
    children = [paragraphBuilder()];
  }
  return {
    type: GROUP,
    children,
  };
};
