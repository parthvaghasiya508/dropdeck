import { htmlDeserialize } from "./htmlDeserialize";
import { insertDeserializedData } from "../transforms/insertDeserializedData";
import { parseHtml } from "./parseHtml";

export const CLASS_NOT_COPIED = "not-copied";

export const withDeserializeHtml = (plugins) => (editor) => {
  const { insertData } = editor;

  const deserializer = insertDeserializedData({
    deserialize: htmlDeserialize(plugins),
    parseBody: (data) => {
      const html = data.getData('text/html');
      return parseHtml(html);
    },
    split: true,
  });

  editor.insertData = deserializer(editor, insertData);
  return editor;
};
