import { useContext } from "react";
import { AbilityContext } from "../AbilityContext";

export const useAbility = () => useContext(AbilityContext);
