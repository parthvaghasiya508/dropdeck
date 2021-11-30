import { Element, Node } from 'slate';
import { EditorTransforms } from "./EditorTransforms";

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

it('finds the current container element', () => {
  const editor = {
    children: root.children,
    selection: {
      anchor: {
        path: [1, 0],
        offset: 0
      },
      focus: {
        path: [1, 0],
        offset: 0
      }
    }
  };
  expect(EditorTransforms.activeElementNode(editor)).not.toBeNull();
  expect(Element.isElement(EditorTransforms.activeElementNode(editor))).toEqual(true);
  expect(Node.string(EditorTransforms.activeElementNode(editor))).toEqual('A wise quote.');
});

it('finds the current node', () => {
  const editor = {
    children: root.children,
    selection: {
      anchor: {
        path: [1, 0],
        offset: 0
      },
      focus: {
        path: [1, 0],
        offset: 0
      }
    }
  };
  expect(EditorTransforms.activeNode(editor)).not.toBeNull();
  expect(Element.isElement(EditorTransforms.activeNode(editor))).toEqual(false);
  expect(EditorTransforms.activeNode(editor).text).toEqual('A wise quote.');
});

it('finds the previous sibling of the top-level ancestor of the current node', () => {
  const editor = {
    children: [
      {
        type: 'slide',
        children: root.children,
      }
    ],
    selection: {
      anchor: {
        path: [0, 3, 0, 0],
        offset: 0
      },
      focus: {
        path: [0, 3, 0, 0],
        offset: 0
      }
    }
  };
  const [node, path] = EditorTransforms.previousContainerAncestor(editor);
  expect(path).not.toBeUndefined();
  expect(path).toEqual([0, 2]);
  expect(node).not.toBeUndefined();
  expect(node).not.toBeNull();
  expect(node.children).not.toBeNull();
  expect(node.type).toEqual('paragraph');
  expect(Node.string(node)).toEqual('A closing paragraph!');
});

it('does not find a sibling of the top-level ancestor of the current node', () => {
  const editor = {
    children: root.children,
    selection: {
      anchor: {
        path: [0, 0],
        offset: 0
      },
      focus: {
        path: [0, 0],
        offset: 0
      }
    }
  };
  expect(EditorTransforms.previousContainerAncestor(editor)[0]).toBeUndefined();
});

it('handles invalid selection ranges when finding the current node', () => {
  const editor = {
    children: [{
      type: 'slide',
      children: root.children,
    }],
    selection: {
      anchor: {
        path: [0, 1, 0],
        focus: 0
      },
      focus: null
    }
  };
  expect(EditorTransforms.activeElementNode(editor)).toBeUndefined();
});

it('finds the previous sibling of a node', () => {
  const editor = {
    children: root.children,
    selection: {
      anchor: {
        path: [3, 1, 0],
        offset: 0
      },
      focus: {
        path: [3, 1, 0],
        offset: 0
      }
    }
  };
  const currentElement = EditorTransforms.activeElementNode(editor);
  expect(currentElement).not.toBeUndefined();
  expect(Node.string(currentElement)).toEqual('List item 2');
  const previousSibling = EditorTransforms.previousSibling(editor);
  expect(previousSibling).not.toBeUndefined();
  expect(Node.string(previousSibling)).toEqual('List item 1');
});

it('calculates the number of leaf nodes in a tree', () => {
  expect(EditorTransforms.size(root)).toEqual(7);
  expect(EditorTransforms.size({ children: [] })).toEqual(0);
});
