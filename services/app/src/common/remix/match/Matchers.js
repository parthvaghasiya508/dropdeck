import { Occurring } from "./expressions/Occurring";
import { ComponentMatcher } from "./expressions/ComponentMatcher";
import { OrMatcher } from "./expressions/OrMatcher";
import { ListMatcher } from "./expressions/ListMatcher";
import { ClusterMatcher } from "./expressions/ClusterMatcher";
import { GroupMatcher } from "./expressions/GroupMatcher";
import { AnyElementMatcher } from "./expressions/AnyElementMatcher";
import { SomeElementMatcher } from "./expressions/SomeElementMatcher";
import { LabelMatcher } from "./expressions/LabelMatcher";
import { IMAGE } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { LOGO } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/media/logo/type";
import { CODE } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/code/type";
import { HEADING_ONE } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { BULLETED_LIST } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/list/bulleted/type";
import { NUMBERED_LIST } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/list/numbered/type";
import { MATH } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/math/type";
import { LOGO_LIST } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/media/logoList/type";
import { VIDEO } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/media/video/type";
import { BLOCK_QUOTE } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/quote/type";
import { TableType } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/table/type";
import { PARAGRAPH } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";
import { CHART } from "../../../modules/composer/components/DeckEditor/modules/plugins/component/chart/type";

// Single component matchers
export const headingOne = (occurrence = Occurring.once) => new ComponentMatcher(HEADING_ONE, occurrence);
export const headingTwo = (occurrence = Occurring.once) => new ComponentMatcher(HEADING_TWO, occurrence);
export const paragraph = (occurrence = Occurring.once) => new ComponentMatcher(PARAGRAPH, occurrence);
export const image = (occurrence = Occurring.once) => new ComponentMatcher(IMAGE, occurrence);
export const math = (occurrence = Occurring.once) => new ComponentMatcher(MATH, occurrence);
export const logo = (occurrence = Occurring.once) => new ComponentMatcher(LOGO, occurrence);
export const logoList = (occurrence = Occurring.once) => new ComponentMatcher(LOGO_LIST, occurrence);
export const code = (occurrence = Occurring.once) => new ComponentMatcher(CODE, occurrence);
export const chart = (occurrence = Occurring.once) => new ComponentMatcher(CHART, occurrence);
export const quote = (occurrence = Occurring.once) => new ComponentMatcher(BLOCK_QUOTE, occurrence);
export const bulletedList = (occurrence = Occurring.once) => new ComponentMatcher(BULLETED_LIST, occurrence);
export const numberedList = (occurrence = Occurring.once) => new ComponentMatcher(NUMBERED_LIST, occurrence);
export const video = (occurrence = Occurring.once) => new ComponentMatcher(VIDEO, occurrence);
export const table = (occurrence = Occurring.once) => new ComponentMatcher(TableType.TABLE, occurrence);

// Multi-component matchers
export const allComponentTypes = () => [
  PARAGRAPH,
  HEADING_ONE,
  HEADING_TWO,
  BLOCK_QUOTE,
  CHART,
  BULLETED_LIST,
  NUMBERED_LIST,
  CODE,
  IMAGE,
  VIDEO,
  MATH,
  LOGO_LIST,
  LOGO,
  TableType.TABLE,
];
export const allComponents = (occurrence = Occurring.once) => new ComponentMatcher(allComponentTypes(), occurrence);
export const allText = (occurrence = Occurring.once) => new ComponentMatcher([PARAGRAPH, HEADING_ONE, HEADING_TWO, BLOCK_QUOTE, BULLETED_LIST, NUMBERED_LIST, CODE, MATH], occurrence);
export const allTextLogo = (occurrence = Occurring.once) => new ComponentMatcher([PARAGRAPH, HEADING_ONE, HEADING_TWO, BLOCK_QUOTE, BULLETED_LIST, NUMBERED_LIST, CODE, MATH, LOGO], occurrence);
export const allTextTable = (occurrence = Occurring.once) => new ComponentMatcher([PARAGRAPH, HEADING_ONE, HEADING_TWO, BLOCK_QUOTE, BULLETED_LIST, NUMBERED_LIST, CODE, MATH, TableType.TABLE], occurrence);
export const allTextNoCode = (occurrence = Occurring.once) => new ComponentMatcher([PARAGRAPH, HEADING_ONE, HEADING_TWO, BLOCK_QUOTE, BULLETED_LIST, NUMBERED_LIST, MATH], occurrence);
export const allTextNoMath = (occurrence = Occurring.once) => new ComponentMatcher([PARAGRAPH, HEADING_ONE, HEADING_TWO, BLOCK_QUOTE, BULLETED_LIST, NUMBERED_LIST, CODE], occurrence);
export const textList = (occurrence = Occurring.once) => new ComponentMatcher([PARAGRAPH, HEADING_ONE, HEADING_TWO, BLOCK_QUOTE, BULLETED_LIST, NUMBERED_LIST], occurrence);
export const text = (occurrence = Occurring.once) => new ComponentMatcher([PARAGRAPH, HEADING_ONE, HEADING_TWO, BLOCK_QUOTE], occurrence);
export const plainText = (occurrence = Occurring.once) => new ComponentMatcher([PARAGRAPH, HEADING_ONE, HEADING_TWO], occurrence);
export const list = (occurrence = Occurring.once) => new ComponentMatcher([BULLETED_LIST, NUMBERED_LIST], occurrence);
export const heading = (occurrence = Occurring.once) => new ComponentMatcher([HEADING_ONE, HEADING_TWO], occurrence);
export const codeParagraph = (occurrence = Occurring.once) => new ComponentMatcher([PARAGRAPH, CODE], occurrence);
export const imageLogo = (occurrence = Occurring.once) => new ComponentMatcher([IMAGE, LOGO], occurrence);
export const imageMath = (occurrence = Occurring.once) => new ComponentMatcher([IMAGE, MATH], occurrence);
export const tableChart = (occurrence = Occurring.once) => new ComponentMatcher([TableType.TABLE, CHART], occurrence);
export const imageLogoMath = (occurrence = Occurring.once) => new ComponentMatcher([IMAGE, LOGO, MATH], occurrence);
export const media = (occurrence = Occurring.once) => new ComponentMatcher([IMAGE, LOGO, VIDEO], occurrence);
export const headingTwoParagraph = (occurrence = Occurring.once) => new ComponentMatcher([PARAGRAPH, HEADING_TWO], occurrence);
export const headingTwoParagraphQuote = (occurrence = Occurring.once) => new ComponentMatcher([PARAGRAPH, HEADING_TWO, BLOCK_QUOTE], occurrence);
export const headingParagraphQuoteCodeMath = (occurrence = Occurring.once) => new ComponentMatcher([PARAGRAPH, HEADING_ONE, HEADING_TWO, BLOCK_QUOTE, CODE, MATH], occurrence);
export const headingTwoParagraphQuoteCodeMath = (occurrence = Occurring.once) => new ComponentMatcher([PARAGRAPH, HEADING_TWO, BLOCK_QUOTE, CODE, MATH], occurrence);

// Boolean matchers
export const or = (...matchers) => new OrMatcher(...matchers);

// Structural matchers
export const inOrder = (...matchers) => new ListMatcher(...matchers);
export const cluster = (matcher, occurrence) => new ClusterMatcher(matcher, occurrence);
export const group = (matcher, occurrence) => new GroupMatcher(matcher, occurrence);
export const label = (matcher, name) => new LabelMatcher(matcher, name);

// Utility matchers
export const anyElement = () => new AnyElementMatcher();
export const someElement = () => new SomeElementMatcher();
