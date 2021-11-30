import { useContext } from "react";
import { PalettesInUseContext } from "./PalettesInUseContext";

export const usePalettesInUse = () => useContext(PalettesInUseContext);
