import { getNodesByType } from "@udecode/slate-plugins";
import { Editor, Path, Text, Transforms } from "slate";
import { uploadFiles } from "./transforms/uploadFiles";
import { insertImage } from "./transforms/insertImage";
import { IMAGE } from "./type";
import { logger } from "../../../../../../../../../common/util/logger";
import { SlideTransforms } from "../../../../../services/transforms/SlideTransforms";
import { SLIDE } from "../../slide/type";
import { debounceByType } from "../../../../../../../../../utils/debounceByType";
import { KEY_IMAGE_PALETTE_SUGGESTIONS } from "../../../../../../../../../common/slide/transforms/palette/getPaletteForSlide";
import { imagePaletteSuggestionsForSlide } from "./queries/imagePaletteSuggestionsForSlide";
import ObjectUtils from "../../../../../../../../../common/util/ObjectUtils";

// How many image palette suggestions we want to store in the content state.
const IMAGE_PALETTES_TO_STORE = 4;

/**
 * Extends the editor by adding an `insertImage` function.
 *
 * @param editor Slate editor instance.
 */
export const withImages = (deckId, withDebounce = true) => (editor) => {

  const { normalizeNode, apply } = editor;

  const updatePaletteSuggestions = (slideIndex, slideNode, slidePath, remove = false) => {
    try {
      if (slideNode && slidePath && slideNode.type === SLIDE) {
        if (remove) {
          logger.debug(`Removing image palettes for slide ${slideIndex}`);
          editor.settings(slidePath).remove(KEY_IMAGE_PALETTE_SUGGESTIONS);
        } else {
          logger.debug(`Update image palettes for slide ${slideIndex}`);
          editor.settings(slidePath).set(KEY_IMAGE_PALETTE_SUGGESTIONS, imagePaletteSuggestionsForSlide(slideNode).slice(0, IMAGE_PALETTES_TO_STORE).map((palette) => ObjectUtils.removeBlankProperties(palette.toDataObject())));
        }
      }
    } catch (e) {
      logger.error(e);
    }
  };

  const updatePaletteSuggestionsDebounced = withDebounce ? debounceByType(updatePaletteSuggestions, 20) : updatePaletteSuggestions;

  /**
   * An image can only contain a text leaf.
   */
  editor.normalizeNode = ([node, path]) => {
    if (node && node.type === IMAGE) {
      if (node.children.length > 1 || (node.children.length === 1 && !Text.isText(node.children[0]))) {
        logger.debug(`Encountered an image node at [${path}] with a non-leaf child node - normalizing`);
        const slideChildPath = path.concat(0);
        Editor.withoutNormalizing(editor, () => {
          Transforms.removeNodes(editor, {
            at: slideChildPath,
            voids: true,
          });
          Transforms.insertNodes(editor, {
            text: '',
          }, {
            at: slideChildPath,
          });
        });

      }
    }
    normalizeNode([node, path]); // default normalization
  };

  editor.insertImage = (url, name) => insertImage(editor, url, name);

  const updateWhenImages = (path) => {
    const [slideNode, slidePath] = path !== undefined ? SlideTransforms.getSlide(editor, path) : SlideTransforms.currentSlide(editor);
    if (slideNode && slidePath) {
      const [slideIndex] = slidePath;
      // Check if there are images on the current slide.
      const [imageMatch] = getNodesByType(editor, [IMAGE], { at: slidePath });
      if (imageMatch) {
        updatePaletteSuggestionsDebounced(slideIndex, slideNode, slidePath);
      } else if (editor.settings(slidePath).get(KEY_IMAGE_PALETTE_SUGGESTIONS) !== undefined) {
        updatePaletteSuggestionsDebounced(slideIndex, slideNode, slidePath, true);
      }
    }
  };

  editor.apply = (operation) => {
    apply(operation);

    // Adding a new node
    if (operation.type === 'insert_node') {
      const { path } = operation;
      if (path !== undefined) {
        updateWhenImages(path);
      }
    }

    // Updating an image node
    if (operation.type === 'set_node') {
      const { path, newProperties } = operation;
      if (path !== undefined && newProperties !== undefined && newProperties.type === IMAGE) {
        updateWhenImages(path);
      }
    }

    // Merging slides
    if (operation.type === 'merge_node') {
      const { path } = operation;
      if (path !== undefined && path.length === 1) {
        updateWhenImages();
      }
    }

    // Splitting slides
    if (operation.type === 'split_node') {
      const { path } = operation;
      if (path !== undefined && path.length === 1) {
        updateWhenImages(path);
        updateWhenImages(Path.next(path));
      }
    }

    // Removing a node
    if (operation.type === 'remove_node') {
      const { path, node } = operation;
      // We are not concerned with when slides are removed.
      if (path !== undefined && path.length > 1 && node && node.type === IMAGE) {
        updateWhenImages();
      }
    }
  };

  /**
   * Process clipboard paste events.
   *
   * @param clipboardData data coming from paste event.
   */
  editor.insertClipboardData = (clipboardData, onSuccess, onError, clearTimeout) => {
    const { items } = clipboardData;
    const files = [];
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // Skip content if not image
        const [mime] = item.type.split("/");
        if (!mime || mime !== "image") {
          return false;
        }

        // Retrieve image on clipboard as blob
        files.push(item.getAsFile());
      }
    }
    if (files.length > 0) {
      uploadFiles(deckId, files, {
        process: (url, name, { swatch }) => insertImage(editor, url, name, swatch),
        onSuccess,
        onError,
        clearTimeout
      });
      return true;
    }
    return false;
  };

  return editor;
};
