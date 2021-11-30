import { CODE } from "../../component/code/type";
import { HEADING_ONE } from "../../component/heading/one/type";
import { HEADING_TWO } from "../../component/heading/two/type";
import { MATH } from "../../component/math/type";
import { BLOCK_QUOTE } from "../../component/quote/type";
import { PARAGRAPH } from "../../component/paragraph/type";

export const isText = (node) => node !== undefined && node !== null && (
  node.type === PARAGRAPH ||
  node.type === HEADING_TWO ||
  node.type === HEADING_ONE ||
  node.type === CODE ||
  node.type === BLOCK_QUOTE ||
  node.type === MATH
);
