import { Editor, Node, Path, Range, Transforms } from "slate";
import { NodeTransforms } from "./NodeTransforms";
import { isPlainText } from "../../modules/plugins/deserializers/transforms/isPlainText";
import { SLIDE } from "../../modules/plugins/component/slide/type";
import { newSlide } from "../../modules/plugins/slide/transforms/newSlide";
import { Objects } from "../../../../../../common/util/Objects";

const matchPlainText = (editor, node) => node && isPlainText(node);

/* The depth of the path to a component contained in a slide */
export const COMPONENT_IN_SLIDE_DEPTH = 2;

export const SlideTransforms = {

  /**
   * Returns the path of the slide that contains the given path.
   * @param path
   */
  pathOfSlideAt(path) {
    if (path && path.length > 0) {
      const [slideIndex] = path;
      return [slideIndex];
    }
  },

  isLastSlide(editor, slideId) {
    const index = SlideTransforms.getIndexOfSlide(editor, slideId);
    const slideCount = SlideTransforms.slideCount(editor);
    return index === slideCount - 1;
  },

  isFirstSlide(editor, slideId) {
    const index = SlideTransforms.getIndexOfSlide(editor, slideId);
    return index === 0;
  },

  isSlide(node) {
    return node && node.type && node.type === SLIDE;
  },

  isSlideEmpty(editor, slide, emptyNodeMatch = matchPlainText) {
    return slide !== undefined && (
      slide.children.length === 0 ||
      (slide.children.length === 1 && emptyNodeMatch(editor, slide.children[0]) && NodeTransforms.isNodeEmpty(editor, slide.children[0]))
    );
  },

  /**
   * Returns the Slate path of a slide at the given position.
   *
   * @deprecated
   * @param pos index of the slide whose path we want.
   */
  pathForSlide(pos) {
    return [pos];
  },

  /**
   * Returns the [node, path] of the current slide container element.
   */
  currentSlide(editor) {
    const { selection } = editor;
    if (selection !== undefined && selection !== null && Range.isRange(selection)) {
      const { path } = Range.start(selection);
      return this.getSlide(editor, path);
    }
    return [undefined, undefined];
  },

  /**
   * Returns the path of the slide container element that contains the given path.
   */
  getSlidePath(editor, path) {
    return (path !== undefined && Path.isPath(path) && path.length > 0) ? [path[0]] : undefined;
  },

  /**
   * Returns the [node, path] of the slide container element that contains the given path.
   */
  getSlide(editor, path) {
    const slidePath = (path !== undefined && Path.isPath(path) && path.length > 0) ? [path[0]] : [0];
    const slideNode = Node.get(editor, slidePath);
    if (slideNode && slideNode.type === SLIDE) {
      return [slideNode, slidePath];
    }
    return [undefined, undefined];
  },

  /**
   * Returns the [node, path] of the slide with the given ID.
   */
  getSlideById(editor, slideId) {
    const slideIndex = this.getIndexOfSlide(editor, slideId);
    if (slideIndex >= 0) {
      const slidePath = [slideIndex];
      return [Node.get(editor, slidePath), slidePath];
    }
    return [undefined, undefined];
  },

  /**
   * Return the index of the current slide. If no match is found
   * this returns an undefined path.
   */
  getIndexOfCurrentSlide(editor) {
    const [slide] = this.currentSlide(editor);
    if (slide && slide.id) {
      return this.getIndexOfSlide(editor, slide.id);
    }
  },

  /**
   * Return the index of the slide with the given ID. If no match is found
   * this returns -1.
   *
   * @param ID of a slide to locate.
   */
  getIndexOfSlide(editor, slideId) {
    let slideIndex = 0;
    for (let i = 0; i < editor.children.length; i++) {
      const node = editor.children[i];
      if (node.type === SLIDE) {
        if (node.id === slideId) {
          return slideIndex;
        }
        slideIndex++;
      }
    }
    return -1; // not found
  },

  /**
   * Return the path of the slide with the given ID. If no match is found
   * this returns an undefined path.
   *
   * @param ID of a slide to locate.
   */
  getPathOfSlide(editor, slideId) {
    const index = SlideTransforms.getIndexOfSlide(editor, slideId);
    return (index >= 0) ? [index] : undefined;
  },

  slideCount(editor) {
    let c = 0;
    editor.children.forEach((node) => {
      if (node.type === SLIDE) {
        c++;
      }
    });
    return c;
  },

  /**
   * Deletes the slide with the given ID.
   */
  deleteSlide(editor, slideId) {
    const slideIndex = this.getIndexOfSlide(editor, slideId);
    if (slideIndex >= 0) {
      Editor.withoutNormalizing(editor, () => {
        const deletePath = this.pathForSlide(slideIndex);
        Transforms.removeNodes(editor, { at: deletePath });
      });
    }
  },

  /**
   * Duplicates the slide with the given ID, with a new copy immediately after.
   */
  duplicateSlide(editor, slideId) {
    const [slideNode, slidePath] = this.getSlideById(editor, slideId);
    const slideIndex = this.getIndexOfSlide(editor, slideId);
    if (slideNode && slidePath) {
      const slide = newSlide(Objects.fastClone(slideNode.children), Objects.fastClone(slideNode.settings));
      Editor.withoutNormalizing(editor, () => {
        Transforms.insertNodes(editor, [slide], { at: Path.next(slidePath) });
        Transforms.select(editor, this.pathForSlide(slideIndex + 1));
      });
    }
  },

  /**
   * Move the slide with the given ID to a position indicated by `toIndex`. If `toIndex` is greater than the
   * number of slides in the deck, we move the slide to the end of the deck.
   */
  moveSlide(editor, slideId, toIndex) {

    if (toIndex < 0) {
      return;
    }

    // Check: if there is only one slide, then there is nothing to do.
    if (editor.children.length > 1) {
      const fromIndex = this.getIndexOfSlide(editor, slideId);
      const slideCount = this.slideCount(editor);
      const appendingAtEnd = toIndex > slideCount;
      if (appendingAtEnd) {
        toIndex = slideCount + 1;
      }
      if (fromIndex !== undefined) {
        const slideToPath = [toIndex];
        const slideFromPath = [fromIndex];
        Editor.withoutNormalizing(editor, () => {
          Transforms.moveNodes(editor, {
            at: slideFromPath,
            to: slideToPath
          });
        });
      }
    }
  },

  /**
   * Merge the slide at the given path with its predecessor.
   *
   * @param editor
   * @param at slide path.
   */
  mergeSlide(editor, at) {
    if (at && at.length === 1) {
      Transforms.mergeNodes(editor, { at, voids: true });
    }
  }

};
