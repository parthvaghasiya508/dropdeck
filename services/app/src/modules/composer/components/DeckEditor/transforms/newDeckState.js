import uuid from 'react-uuid';
import faker from 'faker';
import { DEFAULT_SCALING } from "../../../../presenter/components/Slide/scalingLimits";
import { SLIDE } from "../modules/plugins/component/slide/type";
import { HEADING_ONE, TITLE } from "../modules/plugins/component/heading/one/type";
import { PARAGRAPH } from "../modules/plugins/component/paragraph/type";

export const hugeDocument = () => {

  const HEADINGS = 100;
  const PARAGRAPHS = 2;
  const slides = [];

  for (let h = 0; h < HEADINGS; h++) {
    const content = [];
    content.push({
      type: HEADING_ONE,
      children: [{ text: faker.lorem.sentence() }],
    });

    for (let p = 0; p < PARAGRAPHS; p++) {
      content.push({
        type: PARAGRAPH,
        children: [{ text: faker.lorem.paragraph() }],
      });
    }

    slides.push({
      type: SLIDE,
      id: uuid(),
      children: content,
    });

  }

  return slides;

};
export const newDeckState = () => ([
  {
    type: SLIDE,
    id: uuid(),
    settings: {
    },
    children: [
      {
        type: TITLE,
        children: [
          { text: '' },
        ],
      },
    ],
  }
]);
