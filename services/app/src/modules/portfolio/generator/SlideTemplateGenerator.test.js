import SlideTemplateGenerator from "./SlideTemplateGenerator";
import RemixFactory from "../../../common/remix/RemixFactory";
import { template } from "./Template";
import { IMAGE } from "../../composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { PARAGRAPH } from "../../composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('generates all permutations of a slide template', () => {
  RemixFactory();
  const { content } = new SlideTemplateGenerator().generate(template().with(PARAGRAPH, 1).with(IMAGE, 1))[0];
  expect(content).toBeDefined();
});
