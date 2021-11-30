import AbstractTheme from "../../AbstractTheme";
import { getPalettes } from "./components/palettes";
import { fallbackGridRemix } from "../../../common/remix/rules/textImage/fallbackGrid/fallbackGrid";
import { fallbackGridOverride } from "./remixes/fallbackGridOverride";
import { textListCenteredRemix } from "../../../common/remix/rules/lists/textListCentered/textListCentered";
import { textListCenteredOverride } from "./remixes/textListCenteredOverride";
import { textBlockbusterRemix } from "../../../common/remix/rules/text/textBlockBuster/textBlockbuster";
import { textBlockbusterOverride } from "./remixes/textBlockbusterOverride";
import { clustersText5050Remix } from "../../../common/remix/rules/clusters/clustersText5050/clustersText5050";
import { clustersText5050Override } from "./remixes/clustersText5050Override";
import { textHeadingColsRemix } from "../../../common/remix/rules/text/textHeadingCols/textHeadingCols";
import { textHeadingColsOverride } from "./remixes/textHeadingColsOverride";
import { imageFullBleedTextGradientRemix } from "../../../common/remix/rules/images/imageFullBleedTextGradient/imageFullBleedTextGradientRemix";
import { imageFullBleedTextGradientOverride } from "./remixes/imageFullBleedTextGradientOverride";
import { boxOutTextLeftRemix, boxOutTextRightRemix } from "../../../common/remix/rules/containedCover/containedCover";
import { boxoutTextOverride } from "./remixes/boxoutTextOverride";
import { clustersTextFixedImageRemix } from "../../../common/remix/rules/clusters/clustersTextFixedImage/clustersTextFixedImage";
import { clustersTextFixedImageOverride } from "./remixes/clustersTextFixedImageOverride";
import { textImage5050AspectRemix } from "../../../common/remix/rules/textImage/textImage5050Aspect/textImage5050Aspect";
import { textImage5050AspectOverride } from "./remixes/textImage5050AspectOverride";
import { quoteSimpleImageRemix } from "../../../common/remix/rules/blockQuotes/quoteSimpleImage/quoteSimpleImage";
import { quoteSimpleImageOverride } from "./remixes/quoteSimpleImageOverride";
import { imageFullBleedRemix } from "../../../common/remix/rules/images/imageFullBleed/imageFullBleed";
import { imageFullBleedOverride } from "./remixes/imageFullBleedOverride";
import { logosBorderedGridRemix } from "../../../common/remix/rules/logos/logosBorderedGrid/logosBorderedGrid";
import { logosBorderedGridOverride } from "./remixes/logosBorderedGridOverride";
import { clustersPanelFixedImageRemix } from "../../../common/remix/rules/clusters/clustersPanelFixedImage/clustersPanelFixedImage";
import { clustersPanelFixedImageOverride } from "./remixes/clustersPanelFixedImageOverride";
import { listUnorderedPanelsRemix } from "../../../common/remix/rules/lists/listUnorderedPanels/listUnorderedPanels";
import { listUnorderedPanelsOverride } from "./remixes/listUnorderedPanelsOverride";
import { textDefaultRemix } from "../../../common/remix/rules/text/textDefault/textDefault";
import { textDefaultOverride } from "./remixes/textDefaultOverride";
import { imagesFullBleedRemix } from "../../../common/remix/rules/images/imagesFullBleed/imagesFullBleed";
import { olBoldNumberRemix } from "../../../common/remix/rules/lists/olBoldNumber/olBoldNumber";
import { olBoldNumberOverride } from "./remixes/olBoldNumberOverride";
import { clustersTextFixedImageAspectRemix } from "../../../common/remix/rules/clusters/clustersTextFixedImageAspect/clustersTextFixedImageAspect";
import { clustersTextFixedImageAspectOverride } from "./remixes/clustersTextFixedImageAspectOverride";
import { imageFullBleedCaptionRemix } from "../../../common/remix/rules/images/imageFullBleedCaption/imageFullBleedCaption";
import { imageFullBleedCaptionOverride } from "./remixes/imageFullBleedCaptionOverride";
import { clustersFullPanelRemix } from "../../../common/remix/rules/clusters/clustersFullPanel/clustersFullPanel";
import { clustersFullPanelOverride } from "./remixes/clustersFullPanelOverride";
import { clustersRoundedImageRemix } from "../../../common/remix/rules/clusters/clustersRoundedImage/clustersRoundedImage";
import { clustersRoundedImageOverride } from "./remixes/clustersRoundedImageOverride";

export const SIMPLE_THEME_ID = 'simple';

export default class Simple extends AbstractTheme {

