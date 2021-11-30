import { getRenderElement } from "@udecode/slate-plugins";
import { LogoListElement } from "./components/LogoListElement";
import { LOGO_LIST } from "./type";

export const renderElementLogoList = getRenderElement({
  type: LOGO_LIST,
  component: LogoListElement,
});
