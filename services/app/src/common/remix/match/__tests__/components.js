import { headingOne, image, inOrder, text } from "../Matchers";
import { when } from "../RemixRule";
import { Occurring } from "../expressions/Occurring";
import { toSlide } from "../../utils/testUtils";
import { IMAGE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('can match a slide with a rule', () => {
  const imageHeading = toSlide(IMAGE, HEADING_ONE);
  expect(when(image()).matches(imageHeading)).toBeFalsy();
  expect(when(image(), headingOne()).matches(imageHeading)).toBeTruthy();
  expect(when(image(), headingOne()).score(10).matches(imageHeading)).toBeTruthy();
  expect(when(image(), headingOne()).matches(imageHeading)).toBeTruthy();
  expect(when(image(), headingOne(Occurring.someNumber)).matches(imageHeading)).toBeTruthy();
  expect(when(image(), headingOne(Occurring.exactly(2))).matches(imageHeading)).toBeFalsy();

  const headingImageHeading = toSlide(HEADING_ONE, IMAGE, HEADING_ONE);
  expect(when(image()).matches(headingImageHeading)).toBeFalsy();
  expect(when(inOrder(image(), headingOne())).matches(headingImageHeading)).toBeFalsy();
  expect(when(inOrder(headingOne(), image(), headingOne())).matches(headingImageHeading)).toBeTruthy();

  const imageHeadings = toSlide(IMAGE, HEADING_ONE, HEADING_ONE);
  expect(when(image()).matches(imageHeadings)).toBeFalsy();
  expect(when(image(), headingOne()).matches(imageHeadings)).toBeFalsy();
  expect(when(image(), headingOne(Occurring.exactly(2))).matches(imageHeadings)).toBeTruthy();
  expect(when(image(), headingOne(Occurring.atLeast(2))).matches(imageHeadings)).toBeTruthy();
  expect(when(image(), headingOne(Occurring.atMost(2))).matches(imageHeadings)).toBeTruthy();
  expect(when(image(), headingOne(Occurring.atMost(1))).matches(imageHeadings)).toBeFalsy();

});

it('can match a slide with a text rule', () => {
  const slide = toSlide(HEADING_ONE, PARAGRAPH);
  expect(when(text()).matches(slide)).toBeFalsy();
  expect(when(text(Occurring.exactly(2))).matches(slide)).toBeTruthy();
  expect(when(text(Occurring.exactly(1))).matches(slide)).toBeFalsy();
});
