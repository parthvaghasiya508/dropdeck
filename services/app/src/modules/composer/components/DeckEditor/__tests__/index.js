import assert from 'assert';
import { createHyperscript } from 'slate-hyperscript';
import { fixtures } from '../../../../../../support/fixtures';
import EditorFactory from "../services/EditorFactory";
import { IMAGE } from "../modules/plugins/component/media/image/type";
import { SLIDE } from "../modules/plugins/component/slide/type";
import { CODE } from "../modules/plugins/component/code/type";
import { HEADING_ONE } from "../modules/plugins/component/heading/one/type";
import { BULLETED_LIST } from "../modules/plugins/component/list/bulleted/type";
import { MATH } from "../modules/plugins/component/math/type";
import { BLOCK_QUOTE } from "../modules/plugins/component/quote/type";
import { LIST_ITEM } from "../modules/plugins/component/list/type";
import { PARAGRAPH } from "../modules/plugins/component/paragraph/type";
import { GROUP_COLLECTION } from "../modules/plugins/component/groups/type";
import { GROUP } from "../modules/plugins/component/groups/components/group/type";
import { TableType } from "../modules/plugins/component/table/type";

describe('test', () => {

  fixtures(__dirname, 'editor', ({ name, path, module }) => {

    const { input, run, output } = module;
    const editor = withTest(input);
    run(editor);
    assert.deepEqual(normalize(editor.children), normalize(output.children));
    // assert.deepEqual(normalize(editor.selection), normalize(output.selection));
  });
});

const withTest = (editor) => {
  editor = EditorFactory.instance().createEditor('default', editor);
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => (element.inline === true ? true : isInline(element));
  editor.isVoid = (element) => (element.isVoid === true ? true : isVoid(element));

  return editor;
};

export const jsx = createHyperscript({
  elements: {
    slide: { type: SLIDE },
    collection: { type: GROUP_COLLECTION },
    group: { type: GROUP },
    paragraph: { type: PARAGRAPH },
    math: { type: MATH },
    code: { type: CODE },
    bulletedList: { type: BULLETED_LIST },
    li: { type: LIST_ITEM },
    inline: { inline: true },
    imageElement: { type: IMAGE },
    title: { type: HEADING_ONE },
    quote: { type: BLOCK_QUOTE },

    // Tables
    table: { type: TableType.TABLE },
    tr: { type: TableType.ROW },
    td: { type: TableType.CELL },

  },
});

/*
 * Remove __self and __source references from module output.
 */
const normalize = (obj) => {
  if (obj === null) {
    return null;
  }
  if (Array.isArray(obj)) {
    const newArray = [obj.length];
    for (let i = 0; i < obj.length; i++) {
      newArray[i] = normalize(obj[i]);
    }
    return newArray;
  }
  if (typeof obj === 'object' || typeof obj === 'function') {
    const keys = Object.keys(obj);
    const newObject = {};
    keys.forEach((key) => {
      if (key !== '__self' && key !== '__source' && key !== 'id') {
        newObject[key] = normalize(obj[key]);
      }
    });
    return newObject;
  }
  return obj;
};
