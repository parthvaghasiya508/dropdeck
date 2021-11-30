import { useState } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useEditor } from 'slate-react';
import { useDragBlock } from './useDragBlock';
import { useDropBlockOnEditor } from './useDropBlockOnEditor';

export const useDndBlock = ({
  path,
  node,
  blockRef,
  type = 'block',
  accept,
  removePreview,
}) => {
  if (!accept) {
    accept = type;
  }
  const editor = useEditor();
  const [dropLine, setDropLine] = useState(''); // <'' | 'top' | 'bottom'>

  const [{ isDragging }, dragRef, preview] = useDragBlock(editor, path, type, node);
  const [{ isOver }, drop] = useDropBlockOnEditor(editor, {
    path,
    node,
    blockRef,
    dropLine,
    setDropLine,
    accept,
  });

  if (removePreview) {
    drop(blockRef);
    preview(getEmptyImage(), { captureDraggingState: true });
  } else {
    preview(drop(blockRef));
  }

  if (!isOver && dropLine) {
    setDropLine('');
  }

  return {
    isDragging,
    dropLine,
    dragRef,
  };
};
