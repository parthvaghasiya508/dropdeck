import { Deck } from "../../../../../../../../common/model/Deck";
import { filterEmptyNodes } from "./filterEmptyNodes";
import { HEADING_ONE } from "../../component/heading/one/type";
import { PARAGRAPH } from "../../component/paragraph/type";

it('filters out empty nodes from a list of nodes', () => {
  const editor = {
    isVoid: (node) => false,
  };

  const nodes = [
    {
      type: HEADING_ONE,
      children: [{ text: 'Hello world' }],
    },
    {
      type: PARAGRAPH,
      children: [{ text: '' }],
    },
    {
      type: PARAGRAPH,
      children: [{ text: 'X' }],
    },
  ];

  expect(filterEmptyNodes(editor, nodes).length).toEqual(nodes.length - 1);
});
