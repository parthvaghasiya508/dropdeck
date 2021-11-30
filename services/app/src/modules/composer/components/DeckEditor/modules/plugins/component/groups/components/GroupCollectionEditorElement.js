import useMergedRef from "@react-hook/merged-ref";
import React, { useRef } from "react";
import { ReactEditor, useEditor } from "slate-react";
import { userSelectStyles } from "../../../../../../../../../common/util/StyleHelpers";
import { DropLine } from "../../../../draggable/DropLine";
import { DRAGGABLE_COMPONENT } from "../../../../gutter/components/DraggableEditorElement";
import { useDndBlock } from "../../../dnd/hooks";
import { GROUP_COLLECTION } from "../type";

export const GroupCollectionEditorElement = ({ attributes, element, children }) => {
  const editor = useEditor();
  const path = ReactEditor.findPath(editor, element);
  // const isSelected = EditorTransforms.isSelected(editor, element);

  // Drag-and-drop
  const blockRef = useRef();
  const { dropLine, dragRef } = useDndBlock({
    path,
    blockRef,
    type: GROUP_COLLECTION,
    accept: [GROUP_COLLECTION, DRAGGABLE_COMPONENT],
  });
  const combinedRef = useMergedRef(blockRef, dragRef);

  return (
    <div className="editor-group-collection" ref={blockRef}>
      <div className="editor-group-collection-edge">
        <DropLine path={path} active={dropLine} />
      </div>
      <div className="dragBarCollection" ref={combinedRef} style={userSelectStyles} contentEditable={false}> </div>
      <div {...attributes}>
        {children}
      </div>
    </div>
  );
};
