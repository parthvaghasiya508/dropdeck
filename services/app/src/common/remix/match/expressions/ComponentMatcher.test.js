import { Occurring } from "./Occurring";
import { componentCode } from "../transforms/encodeContent";
import { Matcher } from "./Matcher";
import { ComponentMatcher } from "./ComponentMatcher";
import { HEADING_ONE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { VIDEO } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/video/type";

it('should create a valid regular expression for a component', () => {
  expect(new ComponentMatcher(HEADING_ONE, Occurring.optional).expression).toEqual(/(?:\[h1#[0-9]+\])?/);
  expect(new ComponentMatcher(HEADING_ONE).expression).toEqual(/(?:\[h1#[0-9]+\])/);
  expect(new ComponentMatcher(VIDEO, Occurring.between(1, 3)).expression).toEqual(/(?:\[video#[0-9]+\]){1,3}/);
});
