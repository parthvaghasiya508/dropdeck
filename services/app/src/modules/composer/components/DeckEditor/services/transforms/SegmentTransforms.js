import { Editor, Node, Path, Range, Text } from "slate";
import { logger } from '../../../../../../common/util/logger';
import { SlideTransforms } from "./SlideTransforms";
import { SelectionTransforms } from "./SelectionTransforms";

/**
 * Maps the given endpoints to a range, including offsets into the endpoint.
 *
 * @param editor
 * @param from
 * @param to
 * @returns {{anchor: {path: Path, offset: number}, focus: {path: Path, offset: number}}}
 */
const toRange = (editor, from, to) => {
  const [, anchorPath] = Editor.first(editor, from);
  const anchorOffset = 0;
  const [focusNode, focusPath] = Editor.last(editor, to);
  const focusOffset = Text.isText(focusNode) ? Node.string(focusNode).length : 0;
  return {
    focus: {
      path: focusPath,
      offset: focusOffset,
    },
    anchor: {
      path: anchorPath,
      offset: anchorOffset,
    },
  };
};

export const SegmentTransforms = {

  segmentByCategory(editor, slideRange, categories) {
    const defaultCategory = 'default';
    const iterator = Editor.nodes(editor, { at: slideRange });
    const segments = [];
    if (iterator) {
      let lastCategory;
      let lastPath;
      let anchorElementPath;
      for (const [node, path] of iterator) {
        if (SelectionTransforms.isComponentElementPath(editor, path)) {
          const category = categories(node) || defaultCategory;
          if (lastCategory === undefined) {
            anchorElementPath = path;
          } else if (category !== lastCategory) {
            segments.push({
              range: toRange(editor, anchorElementPath, lastPath),
              category: lastCategory,
            });
            anchorElementPath = path;
          }
          lastCategory = category;
          lastPath = path;
        }
      }
      if (lastCategory !== undefined && lastPath !== undefined) {
        segments.push({
          range: toRange(editor, anchorElementPath, lastPath),
          category: lastCategory,
        });
      }
    }
    return segments;
  },

  segmentBySlide(editor, range, startSlidePath, endSlidePath) {
    const segments = [];
    const from = startSlidePath[0];
    const to = endSlidePath[0];
    for (let slideIndex = from; slideIndex <= to; slideIndex++) {
      const slidePath = [slideIndex];
      const slideRange = toRange(editor, slidePath, slidePath);
      const segment = Range.intersection(slideRange, range);
      segments.push(segment);
    }
    return segments;
  },

  /**
   * Given a range selection, we cut the range into segments so that:
   *
   * - Each segment is contained within a single slide.
   * - Each segment contains only elements of the same category of list, text or void.
   *
   * Returns an array of { category, range } objects, one for each segment.
   */
  segment(editor, range, categories = () => undefined) {
    try {
      const [start, end] = Range.edges(range);
      const startSlidePath = SlideTransforms.getSlidePath(editor, start?.path);
      const endSlidePath = SlideTransforms.getSlidePath(editor, end?.path);
      const sameSlide = (Path.isPath(startSlidePath) && Path.isPath(endSlidePath) && Path.equals(startSlidePath, endSlidePath));
      const slideSegments = sameSlide ? [range] : SegmentTransforms.segmentBySlide(editor, range, startSlidePath, endSlidePath);
      const segments = [];
      slideSegments.forEach((slideRange) => {
        const categorySegments = this.segmentByCategory(editor, slideRange, categories);
        categorySegments.forEach((categorySegment) => {
          const segment = Range.intersection(categorySegment.range, range);
          if (segment) {
            segments.push({
              range: segment,
              category: categorySegment.category,
            });
          }
        });
      });
      return segments;

    } catch (e) {
      logger.error(e);
    }

    return undefined;
  },

  /**
   * Get the Location at the end of the leaf node at a location.
   */
  lastLocation(editor, at) {
    try {
      const [node, path] = Editor.last(editor, at);
      if (node !== undefined && node.text !== undefined && path !== undefined) {
        return { path, offset: node.text.length };
      }
    } catch (e) {
      logger.error(e);
    }

    return undefined;
  },

};
