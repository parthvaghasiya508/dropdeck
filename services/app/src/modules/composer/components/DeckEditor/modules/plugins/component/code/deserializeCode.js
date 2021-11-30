import { CODE } from "./type";

export const deserializeCode = () => ({
  element: {
    PRE: () => ({ type: CODE }),
  },
});
