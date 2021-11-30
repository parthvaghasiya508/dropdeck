import { SlideTransforms } from "./SlideTransforms";
import { SLIDE } from "../../modules/plugins/component/slide/type";
import { PARAGRAPH } from "../../modules/plugins/component/paragraph/type";

it('identifies empty slides', () => {
  const emptySlide = {
    type: SLIDE,
    children: [{
      type: PARAGRAPH,
      children: [{ text: '' }],
    }],
  };
  const editor = {
    children: [emptySlide],
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
  expect(SlideTransforms.isSlideEmpty(editor, emptySlide)).toBeTruthy();
});

it('identifies non-empty slides', () => {
  const nonEmptySlide = {
    type: SLIDE,
    children: [{
      type: PARAGRAPH,
      children: [{ text: 'Some text' }],
    }],
  };
  const editor = {
    children: [nonEmptySlide],
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
  expect(SlideTransforms.isSlideEmpty(editor, nonEmptySlide)).toBeFalsy();
});
