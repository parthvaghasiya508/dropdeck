import { componentBuilder, ComponentBuilder } from "./ComponentBuilder";
import { HEADING_ONE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('creates a builder method for every component plugin', () => {
  const componentBuilder = new ComponentBuilder();
  const titleNode = componentBuilder.title('Hello world');
  expect(titleNode).toBeDefined();
  expect(titleNode.type).toEqual(HEADING_ONE);
  expect(titleNode.children).toBeDefined();
  expect(titleNode.children[0]).toBeDefined();
  expect(titleNode.children[0].text).toEqual("Hello world");
});

it('creates a slide object with dynamic entries', () => {
  const slide = componentBuilder()
    .slide()
    .title("Sales update")
    .paragraph("Details to follow")
    .build();
  expect(slide).toBeDefined();
  expect(slide.children.length).toEqual(2);
  expect(slide.children[0].type).toEqual(HEADING_ONE);
  expect(slide.children[0].children[0].text).toEqual("Sales update");
  expect(slide.children[1].type).toEqual(PARAGRAPH);
  expect(slide.children[1].children[0].text).toEqual("Details to follow");
});
