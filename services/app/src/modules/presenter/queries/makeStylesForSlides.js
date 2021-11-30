import { makeStyles } from "@material-ui/core";
import { buildCombinedSlideStyles } from "./buildCombinedSlideStyles";
import { logger } from "../../../common/util/logger";

/**
 * Combine a set of styles for a list of slides and compile JSS into CSS.
 *
 * @param slides
 * @param themeName
 * @param themePackage
 * @parm branding
 * @returns {(props?: any) => ClassNameMap<string>}
 */
export const makeStylesForSlides = (slides, themeName, themePackage, options = {}) => {
  const { animate = false, branding = {}, makeStyleOptions } = options;
  const styles = buildCombinedSlideStyles(slides, themeName, themePackage, branding, animate);
  logger.trace(`Rebuilding slide styles${makeStyleOptions && makeStyleOptions.meta ? ` for ${makeStyleOptions.meta}` : ''}`);
  return makeStyleOptions ? makeStyles(styles, makeStyleOptions) : makeStyles(styles);
};
