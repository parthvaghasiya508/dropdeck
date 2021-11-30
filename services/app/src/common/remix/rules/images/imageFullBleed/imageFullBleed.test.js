import { toSlide, toSlideRelativeTo } from "../../../utils/testUtils";
import { imageFullBleedRemix } from "./imageFullBleed";
import { IMAGE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text and one image', () => {
  expect(imageFullBleedRemix.matches(toSlideRelativeTo(imageFullBleedRemix, HEADING_ONE, PARAGRAPH, IMAGE))).toBeTruthy();
  expect(imageFullBleedRemix.matches(toSlideRelativeTo(imageFullBleedRemix, HEADING_ONE, PARAGRAPH, IMAGE, PARAGRAPH))).toBeTruthy();

  const [, labels] = imageFullBleedRemix.evaluate(toSlideRelativeTo(imageFullBleedRemix, HEADING_ONE, PARAGRAPH, IMAGE, PARAGRAPH));
  expect(labels).toBeDefined();
  expect(Object.keys(labels).length).toEqual(3);
  expect(labels['1']).toEqual("group-text-before");
  expect(labels['2']).toEqual("group-text-before");
  expect(labels['3']).toEqual("group-text-before");
});

it('should match a slide with a single image', () => {
  const [, labels] = imageFullBleedRemix.evaluate(toSlide(IMAGE));
  expect(labels).toBeDefined();
  expect(Object.keys(labels).length).toEqual(0);
});

it('should match a slide with a single image and text', () => {
  const [, labels] = imageFullBleedRemix.evaluate(toSlide(IMAGE, PARAGRAPH));
  expect(labels).toBeDefined();
  expect(Object.keys(labels).length).toEqual(1);
  expect(labels['1']).toEqual("group-text-before");
});
