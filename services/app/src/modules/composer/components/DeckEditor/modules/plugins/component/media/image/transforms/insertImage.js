import { Editor, Path, Transforms } from "slate";
import { EditorTransforms } from "../../../../../../services/transforms/EditorTransforms";
import { NodeTransforms } from "../../../../../../services/transforms/NodeTransforms";
import { SelectionTransforms } from "../../../../../../services/transforms/SelectionTransforms";
import { Direction } from "../../../../../../queries/getHoverDirection";
import { IMAGE } from "../type";
import { COMPONENT_IN_SLIDE_DEPTH } from "../../../../../../services/transforms/SlideTransforms";

export const FROM_UPLOAD = 'upload';

const targetPath = (path, direction) => (direction && direction === Direction.TOP ? path : Path.next(path));

export const insertImage = (editor, url, name, swatch, from = FROM_UPLOAD, options = {}) => {
  const image = {
    type: IMAGE,
    settings: {
      from,
      url,
      name,
      label: name,
    },
    children: [{ text: '' }]
  };
  if (swatch) {
    image.settings.swatch = swatch;
  }
  insertImages(editor, image, options);
};

/**
 * Inserts each of the image nodes to the editor at the given path.
 *
 * @param editor Slate editor.
 * @param images array of image nodes or a single image node.
 * @param options.at the path at which to insert the images.
 * @param options.replaceExisting whether to replace the existing Slate node where the image is inserted (default is false).
 * @returns {number} the number of elements added to the editior. This is either the number of elements or one less
 * than the number of elements, when the contents of the current text node are replaced.
 */
export const insertImages = (editor, images, options = {}) => {
  if (!images || (Array.isArray(images) && images.length === 0)) {
    return 0;
  }

  const numberOfImages = Array.isArray(images) ? images.length : 1;

  const { direction } = options;
  let at = options.at || SelectionTransforms.componentElementPath(editor);
  const replaceExisting = !!options.replaceExisting;
  if (at && at.length > COMPONENT_IN_SLIDE_DEPTH) {
    at = SelectionTransforms.componentElementAncestorPath(editor, at);
  }
  const [node] = Editor.node(editor, at);

  // If the target node an empty paragraph, then we add the image there. Otherwise we insert a new paragraph before/after.
  if (node !== undefined) {
    if (NodeTransforms.isTextNode(node)) {
      if (EditorTransforms.isNodeEmpty(editor, node)) {
        const firstImage = Array.isArray(images) ? images[0] : images;
        Transforms.setNodes(editor, firstImage, { at });
        if (numberOfImages > 1) {
          Transforms.insertNodes(editor, images.slice(1), { at: Path.next(at), select: true });
        }
        return numberOfImages - 1; // number of elements added
      }
      Transforms.insertNodes(editor, images, { at: targetPath(at, direction), select: true });

    } else if (replaceExisting) {
      Transforms.removeNodes(editor, { at });
      Transforms.insertNodes(editor, images, { at, select: true });
    } else {
      const pathToTarget = targetPath(at, direction);
      Transforms.insertNodes(editor, images, { at: pathToTarget, select: true });

    }
  } else {
    const containerElementPath = SelectionTransforms.componentElementPath(editor);
    if (containerElementPath) {
      Transforms.insertNodes(editor, images, { at: Path.next(containerElementPath), select: true });
    } else {
      Transforms.insertNodes(editor, images, {
        select: true
      });
    }
  }
  return numberOfImages;
};
