import { Editor, Element, Node as SlateNode, Path, Range, Text, Transforms } from 'slate';
import { ReactEditor } from "slate-react";
import { EditorTransforms } from "../../../services/transforms/EditorTransforms";
import { hasActivePrompt } from "../../prompt/transforms/hasActivePrompt";
import { PromptSession } from "../../prompt/PromptSession";
import { logger } from "../../../../../../../common/util/logger";
import { Prompt } from "../../prompt/Prompt";

export const cancelPrompt = (editor, path, resetPromptSession) => {

  // Reset the input
  resetPromptSession();

  if (path && path.length > 0) {
    Editor.withoutNormalizing(editor, () => {
      try {
        Transforms.insertText(editor,'', { at: path });
        const { selection } = editor;
        if (selection !== undefined && Range.isRange(selection)) {
          const [start, end] = Range.edges(selection);
          if (start !== undefined && end !== undefined) {
            if (Path.isPath(start.path) && Path.compare(path, start.path) !== 0 && Path.isPath(end.path) && Path.compare(path, end.path) !== 0) {
              Transforms.select(editor, selection);
            }
          }
        }
      } catch (err) {
        logger.error('Error when cancelling active command prompt', err);
      }
    });
  }
};

/**
 * Submit the user's current input.
 *
 * @param event
 * @param promptSession
 */
export const submitAnswer = (editor, promptSession, node, path, resetPromptSession, configurePromptSession, updatePrompt) => (value) => {

  if (promptSession !== undefined && promptSession.status === PromptSession.Status.OPEN) {
    const { prompt, component } = promptSession;

    if (prompt !== undefined && prompt.question !== undefined && component !== undefined) {
      if (!value) {
        value = SlateNode.string(node);
      }

      let parentPath = path;
      let parentNode = node;
      if (!Element.isElement(node)) {
        parentPath = Path.parent(path);
        parentNode = SlateNode.get(editor, parentPath);
      }

      const reject = (errorMessage) => {
        promptSession.prompt = new Prompt(errorMessage, prompt.options);
        promptSession.status = PromptSession.Status.OPEN;
        updatePrompt(promptSession);
        Transforms.insertText(editor,'', { at: path });
      };

      const resolve = (data) => {
        const nextPrompt = prompt.next(data);
        Transforms.insertText(editor,'', { at: path });
        if (nextPrompt === undefined) {
          const configBuilder = component.configuration?.builder;
          if (configBuilder !== undefined) {

            // Configure the node, using the user's inputs.
            configurePromptSession();
            const configure = configBuilder(data);
            configure(editor, parentNode, parentPath, resetPromptSession);
          }
        } else {
          promptSession.prompt = nextPrompt;
          promptSession.status = PromptSession.Status.OPEN;
          updatePrompt(promptSession);
        }
      };

      // Reset the input.
      promptSession.status = PromptSession.Status.BEING_CONFIGURED;
      updatePrompt(promptSession);
      ReactEditor.focus(editor);
      prompt.submit(
        value,
        resolve,
        reject,
      );
    }
  }
};

/**
 * Handle key-down events.
 */
export const onKeyDownConfigure = (promptSession, resetPromptSession, configurePromptSession, setPromptSession) => (event, editor) => {

  const [node, path] = editor.selection && Range.isRange(editor.selection) ?
    Editor.node(editor, editor.selection) : [undefined, undefined];

  if (node !== undefined && SlateNode.isNode(node) && Text.isText(node)) {
    const parentPath = Path.parent(path);
    const parentNode = SlateNode.get(editor, parentPath);

    if (parentNode !== undefined
      && hasActivePrompt(parentNode, parentPath, promptSession)
      && promptSession.status === PromptSession.Status.OPEN) {

      const { prompt } = promptSession;
      const question = prompt ? prompt.question : undefined;
      const onSubmit = submitAnswer(editor, promptSession, node, path, resetPromptSession, configurePromptSession, setPromptSession);
      const onCancel = () => cancelPrompt(editor, path, resetPromptSession);

      if (question && question.onKeyDown) {
        // The current prompt question defines its own key handling.
        question.onKeyDown(event, onSubmit, onCancel);

      } else {
        // The active element is being configured.
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            return;
          case 'ArrowUp':
            event.preventDefault();
            return;
          case 'Tab':
            event.stopPropagation();
            event.preventDefault();
            onSubmit();
            break;
          case 'Enter':
            event.stopPropagation();
            event.preventDefault();
            onSubmit();
            break;
          case 'Escape':
            onCancel();
            break;
          default:
            break;
        }
      }
    }
  }
};

export const updatePrompt = (promptSession, editor, resetPromptSession) => (event) => {

  if (event !== undefined && event.nativeEvent !== undefined && promptSession !== undefined) {

    const node = EditorTransforms.activeElementNode(editor);
    const path = EditorTransforms.activeElementPath(editor);
    let eventPathOutsidePrompt = true;
    if (isDOMNode(event.target) && ReactEditor.hasDOMNode(editor, event.target)) {
      const eventNode = ReactEditor.toSlateNode(editor, event.target);
      const eventPath = ReactEditor.findPath(editor, eventNode);
      if (eventPath && path && Path.isPath(eventPath) && Path.isDescendant(path, eventPath)) {
        eventPathOutsidePrompt = false;
      }
    }

    if (event.nativeEvent.type !== 'blur' && eventPathOutsidePrompt &&
      promptSession !== undefined && !hasActivePrompt(node, path, promptSession)) {

      cancelPrompt(editor, promptSession.path, resetPromptSession);
    }
  }
};

const isDOMNode = (value) => (value instanceof Node);
