import { chooseRemix } from "../../../../common/slide/transforms/chooseRemix";

export const resetRemix = (editor) => (slide) => {
  editor.settings(slide.path).set('remix', chooseRemix({ matchingRemixes: slide.matchingRemixes }));
};
