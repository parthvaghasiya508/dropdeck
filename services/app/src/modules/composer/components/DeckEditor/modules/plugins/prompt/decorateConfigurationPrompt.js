import { Element as SlateElement } from "slate";
import { hasActivePrompt } from "../../prompt/transforms/hasActivePrompt";
import { PromptSession } from "../../prompt/PromptSession";
import { cancelPrompt, submitAnswer } from "./onKeyDownConfigure";
import { CONFIGURATION_SYMBOL, PROMPT_QUESTION_SYMBOL } from "./renderLeafWithPrompt";
import { EditorTransforms } from "../../../services/transforms/EditorTransforms";
import { SelectionTransforms } from "../../../services/transforms/SelectionTransforms";

/**
 * Add decorations to config
 */
export const decorateConfigurationPrompt = (promptSession, editor, resetPromptSession, configurePromptSession, updatePrompt) => ([node, path]) => {
  const decorations = [];
  if (promptSession !== undefined && EditorTransforms.isComponentElementPath(editor, path)) {
    if (SlateElement.isElement(node)) {
      const activePrompt = hasActivePrompt(node, path, promptSession, editor);
      if (activePrompt) {
        if (promptSession.status === PromptSession.Status.BEING_CONFIGURED) {
          const focus = SelectionTransforms.lastLocation(editor, path) || { path, offset: 0 };
          decorations.push({
            [CONFIGURATION_SYMBOL]: true,
            anchor: {
              path,
              offset: 0
            },
            focus,
          });
        } else {

          const { prompt } = promptSession;
          const question = prompt?.question;
          if (question !== undefined) {

            const { placeholder = '' } = question;
            decorations.push({
              [PROMPT_QUESTION_SYMBOL]: true,
              question,
              onSubmit: submitAnswer(editor, promptSession, node, path, resetPromptSession, configurePromptSession, updatePrompt),
              onCancel: () => cancelPrompt(editor, path, resetPromptSession),
              node,
              path,
              anchor: {
                path,
                offset: 0
              },
              focus: {
                path,
                offset: placeholder.length
              },
            }); 
          }
        }
      }
    }
  }
  return decorations;
};
