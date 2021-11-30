import { template } from "./generator/Template";
import { IMAGE } from "../composer/components/DeckEditor/modules/plugins/component/media/image/type";
import { LOGO } from "../composer/components/DeckEditor/modules/plugins/component/media/logo/type";
import { HEADING_ONE } from "../composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { HEADING_TWO } from "../composer/components/DeckEditor/modules/plugins/component/heading/two/type";
import { BULLETED_LIST } from "../composer/components/DeckEditor/modules/plugins/component/list/bulleted/type";
import { NUMBERED_LIST } from "../composer/components/DeckEditor/modules/plugins/component/list/numbered/type";
import { LOGO_LIST } from "../composer/components/DeckEditor/modules/plugins/component/media/logoList/type";
import { VIDEO } from "../composer/components/DeckEditor/modules/plugins/component/media/video/type";
import { BLOCK_QUOTE } from "../composer/components/DeckEditor/modules/plugins/component/quote/type";
import { PARAGRAPH } from "../composer/components/DeckEditor/modules/plugins/component/paragraph/type";

export default class TemplateFactory {

  constructor() {
    TemplateFactory.__singleton = this;
    this.templates = {};
    this.init();
  }

  static instance() {
    return TemplateFactory.__singleton === undefined ? new TemplateFactory() : TemplateFactory.__singleton;
  }

  add(template) {
    const { id } = template;
    if (!this.templates.hasOwnProperty(id)) {
      this.templates[id] = template;
    }
    return this;
  }

