import { Node, Path, Transforms } from "slate";
import { isPlainText } from "../deserializers/transforms/isPlainText";
import { logger } from "../../../../../../../common/util/logger";
import { PARAGRAPH } from "../component/paragraph/type";

/**
 * Ensures that all elements whose type is one of the ones listed, are always preceded and followed
 * by a text element.
 *
 * @param types types of elements we should normalize.
 */
export const withSurroundingParagraphs = (types) => (editor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    // Analyse a whole slide
    if (path.length === 1) {

      // Since we'll be applying operations while iterating, keep track of an
      // index that accounts for any added/removed nodes.
      let n = 0;

      // Iterating over all top-level nodes in the document tree.
      for (let i = 0; i < node.children.length; i++, n++) {
        const currentNode = node.children.length > n ? node.children[n] : undefined;
        const currentPath = path.concat(n);

        if (currentNode && currentNode.type && types.includes(currentNode.type)) {
          let insertLeadingParagraph = false;
          try {
            const previousSiblingPath = Path.previous(currentPath);
            insertLeadingParagraph = previousSiblingPath === undefined;
            if (previousSiblingPath) {
              const previousSibling = Node.get(editor, previousSiblingPath);
              if (!previousSibling || !previousSibling.type || types.includes(previousSibling.type)) {
                insertLeadingParagraph = true;
              }
            }
          } catch (e) {
            insertLeadingParagraph = true;
          }

          let insertTrailingParagraph = false;
          try {
            const nextSiblingPath = Path.next(currentPath);
            insertTrailingParagraph = nextSiblingPath === undefined;
            if (nextSiblingPath) {
              const nextSibling = Node.get(editor, nextSiblingPath);
              if (!nextSibling || !nextSibling.type || types.includes(nextSibling.type)) {
                insertTrailingParagraph = true;
              }
            }
          } catch (e) {
            insertTrailingParagraph = true;
          }

          let activePath = currentPath;
          if (insertLeadingParagraph) {
            logger.trace(`Inserting a paragraph before component at ${activePath}`);
            Transforms.insertNodes(editor, {
              type: PARAGRAPH,
              children: [{ text: '' }],
            }, { at: activePath });
            n++;
            activePath = Path.next(activePath);
          }
          if (insertTrailingParagraph) {
            logger.trace(`Inserting a paragraph after component at ${activePath}`);
            Transforms.insertNodes(editor, {
              type: PARAGRAPH,
              children: [{ text: '' }],
            }, { at: Path.next(activePath) });
            n++;
          }
        }
      }
    }
    return normalizeNode([node, path]);
  };

  return editor;
};
