import { Delete } from "@material-ui/icons";
import React, { useRef } from "react";
import { Path, Transforms } from "slate";
import { IoDuplicate } from "react-icons/io5";
import HandleIcon from '@material-ui/icons/DragIndicator';
import { ReactEditor, useEditor, useSlate } from "slate-react";
import { Objects } from "../../../../../../../../../../../common/util/Objects";
import { userSelectStyles } from "../../../../../../../../../../../common/util/StyleHelpers";
import { GROUP_IN_COLLECTION_DEPTH, GroupTransforms } from "../../../../../../../services/transforms/GroupTransforms";
import { SlideControlButton } from "../../../../slide/components/SlideControlButton";
import { EditorTransforms } from "../../../../../../../services/transforms/EditorTransforms";
import { useDndBlock } from "../../../../../dnd/hooks";
import { GROUP } from "../type";
import { DropLine } from "../../../../../../draggable/DropLine";

export const GroupEditorElement = ({ element, attributes, children }) => {
  const editor = useEditor();
  const path = ReactEditor.findPath(editor, element);
  const isSelected = EditorTransforms.isSelected(editor, path);
  const currentPosition = path && path.length >= GROUP_IN_COLLECTION_DEPTH ? path[GROUP_IN_COLLECTION_DEPTH - 1] : 0;

  const duplicateGroup = (event) => {
    event.preventDefault();
    if (path) {
      editor.insertGroup({ at: path, position: currentPosition + 1, children: Objects.fastClone(element.children) });
    }
  };

  const deleteGroup = (event) => {
    event.preventDefault();
    if (path && path.length === GROUP_IN_COLLECTION_DEPTH) {
      const groupCount = GroupTransforms.groupCount(editor, path);
      if (groupCount === 1) {
        Transforms.removeNodes(editor, { at: Path.parent(path), voids: true, hanging: true });
      } else {
        Transforms.removeNodes(editor, { at: path, voids: true, hanging: true });
      }
    }
  };

  // Drag-and-drop
  const blockRef = useRef(null);
  const { dropLine, dragRef, isDragging } = useDndBlock({
    path,
    blockRef,
    type: GROUP,
  });

  return (
    <div ref={blockRef}>
      <div className={`editor-group${isSelected ? ' selected' : ''}`} {...attributes} style={{ paddingLeft: 24 }}>
        <div className="dragBar" ref={dragRef} style={userSelectStyles} contentEditable={false}> </div>
        <div className="editor-group-edge">
          <DropLine path={path} active={dropLine} />
        </div>
        <div>
          {children}
        </div>
        <div className="editor-group-controls" contentEditable={false}>
          <SlideControlButton onClick={duplicateGroup} icon={<IoDuplicate/>}/>
          <SlideControlButton onClick={deleteGroup} icon={<Delete/>}/>
        </div>
      </div>
    </div>
  );
};
