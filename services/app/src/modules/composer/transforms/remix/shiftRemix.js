import { nextRemix } from "../../../../common/slide/transforms/nextRemix";

export const shiftRemix = (editor) => (slide, currentRemix, offset, themeName) => {
  const newRemixName = nextRemix(currentRemix, slide.matchingRemixes, offset);
  setRemix(editor)(slide, newRemixName, themeName);
};

export const setRemix = (editor) => (slide, remixName) => {
  editor.settings(slide.path).set('remix', remixName);
};
