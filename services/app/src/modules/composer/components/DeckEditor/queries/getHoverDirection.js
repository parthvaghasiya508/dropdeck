export const Direction = {
  TOP: 'top',
  BOTTOM: 'bottom',
};

/**
 * Determine whether the mouse position, determined by a Y coordinate, is located
 * over the top or bottom half of the element.
 *
 * @param element
 * @param mouseOffsetY
 * @returns {string} one of 'top', 'bottom' or undefined.
 */
export const getHoverDirection = (element, mouseOffsetY) => {
  // Determine rectangle on screen
  const hoverBoundingRect = element?.getBoundingClientRect();

  // Get vertical middle
  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

  // Get pixels to the top
  const hoverClientY = mouseOffsetY - hoverBoundingRect.top;

  // Only perform the move when the mouse has crossed half of the items height
  // When dragging downwards, only move when the cursor is below 50%
  // When dragging upwards, only move when the cursor is above 50%

  // Dragging downwards
  // if (dragId < hoverId && hoverClientY < hoverMiddleY) {
  if (hoverClientY < hoverMiddleY) {
    return Direction.TOP;
  }

  // Dragging upwards
  // if (dragId > hoverId && hoverClientY > hoverMiddleY) {
  if (hoverClientY >= hoverMiddleY) {
    return Direction.BOTTOM;
  }
};
