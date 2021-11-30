import { Node, Transforms } from 'slate';
import { NodeTransforms } from "./NodeTransforms";
import EditorFactory from "../EditorFactory";
import { SLIDE } from "../../modules/plugins/component/slide/type";
import { PARAGRAPH } from "../../modules/plugins/component/paragraph/type";

const root = {
  children: [
    {
      type: 'paragraph',
      children: [
        { text: 'An opening paragraph with a ' },
        {
          type: 'link',
          url: 'https://example.com',
          children: [{ text: 'link' }],
        },
        { text: ' in it.' },
      ],
    },
    {
      type: 'block-quote',
      children: [{ text: 'A wise quote.' }],
    },
    {
      type: 'paragraph',
      children: [{ text: 'A closing paragraph!' }],
    },
    {
      type: 'bulleted-list',
      children: [
        {
          type: 'list-item',
          children: [{ text: 'List item 1' }],
        },
        {
          type: 'list-item',
          children: [{ text: 'List item 2' }],
        },
      ],
    }
  ]
};

it('finds the first text in a document', () => {
  const editor = {
    children: root.children,
    selection: {
      anchor: {
        path: [0, 0],
        offset: 0
      },
      focus: {
        path: [1, 0],
        offset: 0
      }
    }
  };
  expect(NodeTransforms.firstText(editor)).toEqual("An opening paragraph with a ");
  expect(NodeTransforms.firstText(editor, undefined)).toEqual("An opening paragraph with a ");
  expect(NodeTransforms.firstText(editor, [0])).toEqual("A wise quote.");
});

it('swaps two nodes identified by path', () => {
  const slide = {
    type: SLIDE,
    children: [
      {
        type: PARAGRAPH,
        children: [{ text: '0' }],
      },
      {
        type: PARAGRAPH,
        children: [{ text: '1' }],
      },
      {
        type: PARAGRAPH,
        children: [{ text: '2' }],
      },
      {
        type: PARAGRAPH,
        children: [{ text: '3' }],
      },
      {
        type: PARAGRAPH,
        children: [{ text: '4' }],
      },
    ],
  };
  const editor = EditorFactory.instance().createEditor("default");
  editor.insertNode(slide);

  NodeTransforms.swap(editor, [0, 0], [0, 0]);
  validateOrder(editor.children[0], [0, 1, 2, 3, 4]);
  NodeTransforms.swap(editor, [0, 3], [0, 0]);
  validateOrder(editor.children[0], [3, 1, 2, 0, 4]);
  NodeTransforms.swap(editor, [0, 0], [0, 3]);
  validateOrder(editor.children[0], [0, 1, 2, 3, 4]);

  // Check when moving to boundary.
  NodeTransforms.swap(editor, [0, 4], [0, 0]);
  validateOrder(editor.children[0], [4, 1, 2, 3, 0]);
  NodeTransforms.swap(editor, [0, 0], [0, 4]);
  validateOrder(editor.children[0], [0, 1, 2, 3, 4]);

  // Now let's add another slide.
  Transforms.insertNodes(editor, slide, { at: [1] });
  NodeTransforms.swap(editor, [0, 0], [1, 3]);
  validateOrder(editor.children[0], [3, 1, 2, 3, 4]);
  validateOrder(editor.children[1], [0, 1, 2, 0, 4]);
});

const validateOrder = (slide, expected) => {
  if (slide.children.length !== expected.length) {
    return false;
  }
  for (let i = 0; i < slide.children.length; i++) {
    if (Number.parseInt(Node.string(slide.children[i]), 10) !== i) {
      return false;
    }
  }
  return true;
};
