import { useContext } from "react";
import { SlideDimensionsContext } from "./SlideDimensionsContext";

export const useSlideDimensions = () => useContext(SlideDimensionsContext);
