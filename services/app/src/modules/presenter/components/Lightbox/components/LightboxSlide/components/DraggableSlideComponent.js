import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { logger } from "../../../../../../../common/util/logger";
import "./DraggableSlideComponent.scss";

const ITEM_TYPE = "slideComponent";

// Default type equivalence checks that the two types are the same.
const defaultEquivalence = (source, target) => source === target;

export const DraggableSlideComponent = ({ remix, type, path, onDrop, children }) => {

  const equivalence = (remix && remix.equivalence) ? remix.equivalence : defaultEquivalence;

  const drop = () => ({ type, path });

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ITEM_TYPE,
    drop,
    canDrop: (item, monitor) => {
      const sourcePath = item.path;
      const targetType = type;
      const sourceType = item.component;
      const equivalentInSourceSlide = item.equivalence || defaultEquivalence;
      const equivalentInTargetSlide = equivalence;
      const sameSlide = (sourcePath && sourcePath.length > 1 && path.length > 0 && sourcePath[0] === path[0]);

      // If on the same slide, we check what the remix allows.
      if (sameSlide) {
        return equivalentInTargetSlide(sourceType, targetType);
      }

      // Otherwise we check that the swap satisfies the equivalence of both the
      // source and the (current) target. This is under the assumption that each
      // "equivalence" function is a proper equivalence relation in the mathematical sense.
      return equivalentInTargetSlide(sourceType, targetType) && equivalentInSourceSlide(sourceType, targetType);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: ITEM_TYPE,
      path,
      component: type,
      equivalence,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        logger.debug(`Dropped ${item.component} at ${item.path} into ${dropResult.component} at ${dropResult.path}`);
        onDrop(item.path, dropResult.path);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  });

  // Assign CSS classes for styling drag/drop elements.
  let dragDropClasses = 'draggable';
  if (isDragging) {
    dragDropClasses = 'dragSource';
  } else {
    const isActive = isOver && canDrop;
    if (canDrop) {
      dragDropClasses = 'draggable dropTarget';
      if (isActive && !isDragging) {
        dragDropClasses = 'draggable dropTarget over';
      }
    }
  }

  const dndRef = (element) => {
    dragRef(element);
    dropRef(element);
  };

  const dndClasses = `element ${dragDropClasses}`;

  return (
    <div className={dndClasses} ref={dndRef}>
      { children }
    </div>
  );
};
