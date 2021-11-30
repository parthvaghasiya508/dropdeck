import marked from 'marked';
import { insertDeserializedData } from "../transforms/insertDeserializedData";
import { parseHtml } from "../html/parseHtml";
import { htmlDeserialize } from "../html/htmlDeserialize";
import { markdownRenderer } from "./utils/markdownRenderer";

export const withDeserializeMarkdown = (plugins) => (editor) => {
  const { insertData } = editor;

  const deserializer = insertDeserializedData({
    deserialize: htmlDeserialize(plugins),
    parseBody: (data) => {
      const content = data.getData('text/plain');
      if (content) {
        marked.use({
          headerIds: false,
          smartLists: true,
          renderer: markdownRenderer,
        });
        const html = marked(content);
        return parseHtml(html);
      }
      return {};
    },
    split: true,
  });

  editor.insertData = deserializer(editor, insertData);
  return editor;
};
