import assert from 'assert';
import { createHyperscript } from 'slate-hyperscript';
import { fixtures } from "../../../../../../../../../support/fixtures";
import EditorFactory from "../../../../services/EditorFactory";
import { IMAGE } from "../../component/media/image/type";
import { SLIDE } from "../../component/slide/type";
import { CODE } from "../../component/code/type";
import { HEADING_ONE } from "../../component/heading/one/type";
import { BULLETED_LIST } from "../../component/list/bulleted/type";
import { MATH } from "../../component/math/type";
import { BLOCK_QUOTE } from "../../component/quote/type";
import { LIST_ITEM } from "../../component/list/type";
import { PARAGRAPH } from "../../component/paragraph/type";

describe('undo', () => {

  fixtures(__dirname, 'undo', ({ name, path, module }) => {

    const { input, run, output } = module;
    const editor = withTest(input);
    run(editor);
    editor.undo(); // undo changes
    assert.deepEqual(normalize(editor.children), normalize(output.children));
    assert.deepEqual(normalize(editor.selection), normalize(output.selection));
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
    slide: { type: SLIDE, settings: {} },
    paragraph: { type: PARAGRAPH },
    math: { type: MATH },
    code: { type: CODE },
    bulletedList: { type: BULLETED_LIST },
    li: { type: LIST_ITEM },
    inline: { inline: true },
    imageElement: { type: IMAGE },
    title: { type: HEADING_ONE },
    quote: { type: BLOCK_QUOTE },

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
