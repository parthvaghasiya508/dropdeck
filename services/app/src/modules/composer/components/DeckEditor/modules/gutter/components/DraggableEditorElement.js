import React, { useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import {
  EDITOR_ELEMENT_CLASS,
  EDITOR_ELEMENT_CONTENT_CLASS,
  EDITOR_ELEMENT_OPTIONS,
} from "../renderElementWithGutter";
import { useDndBlock } from "../../plugins/dnd/hooks";
import { DropLine } from "../../draggable/DropLine";
import { COMPONENT_IN_SLIDE_DEPTH } from "../../../services/transforms/SlideTransforms";
import { GROUP_COLLECTION } from "../../plugins/component/groups/type";
import { ContextMenu } from "../../../components/ContextMenu/ContextMenu";
import { GutterIcon } from "./GutterIcon";

export const DRAGGABLE_COMPONENT = 'block';

export const DraggableEditorElement = ({
  readOnly = false,
  path,
  node,
  highlighted,
  selected,
  clicked,
  gutterIcon,
  showContextMenu,
  handleClick,
  nodeType,
  children,
  contextMenuComponent,
}) => {

  const fixedSelectionStyles = {
    pointerEvents: 'auto',
    userSelect: 'none'
  };

  const acceptedTypes = path.length === COMPONENT_IN_SLIDE_DEPTH ? [DRAGGABLE_COMPONENT, GROUP_COLLECTION] : DRAGGABLE_COMPONENT;
  const blockRef = useRef(null);
  const { dropLine, dragRef } = useDndBlock({
    path,
    node,
    blockRef,
    type: DRAGGABLE_COMPONENT,
    accept: acceptedTypes,
  });

  return (
    <React.Fragment>
      <div
        data-path={JSON.stringify(path)}
        className={`${EDITOR_ELEMENT_CLASS}${highlighted ? ' highlighted' : ''}`}
        ref={blockRef}>

        <DropLine path={path} active={dropLine} />

        <div
          className={`${EDITOR_ELEMENT_OPTIONS}${selected ? ' selected' : ''}${clicked ? ' clicked' : ''}`}
          contentEditable={false} style={fixedSelectionStyles}>

          {gutterIcon && gutterIcon !== null ? (
            <GutterIcon
              path={path}
              contextMenuComponent={contextMenuComponent}
              handleClick={handleClick}
              readOnly={readOnly}
              dragRef={dragRef}
              icon={gutterIcon}
              nodeType={nodeType}
              showContextMenu={showContextMenu}
            />
          ) : null}
        </div>
        <div className={EDITOR_ELEMENT_CONTENT_CLASS}>
          { children }
        </div>
      </div>
    </React.Fragment>
  );
};
