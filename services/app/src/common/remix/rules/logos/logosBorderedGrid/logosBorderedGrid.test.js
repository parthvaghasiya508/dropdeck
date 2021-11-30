import { logosBorderedGridRemix } from "./logosBorderedGrid";
import { toSlide } from "../../../utils/testUtils";
import { HEADING_ONE } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/heading/one/type";
import { LOGO_LIST } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/logoList/type";
import { PARAGRAPH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/paragraph/type";

it('should match a slide with plain text and a number of logos', () => {
  expect(logosBorderedGridRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, LOGO_LIST))).toBeTruthy();
  expect(logosBorderedGridRemix.matches(toSlide(HEADING_ONE, PARAGRAPH, LOGO_LIST, LOGO_LIST, PARAGRAPH))).toBeFalsy();
});

// it('should not match a slide with more than the max number of logos', () => {
//   const maxLogos = [];
//   for (let i = 0; i < MAX_LOGOS; i++) {
//     maxLogos.push(LOGO_LIST);
//   }
//   expect(logosBorderedGridRemix.matches(toSlide(...maxLogos))).toBeTruthy();
//   expect(logosBorderedGridRemix.matches(toSlide(...maxLogos, LOGO_LIST))).toBeFalsy();
// });
