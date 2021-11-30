import { Path } from "slate";
import { logger } from "../../../../../../../../common/util/logger";
import { getHoverDirection } from "../../../../queries/getHoverDirection";

/**
 * If dragging a block A over another block B:
 * get the direction of block A relative to block B.
 */
export const getDragHoverDirection = (
  dragItem,
  monitor,
  ref,
  hoverPath
) => {
  if (!ref.current) return;

  try {
    const dragPath = dragItem.path;

    // Don't replace items with themselves
    if (Path.equals(dragPath, hoverPath)) return;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    if (!clientOffset) return;

    const clientOffsetY = clientOffset.y;

    return getHoverDirection(ref.current, clientOffsetY);

  } catch (error) {
    logger.error(`Error when determining hover direction`, error);
  }

};
