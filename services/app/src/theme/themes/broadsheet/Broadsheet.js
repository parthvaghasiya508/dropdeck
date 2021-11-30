import ColorChart from "../../ColorChart";
import AbstractTheme from "../../AbstractTheme";
import { getPalettes } from "./components/palettes";
import { getFonts } from "./components/fonts";
import { textListCenteredRemix } from "../../../common/remix/rules/lists/textListCentered/textListCentered";
import { olBoldNumberRemix } from "../../../common/remix/rules/lists/olBoldNumber/olBoldNumber";
import { textListCenteredOverride } from "./remixes/textListCenteredOverride";
import { olBoldNumberOverride } from "./remixes/olBoldNumberOverride";
import { clustersTextFixedImageRemix } from "../../../common/remix/rules/clusters/clustersTextFixedImage/clustersTextFixedImage";
import { clustersTextFixedImageOverride } from "./remixes/clustersTextFixedImageOverride";
import { clustersText5050Remix } from "../../../common/remix/rules/clusters/clustersText5050/clustersText5050";
import { clustersText5050Override } from "./remixes/clustersText5050Override";
import { clustersQuoteRoundedImageRemix } from "../../../common/remix/rules/clusters/clustersQuoteRoundImage/clustersQuoteRoundImage";
import { clustersQuoteRoundedImageOverride } from "./remixes/clustersQuoteRoundedImageOverride";
import { clustersPanelFixedImageRemix } from "../../../common/remix/rules/clusters/clustersPanelFixedImage/clustersPanelFixedImage";
import { clustersPanelFixedImageOverride } from "./remixes/clustersPanelFixedImageOverride";
import { boxOutTextLeftRemix, boxOutTextRightRemix } from "../../../common/remix/rules/containedCover/containedCover";
import { boxoutTextOverride } from "./remixes/boxoutTextOverride";
import { headingParagraphUpwardRemix } from "../../../common/remix/rules/text/headingParagraphUpward/headingParagraphUpward";
import { headingParagraphUpwardOverride } from "./remixes/headingParagraphUpwardOverride";
import { textBlockbusterRemix } from "../../../common/remix/rules/text/textBlockBuster/textBlockbuster";
import { textBlockbusterOverride } from "./remixes/textBlockbusterOverride";
import { listTextUpwardRemix } from "../../../common/remix/rules/lists/listTextUpward/listTextUpward";
import { listTextUpwardOverride } from "./remixes/listTextUpdwardOverride";
import { imageFullBleedTextGradientRemix } from "../../../common/remix/rules/images/imageFullBleedTextGradient/imageFullBleedTextGradientRemix";
import { imageFullBleedTextGradientOverride } from "./remixes/imageFullBleedTextGradientOverride";
import { listUnorderedPanelsRemix } from "../../../common/remix/rules/lists/listUnorderedPanels/listUnorderedPanels";
import { listUnorderedPanelsOverride } from "./remixes/listUnorderedPanelsOverride";
import { textDefaultRemix } from "../../../common/remix/rules/text/textDefault/textDefault";
import { textDefaultOverride } from "./remixes/textDefaultOverride";
import { listSplitRemix } from "../../../common/remix/rules/lists/listSplit/listSplit";
import { listSplitOverride } from "./remixes/listSplitOverride";
import { clustersFullPanelRemix } from "../../../common/remix/rules/clusters/clustersFullPanel/clustersFullPanel";
import { clustersFullPanelOverride } from "./remixes/clustersFullPanelOverride";
import { textListPanelsRemix } from "../../../common/remix/rules/lists/textListPanels/textListPanels";
import { textListPanelsOverride } from "./remixes/textListPanelsOverride";

