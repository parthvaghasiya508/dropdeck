import { Slide } from "../../../../../../../../common/slide/Slide";
import { generateSlide } from "../../../../../../../../common/slide";
import { componentBuilder } from "../../../../../../../../common/api/plugins/builder/ComponentBuilder";
import { KEY_PALETTES } from "../../../../../../../../common/slide/transforms/palette/setPaletteForSlide";
import { Objects } from "../../../../../../../../common/util/Objects";
import { ThemeFactory } from "../../../../../../../../common/theme/ThemeFactory";
import {
  getStoredPaletteForSlide,
  KEY_IMAGE_PALETTE_SUGGESTIONS
} from "../../../../../../../../common/slide/transforms/palette/getPaletteForSlide";
import { imagePaletteSuggestionsForSlide } from "../../../../modules/plugins/component/media/image/queries/imagePaletteSuggestionsForSlide";

/**
 * Build slides from a list of slide templates.
 *
 * @param templates
 */
export const slidesFromTemplates = (templates, path, existingSlideNode, themeName, deckId) => {
  const builder = componentBuilder();
  return templates.map((template) => {
    const { remixName, palette } = template;
    const settings = {
      ...Objects.fastClone(existingSlideNode.settings || {}),
      [KEY_PALETTES]: {},
    };

    if (remixName) {
      settings.remix = remixName;
    }
    if (palette) {
      const themePalettes = {};
      ThemeFactory.instance.themes().forEach((entry) => {
        const [themeId] = entry;
        themePalettes[themeId] = palette.toDataObject();
      });
      settings[KEY_PALETTES] = themePalettes;
    }
    const templateNodes = template.extendFrom ? template.extendFrom(existingSlideNode) : existingSlideNode.children;
    const slideNode = builder.slide(settings, templateNodes).build();

    // Compile image palettes for slide, when applicable.
    const imagePalettes = imagePaletteSuggestionsForSlide(slideNode);
    if (imagePalettes && imagePalettes.length > 0) {
      slideNode.settings[KEY_IMAGE_PALETTE_SUGGESTIONS] = imagePalettes.map((palette) => palette.toDataObject());
    }
    const slide = generateSlide(slideNode, deckId, path, Slide.View.EDITOR, themeName);
    return slide;
  });
};
