import { getRenderElement } from "@udecode/slate-plugins";
import { LogoElement } from "./components/LogoElement";
import { LOGO } from "./type";

export const renderElementLogo = getRenderElement({
  type: LOGO,
  component: LogoElement,
});
