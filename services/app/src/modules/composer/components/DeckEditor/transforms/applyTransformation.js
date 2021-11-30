import { Editor, Node, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { SlideTransforms } from "../services/transforms/SlideTransforms";
import { setRemix } from "../../../transforms/remix/shiftRemix";
import { setPaletteForSlide } from "../../../../../common/slide/transforms/palette/setPaletteForSlide";
import { logger } from "../../../../../common/util/logger";
import { isDynamicTemplate } from "../../../../../common/api/plugins/template/queries/isDynamicTemplate";
import { componentBuilder } from "../../../../../common/api/plugins/builder/ComponentBuilder";
import { trackUnsplashDownloads } from "../modules/plugins/component/media/image/transforms/trackUnsplashDownloads";
import { IMAGE } from "../modules/plugins/component/media/image/type";
import { FROM_UNSPLASH } from "../modules/plugins/component/media/image/components/ImageEditorElement";
import { GROUP_COLLECTION } from "../modules/plugins/component/groups/type";
import {
  getPaletteForSlide,
  hasStoredPaletteForSlide
} from "../../../../../common/slide/transforms/palette/getPaletteForSlide";

/**
 * Extract all image nodes from an array of Slate nodes.
 *
 * @param nodes array of Slate nodes.
 */
const imageNodes = (nodes) => {
  const allNodes = nodes.map((node) => {
    if (node.type === GROUP_COLLECTION) {
      const childNodes = node.children.map((groupNode) => groupNode.children);
      return Array.prototype.concat.apply([], childNodes);
    }
    return node;
  });
  const flatNodes = Array.prototype.concat.apply([], allNodes);
  return flatNodes.filter((node) => (node.type === IMAGE && node.settings?.from === FROM_UNSPLASH));
};

/**
 * Apply a transformation an existing slide node. This can either be a template or an action to set a remix or a
 * palette on a slide, for example.
 *
 * @param editor
 * @param themeName
 * @param transformation
 * @param slidePath
 */
export const applyTransformation = (editor, themeName, transformation, slidePath) => {
  if (transformation) {
    let slideNode;
    if (!slidePath) {
      [slideNode, slidePath] = SlideTransforms.currentSlide(editor);
    } else {
      [slideNode] = Editor.node(editor, slidePath);
    }
    if (slidePath) {
      const slide = { path: slidePath };

      // Evaluate the template build with dynamic arguments.
      if (isDynamicTemplate(transformation)) {
        logger.warn(`Trying to inject a dynamic template after initialisation - this should not happen.`);
        return;
      }

      const { remixName } = transformation;
      const { palette } = transformation;
      const templateNodes = transformation.extendFrom ? transformation.extendFrom(slideNode) : [];
      Editor.withoutNormalizing(editor, () => {

        if (templateNodes.length > 0) {
          const newSlide = componentBuilder()
            .slide({}, templateNodes)
            .build();
          Transforms.removeNodes(editor, { at: slidePath });
          Transforms.insertNodes(editor, [newSlide], { at: slidePath });

          // Trigger Unsplash download events, if any images.
          trackUnsplashDownloads(imageNodes(templateNodes));
        }

        // Apply a remix, if applicable.
        if (remixName) {
          setRemix(editor)(slide, remixName);
        }

        // Apply a palette, if applicable.
        if (palette !== undefined) {
          // Transformation specified a palette:
          setPaletteForSlide(editor)(slide, themeName, palette);
        } else if (hasStoredPaletteForSlide(themeName, slideNode?.settings)) {
          // Reset stored palette:
          setPaletteForSlide(editor)(slide, themeName, palette);
        }

        // Finally, select the last element of the the new template.
        const [lastNode, lastPosition] = Editor.last(editor, slidePath);
        if (lastNode && lastPosition) {
          if (!Editor.isVoid(editor, lastNode)) {
            const path = lastPosition;
            const offset = Node.string(lastNode).length;
            Transforms.select(editor, { path, offset });
          } else {
            Transforms.select(editor, lastPosition);
          }
        }
        ReactEditor.focus(editor);
      });

    } else {
      logger.warn(`No active slide when applying template`);
    }
  }
};
