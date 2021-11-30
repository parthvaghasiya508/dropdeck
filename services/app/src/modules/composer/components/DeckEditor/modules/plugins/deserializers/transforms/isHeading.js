import { HEADING_ONE } from "../../component/heading/one/type";
import { HEADING_TWO } from "../../component/heading/two/type";

export const isHeading = (node) => node && node.type === HEADING_TWO || node.type === HEADING_ONE;
