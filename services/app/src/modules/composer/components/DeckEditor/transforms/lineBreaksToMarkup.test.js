import { toHtml } from "../../../../../common/slide/transforms/toHtml";
import { lineBreaksToMarkup } from "./lineBreaksToMarkup";

it('escapes text', () => {
  expect(lineBreaksToMarkup('First line\nSecond line')).toEqual('First line<br/>Second line');
});
