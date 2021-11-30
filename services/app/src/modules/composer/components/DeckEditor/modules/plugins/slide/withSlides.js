import uuid from 'react-uuid';
import { Editor, Node, Path, Range, Text, Transforms } from 'slate';
import { newSlide } from "./transforms/newSlide";
import { EditorTransforms } from "../../../services/transforms/EditorTransforms";
import { logger } from "../../../../../../../common/util/logger";
import { SLIDE } from "../component/slide/type";
import { LIST_ITEM } from "../component/list/type";
import { PARAGRAPH } from "../component/paragraph/type";
import { componentBuilder } from "../../../../../../../common/api/plugins/builder/ComponentBuilder";
import { SlideTransforms } from "../../../services/transforms/SlideTransforms";

/**
 * Command and constraints to work with slide structures.
 *
 * This plugin ensures that the top-level editor node can only contain slide nodes. If any of the top-level children
 * are of a different type they will be removed. This ensures that all content belongs to exactly one slide.
 *
 * @param editor Slate editor
 * @returns {*} A modified Slate editor, with commands and constraints for working with slide content.
 */
export const withSlides = (editor) => {

  const { normalizeNode } = editor;

  // Return the editor node corresponding to the node at the given index.
  editor.slide = (index) => Node.get(editor, [index]);

  /**
   * The top-level editor node can only contain slide nodes. If any of the top-level children are of a different
   * type they will be removed.
   */
  editor.normalizeNode = ([node, path]) => {

    // Normalize the slide structure.
    if (!path.length) {

      // Ensure there is always at least one slide.
      if (editor.children.length < 1) {
        editor.insertSlide();
        normalizeNode([node, path]); // default normalization
        return;
      }

      // Since we'll be applying operations while iterating, keep track of an
      // index that accounts for any added/removed nodes.
      let n = 0;

      // Keep track of slide IDs within this content tree.
      const slideIds = [];

      // Iterating over all top-level nodes in the document tree.
      for (let i = 0; i < node.children.length; i++, n++) {
        const child = node.children[i];
        const childPath = path.concat(n);
        const prev = node.children[i - 1];
        const next = node.children.length > i + 1 ? node.children[i + 1] : undefined;

        // We have a top-level node which is not a slide...
        if (child.type !== SLIDE) {

          // First we check if the preceding node is a slide. If so, we move the node under
          // consideration to be a child of that slide element (appended to the bottom). Otherwise,
          // if the next node is a slide we move the node under consideration to be the
          // a child of that slide element (prepended to the top). Else, we insert a
          // new slide which wraps the offending node.
          if (prev !== undefined && prev.type !== undefined && prev.type === SLIDE) {
            const newPath = path.concat(n - 1)
              .concat(prev.children.length);
            Editor.withoutNormalizing(editor, () => {
              Transforms.moveNodes(editor, {
                at: childPath,
                to: newPath
              });
            });
          } else if (next !== undefined && next.type !== undefined && next.type === SLIDE) {
            const newPath = path.concat(n + 1).concat(0);
            Editor.withoutNormalizing(editor, () => {
              Transforms.moveNodes(editor, {
                at: childPath,
                to: newPath
              });
            });
          } else {

            Editor.withoutNormalizing(editor, () => {
              Transforms.removeNodes(editor, {
                at: childPath,
                voids: true,
              });
              Transforms.insertNodes(editor, newSlide([child]));
            });
          }

          // Type: slide
        } else if (child.type === SLIDE) {

          let childPath = path.concat(n);

          // If the slide doesn't have an ID or if it has an ID that has already been used,
          // we generate a new one.
          let { id } = child;
          if (id === undefined || slideIds.includes(id)) {
            id = uuid();
            childPath = path.concat(n);
            Transforms.setNodes(editor, { id }, { at: childPath });
          }

          slideIds.push(id);

        }
      }

    // Normalize the content of a slide.
    } else if (path.length === 1 && node.type === SLIDE) {
      normalizeSlide(node, path);
    }
    normalizeNode([node, path]); // default normalization
  };

  // Ensure that slides only contain element (container) nodes.
  const normalizeSlide = (node, path) => {

    // eslint-disable-next-line no-unused-vars
    for (const [slideChild, slideChildPath] of Node.children(editor, path)) {
      if (Text.isText(slideChild)) {

        // Text nodes attached to a slide should be moved to a paragraph element.
        // Todo this looks like a common transformation?
        Editor.withoutNormalizing(editor, () => {
          Transforms.removeNodes(editor, {
            at: slideChildPath,
            voids: true,
          });
          Transforms.insertNodes(editor, {
            type: PARAGRAPH,
            children: [slideChild],
          }, {
            at: slideChildPath,
          });
        });

      } else if (slideChild.type === undefined) {
        Transforms.setNodes(editor, { type: PARAGRAPH }, { at: slideChildPath });
      }

      // List items must be contained within a list.
      if (slideChild.type && slideChild.type === LIST_ITEM) {
        logger.trace(`Detached list item, turning into a paragraph: ${Node.string(slideChild)}`);
        const paragraphNode = slideChild.children && slideChild.children.length > 0 ? slideChild.children[0] : undefined;
        Editor.withoutNormalizing(editor, () => {
          Transforms.removeNodes(editor, {
            at: slideChildPath,
            voids: true,
          });

          if (paragraphNode && paragraphNode.type === PARAGRAPH) {
            Transforms.insertNodes(editor, paragraphNode, {
              at: slideChildPath,
            });
          }
        });
      }
    }
  };

  const builder = componentBuilder();

  /**
   * Command to insert a new slide. Optional position specifies the position in which we insert the new slide
   * (note: this is not a path, and should be a number between 0 and #slides + 1, both inclusive).
   * If no position is specified, we insert a slide at the end of the deck.
   */
  editor.insertSlide = (options = {}) => {
    let { position } = options;
    const { children } = options;
    const slideCount = SlideTransforms.slideCount(editor);

    const slide = children !== undefined ?
      builder.slide({}, children).build() :
      builder.slide().title().build();

    // Editor empty:
    if (slideCount === 0) {
      Transforms.insertNodes(editor, [slide], {
        at: [0],
      });
      return;
    }

    if (position === undefined || position > slideCount || position < 0) {
      position = slideCount;
    }
    const appendNewSlide = position >= slideCount;
    const newSlidePath = appendNewSlide ?
      SlideTransforms.pathForSlide(slideCount) :
      SlideTransforms.pathForSlide(position);

    Transforms.insertNodes(editor, [slide], {
      at: newSlidePath,
    });
    return newSlidePath;
  };

  /**
   * Command to insert a new slide. Options include:
   *
   * - at: the path to split at; defaults to the current editor selection (anchor).
   *
   * @param options split options (see above).
   */
  editor.splitSlide = (options = {}) => {
    let { at = editor.selection } = options;
    const { openingElement = PARAGRAPH, content, settings } = options;
    if (Range.isRange(at)) {
      at = at.anchor;
    }
    const children = content && content.length ? content : [{ type: openingElement, children: [{ text: '' }] }];

    // Path of the new slide we're splitting off from the active slide.
    let newSlidePath = [0];
    if (Path.isPath(at) && at.length > 0) {
      newSlidePath = [at[0] + 1];
    } else if (at && at.path && at.path.length > 0) {
      newSlidePath = [at.path[0] + 1];
    }

    const mode = 'highest';
    const match = (n) => Node.isNode(n);

    try {
      Editor.withoutNormalizing(editor, () => {
        Transforms.splitNodes(editor, {
          at,
          mode,
          match,
          voids: true,
          always: true,
        });

        // Insert a new element at the top of the new slide, of the given "opening element type".
        Transforms.insertNodes(editor, children, { at: newSlidePath.concat(0), select: true });

        // We need to do this to avoid having a hanging, empty element on the new slide:
        const lastChildPath = newSlidePath.concat(children.length);
        const [lastChildNode] = Editor.node(editor, lastChildPath);
        if (lastChildNode && EditorTransforms.isNodeEmpty(editor, lastChildNode)) {
          Transforms.removeNodes(editor, {
            at: lastChildPath,
            hanging: true,
            select: false,
          });
        }

        // Clear any settings we may have carried over from the previous slide.
        if (settings) {
          editor.settings(newSlidePath).setAll(settings);
        } else {
          editor.settings(newSlidePath).clear();
        }
      });
    } catch (e) {
      logger.error('Error when trying to split a slide');
      logger.error(e);
    }
  };

  return editor;
};
