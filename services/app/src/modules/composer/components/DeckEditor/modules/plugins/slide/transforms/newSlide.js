import uuid from "react-uuid";
import { SLIDE } from "../../component/slide/type";

export const newSlide = (children, settings) => (
  {
    type: SLIDE,
    id: uuid(),
    settings,
    children,
  }
);
