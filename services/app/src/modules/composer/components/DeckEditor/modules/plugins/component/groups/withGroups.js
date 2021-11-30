import { Editor, Node, Text, Transforms } from 'slate';
import { GROUP_COLLECTION } from "./type";
import { GROUP } from "./components/group/type";
import { COMPONENT_IN_SLIDE_DEPTH } from "../../../../services/transforms/SlideTransforms";
import { groupBuilder } from "./components/group/groupBuilder";
import { PARAGRAPH } from "../paragraph/type";
import { GroupTransforms } from "../../../../services/transforms/GroupTransforms";
import { logger } from "../../../../../../../../common/util/logger";
import { paragraphBuilder } from "../paragraph/paragraphBuilder";

/**
 * Command and constraints to work with group and group collection data structures.
 *
 * This plugin ensures that group collections can only be contained within a slide. It also ensures that each
 * group collection can only contain group nodes. If any of the top-level children
 * are of a different type they will be removed. This ensures that all content belongs to exactly one group.
 *
 * @param editor Slate editor
 * @returns {*} A modified Slate editor, with commands and constraints for working with grouped content.
 */
export const withGroups = (editor) => {

  const { normalizeNode } = editor;

  /**
   * Each group collection node can only contain group nodes. If any of the top-level children are of a different
   * type they will be removed.
   */
  editor.normalizeNode = ([node, path]) => {

    // Normalize the group collection.
    if (path.length === COMPONENT_IN_SLIDE_DEPTH && node.type === GROUP_COLLECTION) {

      // eslint-disable-next-line no-unused-vars
      for (const [groupChild, groupChildPath] of Node.children(editor, path)) {
        if (groupChild.type !== GROUP) {

          Editor.withoutNormalizing(editor, () => {
            Transforms.removeNodes(editor, {
              at: groupChildPath,
              voids: true,
            });

            // Text nodes attached to a group collection should be moved to a paragraph element in a group.
            if (Text.isText(groupChild)) {
              Transforms.insertNodes(editor, groupBuilder([{
                type: PARAGRAPH,
                children: [groupChild],
              }]), {
                at: groupChildPath,
              });
            } else {
              Transforms.insertNodes(editor, groupBuilder([groupChild]), {
                at: groupChildPath,
              });
            }
          });
        } else {

          // Make sure groups are never empty.
          // eslint-disable-next-line no-lonely-if
          if (groupChild.children.length === 0) {
            Transforms.insertNodes(editor, paragraphBuilder(), {
              at: groupChildPath.concat(0),
            });
          } else if (groupChild.children.length === 1 && Text.isText(groupChild.children[0])) {
            const targetPath = groupChildPath.concat(0);
            Editor.withoutNormalizing(editor, () => {
              Transforms.removeNodes(editor, {
                at: targetPath,
                voids: true,
              });
              Transforms.insertNodes(editor, paragraphBuilder(), {
                at: groupChildPath.concat(0),
              });
            });
          }
        }
      }
    }
    normalizeNode([node, path]); // default normalization
  };

  /**
   * Command to add a new group to collection which contains the current selection. Optional position specifies the position in which we insert the new group
   * (note: this is not a path, and should be a number between 0 and #groups + 1, both inclusive).
   * If no position is specified, we insert a group at the end of the collection. If the current selectoin is
   */
  editor.insertGroup = (options = {}) => {
    let { position } = options;
    const { at } = options;
    const children = options.children || [];
    const [groupCollectionNode, groupCollectionPath] = GroupTransforms.getGroupCollection(editor, at);
    const groupCount = groupCollectionNode ? groupCollectionNode.children.length : -1;
    if (!groupCollectionNode || groupCount < 0) {
      logger.debug(`Current selection is not in a group context`);
      return;
    }
    logger.debug(`Inserting at position ${position} with respect to a collection of ${groupCount} groups`);

    if (position === undefined || position > groupCount || position < 0) {
      position = groupCount;
    }
    const newGroupPath = groupCollectionPath.concat(position);
    Transforms.insertNodes(editor, [groupBuilder(...children)], {
      at: newGroupPath,
      select: true,
    });
  };

  return editor;
};
