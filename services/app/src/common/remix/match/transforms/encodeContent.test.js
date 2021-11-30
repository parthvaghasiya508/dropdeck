import { applyClustering } from "../../../slide/transforms/clustering/clustering";
import { encodeContent, extractIndices } from "./encodeContent";
import { IMAGE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { HEADING_ONE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should encode a slide with clusters to string', () => {
  const nodes = applyClustering([
    { type: IMAGE },
    { type: HEADING_ONE },
    { type: IMAGE },
    { type: IMAGE },
    { type: HEADING_ONE }
  ]);
  expect(encodeContent(nodes)).toEqual('{[img#1][h1#2]#0}[img#3]{[img#5][h1#6]#4}');
});

it('should encode a slide with clustered sequences to string', () => {
  const nodes = applyClustering([
    { type: PARAGRAPH },
    { type: PARAGRAPH },
    { type: PARAGRAPH },
    { type: PARAGRAPH },
  ]);
  expect(encodeContent(nodes)).toEqual('[p#0][p#1][p#2][p#3]');
});

it('should encode an empty slide to an empty string', () => {
  const nodes = applyClustering([]);
  expect(encodeContent(nodes)).toEqual('');
});

it('should extract an array of indices from a string encoding', () => {
  expect(extractIndices('{[h1#0][p#1]#2}')).toEqual(['0', '1', '2']);
});
