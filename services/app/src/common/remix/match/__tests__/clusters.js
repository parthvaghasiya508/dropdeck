import { anyElement, cluster, group, image, inOrder, paragraph } from "../Matchers";
import { when } from "../RemixRule";
import { Occurring } from "../expressions/Occurring";
import { toSlide } from "../../utils/testUtils";
import { IMAGE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('can match a slide with interleaved clusters', () => {
  const mixedClusters = toSlide(IMAGE, PARAGRAPH, IMAGE, HEADING_ONE, IMAGE, PARAGRAPH);
  expect(when(
    group(
      inOrder(
        cluster(inOrder(image(), paragraph())),
        anyElement()
      ), Occurring.exactly(2)
    )
  ).matches(mixedClusters)).toBeTruthy();
});

it('can match a slide with a sequence of clusters', () => {
  const sequenceOfClusters = toSlide(IMAGE, PARAGRAPH, IMAGE, PARAGRAPH);
  expect(when(
    group(
      cluster(inOrder(image(), paragraph())),
      Occurring.exactly(2)
    )
  ).matches(sequenceOfClusters)).toBeTruthy();

});