export default class Broadsheet extends AbstractTheme {
  constructor() {

    super('broadsheet', getPalettes(), "Broadsheet", false, getFonts());

    // Element Overrides
    // Palette based variables that target slide / remix elements. Refer to palette not colorChart.
    // --------------------------------------------------------------------------------------------

    const { override } = this;

    override('& blockquote').with(
      (palette) => ({
        boxShadow: `inset 0.1em 0 0 ${palette.accent()}, inset  0.3em 0 0 ${palette.background()}, inset  0.4em 0 0 ${palette.accent()}`,
        '& p': {
          color: `${palette.text()}`,
          '&:before': {
            background: `${palette.background()}`,
          },
        },
      })
    );

    // textlist-centered
    override(textListCenteredRemix).with(textListCenteredOverride);
    override(listSplitRemix).with(listSplitOverride);

    // big number remix has double border
    override(olBoldNumberRemix).with(olBoldNumberOverride);

    // clusters double line
    override(clustersQuoteRoundedImageRemix).with(clustersQuoteRoundedImageOverride);
    override(clustersTextFixedImageRemix).with(clustersTextFixedImageOverride);
    override(clustersText5050Remix).with(clustersText5050Override);
    override(boxOutTextLeftRemix).with(boxoutTextOverride);
    override(boxOutTextRightRemix).with(boxoutTextOverride);
    override(clustersPanelFixedImageRemix).with(clustersPanelFixedImageOverride);
    override(headingParagraphUpwardRemix).with(headingParagraphUpwardOverride);
    override(textBlockbusterRemix).with(textBlockbusterOverride);
    override(listTextUpwardRemix).with(listTextUpwardOverride);
    override(imageFullBleedTextGradientRemix).with(imageFullBleedTextGradientOverride);
    override(listUnorderedPanelsRemix).with(listUnorderedPanelsOverride);
    override(textDefaultRemix).with(textDefaultOverride);
    override(clustersFullPanelRemix).with(clustersFullPanelOverride);
    override(textListPanelsRemix).with(textListPanelsOverride);

  }

  // Color ChartJs
  // Constructs a color chart from a given palette, for use in remixes
  // --------------------------------------------------------------------------------------------

  /**
   * @param palette base color palette
   */
  colorChart = (palette) => new ColorChart(
    palette.accent(),
    [palette.background(), palette.accent()],
    [palette.title(), palette.background()],
    palette.text(),
  );

  // Theme Specific Overrides
  // Overrides here will affect every slide in a deck. Layout & structural (group colour info above)
  // -----------------------------------------------------------------------------------------------

  css() {
    return {
      theme: {
        '& .slide': {
          fontSize: '80%',
          fontWeight: 400,
          lineHeight: '1.25',
          padding: "9%",
          fontFamily: '"Martel", serif !important',
          justifyContent: 'center !important',
          alignItems: 'flex-start !important',
          textAlign: 'left',

          '& h1': {
            margin: '0 0 0.3em 0',
            padding: 0,
            fontSize: '2em',
            fontWeight: 600,
            lineHeight: '1.05',
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
            fontFamily: '"Assistant", sans-serif',
            fontSize: '1.1em',
            fontWeight: 600,
            margin: '0 0 1em 0.2em',
            padding: '0.2em 0.55em !important',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            display: 'inline-block',
            clipPath: 'polygon(calc(0% + 0.15em) 0, 100% 0, calc(100% - 0.15em) 100%, 0% 100%)',
            '& strong': {
              fontWeight: 900,
            },
          },
          '& p': {
            margin: '0 0 0.75em 0',
            padding: 0,
            fontSize: '1.1em',
            fontWeight: 400,
            lineHeight: '1.1', // 1.25
            letterSpacing: '-0.01em',
            '& strong': {
              fontWeight: 900,
            },
          },
          '& .container-chart text': {
            fontFamily: '"Assistant", sans-serif !important',
            textTransform: 'uppercase',
          },
          '& blockquote': {
            fontWeight: '600',
            padding: '0.15em 0 0 1.5em !important',
            '& p': {
              textIndent: '0',
              fontStyle: 'italic',
              fontWeight: '500',
            },
            '& p:before': {
              fontFamily: '"Martel", serif !important',
              display: 'block',
              width: '0.55em',
              height: '0.475em',
              opacity: '1 !important',
              margin: '-0.25em 0 0 -1.365em !important',
              padding: '0.25em !important',
              lineHeight: '1 !important',
              top: '-0.25em',
              textAlign: 'center !important',
            },
            '& p:after': {
              display: 'none',
            },
          },
          '& ol, & ul': {
            '& li': {
              fontSize: '1.1em',
              margin: '0 0 0.5em 1.5em !important', // 0.25em 0 0.5em 1.5em
              boxSizing: 'border-box',
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
            fontSize: '100%', // 95%
            '& h1': {
              marginBottom: '0.25em',
            },
          },
          '& .group-text-before': {
            marginBottom: '1em',
            fontSize: '100%',
            '& h1': {
              marginBottom: '0.25em',
            },
          },

          // Reduce all clustered text sizes
          '& .sequence .cluster': {
            fontSize: '90%',
            '& .container-heading-one': {
              fontSize: '85%',
            },
          },

        },

      }
    };
  }

}
