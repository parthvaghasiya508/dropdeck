import { PromptSession } from "../PromptSession";

/**
 * Set up an active configuration prompt at a specific path in the content tree.
 */
export const newPromptSessionGenerator = (setPromptSession) => (component, at) => {
  setPromptSession(PromptSession.start(component, at));
};
