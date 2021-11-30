import { PARAGRAPH } from "../../component/paragraph/type";

export const ensureNotEmpty = (nodes) => (nodes.length > 0 ? nodes : [{ type: PARAGRAPH, children: [{ text: '' }] }]);
