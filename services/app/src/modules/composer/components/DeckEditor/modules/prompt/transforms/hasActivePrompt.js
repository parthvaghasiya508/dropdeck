import { Path } from 'slate';

/**
 * Checks whether the given element has an active configuration prompt.
 */
export const hasActivePrompt = (element, path, promptSession) => {
  if (element !== undefined) {
    const beingConfigured = promptSession !== undefined
      && promptSession.path !== undefined
      && path !== undefined
      && Path.compare(promptSession.path, path) === 0;
    return beingConfigured;
  }
  return false;
};
