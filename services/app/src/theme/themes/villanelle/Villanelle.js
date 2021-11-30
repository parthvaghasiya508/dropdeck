import ColorChart from "../../ColorChart";
import AbstractTheme from "../../AbstractTheme";
import { getPalettes } from "./components/palettes";
import { getFonts } from "./components/fonts";
import { textListCenteredRemix } from "../../../common/remix/rules/lists/textListCentered/textListCentered";
import { textListCenteredOverride } from "./remixes/textListCenteredOverride";
import { listUnorderedPanelsRemix } from "../../../common/remix/rules/lists/listUnorderedPanels/listUnorderedPanels";
import { listUnorderedPanelsOverride } from "./remixes/listUnorderedPanelsOverride";
import { boxOutTextLeftRemix, boxOutTextRightRemix } from "../../../common/remix/rules/containedCover/containedCover";
import { boxoutTextOverride } from "./remixes/boxoutTextOverride";
import { imageFullBleedRemix } from "../../../common/remix/rules/images/imageFullBleed/imageFullBleed";
import { imagesFullBleedRemix } from "../../../common/remix/rules/images/imagesFullBleed/imagesFullBleed";
import { olBoldNumberRemix } from "../../../common/remix/rules/lists/olBoldNumber/olBoldNumber";
import { olBoldNumberOverride } from "./remixes/olBoldNumberOverride";
import { textBlockbusterRemix } from "../../../common/remix/rules/text/textBlockBuster/textBlockbuster";
import { textBlockbusterOverride } from "./remixes/textBlockbusterOverride";
import { imageFullBleedTextGradientRemix } from "../../../common/remix/rules/images/imageFullBleedTextGradient/imageFullBleedTextGradientRemix";
import { imageFullBleedTextGradientOverride } from "./remixes/imageFullBleedTextGradientOverride";
import { headingParagraphUpwardOverride } from "./remixes/headingParagraphUpwardOverride";
import { listTextUpwardOverride } from "./remixes/listTextUpdwardOverride";
import { listTextUpwardRemix } from "../../../common/remix/rules/lists/listTextUpward/listTextUpward";
import { headingParagraphUpwardRemix } from "../../../common/remix/rules/text/headingParagraphUpward/headingParagraphUpward";
import { clustersPanelFixedImageRemix } from "../../../common/remix/rules/clusters/clustersPanelFixedImage/clustersPanelFixedImage";
import { clustersPanelFixedImageOverride } from "./remixes/clustersPanelFixedImageOverride";
import { clustersQuoteRoundedImageRemix } from "../../../common/remix/rules/clusters/clustersQuoteRoundImage/clustersQuoteRoundImage";
import { clustersQuoteRoundedImageOverride } from "./remixes/clustersQuoteRoundedImageOverride";
import { clustersTextFixedImageRemix } from "../../../common/remix/rules/clusters/clustersTextFixedImage/clustersTextFixedImage";
import { clustersTextFixedImageOverride } from "./remixes/clustersTextFixedImageOverride";
import { clustersTextFixedImageAspectRemix } from "../../../common/remix/rules/clusters/clustersTextFixedImageAspect/clustersTextFixedImageAspect";
import { clustersTextFixedImageAspectOverride } from "./remixes/clustersTextFixedImageAspectOverride";
import { clustersText5050Remix } from "../../../common/remix/rules/clusters/clustersText5050/clustersText5050";
import { clustersText5050Override } from "./remixes/clustersText5050Override";
import { clustersFullPanelRemix } from "../../../common/remix/rules/clusters/clustersFullPanel/clustersFullPanel";
import { clustersFullPanelOverride } from "./remixes/clustersFullPanelOverride";
import { textListPanelsRemix } from "../../../common/remix/rules/lists/textListPanels/textListPanels";
import { textListPanelsOverride } from "./remixes/textListPanelsOverride";

