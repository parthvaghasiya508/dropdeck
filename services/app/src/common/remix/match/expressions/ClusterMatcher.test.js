import { Occurring } from "./Occurring";
import { ComponentMatcher } from "./ComponentMatcher";
import { AnyElementMatcher } from "./AnyElementMatcher";
import { ClusterMatcher } from "./ClusterMatcher";
import { IMAGE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";

it('should create a cluster expression', () => {
  expect(new ClusterMatcher(new AnyElementMatcher()).expression).toEqual(/(?:\{[^\{\}]*#[0-9]+\})/);
  expect(new ClusterMatcher(new ComponentMatcher(IMAGE, Occurring.exactly(2))).expression).toEqual(/(?:\{(?:\[img#[0-9]+\]){2}#[0-9]+\})/);
});
