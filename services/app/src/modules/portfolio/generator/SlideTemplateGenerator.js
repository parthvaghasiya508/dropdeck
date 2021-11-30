import uuid from "react-uuid";
import { generateSlide } from "../../../common/slide/SlideFactory";
import { TemplateTypes } from "./TemplateTypes";
import { templateLabel } from "./transforms/templateLabel";
import { SLIDE } from "../../composer/components/DeckEditor/modules/plugins/component/slide/type";

export default class SlideTemplateGenerator {

  generate(templates) {
    if (!templates) {
      return [];
    }
    const results = [];
    if (!Array.isArray(templates)) {
      templates = [templates];
    }
    templates.forEach((template) => {
      const { slides, label } = this.generateFromTemplate(template);
      results.push({ content: slides, name: label });
    });
    return results;
  }

  generateFromTemplate(template) {
    const nodes = [];
    template.nodes.forEach((entry, index) => {
      const { count, type } = entry;
      const { elements } = TemplateTypes[type];
      if (elements.length > 0) {
        const len = elements.length;
        for (let i = 0; i < count; i++) {
          nodes.push(elements[i % len]);
        }
      }
    });
    const referenceSlide = generateSlide({ type: SLIDE, id: '', children: nodes });
    const remixes = referenceSlide.matchingRemixes;
    const slides = [];
    if (remixes && remixes.length > 0) {
      remixes.forEach((remix) => {
        const slide = {
          type: SLIDE,
          id: uuid(),
          settings: { remix: remix.name },
          children: nodes,
        };
        slides.push(slide);
      });
    } else {

      // Include one variation with no remix applied if, and only if, we have no remixes.
      const initialSlide = {
        type: SLIDE,
        id: uuid(),
        settings: { remix: null },
        children: nodes,
      };
      slides.push(initialSlide);
    }

    return {
      label: templateLabel(template),
      slides,
    };
  }
}
