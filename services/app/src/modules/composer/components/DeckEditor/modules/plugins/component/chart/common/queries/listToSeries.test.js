import { Node } from "slate";
import { parseDataPoint } from "./parseDataPoint";
import { listToSeries } from "./listToSeries";
import { BULLETED_LIST } from "../../../list/bulleted/type";
import { LIST_ITEM } from "../../../list/type";
import { PARAGRAPH } from "../../../paragraph/type";

it('parses a flat list of nodes', () => {
  const listNode = {
    children: [
      {
        type: LIST_ITEM,
        children: [{
          type: PARAGRAPH,
          children: [{ text: 'A, 1' }]
        }]
      },
      {
        type: LIST_ITEM,
        children: [{
          type: PARAGRAPH,
          children: [{ text: 'B, 2' }]
        }]
      },
      {
        type: LIST_ITEM,
        children: [{
          type: PARAGRAPH,
          children: [{ text: 'C, 3' }]
        }]

      },
    ]
  };
  const data = listToSeries(listNode);
  expect(data.length).toEqual(3);
  expect(data[0].children).toBeUndefined();

});

it('parses a nested list of nodes', () => {
  const listNode = {
    children: [
      {
        type: LIST_ITEM,
        children: [{
          type: PARAGRAPH,
          children: [{ text: 'A' }]
        }, {
          type: BULLETED_LIST,
          children: [{
            type: LIST_ITEM,
            children: [{
              type: PARAGRAPH,
              children: [{ text: 'A1, 1' }]
            }]
          }]
        }]
      },
      {
        type: LIST_ITEM,
        children: [{
          type: PARAGRAPH,
          children: [{ text: 'B, 2' }]
        }]
      },
      {
        type: LIST_ITEM,
        children: [{
          type: PARAGRAPH,
          children: [{ text: 'C, 3' }]
        }]

      },
    ]
  };
  const data = listToSeries(listNode, BULLETED_LIST);
  expect(data.length).toEqual(3);
  expect(data[0].children).toBeDefined();
  expect(data[0].children.length).toBe(1);
  expect(data[0].children[0].label).toBe('A1');

});
