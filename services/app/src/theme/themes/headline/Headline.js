import { Decoration } from "slate";
import AbstractTheme from "../../AbstractTheme";
import { getPalettes } from "./components/palettes";
import { getFonts } from "./components/fonts";
import { fallbackGridRemix } from "../../../common/remix/rules/textImage/fallbackGrid/fallbackGrid";
import { fallbackGridOverride } from "./remixes/fallbackGridOverride";
import { olBoldNumberRemix } from "../../../common/remix/rules/lists/olBoldNumber/olBoldNumber";
import { textListCenteredRemix } from "../../../common/remix/rules/lists/textListCentered/textListCentered";
import { clustersTextFixedImageRemix } from "../../../common/remix/rules/clusters/clustersTextFixedImage/clustersTextFixedImage";
import { listUnorderedPanelsRemix } from "../../../common/remix/rules/lists/listUnorderedPanels/listUnorderedPanels";
import { listUnorderedPanelsOverride } from "./remixes/listUnorderedPanelsOverride";
import { olBoldNumberOverride } from "./remixes/olBoldNumberOverride";
import { textListCenteredOverride } from "./remixes/textListCenteredOverride";
import { clustersTextFixedImageOverride } from "./remixes/clustersTextFixedImageOverride";
import { textImages5050FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/50-50/textImages5050FullBleed/textImages5050FullBleed";
import { textImages5050FullBleedOverride } from "./remixes/textImages5050FullBleedOverride";
import { imagesText5050FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/50-50/imagesText5050FullBleed/imagesText5050FullBleed";
import { textImages2575FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/25-75/textImages2575FullBleed/textImages2575FullBleed";
import { textImages2575FullBleedOverride } from "./remixes/textImages2575FullBleedOverride";
import { imagesText2575FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/25-75/imagesText2575FullBleed/imagesText2575FullBleed";
import { textDefaultRemix } from "../../../common/remix/rules/text/textDefault/textDefault";
import { textDefaultOverride } from "./remixes/textDefaultOverride";
import { listSplitRemix } from "../../../common/remix/rules/lists/listSplit/listSplit";
import { listSplitOverride } from "./remixes/listSplitOverride";
import { listSiblingRemix } from "../../../common/remix/rules/lists/listSibling/listSibling";
import { listSiblingOverride } from "./remixes/listSiblingOverride";
import { textHeadingColsRemix } from "../../../common/remix/rules/text/textHeadingCols/textHeadingCols";
import { textHeadingColsOverride } from "./remixes/textHeadingColsOverride";
import { textQuote5050FullBleedRemix } from "../../../common/remix/rules/textImage/textQuote5050FullBleed/textQuote5050FullBleed";
import { textQuote5050FullBleedOverride } from "./remixes/textQuote5050FullBleedOverride";
import { quoteSimpleImageRemix } from "../../../common/remix/rules/blockQuotes/quoteSimpleImage/quoteSimpleImage";
import { quoteSimpleImageOverride } from "./remixes/quoteSimpleImageOverride";
import { clustersQuoteRoundedImageRemix } from "../../../common/remix/rules/clusters/clustersQuoteRoundImage/clustersQuoteRoundImage";
import { clustersQuoteRoundedImageOverride } from "./remixes/clustersQuoteRoundedImageOverride";
import { clustersRoundedImageRemix } from "../../../common/remix/rules/clusters/clustersRoundedImage/clustersRoundedImage";
import { clustersRoundedImageOverride } from "./remixes/clustersRoundedImageOverride";
import { clustersPanelFixedImageRemix } from "../../../common/remix/rules/clusters/clustersPanelFixedImage/clustersPanelFixedImage";
import { clustersPanelFixedImageOverride } from "./remixes/clustersPanelFixedImageOverride";
import { clustersText5050Remix } from "../../../common/remix/rules/clusters/clustersText5050/clustersText5050";
import { clustersText5050Override } from "./remixes/clustersText5050Override";
import { clustersTextFixedImageAspectRemix } from "../../../common/remix/rules/clusters/clustersTextFixedImageAspect/clustersTextFixedImageAspect";
import { clustersTextFixedImageAspectOverride } from "./remixes/clustersTextFixedImageAspectOverride";
import { textBlockbusterRemix } from "../../../common/remix/rules/text/textBlockBuster/textBlockbuster";
import { textBlockbusterOverride } from "./remixes/textBlockbusterOverride";
import { imageFullBleedRemix } from "../../../common/remix/rules/images/imageFullBleed/imageFullBleed";
import { imageFullBleedOverride } from "./remixes/imageFullBleedOverride";
import { imagesFullBleedRemix } from "../../../common/remix/rules/images/imagesFullBleed/imagesFullBleed";
import { imageFullBleedTextGradientRemix } from "../../../common/remix/rules/images/imageFullBleedTextGradient/imageFullBleedTextGradientRemix";
import { imageFullBleedTextGradientOverride } from "./remixes/imageFullBleedTextGradientOverride";
import { quoteParaColsRemix } from "../../../common/remix/rules/blockQuotes/quoteParaCols/quoteParaCols";
import { quoteParaColsOverride } from "./remixes/quoteParaColsOverride";
import { textLongformRemix } from "../../../common/remix/rules/text/textLongform/textLongform";
import { textLongformOverride } from "./remixes/textLongformOverride";
import { textListPanelsRemix } from "../../../common/remix/rules/lists/textListPanels/textListPanels";
import { textListPanelsOverride } from "./remixes/textListPanelsOverride";
import { textImage5050AspectRemix } from "../../../common/remix/rules/textImage/textImage5050Aspect/textImage5050Aspect";
import { textImage5050AspectOverride } from "./remixes/textImage5050AspectOverride";
import { logosOpenGridRemix } from "../../../common/remix/rules/logos/logosOpenGrid/logosOpenGrid";
import { logosOpenGridOverride } from "./remixes/logosOpenGridOverride";
import { logosBorderedGridRemix } from "../../../common/remix/rules/logos/logosBorderedGrid/logosBorderedGrid";
import { logosBorderedGridOverride } from "./remixes/logosBorderedGridOverride";
import { logoTextImage5050FullBleedRemix } from "../../../common/remix/rules/logos/logoTextImage5050FullBleed/logoTextImage5050FullBleed";
import { logoTextImage5050FullBleedOverride } from "./remixes/logoTextImage5050FullBleedOverride";
import { imagesWindowedRemix } from "../../../common/remix/rules/images/imagesWindowed/imagesWindowed";
import { imagesWindowedOverride } from "./remixes/imagesWindowedOverride";
import { clustersPanelLandscapeRemix } from "../../../common/remix/rules/clusters/clustersPanelLandscape/clustersPanelLandscape";
import { clustersPanelLandscapeOverride } from "./remixes/clustersPanelLandscapeOverride";
import { clustersFullPanelRemix } from "../../../common/remix/rules/clusters/clustersFullPanel/clustersFullPanel";
import { clustersFullPanelOverride } from "./remixes/clustersFullPanelOverride";
import { textSuperTitleRemix } from "../../../common/remix/rules/text/textSuperTitle/textSuperTitle";
import { superTitleOverride } from "./remixes/superTitleOverride";
import { textImagesWideImgFullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/wideImg/textImagesWideImgFullBleed/textImagesWideImgFullBleed";
import { textImagesWideImgFullBleedOverride } from "./remixes/textImagesWideImgFullBleedOverride";
import { listTextUpwardRemix } from "../../../common/remix/rules/lists/listTextUpward/listTextUpward";
import { listTextUpwardOverride } from "./remixes/listTextUpwardOverride";

export default class Headline extends AbstractTheme {
  constructor() {
    super('headline', getPalettes(), "Headline", false, getFonts());

    // --------------------------------------------------------------------------------------------
    // Element Overrides
    // Palette based variables that target slide / remix elements. Refer to palette not colorChart.
    // --------------------------------------------------------------------------------------------

    const { override } = this;

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
    override('& blockquote p').with(
      (palette) => ({
        borderLeft: `0em solid ${palette.text()}88 !important`,
      })
    );
    override('& .slide').with(
      (palette) => ({
        '& .container-block-quote blockquote': {
          '&:before': {
            color: `${palette.text()}`,
            background: `${palette.background()} !important`,
          },
        },
      })
    );

    override('& .slide.clusters-roundedimg, & .slide.clusters-text-fixedimgaspect').with(
      (palette) => ({
        '& .sequence-cluster-numbered-list, & .sequence-cluster-bulleted-list': {
          '& .container.container-bulleted-list li': {
            '&:before': {
              background: palette.accentColor,
            },
          },
          '& .container.container-numbered-list li': {
            '&:before': {
              color: palette.accentColor,
              background: palette.backgroundColor,
            },
            '&:after': {
              background: palette.accentColor,
            },
          },
        },
      })
    );

    // -----------------------------------------------------------
    // Theme Specific Remix Overrides
    // -----------------------------------------------------------

    // text remixes
    override(textDefaultRemix).with(textDefaultOverride);
    override(textHeadingColsRemix).with(textHeadingColsOverride);
    override(textQuote5050FullBleedRemix).with(textQuote5050FullBleedOverride);
    override(textBlockbusterRemix).with(textBlockbusterOverride);
    override(textLongformRemix).with(textLongformOverride);

    // quotes
    override(quoteSimpleImageRemix).with(quoteSimpleImageOverride);
    override(clustersQuoteRoundedImageRemix).with(clustersQuoteRoundedImageOverride);
    override(quoteParaColsRemix).with(quoteParaColsOverride);

    // clusters
    override(clustersPanelFixedImageRemix).with(clustersPanelFixedImageOverride);
    override(clustersText5050Remix).with(clustersText5050Override);
    override(clustersTextFixedImageAspectRemix).with(clustersTextFixedImageAspectOverride);
    override(clustersRoundedImageRemix).with(clustersRoundedImageOverride);
    override(clustersPanelLandscapeRemix).with(clustersPanelLandscapeOverride);
    override(clustersFullPanelRemix).with(clustersFullPanelOverride);

    // list remixes
    override(listSplitRemix).with(listSplitOverride);
    override(listSiblingRemix).with(listSiblingOverride);
    override(textListPanelsRemix).with(textListPanelsOverride);
    override(olBoldNumberRemix).with(olBoldNumberOverride);
    override(textListCenteredRemix).with(textListCenteredOverride);
    override(clustersTextFixedImageRemix).with(clustersTextFixedImageOverride);
    override(listUnorderedPanelsRemix).with(listUnorderedPanelsOverride);
    override(listTextUpwardRemix).with(listTextUpwardOverride);

    // text/image remixes
    override(textImagesWideImgFullBleedRemix).with(textImagesWideImgFullBleedOverride);
    override(textImages5050FullBleedRemix).with(textImages5050FullBleedOverride);
    override(imagesText5050FullBleedRemix).with(textImages5050FullBleedOverride);
    override(textImages2575FullBleedRemix).with(textImages2575FullBleedOverride);
    override(imagesText2575FullBleedRemix).with(textImages2575FullBleedOverride);
    override(textImage5050AspectRemix).with(textImage5050AspectOverride);
    override(fallbackGridRemix).with(fallbackGridOverride);
    override(textSuperTitleRemix).with(superTitleOverride);

    // image remixes
    override(imageFullBleedRemix).with(imageFullBleedOverride);
    override(imagesFullBleedRemix).with(imageFullBleedOverride);
    override(imageFullBleedTextGradientRemix).with(imageFullBleedTextGradientOverride);

    // logo remixes
    override(logosOpenGridRemix).with(logosOpenGridOverride);
    override(logosBorderedGridRemix).with(logosBorderedGridOverride);
    override(logoTextImage5050FullBleedRemix).with(logoTextImage5050FullBleedOverride);

    // grid image layouts
    override(imagesWindowedRemix).with(imagesWindowedOverride);

  }

  // -----------------------------------------------------------------------------------------------
  // Theme Specific Overrides
  // Overrides here will affect every slide in a deck. Layout & structural (group colour info above)
  // -----------------------------------------------------------------------------------------------

  css() {
    return {
      theme: {
        '& .slide': {
          fontSize: '65%', // 50
          fontWeight: 400,
          lineHeight: '1.25',
          padding: "6%",
          fontFamily: '"Inter var","Helvetica Neue","Helvetica","Arial",sans-serif',
          alignItems: 'flex-start !important',
          textAlign: 'left !important',
          letterSpacing: '0.01em',
          fontFeatureSettings: '"cv10" off, "dlig" on !important',
          '& span.emphasis': {
            borderRadius: '0.05em',
          },
          '& h1': {
            fontFamily: '"Big Shoulders Display","Helvetica Neue","Helvetica","Arial",sans-serif',
            textTransform: 'uppercase',
            margin: '0 0 0.325em 0',
            padding: 0,
            fontSize: '3.5em',
            fontWeight: 700,
            lineHeight: '0.9',
            letterSpacing: '-0.035em',
            '& strong': {
              fontWeight: 900,
              letterSpacing: '-0.05em',
            },
            '& span.emphasis': {
              padding: '0',
              borderRadius: "0.1em",
            },
          },
          '& h2': {
            margin: '0 0 0.75em 0',
            padding: 0,
            lineHeight: '1',
            fontWeight: 600,
            fontSize: '1.8em',
            letterSpacing: '-0.025em',
            '& strong': {
              fontWeight: 800,
            },
          },
          '& p': {
            margin: '0 0 0.75em 0',
            padding: 0,
            lineHeight: '1.25em',
            fontSize: '1.4em',
            letterSpacing: '-0.01em',
            '& strong': {
              fontWeight: 700,
            },
          },
          '& ol, & ul': {
            '& li': {
              fontSize: '1.4em',
              margin: '0 0 0.5em 1.5em !important',
              boxSizing: 'border-box',
              '&:before': {
                fontFamily: '"Big Shoulders Display","Helvetica Neue","Helvetica","Arial",sans-serif !important',
                lineHeight: '1.25',
                fontWeight: '600',
              },
              '& p': {
                lineHeight: '1.25',
              },
            },
          },

          '& .container-block-quote blockquote': {
            fontStyle: 'italic',
            '&:before, &:after': {
              fontStyle: 'normal',
              fontFamily: '"Big Shoulders Display","Helvetica Neue","Helvetica","Arial",sans-serif !important',
            },
            '& p': {
              textIndent: '0.7em !important',
              '&:before': {
                fontStyle: 'normal',
                margin: '0.3em 0 0 -0.85em !important',
              },
              '&:after': {
                fontStyle: 'normal',
              },
            },
          },
          
          '& img': {
            width: '100%'
          },

          '& .sequence .cluster': {
            '& .container-heading-one': {
              fontSize: '90%',
            },
          },

        },

      }
    };
  }

}
