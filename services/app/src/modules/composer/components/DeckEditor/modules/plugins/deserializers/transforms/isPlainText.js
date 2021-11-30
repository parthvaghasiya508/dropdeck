import { HEADING_ONE } from "../../component/heading/one/type";
import { HEADING_TWO } from "../../component/heading/two/type";
import { PARAGRAPH } from "../../component/paragraph/type";

export const isPlainText = (node) => node !== undefined && node !== null && node.type === PARAGRAPH || node.type === HEADING_TWO || node.type === HEADING_ONE;
