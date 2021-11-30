import { Slide } from "../../../../../../../common/slide/Slide";
import { KEY_PALETTES } from "../../../../../../../common/slide/transforms/palette/setPaletteForSlide";
import { compileSlideMarkup, generateSlide } from "../../../../../../../common/slide";

/**
 * Given a slide and a list of remixes, create a clone of the slide for every remix.
 *
 * @param slide
 * @param remixes
 * @param themeName
 * @param chosenPalette palette the user has chosen explicitly in this current editing session.
 * @param storedPalette the palette that has been persisted in content state.
 * @param chosenRemix currently chosen remix.
 * @param deckId
 * @returns {*}
 */
export const slidesForPreview = (slide, remixes, themeName, chosenPalette, storedPalette, chosenRemix, deckId) => {

  // Clone the slide data and generate the slide markup.
  const hasPaletteBeenChosen = chosenPalette !== undefined;
  const { node, path } = slide;
  const slideNode = hasPaletteBeenChosen ? {
    ...node,
    settings: {
      ...slide.settings,
      [KEY_PALETTES]: {
        [themeName]: chosenPalette.toDataObject(),
      }
    },
  } : {
    ...node,
    settings: {
      ...slide.settings,
      [KEY_PALETTES]: {},
    },
  };
  const baseSlide = generateSlide(slideNode, deckId, path, Slide.View.LIGHTBOX, themeName);

  return remixes.map((remix, index) => {
    const previewSlide = Slide.shallowClone(baseSlide);
    previewSlide.id = `${previewSlide.id}-${index}`;
    previewSlide.remix = remix.name;
    previewSlide.settings.remix = remix.name;

    // Retain the stored palette for the currently chosen remix if no palette chosen.
    if (!hasPaletteBeenChosen && storedPalette && remix.name === chosenRemix) {
      previewSlide.settings[KEY_PALETTES] = {
        [themeName]: storedPalette.toDataObject(),
      };
    }
    compileSlideMarkup(previewSlide, remix.name); // recompile the markup
    return previewSlide;
  });
};