  constructor(id = SIMPLE_THEME_ID, palettes = getPalettes(), name = "Simple and Elegant", branded = false, fonts) {
    super(id, palettes, name, branded, fonts);

    const { override } = this;

    // --------------------------------------------------------------------------------------------
    // Element Overrides
    // Palette based variables that target slide / remix elements. Refer to palette not colorChart.
    // --------------------------------------------------------------------------------------------

    override('& li').with(
      (palette) => ({
        color: `${palette.accentColor} !important`,
        '&:before': {
          color: palette.accentColor,
        },
      })
    );
    override('& span.mark').with(
      (palette) => ({
        backgroundColor: palette.accentColor,
      })
    );

    // -----------------------------------------------------------
    // Theme Specific Remix Overrides
    // -----------------------------------------------------------

    // text remixes
    override(textDefaultRemix).with(textDefaultOverride);

    // quotes
    override(quoteSimpleImageRemix).with(quoteSimpleImageOverride);

    // clusters
    override(clustersPanelFixedImageRemix).with(clustersPanelFixedImageOverride);
    override(clustersText5050Remix).with(clustersText5050Override);
    override(clustersTextFixedImageRemix).with(clustersTextFixedImageOverride);
    override(clustersTextFixedImageAspectRemix).with(clustersTextFixedImageAspectOverride);
    override(clustersFullPanelRemix).with(clustersFullPanelOverride);
    override(clustersRoundedImageRemix).with(clustersRoundedImageOverride);

    // list remixes
    override(textListCenteredRemix).with(textListCenteredOverride);
    override(listUnorderedPanelsRemix).with(listUnorderedPanelsOverride);
    override(olBoldNumberRemix).with(olBoldNumberOverride);

    // text/image remixes
    override(textImage5050AspectRemix).with(textImage5050AspectOverride);
    override(textBlockbusterRemix).with(textBlockbusterOverride);
    override(textHeadingColsRemix).with(textHeadingColsOverride);
    override(imageFullBleedTextGradientRemix).with(imageFullBleedTextGradientOverride);
    override(boxOutTextLeftRemix).with(boxoutTextOverride);
    override(boxOutTextRightRemix).with(boxoutTextOverride);
    override(imageFullBleedCaptionRemix).with(imageFullBleedCaptionOverride);

    // image remixes
    override(imageFullBleedRemix).with(imageFullBleedOverride);
    override(imagesFullBleedRemix).with(imageFullBleedOverride);

    // logo remixes
    override(logosBorderedGridRemix).with(logosBorderedGridOverride);

    // grid image layouts
    override(fallbackGridRemix).with(fallbackGridOverride);

  }

  // Theme Specific Overrides
  // Overrides here will affect every slide in a deck. Layout & structural (group colour info above)
  // -----------------------------------------------------------------------------------------------

  css() {
    return {
      theme: {
        '& .slide': {
          fontSize: '75%',
          fontWeight: 400,
          lineHeight: '1.25',
          padding: "9%",
          justifyContent: 'center !important',
          alignItems: 'flex-start !important',
          textAlign: 'left !important',
          fontFeatureSettings: '"ss03", "cv10"',
          '& h1': {
            margin: '0 0 0.75em 0',
            padding: 0,
            fontSize: '2em',
            fontWeight: 700,
            lineHeight: '1',
            letterSpacing: '-0.035em',
            '& strong': {
              fontWeight: 900,
            },
            '& span.emphasis': {
              padding: '0',
              borderRadius: "0.1em",
            },
          },
          '& h2': {
            margin: '0 0 0.325em 0',
            padding: 0,
            fontSize: '1.65em',
            fontWeight: 600,
            lineHeight: '1.1',
            letterSpacing: '-0.035em',
            '& strong': {
              fontWeight: 900,
            },
          },
          '& p': {
            margin: '0 0 0.75em 0',
            padding: 0,
            fontSize: '1.325em',
            fontWeight: 400,
            lineHeight: '1.1',
            letterSpacing: '-0.01em',
            '& strong': {
              fontWeight: 700,
            },
          },
          '& ol, & ul': {
            '& li': {
              fontSize: '1.325em',
              margin: '0 0 0.5em 1.5em !important',
              boxSizing: 'border-box',
              '&:before': {
                lineHeight: '1.1',
              },
              '& p': {
                lineHeight: '1.1',
              },
            },
          },
          '& blockquote': {
            '& p': {
              fontWeight: 600,
              letterSpacing: '-0.035em',
              '& strong': {
                fontWeight: 900,
              },
            },
          },
          '& code': {
            boxSizing: 'border-box',
            fontSize: '1.1em',
          },
          '& img': {
            width: '100%'
          },
          '& .group-text-after': {
            marginTop: '1.5em',
            fontSize: '100%',
          },
          '& .group-text-before': {
            marginBottom: '1.5em',
            fontSize: '100%',
          },
        },

      },
    };
  }
}
