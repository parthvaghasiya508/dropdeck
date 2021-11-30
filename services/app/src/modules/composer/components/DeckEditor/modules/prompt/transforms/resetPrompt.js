/**
 * Resets the active config session.
 */
import { PromptSession } from "../PromptSession";

export const resetPrompt = (setPromptSession) => () => {
  setPromptSession(undefined);
  PromptSession.reset();
};
