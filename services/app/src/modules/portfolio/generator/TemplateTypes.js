import { generateHeadings } from "./types/headingOne";
import { generateSubHeadings } from "./types/headingTwo";
import { generateParagraphs } from "./types/paragraph";
import { generateLists } from "./types/list";
import { generateQuotes } from "./types/quote";
import { generateLogo } from "./types/logo";
import { generateLogos } from "./types/logoList";
import { generateVideos } from "./types/video";
import { IMAGE } from "../../composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { LOGO } from "../../composer/components/DeckEditor/modules/plugins/component/media/logo/type";
import { HEADING_ONE } from "../../composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../../composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { BULLETED_LIST } from "../../composer/components/DeckEditor/modules/plugins/component/list/bulleted/type";
import { NUMBERED_LIST } from "../../composer/components/DeckEditor/modules/plugins/component/list/numbered/type";
import { LOGO_LIST } from "../../composer/components/DeckEditor/modules/plugins/component/media/logoList/type";
import { VIDEO } from "../../composer/components/DeckEditor/modules/plugins/component/media/video/type";
import { BLOCK_QUOTE } from "../../composer/components/DeckEditor/modules/plugins/component/quote/type";
import { PARAGRAPH } from "../../composer/components/DeckEditor/modules/plugins/component/paragraph/type";
import { generateImages } from "./types/image";

export const TemplateTypes = {
  [HEADING_ONE]: {
    labelSingular: 'heading',
    labelPlural: 'headings',
    elements: generateHeadings(HEADING_ONE),
  },
  [HEADING_TWO]: {
    labelSingular: 'subheading',
    labelPlural: 'subheadings',
    elements: generateSubHeadings(HEADING_TWO),
  },
  [PARAGRAPH]: {
    labelSingular: 'paragraph',
    labelPlural: 'paragraphs',
    elements: generateParagraphs,
  },
  [IMAGE]: {
    labelSingular: 'image',
    labelPlural: 'images',
    elements: generateImages,
  },
  [LOGO]: {
    labelSingular: 'logo',
    labelPlural: 'logos',
    elements: generateLogo,
  },
  [LOGO_LIST]: {
    labelSingular: 'logo list',
    labelPlural: 'logo lists',
    elements: generateLogos,
  },
  [BULLETED_LIST]: {
    labelSingular: 'list',
    labelPlural: 'lists',
    elements: generateLists(BULLETED_LIST),
  },
  [NUMBERED_LIST]: {
    labelSingular: 'numbered list',
    labelPlural: 'numbered lists',
    elements: generateLists(NUMBERED_LIST),
  },
  [BLOCK_QUOTE]: {
    labelSingular: 'quote',
    labelPlural: 'quotes',
    elements: generateQuotes(),
  },
  [VIDEO]: {
    labelSingular: 'video',
    labelPlural: 'videos',
    elements: generateVideos,
  }

};
