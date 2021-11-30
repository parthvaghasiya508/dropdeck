import { AddCircle, Backspace } from "@material-ui/icons";
import React from 'react';
import { Path, Transforms } from "slate";
import { ReactEditor, useEditor } from "slate-react";
import { useHighlightedPath } from "../../../../hooks/highlighted/useHighlightedPath";
import { useEditorOperations } from "../../hooks/useEditorOperations";
import { EditorTransforms } from "../../services/transforms/EditorTransforms";
import { showSuggestionControls } from "../plugins/suggestions/transforms/showSuggestionControls";
import { DraggableEditorElement } from "./components/DraggableEditorElement";

export const EDITOR_ELEMENT_CLASS = "editorElement";
export const EDITOR_ELEMENT_CONTENT_CLASS = "elementContent";
export const EDITOR_ELEMENT_OPTIONS = "elementOptions";
export const EDITOR_ELEMENT_DROPLINE = "dropLine";
export const EDITOR_ELEMENT_DROPLINE_INACTIVE = "inactive";

export const renderElementWithGutter = (renderElement, icon, typeP, contextMenuComponent) => (props) => {
  const element = renderElement(props);

  if (element) {
    const operations = useEditorOperations();
    const {
      setMatch,
    } = operations;

    const editor = useEditor();
    const highlightedPath = useHighlightedPath();
    const readOnly = ReactEditor.isReadOnly(editor);
    const node = props.element;
    const containsSelection = EditorTransforms.isSelected(editor, node);
    const clicked = EditorTransforms.isClicked(editor, node);
    const path = ReactEditor.findPath(editor, node);

    let handleClick;
    let gutterIcon = icon;
    let showContextMenu = true;
    if (clicked && (node.type === typeP && EditorTransforms.isNodeEmpty(editor, node) || EditorTransforms.isSlideEmpty(editor, EditorTransforms.currentSlide(editor)[0]))) {
      handleClick = (evt) => {
        showSuggestionControls(editor, setMatch, path, evt.currentTarget);
        ReactEditor.focus(editor);
      };
      showContextMenu = false;
      gutterIcon = <AddCircle/>;
    }

    if (path && EditorTransforms.isComponentElementPath(editor, path)) {
      const highlighted = highlightedPath && Path.equals(path, highlightedPath);
      return (
        <DraggableEditorElement
          readOnly={readOnly}
          path={path}
          node={node}
          highlighted={highlighted}
          selected={containsSelection}
          clicked={clicked}
          gutterIcon={gutterIcon}
          showContextMenu={showContextMenu}
          handleClick={handleClick}
          contextMenuComponent={contextMenuComponent}
          nodeType={node.type.toLowerCase()}
        >
          {element}
        </DraggableEditorElement>
      );
    }
    return element;
  }
  return null;
};
