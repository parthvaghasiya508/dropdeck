import { deserializeHeading } from "@udecode/slate-plugins";
import { HEADING_ONE } from "./one/type";
import { HEADING_TWO } from "./two/type";

export const HeadingDeserializePlugin = () => ({
  deserialize: deserializeHeading({ levels: 4, typeH1: HEADING_ONE, typeH2: HEADING_TWO, typeH3: HEADING_TWO, typeH4: HEADING_TWO }),
});
