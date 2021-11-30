import { PromptSession } from "../PromptSession";

/**
 * Configuring the active terminal prompt.
 */
export const configurePrompt = (promptSession, setPromptSession) => () => {
  promptSession.status = PromptSession.Status.BEING_CONFIGURED;
  setPromptSession(promptSession);
};
