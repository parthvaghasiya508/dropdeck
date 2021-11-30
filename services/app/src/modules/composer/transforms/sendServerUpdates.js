import { logger } from '../../../common/util/logger';
import { verifyDeckCover } from "./verifyDeckCover";

let timeout = null;

// Process the content state, persist in backend.
export const sendServerUpdates = (presentation, setUpdate, clearDirtyState) => (prevContent, nextContent) => {

  // Persist content changes.
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    clearDirtyState();
    setUpdate({ coverId: verifyDeckCover(presentation, nextContent).coverId, content: nextContent });
  }, 300);

};
