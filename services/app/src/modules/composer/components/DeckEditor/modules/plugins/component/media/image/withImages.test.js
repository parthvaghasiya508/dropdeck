import { createEditor, Editor, Transforms } from "slate";
import { FROM_UPLOAD, insertImage } from "./transforms/insertImage";
import { PARAGRAPH } from "../../paragraph/type";
import { withImages } from "./withImages";
import { SLIDE } from "../../slide/type";
import { IMAGE } from "./type";
import { withSettings } from "../../../settings/withSettings";
import { KEY_IMAGE_PALETTE_SUGGESTIONS } from "../../../../../../../../../common/slide/transforms/palette/getPaletteForSlide";
import { HEADING_ONE } from "../../heading/one/type";

it('adds an image palette to a new slide', () => {
  const editor = withSettings(withImages(undefined, false)(createEditor()));
  Editor.insertNode(editor, {
    type: SLIDE,
    children: [{
      type: PARAGRAPH,
      children: [{ text: '' }],
    }]
  });

  // Add an image
  insertImage(editor, '<url>', '<name>', ["#93C4FF", "#09264A", "#FFFFFF", "#368FFF", "#FFFFFF"], FROM_UPLOAD);
  let [slide] = editor.children;
  expect(slide.children.length).toEqual(1);
  const [component] = slide.children;
  expect(component).toBeDefined();
  expect(component.type).toEqual(IMAGE);

  [slide] = editor.children;
  expect(slide.settings).toBeDefined();
  expect(slide.settings[KEY_IMAGE_PALETTE_SUGGESTIONS]).toBeDefined();
  expect(slide.settings[KEY_IMAGE_PALETTE_SUGGESTIONS].length).toEqual(4);
  const oldSuggestions = JSON.stringify(slide.settings[KEY_IMAGE_PALETTE_SUGGESTIONS]);

  // Add another image: same number of palette suggestions stored but they are now different.
  insertImage(editor, '<url>', '<name>', ["#ff00ff", "#00ff00", "#FFFFFF", "#3ea", "#000"], FROM_UPLOAD);
  [slide] = editor.children;
  expect(slide.settings[KEY_IMAGE_PALETTE_SUGGESTIONS]).toBeDefined();
  expect(slide.settings[KEY_IMAGE_PALETTE_SUGGESTIONS].length).toEqual(4);
  const newSuggestions = JSON.stringify(slide.settings[KEY_IMAGE_PALETTE_SUGGESTIONS]);
  expect(oldSuggestions.localeCompare(newSuggestions) !== 0).toBeTruthy();

  // Delete one of the images.
  Transforms.delete(editor, { at: [0, 0] });
  [slide] = editor.children;
  expect(slide.settings[KEY_IMAGE_PALETTE_SUGGESTIONS]).toBeDefined();
  expect(slide.settings[KEY_IMAGE_PALETTE_SUGGESTIONS].length).toEqual(4);

  // Delete the remaining image. No suggestions should remain.
  Transforms.delete(editor, { at: [0, 0] });
  [slide] = editor.children;
  expect(slide.settings[KEY_IMAGE_PALETTE_SUGGESTIONS]).toBeUndefined();

});
