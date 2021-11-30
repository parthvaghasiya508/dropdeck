import { parseHtml } from "./parseHtml";
import { htmlDeserialize } from "./htmlDeserialize";
import ComponentService from "../../../../../../../../common/api/plugins/ComponentService";

it('splits a fragment with <hr> elements into slides', () => {
  const html = '<html>' +
    '<h1>Title</h1>' +
    '<ul>' +
    '<li>First list item</li>' +
    '<li>Second list item</li>' +
    '</ul>' +
    '</html>';
  const { body } = parseHtml(html);
  const fragment = htmlDeserialize(ComponentService.instance().components)(body);
});