export default class Villanelle extends AbstractTheme {
  constructor() {
    super('villanelle', getPalettes(), "Villanelle", false, getFonts());

    /*
     * Custom palette override behaviour:
     */

    const { override } = this;

    // --------------------------------------------------------------------------------------------
    // Theme Specific Remix Overrides
    // --------------------------------------------------------------------------------------------

    override(textListCenteredRemix).with(textListCenteredOverride);
    override(listUnorderedPanelsRemix).with(listUnorderedPanelsOverride);
    override(boxOutTextRightRemix).with(boxoutTextOverride);
    override(boxOutTextLeftRemix).with(boxoutTextOverride);
    override(imageFullBleedRemix).with(boxoutTextOverride);
    override(imagesFullBleedRemix).with(boxoutTextOverride);
    override(olBoldNumberRemix).with(olBoldNumberOverride);
    override(textBlockbusterRemix).with(textBlockbusterOverride);
    override(imageFullBleedTextGradientRemix).with(imageFullBleedTextGradientOverride);
    override(headingParagraphUpwardRemix).with(headingParagraphUpwardOverride);
    override(listTextUpwardRemix).with(listTextUpwardOverride);
    override(clustersPanelFixedImageRemix).with(clustersPanelFixedImageOverride);
    override(clustersQuoteRoundedImageRemix).with(clustersQuoteRoundedImageOverride);
    override(clustersTextFixedImageRemix).with(clustersTextFixedImageOverride);
    override(clustersTextFixedImageAspectRemix).with(clustersTextFixedImageAspectOverride);
    override(clustersText5050Remix).with(clustersText5050Override);
    override(clustersFullPanelRemix).with(clustersFullPanelOverride);
    override(textListPanelsRemix).with(textListPanelsOverride);

  }

  /**
   * Constructs a color chart from a given palette.
   *
   * @param palette base color palette
   */
  colorChart = (palette) => new ColorChart(
    palette.accent(),
    palette.background(),
    palette.title(),
    palette.text(),
  );

  css() {
    return {
      theme: {
        '& .slide': {
          fontSize: '75%', // 65
          fontWeight: 400,
          lineHeight: '1.25',
          padding: "9%",
          fontFamily: '"IBM Plex Sans", serif',
          justifyContent: 'center !important',
          alignItems: 'flex-start !important',
          textAlign: 'left !important',
          '& h1': {
            fontFamily: '"IBM Plex Sans Condensed", sans-serif',
            fontSize: '2.5em',
            lineHeight: '1',
            margin: '0.3em 0',
            letterSpacing: '-0.025em',
            textTransform: 'uppercase',
            fontWeight: 500,
            '& strong': {
              fontWeight: 900,
            },
            '& span.emphasis': {
              padding: '0',
              borderRadius: "0.1em",
            },
          },
          '& h2': {
            fontFamily: '"IBM Plex Sans Condensed", sans-serif',
            margin: '0 0 0.45em 0',
            padding: 0,
            fontSize: '1.65em',
            fontWeight: 500,
            lineHeight: '1.2',
            letterSpacing: '-0.025em',
            '& strong': {
              fontWeight: 900,
            },
          },
          '& .container-chart text': {
            fontFamily: '"IBM Plex Sans Condensed", sans-serif !important',
          },
          '& p': {
            margin: '0 0 0.75em 0',
            padding: 0,
            fontSize: '1.3em',
            fontWeight: 400, 
            lineHeight: '1.2',
            letterSpacing: '-0.01em',
            '& strong': {
              fontWeight: 700,
            },
            '& span.emphasis': {
              padding: "0.05em 0 0.075em 0",
            },
          },
          '& ol, & ul': {
            '& li': {
              fontSize: '1.3em',
              margin: '0 0 0.5em 1.5em !important', // 0.25em 0 0.5em 1.5em
              boxSizing: 'border-box',
            },
          },
          '& blockquote': {
            '& p': {
              fontWeight: 400,
              letterSpacing: '-0.025em',
              textIndent: '0.8em', // *
              '& strong': {
                fontWeight: 900,
              },
              '&:before, &:after': {
                fontFamily: '"IBM Plex Sans Condensed", sans-serif !important',
              },
              '&:before': {
                margin: '0.3em 0 0 -1em', // *
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
            marginTop: '1em',
            fontSize: '100% !important',
            '& h1': {
              marginBottom: '0.25em',
            },
          },
          '& .group-text-before': {
            marginBottom: '1em',
            fontSize: '100% !important',
            '& h1': {
              marginBottom: '0.25em',
            },
          },
          
        },
        
      }
    };
  }
}