  init() {

    // =====================
    // Single Element Slides
    // =====================

    // Structure:
    // - 1 x h1
    this.add(template().with(HEADING_ONE, 1));

    // Structure:
    // - 1 x h2
    this.add(template().with(HEADING_TWO, 1));

    // Structure:
    // - 1 x paragraph
    this.add(template().with(PARAGRAPH, 1));

    // Structure:
    // - 1 x ul
    this.add(template().with(BULLETED_LIST, 1));

    // Structure:
    // - 1 x ol
    this.add(template().with(NUMBERED_LIST, 1));

    // Structure:
    // - 1 x Image
    this.add(template().with(IMAGE, 1));

    // Structure:
    // - 1 x video
    this.add(template().with(VIDEO, 1));

    // Structure:
    // - 1 x Quote
    this.add(template().with(BLOCK_QUOTE, 1));

    // Structure:
    // - 4 x logos
    this.add(template().with(LOGO_LIST, 1));

    // Structure:
    // - 1 x Logo
    this.add(template().with(LOGO, 1));

    // =====================
    // Two Element Slides
    // =====================

    // Structure:
    // - 2 x h1
    this.add(template().with(HEADING_ONE, 2));

    // Structure:
    // - 2 x h2
    this.add(template().with(HEADING_TWO, 2));

    // Structure:
    // - 2 x paragraph
    this.add(template().with(PARAGRAPH, 2));

    // Structure:
    // - 2 x ul
    this.add(template().with(BULLETED_LIST, 2));

    // Structure:
    // - 2 x ol
    this.add(template().with(NUMBERED_LIST, 2));

    // Structure:
    // - 2 x Image
    this.add(template().with(IMAGE, 2));

    // Structure:
    // - 2 x Quote
    this.add(template().with(BLOCK_QUOTE, 2));

    // Structure:
    // - 2 x Logo
    this.add(template().with(LOGO, 2));

    // ==============================
    //  2 Component Combinations
    // ==============================

    // Structure:
    // - 1 x h1
    // - 1 x h2
    this.add(template().with(HEADING_ONE, 1).with(HEADING_TWO, 1));

    // Structure:
    // - 1 x h1
    // - 1 x paragraph
    this.add(template().with(HEADING_ONE, 1).with(PARAGRAPH, 1));

    // Structure:
    // - 1 x h1
    // - 1 x ul
    this.add(template().with(HEADING_ONE, 1).with(BULLETED_LIST, 1));

    // Structure:
    // - 1 x h1
    // - 1 x ol
    this.add(template().with(HEADING_ONE, 1).with(NUMBERED_LIST, 1));

    // Structure:
    // - 1 x h1
    // - 1 x image
    this.add(template().with(HEADING_ONE, 1).with(IMAGE, 1));

    // Structure:
    // - 1 x h1
    // - 1 x logo
    this.add(template().with(HEADING_ONE, 1).with(LOGO, 1));

    // Structure:
    // - 1 x image
    // - 1 x h1
    this.add(template().with(IMAGE, 1).with(HEADING_ONE, 1));

    // Structure:
    // - 1 x video
    // - 1 x image
    this.add(template().with(VIDEO, 1).with(IMAGE, 1));

    // Structure:
    // - 1 x h1
    // - 1 x video
    this.add(template().with(HEADING_ONE, 1).with(VIDEO, 1));

    // Structure:
    // - 1 x h1
    // - 1 x quote
    this.add(template().with(HEADING_ONE, 1).with(BLOCK_QUOTE, 1));

    // Structure:
    // - 1 x image
    // - 1 x quote
    this.add(template().with(IMAGE, 1).with(BLOCK_QUOTE, 1));

    // Structure:
    // - 1 x video
    // - 1 x h1
    this.add(template().with(VIDEO, 1).with(HEADING_ONE, 1));

    // Structure:
    // - 1 x h2
    // - 1 x paragraph
    this.add(template().with(HEADING_TWO, 1).with(PARAGRAPH, 1));

    // Structure:
    // - 1 x Image
    // - 1 x Paragraph
    this.add(template().with(IMAGE, 1).with(PARAGRAPH, 1));

    // Structure:
    // - 1 x Image
    // - 1 x Logo
    this.add(template().with(IMAGE, 1).with(LOGO, 1));

    // ==============================
    // 3 Components per Slide
    // ==============================

    // Structure:
    // - 3 x paragraph
    this.add(template().with(PARAGRAPH, 3));

    // Structure:
    // - 3 x Image
    this.add(template().with(IMAGE, 3));

    // Structure:
    // - 1 x image
    // - 1 x heading
    // - 1 x para
    this.add(template().with(IMAGE, 1).with(HEADING_ONE, 1).with(PARAGRAPH, 1));

    // Structure:
    // - 1 x image
    // - 1 x heading
    // - 1 x subheading
    this.add(template().with(IMAGE, 1).with(HEADING_ONE, 1).with(HEADING_TWO, 1));

    // Structure:
    // - 1 x logo
    // - 1 x heading
    // - 1 x para
    this.add(template().with(LOGO, 1).with(HEADING_ONE, 1).with(PARAGRAPH, 1));

    // Structure:
    // - 1 x logo
    // - 1 x heading
    // - 1 x heading2
    this.add(template().with(LOGO, 1).with(HEADING_ONE, 1).with(HEADING_TWO, 1));

    // Structure:
    // - 1 x image
    // - 1 x quote
    // - 1 x image
    this.add(template().with(IMAGE, 1).with(BLOCK_QUOTE, 1).with(IMAGE, 1));

    // Structure:
    // - 1 x h1
    // - 2 x paragraph
    this.add(template().with(HEADING_ONE, 1).with(PARAGRAPH, 2));

    // Structure:
    // - 1 x h1
    // - 1 x h2
    // - 1 x list
    this.add(template().with(HEADING_ONE, 1).with(HEADING_TWO, 1).with(BULLETED_LIST, 1));

    // Structure:
    // - 1 x h1
    // - 1 x list
    // - 1 x paragraph
    this.add(template().with(HEADING_ONE, 1).with(BULLETED_LIST, 1).with(PARAGRAPH, 2));

    // Structure:
    // - 1 x h1
    // - 1 x p
    // - 1 x image
    this.add(template().with(HEADING_ONE, 1).with(PARAGRAPH, 1).with(IMAGE, 1));

    // Structure:
    // - 1 x h1
    // - 1 x ul
    // - 1 x Image
    this.add(template().with(HEADING_ONE, 1).with(BULLETED_LIST, 1).with(IMAGE, 1));

    // Structure:
    // - 1 x h1
    // - 1 x paragraph
    // - 1 x image
    this.add(template().with(HEADING_ONE, 1).with(PARAGRAPH, 1).with(IMAGE, 1));

    // Structure:
    // - 1 x h1
    // - 1 x h2
    // - 1 x image
    this.add(template().with(HEADING_ONE, 1).with(HEADING_TWO, 1).with(IMAGE, 1));

    // Structure:
    // - 1 x paragraph
    // - 2 x image
    this.add(template().with(PARAGRAPH, 1).with(IMAGE, 2));

    // Structure:
    // - 1 x H1
    // - 1 x logo
    // - 1 x image
    this.add(template().with(HEADING_ONE, 1).with(LOGO, 1).with(IMAGE, 1));

    // Structure:
    // - 1 x logo
    // - 1 x H1
    // - 1 x image
    this.add(template().with(LOGO, 1).with(HEADING_ONE, 1).with(IMAGE, 1));

    // ==============================
    // 4 Components per Slide
    // ==============================

    // Structure:
    // - 4 x paragraph
    this.add(template().with(PARAGRAPH, 4));

    // Structure:
    // - 4 x Image
    this.add(template().with(IMAGE, 4));

    // Structure:
    // - 1 x h1
    // - 1 x paragraph
    // - 1 x quote
    // - 1 x image
    this.add(template().with(HEADING_ONE, 1).with(PARAGRAPH, 1).with(BLOCK_QUOTE, 1)
      .with(IMAGE, 1));

    // Structure:
    // - 1 x h1
    // - 1 x h2
    // - 2 x image
    this.add(template().with(HEADING_ONE, 1).with(HEADING_TWO, 1).with(IMAGE, 2));

    // Structure:
    // - 1 x h1
    // - 1 x quote
    // - 1 x image
    // - 2 x h1
    this.add(template().with(HEADING_ONE, 1).with(BULLETED_LIST, 1).with(PARAGRAPH, 1)
      .with(BULLETED_LIST, 1));

    // Structure:
    // - 1 x image
    // - 1 x quote
    // - 2 x image
    this.add(template().with(IMAGE, 1).with(BLOCK_QUOTE, 1).with(IMAGE, 2));

    // Structure:
    // - 1 x quote
    // - 2 x image
    this.add(template().with(IMAGE, 2).with(BLOCK_QUOTE, 1));

    // Structure:
    // - 1 x h1
    // - 1 x h2
    // - 1 x paragraph
    this.add(template().with(HEADING_ONE, 1).with(HEADING_TWO, 1).with(PARAGRAPH, 1));

    // Structure:
    // - 1 x logo
    // - 1 x H1
    this.add(template().with(LOGO, 1).with(HEADING_ONE, 1));

    // Structure:
    // - 1 x logo
    // - 1 x H1
    // - 1 x List 
    this.add(template().with(LOGO, 1).with(HEADING_ONE, 1).with(BULLETED_LIST, 1));

    // ==============================
    // 5+ Components per Slide
    // ==============================

    // Structure:
    // - 5 x Image
    this.add(template().with(IMAGE, 5));

    // Structure:
    // - 6 x Image
    this.add(template().with(IMAGE, 6));

    // Structure:
    // - 7 x Image
    this.add(template().with(IMAGE, 7));

    // Structure:
    // - 8 x Image
    this.add(template().with(IMAGE, 8));

    // Structure:
    // - 9 x Image
    this.add(template().with(IMAGE, 9));

    // Structure:
    // - 10 x Image
    this.add(template().with(IMAGE, 10));

    // Structure:
    // - 11 x Image
    this.add(template().with(IMAGE, 11));

    // Structure:
    // - 12 x Image
    this.add(template().with(IMAGE, 12));

    // Structure:
    // - 1 x h1
    // - 1 x paragraph
    // - 4 x images
    this.add(template().with(HEADING_ONE, 1).with(PARAGRAPH, 1).with(IMAGE, 4));

    // Structure:
    // - 1 x h1
    // - 1 x paragraph
    // - 4 x images
    this.add(template().with(HEADING_ONE, 1).with(PARAGRAPH, 1).with(IMAGE, 5));

    // Structure:
    // - 1 x h1
    // - 1 x paragraph
    // - 4 x images
    this.add(template().with(HEADING_ONE, 1).with(PARAGRAPH, 1).with(IMAGE, 6));

    // Structure:
    // - 1 x h1
    // - 1 x paragraph
    // - 4 x images
    this.add(template().with(HEADING_ONE, 1).with(PARAGRAPH, 1).with(IMAGE, 7));

    // Structure:
    // - 1 x h1
    // - 1 x paragraph
    // - 4 x images
    this.add(template().with(HEADING_ONE, 1).with(PARAGRAPH, 1).with(IMAGE, 8));

    // Structure:
    // - 1 x h1
    // - 1 x paragraph
    // - 4 x images
    this.add(template().with(HEADING_ONE, 1).with(PARAGRAPH, 1).with(IMAGE, 9));

    // Structure:
    // - 1 x h1
    // - 1 x paragraph
    // - 4 x images
    this.add(template().with(HEADING_ONE, 1).with(PARAGRAPH, 1).with(IMAGE, 10));

    // Structure:
    // - 1 x h1
    // - 1 x paragraph
    // - 4 x images
    this.add(template().with(HEADING_ONE, 1).with(PARAGRAPH, 1).with(IMAGE, 11));

    // Structure:
    // - 1 x h1
    // - 1 x paragraph
    // - 4 x images
    this.add(template().with(HEADING_ONE, 1).with(PARAGRAPH, 1).with(IMAGE, 12));

    // Structure:
    // - 1 x H1
    // - 1 x logo
    // - 3 x image
    this.add(template().with(HEADING_ONE, 1).with(LOGO, 1).with(IMAGE, 3));

    // Structure:
    // - 1 x logo
    // - 1 x H2
    // - 2 x Para
    // - 2 x image
    this.add(template().with(LOGO, 1).with(HEADING_TWO, 1).with(PARAGRAPH, 2)
      .with(IMAGE, 2));

    // Structure:
    // - 1 x logo
    // - 1 x H1
    // - 1 x H2
    // - 1 x image
    this.add(template().with(LOGO, 1).with(HEADING_ONE, 1).with(HEADING_TWO, 1)
      .with(IMAGE, 1));

    // Structure:
    // - 1 x H1
    // - 1 x H2
    // - 1 x image
    this.add(template().with(HEADING_ONE, 1).with(HEADING_TWO, 1)
      .with(IMAGE, 1));

    // =====================
    // Cluster Slides
    // =====================

    // Structure:
    // - 2 x { image, heading one, paragraph } clusters
    this.add(template()
      .with(IMAGE, 1)
      .with(HEADING_ONE, 1)
      .with(PARAGRAPH, 1)
      .with(IMAGE, 1)
      .with(HEADING_ONE, 1)
      .with(PARAGRAPH, 1));

    // - 1 x heading, then 3 x { image, paragraph } clusters
    this.add(template()
      .with(HEADING_ONE, 1)
      .with(IMAGE, 1)
      .with(PARAGRAPH, 1)
      .with(IMAGE, 1)
      .with(PARAGRAPH, 1)
      .with(IMAGE, 1)
      .with(PARAGRAPH, 1));

    // - 1 x heading, then 3 x { image, quote } clusters
    this.add(template()
      .with(IMAGE, 1)
      .with(BLOCK_QUOTE, 1)
      .with(IMAGE, 1)
      .with(BLOCK_QUOTE, 1)
      .with(IMAGE, 1)
      .with(BLOCK_QUOTE, 1)
      .with(HEADING_ONE, 1));

    // Structure:
    // - 6 x { img, paragraph } clusters
    this.add(template()
      .with(IMAGE, 1)
      .with(PARAGRAPH, 1)
      .with(IMAGE, 1)
      .with(PARAGRAPH, 1)
      .with(IMAGE, 1)
      .with(PARAGRAPH, 1)
      .with(IMAGE, 1)
      .with(PARAGRAPH, 1)
      .with(IMAGE, 1)
      .with(PARAGRAPH, 1)
      .with(IMAGE, 1)
      .with(PARAGRAPH, 1));

    // Structure:
    // - 2 x { heading one, paragraph } clusters
    this.add(template()
      .with(HEADING_ONE, 1)
      .with(PARAGRAPH, 1)
      .with(HEADING_ONE, 1)
      .with(PARAGRAPH, 1));

    // Structure:
    // - 3 x { heading one, paragraph } clusters
    this.add(template()
      .with(HEADING_ONE, 1)
      .with(PARAGRAPH, 1)
      .with(HEADING_ONE, 1)
      .with(PARAGRAPH, 1)
      .with(HEADING_ONE, 1)
      .with(PARAGRAPH, 1));

    // Structure:
    // - 2 x { heading two, paragraph } clusters
    this.add(template()
      .with(HEADING_TWO, 1)
      .with(PARAGRAPH, 1)
      .with(HEADING_TWO, 1)
      .with(PARAGRAPH, 1));

    // Structure:
    // - 2 x { heading one, heading two } clusters
    this.add(template()
      .with(HEADING_ONE, 1)
      .with(HEADING_TWO, 1)
      .with(HEADING_ONE, 1)
      .with(HEADING_TWO, 1));

    // Structure:
    // - 2 x { heading one, paragraph x 2 } clusters
    this.add(template()
      .with(HEADING_ONE, 1)
      .with(PARAGRAPH, 2)
      .with(HEADING_ONE, 1)
      .with(PARAGRAPH, 2));

    // Structure:
    // - 2 x { heading one, image } clusters
    this.add(template()
      .with(HEADING_ONE, 1)
      .with(IMAGE, 1)
      .with(HEADING_ONE, 1)
      .with(IMAGE, 1));

    // Structure:
    // - 3 x { image, quote } clusters
    this.add(template()
      .with(IMAGE, 1)
      .with(BLOCK_QUOTE, 1)
      .with(IMAGE, 1)
      .with(BLOCK_QUOTE, 1)
      .with(IMAGE, 1)
      .with(BLOCK_QUOTE, 1));

    // Structure:
    // - 3 x { image, paragraph } clusters
    this.add(template()
      .with(IMAGE, 1)
      .with(PARAGRAPH, 1)
      .with(IMAGE, 1)
      .with(PARAGRAPH, 1)
      .with(IMAGE, 1)
      .with(PARAGRAPH, 1));

    // Structure:
    // - 2 x { image, quote, paragraph } clusters
    this.add(template()
      .with(IMAGE, 1)
      .with(BLOCK_QUOTE, 1)
      .with(PARAGRAPH, 1)
      .with(IMAGE, 1)
      .with(BLOCK_QUOTE, 1)
      .with(PARAGRAPH, 1));
  }

}
