import { toSlide } from "../../utils/testUtils";
import { or, label, plainText, image, inOrder } from "../Matchers";
import { when } from "../RemixRule";
import { IMAGE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { PARAGRAPH } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should correctly identify labels', () => {
  const matcher = when(
    or(
      inOrder(label(plainText(), "text1"), label(image(), "img1")),
      inOrder(label(image(), "img2"), label(plainText(), "text2")),
    )
  );
  let [, labels] = matcher.evaluate(toSlide(PARAGRAPH, IMAGE));
  expect(labels).toBeDefined();
  expect(Object.keys(labels).length).toEqual(2);
  expect(labels['0']).toEqual("text1");
  expect(labels['1']).toEqual("img1");

  [, labels] = matcher.evaluate(toSlide(IMAGE, PARAGRAPH));
  expect(labels).toBeDefined();
  expect(Object.keys(labels).length).toEqual(2);
  expect(labels['0']).toEqual("img2");
  expect(labels['1']).toEqual("text2");

});
