import { IMAGE } from "../../modules/plugins/component/media/image/type";
import { SLIDE } from "../../modules/plugins/component/slide/type";
import { PARAGRAPH } from "../../modules/plugins/component/paragraph/type";
import { SegmentTransforms } from "./SegmentTransforms";

it('splits up a range on slide boundaries', () => {

  const children = [
    {
      type: SLIDE,
      children: [
        {
          type: PARAGRAPH,
          children: [{ text: 'First paragraph' }],
        },
        {
          type: IMAGE,
          children: [{ text: '' }],
        },
      ],
    },
    {
      type: SLIDE,
      children: [
        {
          type: PARAGRAPH,
          children: [{ text: 'Third paragraph' }],
        },
        {
          type: PARAGRAPH,
          children: [{ text: 'Fourth paragraph' }],
        },
        {
          type: PARAGRAPH,
          children: [{ text: 'Fifth paragraph' }],
        },
      ],
    }
  ];

  const editor = {
    isVoid: (node) => node.type === IMAGE,
    children,
  };
  const range = {
    anchor: {
      path: [0, 0, 0],
      offset: 6,
    },
    focus: {
      path: [1, 1, 0],
      offset: 5,
    }
  };
  const segments = SegmentTransforms.segment(editor, range, (node) => (editor.isVoid(node) ? 'void' : 'text'));
  expect(segments.length).toEqual(3);
  expect(segments[0].category).toEqual('text');
  expect(segments[0].range).toEqual({
    anchor: {
      path: [0, 0, 0],
      offset: 6,
    },
    focus: {
      path: [0, 0, 0],
      offset: 15,
    }
  });

  expect(segments[1].category).toEqual('void');
  expect(segments[1].range).toEqual({
    anchor: {
      path: [0, 1, 0],
      offset: 0,
    },
    focus: {
      path: [0, 1, 0],
      offset: 0,
    }
  });

  expect(segments[2].category).toEqual('text');
  expect(segments[2].range).toEqual({
    anchor: {
      path: [1, 0, 0],
      offset: 0,
    },
    focus: {
      path: [1, 1, 0],
      offset: 5,
    }
  });

});
