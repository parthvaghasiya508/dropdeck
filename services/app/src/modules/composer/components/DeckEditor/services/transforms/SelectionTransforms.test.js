import { SelectionTransforms } from "./SelectionTransforms";

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

const slide = {
  id: '123',
  children: [root],
};

it('determines a nested element', () => {
  expect(SelectionTransforms.isCurrentSelectionNested({
    children: [slide],
    selection: {
      anchor: {
        path: [0, 0, 0],
        offset: 0
      },
      focus: {
        path: [0, 1, 0],
        offset: 0
      }
    }
  })).toBeFalsy();

  expect(SelectionTransforms.isCurrentSelectionNested({
    children: [slide],
    selection: {
      anchor: {
        path: [0, 0, 0],
        offset: 0
      },
      focus: {
        path: [0, 3, 0, 0],
        offset: 0
      }
    }
  })).toBeFalsy();
});

it('finds the path and offset of the last leaf in a node tree', () => {
  const editor = {
    isVoid: (node) => false,
  };
  const node = root.children[3];
  const { path, offset } = SelectionTransforms.endOf(editor, node);
  expect(path).toEqual([1, 0]);
  expect(offset).toEqual('List item 2'.length);

});

it('finds the path and offset of the last leaf in a simple node', () => {
  const editor = {
    isVoid: (node) => false,
  };
  const node = { type: 'block-quote', children: [{ text: 'To be or not to be' }] };
  const { path, offset } = SelectionTransforms.endOf(editor, node);
  expect(path).toEqual([0]);
  expect(offset).toEqual('To be or not to be'.length);

});

it('finds the end location of the last element at a location', () => {
  const editor = {
    children: [{
      id: '123',
      children: root.children,
    }]
  };
  const location = SelectionTransforms.lastLocation(editor, [0]);
  expect(location).toBeDefined();
  expect(location.path).toBeDefined();
  expect(location.path).toEqual([0, 3, 1, 0]);
  expect(location.offset).toEqual('List item 2'.length);
});
