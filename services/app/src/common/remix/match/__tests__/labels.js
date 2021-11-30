import { cluster, headingOne, image, inOrder, label, paragraph } from "../Matchers";
import { when } from "../RemixRule";
import { someNumber } from "../expressions/Occurring";
import { toSlide } from "../../utils/testUtils";
import { IMAGE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('can apply labels to sections of a slide', () => {
  const slide = toSlide(HEADING_ONE, PARAGRAPH, IMAGE);
  const matcher = inOrder(
    label(
      inOrder(headingOne(), paragraph()),
      "group-text"
    ),
    image()
  );
  expect(when(matcher).matches(slide)).toBeTruthy();

  const [, labels] = when(matcher).evaluate(slide);
  expect(labels).toBeDefined();
  expect(labels['0']).toEqual("group-text");
  expect(labels['1']).toEqual("group-text");
  expect(labels['2']).toBeUndefined();

});

it('can apply labels to clusters within a slide', () => {
  const slide = toSlide(HEADING_ONE, PARAGRAPH, HEADING_ONE, PARAGRAPH, IMAGE);
  const matcher = inOrder(
    label(
      cluster(inOrder(headingOne(), paragraph()), someNumber),
      "group-text"
    ),
    image()
  );
  expect(when(matcher).matches(slide)).toBeTruthy();

  const [, labels] = when(matcher).evaluate(slide);
  expect(labels).toBeDefined();
  expect(labels['0']).toEqual("group-text");
  expect(labels['1']).toEqual("group-text");
  expect(labels['2']).toEqual("group-text");
  expect(labels['3']).toEqual("group-text");
  expect(labels['4']).toEqual("group-text");
  expect(labels['5']).toEqual("group-text");
  expect(labels['6']).toBeUndefined();

});
