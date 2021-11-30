import { Editor, Node, Path, Point, Range, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { EditorTransforms } from "../../../services/transforms/EditorTransforms";
import { logger } from "../../../../../../../common/util/logger";
import { PARAGRAPH } from "../component/paragraph/type";

// Suggestions plugin: Editor => Editor
export const withSuggestions = (editor) => {

  // Register command to insert capabilities.
  editor.insertComponent = (component, at, newPromptSession, resetPromptSession) => {

    if (at === undefined) {
      at = editor.selection; // default to the current editor selection
    }
    const { configuration, type } = component;
    const hasConfigurator = configuration !== undefined;
    const hasWorkflow = configuration?.workflow !== undefined && configuration?.workflow.question !== undefined;
    Editor.withoutNormalizing(editor, () => {
      if (type) {

        // Add configuration step, if needed.
        if (hasConfigurator) {
          const [start,] = Range.edges(at);
          if (hasWorkflow) {
            const configurationElement = {
              type: PARAGRAPH,
              children: [{ text: '' }],
            };

            if (Range.isRange(at) && !Range.isCollapsed(at)) {
              Transforms.delete(editor, { at });
            }
            Transforms.setNodes(editor, configurationElement, { at });

            // Store the current configurator and its context.
            let promptPath = EditorTransforms.currentSelectionPath(editor);
            if (!Path.isPath(promptPath) || promptPath.length === 0) {
              promptPath = Range.isRange(at) ? Range.start(at).path : undefined;
            }
            if (promptPath) {
              newPromptSession(component, promptPath);
            }

          } else {

            // No workflow, so we configure the current node.
            const { path } = start;
            const parentPath = Path.parent(path);

            // Reset the input
            Transforms.insertText(editor,'', { at: parentPath });

            // Configure the node, using the user's inputs.
            configuration(editor, Node.get(editor, parentPath), parentPath, resetPromptSession);
          }

        // Configure the component directly.
        } else {
          const capabilityNode = {
            type: component.type,
            children: [],
          };
          Editor.withoutNormalizing(editor, () => {
            if (Range.isRange(at) && !Range.isCollapsed(at)) {
              Transforms.delete(editor, { at });
            }
            let newTarget;
            if (Range.isRange(at)) {
              const { anchor, focus } = at;
              newTarget = { anchor: { path: anchor.path, offset: 0 }, focus: { path: focus.path, offset: 0 } };
            } else if (Point.isPoint(at)) {
              const { path } = at;
              newTarget = { anchor: { path, offset: 0 }, focus: { path, offset: 0 } };
            } else {
              const path = at;
              newTarget = { anchor: { path, offset: 0 }, focus: { path, offset: 0 } };
            }
            Transforms.setNodes(editor, capabilityNode, { at });
            Transforms.select(editor, newTarget);
            try {
              ReactEditor.focus(editor);
            } catch (error) {
              logger.error('Error when focusing editor on new auto-complete node.');
            }
          });
        }
      }
    });

    if (!hasConfigurator && !component.editable) {
      editor.insertParagraph();
    }
  };
  return editor;
};
