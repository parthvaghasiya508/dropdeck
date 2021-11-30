import { toggleList, unwrapList } from "@udecode/slate-plugins";
import { BOLD, CODE_MARK, ITALIC, MATH_MARK, STRIKETHROUGH } from "../../../component/marks/Marks";
import { listOptions } from "../../../blockFormatting/withBlockFormatting";
import { CODE } from "../../../component/code/type";
import { HEADING_ONE } from "../../../component/heading/one/type";
import { HEADING_TWO } from "../../../component/heading/two/type";
import { BULLETED_LIST } from "../../../component/list/bulleted/type";
import { NUMBERED_LIST } from "../../../component/list/numbered/type";
import { BLOCK_QUOTE } from "../../../component/quote/type";
import { LIST_ITEM } from "../../../component/list/type";

const preFormat = (editor) => unwrapList(editor, listOptions);

export const autoformatRules = [
  {
    type: HEADING_ONE,
    markup: '#',
    preFormat,
  },
  {
    type: HEADING_TWO,
    markup: '##',
    preFormat,
  },
  {
    type: LIST_ITEM,
    markup: ['*', '-', '+'],
    preFormat,
    format: (editor) => {
      toggleList(editor, { ...listOptions, typeList: BULLETED_LIST });
    },
  },
  {
    type: LIST_ITEM,
    markup: ['1.', '1)'],
    preFormat,
    format: (editor) => {
      toggleList(editor, { ...listOptions, typeList: NUMBERED_LIST });
    },
  },
  {
    type: BLOCK_QUOTE,
    markup: ['>'],
    preFormat,
  },
  {
    type: BOLD,
    between: ['**', '**'],
    mode: 'inline',
    insertTrigger: true,
  },
  {
    type: BOLD,
    between: ['__', '__'],
    mode: 'inline',
    insertTrigger: true,
  },
  {
    type: ITALIC,
    between: ['*', '*'],
    mode: 'inline',
    insertTrigger: true,
  },
  {
    type: ITALIC,
    between: ['_', '_'],
    mode: 'inline',
    insertTrigger: true,
  },
  {
    type: CODE_MARK,
    between: ['`', '`'],
    mode: 'inline',
    insertTrigger: true,
  },
  {
    type: STRIKETHROUGH,
    between: ['~', '~'],
    mode: 'inline',
    insertTrigger: true,
  },
  {
    trigger: '`',
    type: CODE,
    markup: '``',
    mode: 'inline-block',
    preFormat: (editor) => unwrapList(editor, listOptions),
  },
  {
    type: MATH_MARK,
    between: ['$', '$'],
    mode: 'inline',
    insertTrigger: true,
  },
];
