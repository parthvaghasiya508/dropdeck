import { useDrag } from 'react-dnd';

export const useDragBlock = (editor, path, type = 'block', node) => (
  useDrag({
    item: { type, path, node },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    begin: () => {
      document.body.classList.add('dragging');
    },
    end: () => {
      document.body.classList.remove('dragging');
    },
  })
);
